# Hardware Deployment

[Lightning in a Box](https://lightninginabox.co)
"Your hardware. Your node. Your keys. Your Bitcoin".


In order for your Bitcoin experience to be truly self-sovereign and trustless you should consider **running nodes on your own hardware** and internet connection.
**BTCPay Server is an excellent way to run both Bitcoin & Lightning nodes**.
Not only are you validating transactions you also get the ability to accept base layer Bitcoin and second layer Lightning payments.
Following are instructions to install and host your very own BTCPay Server.

The process is basically the following:

1. Purchase and assemble hardware.
2. Install base Operating System and configure networking.
3. Install BTCPayServer-Docker.

**BTCPay Server can be installed on the following hardware**. The end result is a small, quiet node that is fast enough to sync from block zero. The total cost is approximately $300. 

1. [BeeLink S12 - Mini PC - $169.00](https://www.amazon.com/dp/B0C89TQ1YF?ref=nb_sb_ss_w_as-reorder-t1_k0_1_4&amp=&crid=SHKYOXZIRAO0&amp=&sprefix=beel)
3. [WD Blue 2TB SSD - $129.00](https://www.amazon.com/Western-Digital-SA510-Internal-Solid/dp/B0C14TF467/ref=sr_1_3?crid=2WDY52E7ESSEB&dib=eyJ2IjoiMSJ9.MBxkb5ZIvwjKXOzscB0GUvsbhX1rVhilXNFzID6n0xHORsDBPkIxQhIixVuiLY9I16rlFs5COExAAD8761Do-tzuAnZiutbqN-KM9rAL4zCw94kA_ArCJeR_RTDynZbiXf2Phnahw1Gw2dqXVek3p0dpe6_a_fbJrqx4BRaieoYo0zj1mX6YPGaYZAmF2Vf_Quk1TrkARk6s1_wZ0vFUw7EWdjKJ9hmNLxPWMfADML90A1rXk8gSCcRnwV2jdzN7jCfg2_urfJZ3IWOW5X3iwnP7s-vSec88PGmQ3RhS-Rc.sEURveFhiTAHYwZQdwyJX72hpWL5UgD_3tEPet747oE&dib_tag=se&keywords=2tb+ssd+wd+blue&qid=1710685725&s=electronics&sprefix=2tb+ssd+wd+blue%2Celectronics%2C90&sr=1-3)

Other requirements are as follows:

1. High speed internet connection.
2. Static IP
3. Domain Name
4. Ability to open ports on your router (optional, BTCPayServer can be accessed over TOR or by Dynamic DNS). 
5. Tiny Screwdriver
6. USB Thumb Drive
7. USB Keyboard, Mouse and Monitor (for initial install only). Can be headless when completed.

Assuming you purchased the hardware mentioned above, here are the build instructions.

### Configure your domain name.
It can take several hours for DNS changes to propagate so you should do this step first.
Login to your domain registrar and point an A record from your domain to the external IP address of your internet connection.
I suggest that you use a subdomain (ie. btcpay.yourdomain.com).
To find your external IP address Google "whats my ip".

### Assemble your Lightning in a Box (LIAB). 
- Remove back cover with screwdriver.
- Insert SSD
- Install hard drive using included cage.

### Download [Ubuntu 22.04 LTS Server](https://releases.ubuntu.com/jammy/ubuntu-22.04.4-live-server-amd64.iso)

### Download and install [Balena Etcher](https://etcher.balena.io/). 
Etcher is software that is used to flash OS images to SD cards and USB Drives.
In this case we will be using Etcher to flash our USB Thumb Drive with the Ubuntu OS.

### Connect your USB keyboard, mouse, monitor and thumb drive. 
Press the power button to boot your LIAB. Press the "DEL" key to access the bios and change the boot order to use the thumb drive first. 
The Ubuntu installation process is pretty simple and easy to follow. Here's a tutorial from the Ubuntu website. [Install Ubuntu Server](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview). The BeeLink S12 ships with Windows Pre-Installed so you will have to delete the NVME partitions and install Ubuntu on that drive. 

*During the install process make sure you set the hostname to "btcpay" and enable SSH. 

### Give your LIAB a static IP address on your local network. 
There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow [How to configure a static IP address on Ubuntu 22.04](https://www.linuxtechi.com/static-ip-address-on-ubuntu-server/). To avoid conflicts with other devices on your network you should also set a "reservation" for your LIAB.

### Log into your router and forward ports 80, 443 and 9735 to your LIAB's local IP address. (optional, if using .local, or Tor only)
Every router is different and you should be able to find instructions for your router by searching for "Port Forward + your router make and model".

### Install Fail2ban, GIT and Avahi-Daemon. 
- [Fail2ban](https://github.com/fail2ban/fail2ban/wiki/How-to-install-fail2ban-packages) bans IP's that attempt to connect to your server and show malicious signs. GIT allows you to clone and manage repositories on github.com.
- [Avahi](https://avahi.org/) is a system which facilitates service discovery on a local network via the mDNS/DNS-SD protocol suite. 
Open a new terminal window and type the following commands:

```bash
sudo apt update
sudo apt install -y fail2ban git avahi-daemon
```

### Configuring the firewall

Install a firewall and allow SSH, HTTP, HTTPS, Bitcoin, and Lightning:

```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
```

This command allows SSH connections from internal networks only:

```bash
ufw allow from 10.0.0.0/8 to any port 22 proto tcp
ufw allow from 172.16.0.0/12 to any port 22 proto tcp
ufw allow from 192.168.0.0/16 to any port 22 proto tcp
ufw allow from 169.254.0.0/16 to any port 22 proto tcp
ufw allow from fc00::/7 to any port 22 proto tcp
ufw allow from fe80::/10 to any port 22 proto tcp
ufw allow from ff00::/8 to any port 22 proto tcp
```

These ports need to be accessible from anywhere (The default subnet is 'any' unless you specify one):

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8333/tcp
ufw allow 9735/tcp

# Enable the firewall
ufw enable

# Verify the configuration
ufw status
```

### Install Docker
```Bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

### Configuring the storage
```bash
fdisk /dev/sda
# type 'p' to list existing partitions
# type 'd' to delete currently selected partitions
# type 'n' to create a new partition
# type 'w' to write the new partition table and exit fdisk
mkfs.ext4 /dev/sda1
mkdir /mnt/usb
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
echo "UUID=$UUID /mnt/usb ext4 defaults,noatime,nofail 0 0" | sudo tee -a /etc/fstab
mount -a
```

### Create mount for Docker volumes

```bash
rm -rf /var/lib/docker
mkdir -p /var/lib/docker
mount --bind /mnt/usb /var/lib/docker
echo "/mnt/docker /var/lib/docker none bind,nobootwait 0 2" >> /etc/fstab
systemctl restart docker
```

### Setup BTCPay Server

Download BTCPay Server from GitHub:

```bash
cd # ensure we are in root home
apt install -y fail2ban git
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

Configure BTCPay by setting some [environment variables](https://github.com/btcpayserver/btcpayserver-docker#environment-variables):

```bash
export BTCPAY_HOST="btcpay.local"
export REVERSEPROXY_DEFAULT_HOST="$BTCPAY_HOST"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_LIGHTNING="clightning"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAY_ENABLE_SSH=true
```

If you want to use multiple hostnames, add them via the optional `BTCPAY_ADDITIONAL_HOSTS` variable:

```bash
export BTCPAY_ADDITIONAL_HOSTS="btcpay.YourDomain.com"
```

In case you want to restrict access to your local network only, please note that you need to use a `.local` domain.

Run the BTCPay installation:

```bash
. ./btcpay-setup.sh -i
```

It should be up and running within a few minutes. Try opening http://btcpay.local in your web browser. If everything is correct, you will see BTCPay Server front page.

Now, you just need to wait a day or so for the Bitcoin blockchain to [sync and full verify](../FAQ/Synchronization.md). The bottom of the BTCPay Server web GUI will show a pop-up dialog box to monitor the progress.

### FastSync (optional)

Please read very carefully to understand what [FastSync](/Docker/fastsync.md) is and why it is important to verify the UTXO set yourself.

By using FastSync, you are exposing yourself to attacks if a [malicious UTXO set snapshot](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#what-are-the-downsides-of-fast-sync) is sent to you.
If you have another trusted node somewhere else, you can check the validity of the UTXO set gathered by FastSync by following [these instructions](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#dont-trust-verify).

```bash
# Stop BTCPay Server
cd /root/btcpayserver/btcpayserver-docker
./btcpay-down.sh

# Import FastSync UTXO set
cd contrib/FastSync
./load-utxo-set.sh
```

FastSync currently takes about 30 minutes on a high-speed internet connection.
After FastSync finishes, run the following command to restart BTCPay Server:

```bash
cd ../..
./btcpay-up.sh
```
