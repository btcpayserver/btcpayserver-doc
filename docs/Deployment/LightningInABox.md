# Hardware Deployment

Andreas Antonopoulos tells us "Not your keys, not your Bitcoin".
Here's another Bitcoin axiom "Your hardware. Your node. Your keys. Your Bitcoin".

In order for your Bitcoin experience to be truly self-sovereign and trustless you should consider **running nodes on your own hardware** and internet connection.
**BTCPay Server is an excellent way to run both Bitcoin & Lightning nodes**.
Not only are you validating transactions you also get the ability to accept base layer Bitcoin and second layer Lightning payments.
To that end here are instructions to install and host your very own BTCPay Server.

The process is basically the following:

1. Purchase and assemble hardware.
2. Install base Operating System and configure networking.
3. Install BTCPayServer-Docker.

While it may be possible to **install BTCPayServer or parts of it's architecture on ARM based single board computers** (ie. Raspberry Pi, Odroid, OrangePi or NanoPC) the process may require additional skills and knowledge that are beyond the scope of this tutorial.
For the sake of speed, compatibility and ease of installation it is recommended that you use an Intel/AMD based computer with a minimum of 8 GB RAM and a 2 TB SSD drive. The Gigabyte Brix or BeeLink lines of mini computers are a great place to start. They are basically small, fanless boxes that are built using laptop components.

**BTCPayServer can be successfully installed on the following hardware**. The end result is a small, quiet node that is fast enough to sync from block zero. The total cost is approximately $300 (including tax and delivery). These are "off the shelf" components that can be purchased from any online retailer. It will take roughly 24 hours to sync the Bitcoin blockchain. 

