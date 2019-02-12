# Raspberry Pi Deployment with Pruning and FastSync.

Andreas Antonopoulos tells us "Not your keys, not your Bitcoin".  Here's another Bitcoin axiom "Your hardware.  Your node.  Your keys.  Your Bitcoin". 

In order for your Bitcoin experience to be truly self-sovereign and trustless you should consider running nodes on your own hardware and internet connection. BTCPayServer is an excellent way to run both Bitcoin & Lightning nodes.  Not only are you validating transactions you also get the ability to accept base layer Bitcoin and second layer Lightning payments.  
To that end here are instructions to install and host your very own BTCPay Server on a Raspberry Pi. 

The process is basically the following:

1. Purchase and assemble hardware. 
2. Install base Operating System and configure networking.
3. Install BTCPayServer-Docker.

BTCPayServer can be successfully installed on the following hardware.   
 
1. Raspberry Pi 3 Model B+
![Raspberry Pi 3 Model B+](https://www.raspberrypi.org/app/uploads/2018/03/770A5842-462x322.jpg "Raspberry Pi 3 Model B+")
2. 64GB SanDisk Ultra Fit USB Flash Drive
![64 GB SanDisk Ultra Fit USB Flash Drive](https://drh1.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/SDCZ430-210.png "SanDisk Ultra Fit USB 3.1 Flash Drive")
3. 16 GB SanDisk Ultra MicroSDXC Card
![16 GB SanDisk Ultra MicroSDXC Card](https://drh2.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/ultra-microsd-16gb-sandisk-210x210.png "16 GB SanDisk Ultra MicroSDXC Card")


Other requirements are as follows:

1. High speed internet connection.
2. Static IP
3. Domain Name
4. Ability to open ports (80, 443, 9735) on your router. 

Assuming you purchased the hardware mentioned above, here are the build instructions.

**Step 1** - Configure your domain name. 
It can take several hours for DNS changes to propagate so you should do this step first.  Login to your domain registrar and point an A record from your domain to the external IP address of your internet connection.  I suggest that you use a subdomain (ie. btcpay.yourdomain.com).  To find your external IP address Google "whats my ip".  

**Step 2** - Assemble your BTCPi.  

**Step 3** - Download and extract [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest)

**Step 4** - Download and install [Etcher](https://etcher.io/).  Etcher is software that is used to flash OS images to SD cards and USB Drives. 
In this case we will be using Etcher to flash our micro SD card with the Raspbian OS. 

**Step 5** - Before you plug the SD card into your Raspberry Pi create an empty file named "ssh" on the boot partition of the SD card.

**Step 6** - Insert your SD card and flash drive connect the network cable and power supply. 

**Step 7** - From another computer use an SSH client (Putty) to connect to your Raspberry Pi. 
- Hostname = raspberrypi.local
- username=pi
- password=raspberry 
If "raspberrypi.local" doesn't work you will have to look up the Pi's IP address on your router. 

**Important! Change your password**
```bash
passwd
```

**Step 8** - Give your BTCPi a static IP address on your local network and setup WiFi (optional). There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow [Setting up Raspberry Pi WiFi with Static IP on Raspbian Stretch Lite](https://electrondust.com/2017/11/25/setting-raspberry-pi-wifi-static-ip-raspbian-stretch-lite/).  To avoid conflicts with other devices on your network you should also set a "reservation" for your BTCPi. 

**Step 9** - Log into your router and forward ports 80, 443 and 9735 to your BTCPi's local IP address. Every router is different and you should be able to find instructions for your router by searching for "Port Forward + your router make and model". 

**Step 10** - Install Fail2ban and GIT.  Fail2ban bans IP's that attempt to connect to your server and show malicious signs.  GIT allows you to clone and manage repositories on github.com. 
Open a new terminal window and type the following command 
```bash 
sudo apt update && install -y fail2ban git
```

**Step 11** - Install Uncomplicated Firewall (UFW) and allow only specific ports. UFW is a user-friendly front-end for managing iptables firewall rules and its main goal is to make managing iptables easier or as the name says uncomplicated. 
Install UFW
```bash
sudo apt install ufw 
```

This command allows SSH connections from your LAN only. Replace 192.168.1.0 with your own subnet.
```bash 
sudo ufw allow from 192.168.1.0/24 to any port 22 
```

These ports need to be accessible from anywhere.  The default subnet is 'any' unless you specify one.
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 9735 
```

Verify your configuration.
```bash
sudo ufw status 
```

Enable your firewall.
```bash
sudo ufw enable 
```

**Step 12** - Prepare Flash Drive. If you don't have a flash drive you can skip ahead to Step 13.
The command 'fdisk -l' shows a list of the connected storage devices. Assuming you only have one flash drive connected it will be
called /dev/sda.  Double check that the /dev/sda exists and the storage capacity matches your device. 

Delete existing partition.
```bash
sudo fdisk /dev/sda 
# Press 'd'
# Press 'w'
```

Create new primary partition.
```bash
sudo fdisk /dev/sda
# Press 'n'
# Press 'p'
# Press '1'
# Press 'enter'
# Press 'enter'
# Press 'w'
```

Format partition as ext4.
```bash
sudo mkfs.ext4 /dev/sda1
# Create folder for mount.
sudo mkdir /mnt/usb
# Look up UUID of flash drive.
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
# Add mount to fstab.
echo "UUID=$UUID /mnt/usb ext4 defaults,nofail 0" | sudo tee -a /etc/fstab
```
Test fstab file.
```bash 
sudo mount -a
```

Check to see if drive is mounted. 
```bash
df -h
```
`/dev/sda1` should appear as mounted on `/mnt/usb`

Create symlink to flash drive for Docker.
```bash 
sudo mkdir /mnt/usb/docker
sudo ln -s /mnt/usb/docker /var/lib/docker
```

**Step 13** - Move Swapfile to USB and increase size
```bash 
sudo nano /etc/dphys-swapfile
```
Change the CONF_SWAPFILE line to 
CONF_SWAPFILE=/mnt/usb/swapfile

Change the CONF_SWAPSIZE line to 
CONF_SWAPSIZE=2048

Stop and restart the swapfile service
```bash
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```

**Step 14** - Install BTCPayServer.  
Run the following commands.  Make sure you change the BTCPAY_HOST parameter to your own domain name. 

Login as root
```bash
sudo su - 
```

Create a folder for BTCPay
```bash
mkdir BTCPayServer
cd BTCPayServer 
```

Clone the btcpayserver-docker repository
```bash
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

Set your environment variables. Run each command separately. 
```bash 
export BTCPAY_HOST="btcpay.YourDomain.com" 
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="lnd"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-xs;opt-save-memory" 
```

The last step is to launch the BTCPayServer setup script. 
```bash 
. ./btcpay-setup.sh -i
exit
```

**Step 15** 
Go to https://btcpay.yourdomain.com and confirm that your nodes are syncing. 

**Fast Sync**
BTCPayServer's FastSync documentation is available here https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync.
Please read very carefully to understand what FastSync is and why it's important to verify the UTXO set yourself.

**Step 16**
From the /root/BTCPayServer/btcpayserver-docker folder run the following commands.

```bash
./btcpay-down.sh
cd contrib
cd FastSync
./load-utxo-set.sh
```

FastSync will take about 30 minutes or so depending on your download speed. After FastSync finishes run the following command.
```bash
./btcpay-up.sh
```

**Step 17**

By using FastSync you are exposing yourself to attacks if a [malicious UTXO Set snapshot](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#what-are-the-downsides-of-fast-sync) is sent to you.

If you have another trusted node somewhere else, you can check the validity of the UTXO Set used by FastSync by following [those instructions](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#dont-trust-verify).

Enjoy!

If you don't have the time or patience to build your own BTCPB there are a few merchants who can build one for you. 
- [Lightning in a Box](https://lightninginabox.co)
- [Nodl.it](https://nodl.it)