1. BeeLink S12 - Mini PC
   ![BeeLink Mini PC](https://www.amazon.com/dp/B0C89TQ1YF?ref=nb_sb_ss_w_as-reorder-t1_k0_1_4&amp=&crid=SHKYOXZIRAO0&amp=&sprefix=beel)
3. WD Blue 2TB SSD
   ![WD Blue 2 TB SSD](https://www.amazon.com/Western-Digital-SA510-Internal-Solid/dp/B0C14TF467/ref=sr_1_3?crid=2WDY52E7ESSEB&dib=eyJ2IjoiMSJ9.MBxkb5ZIvwjKXOzscB0GUvsbhX1rVhilXNFzID6n0xHORsDBPkIxQhIixVuiLY9I16rlFs5COExAAD8761Do-tzuAnZiutbqN-KM9rAL4zCw94kA_ArCJeR_RTDynZbiXf2Phnahw1Gw2dqXVek3p0dpe6_a_fbJrqx4BRaieoYo0zj1mX6YPGaYZAmF2Vf_Quk1TrkARk6s1_wZ0vFUw7EWdjKJ9hmNLxPWMfADML90A1rXk8gSCcRnwV2jdzN7jCfg2_urfJZ3IWOW5X3iwnP7s-vSec88PGmQ3RhS-Rc.sEURveFhiTAHYwZQdwyJX72hpWL5UgD_3tEPet747oE&dib_tag=se&keywords=2tb+ssd+wd+blue&qid=1710685725&s=electronics&sprefix=2tb+ssd+wd+blue%2Celectronics%2C90&sr=1-3)

Other requirements are as follows:

1. High speed internet connection.
2. Static IP
3. Domain Name
4. Ability to open ports (80, 443, 9735) on your router.
5. Tiny Screwdriver
6. USB Thumb Drive
7. USB Keyboard, Mouse and Monitor (for initial install only). Can be headless when completed.

Assuming you purchased the hardware mentioned above, here are the build instructions.

**Step 1** - Configure your domain name.
It can take several hours for DNS changes to propagate so you should do this step first.
Login to your domain registrar and point an A record from your domain to the external IP address of your internet connection.
I suggest that you use a subdomain (ie. btcpay.yourdomain.com).
To find your external IP address Google "whats my ip".

**Step 2** - Assemble your Lightning in a Box (LIAB). If you already have your own Ubuntu Server you can skip to Step 6.

- Remove back cover with screwdriver.
- Insert SSD
- Install hard drive using included cage.

**Step 3** - Download [Ubuntu 22.04 LTS Server](https://releases.ubuntu.com/jammy/ubuntu-22.04.4-live-server-amd64.iso)

**Step 4** - Download and install [Balena Etcher](https://etcher.balena.io/). Etcher is software that is used to flash OS images to SD cards and USB Drives.
In this case we will be using Etcher to flash our USB Thumb Drive with the Ubuntu OS.

**Step 5** - Connect your USB keyboard, mouse, monitor and thumb drive. Press the power button to boot your LIAB. Press the "DEL" key to access the bios and change the boot order to use the thumb drive first. The Ubuntu installation process is pretty simple and easy to follow. Here's a tutorial from the Ubuntu website. [Install Ubuntu Server](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview). The BeeLink S12 ships with Windows Pre-Installed so you will have to delete the NVME drive and install Ubuntu on that drive. During the install process make sure you enable SSH. 

**Step 6** - Give your LIAB a static IP address on your local network. There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow [How to configure a static IP address on Ubuntu 22.04](https://www.linuxtechi.com/static-ip-address-on-ubuntu-server/). To avoid conflicts with other devices on your network you should also set a "reservation" for your LIAB.

**Step 7** - Log into your router and forward ports 80, 443 and 9735 to your LIAB's local IP address. Every router is different and you should be able to find instructions for your router by searching for "Port Forward + your router make and model".

**Step 8** - Install Fail2ban and GIT. OpenSSH server allows you to connect to your server using SSH clients (ie. [Putty](https://www.putty.org/)) Fail2ban bans IP's that attempt to connect to your server and show malicious signs. GIT allows you to clone and manage repositories on github.com.
Open a new terminal window and type the following commands:

- `sudo apt update`
- `sudo apt install -y fail2ban git`

**Step 9** - Install Uncomplicated Firewall (UFW) and allow only specific ports. UFW is a user-friendly front-end for managing iptables firewall rules and its main goal is to make managing iptables easier or as the name says uncomplicated.
Install UFW

- `sudo apt install ufw`

This command allows SSH connections from your LAN only. Replace 192.168.1.0 with your own subnet.

- `sudo ufw allow from 192.168.1.0/24 to any port 22`

These ports need to be accessible from anywhere. The default subnet is 'any' unless you specify one.

- `sudo ufw allow 80, 443, 9735`

Verify your configuration.

- `sudo ufw status`

Enable your firewall.

- `sudo ufw enable`

Reboot your LIAB and disconnect the keyboard, mouse and monitor. You should now be able to connect to your LIAB from another computer on your LAN via SSH.

**Step 10**
- `sudo apt install apt-transport-https ca-certificates curl software-properties-common`
- `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`
- `echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
- `sudo apt update`
- `apt-cache policy docker-ce`
- `sudo apt install docker-ce`
- `sudo systemctl status docker`

**Step 11** - Install BTCPayServer.
From another PC on your network login in to your BTCPB via SSH.

If you are using Windows

- download [Putty](https://releases.ubuntu.com/18.04/) and create a connection to your BTCPB.

If you are using another Linux machine open a new terminal and type in the following.
You will be prompted for your password.

- `ssh user@LANIP` (ie. bob@192.168.1.2)

Run the following commands.
Make sure you change the `BTCPAY_HOST` parameter to your own domain name.

Login as root

- `sudo su -`

Create a folder for BTCPay

- `mkdir BTCPayServer`
- `cd BTCPayServer`

Clone the btcpayserver-docker repository

- `git clone https://github.com/btcpayserver/btcpayserver-docker`
- `cd btcpayserver-docker`

Set your environment variables.
Run each command separately.

- `export BTCPAY_HOST="btcpay.YourDomain.com"`
- `export NBITCOIN_NETWORK="mainnet"`
- `export BTCPAYGEN_CRYPTO1="btc"`
- `export BTCPAYGEN_CRYPTO2="ltc"`
- `export BTCPAYGEN_REVERSEPROXY="nginx"`
- `export BTCPAYGEN_LIGHTNING="clightning"`

The last step is to launch the BTCPayServer setup script.

- `. ./btcpay-setup.sh -i`
- `exit`

**Step 12**
Go to https://btcpay.yourdomain.com and confirm that your nodes are syncing.
Enjoy!

If you don't have the time or patience to build your own BTCPB there are a few merchants who can build one for you.

- [Lightning in a Box](https://lightninginabox.co)
- [Nodl.it](https://nodl.it)
