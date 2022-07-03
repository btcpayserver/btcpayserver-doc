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
For the sake of speed, compatibility and ease of installation it is recommended that you use an Intel/AMD based computer with a minimum of 4 GB RAM and a 500 GB hard drive.  The Gigabyte Brix or Intel NUC lines of compact computers are a great place to start. They are basically small, fanless boxes that are built using laptop components.

**BTCPayServer can be successfully installed on the following hardware**.  The end result is a small, quiet node that is fast enough to sync from block zero.  The total cost is approximately $225 (including tax and delivery).  These are "off the shelf" components that can be purchased from any online retailer (TigerDirect, NewEgg, Amazon, BestBuy etc).   It will take roughly 24 hours to sync the Bitcoin blockchain. You can save little money by cutting the RAM and hard drive size in half.

1. Gigabyte Brix GB-BXBT-1900
![Gigabyte Brix GB-BXBT-1900](https://i1.wp.com/lightninginabox.co/wp-content/uploads/2018/08/20150603180458_m.png?resize=300%2C254&ssl=1 "Gigabyte Brix GB-BXBT-1900")
2. Crucial 8GB DDR3L-1600 SODIMM
![Crucial 8GB DDR3L-1600](https://i0.wp.com/lightninginabox.co/wp-content/uploads/2018/08/204-pinsodimmddr3.png?resize=300%2C133&ssl=1 "Crucial 8GB DDR3L-1600 SODIMM")
3. WD Blue 1TB Mobile Hard Disk Drive
![WD Blue 1 TB HDD](https://i1.wp.com/lightninginabox.co/wp-content/uploads/2018/08/81qCyd2gDL._SL1500_.jpg?resize=300%2C300&ssl=1 "WD Blue 1TB Mobile Hard Disk Drive")

Other requirements are as follows:

1. High speed internet connection.
2. Static IP
3. Domain Name
4. Ability to open ports (80, 443, 9735) on your router.
5. Tiny Screwdriver
6. USB Thumb Drive
7. USB Keyboard, Mouse and Monitor (for initial install only). Can be headless when completed.
8. Four Port USB Hub

Assuming you purchased the hardware mentioned above, here are the build instructions.

**Step 1** - Configure your domain name.
It can take several hours for DNS changes to propagate so you should do this step first.
Login to your domain registrar and point an A record from your domain to the external IP address of your internet connection.
I suggest that you use a subdomain (ie. btcpay.yourdomain.com).
To find your external IP address Google "whats my ip".

**Step 2** - Assemble your BTCPayBox (BTCPB).  If you already have your own Ubuntu Server you can skip to Step 6.

- Remove back cover with screwdriver.
- Insert RAM
- Install hard drive using included cage.

**Step 3** - Download [Ubuntu 18.04 Desktop Image](https://releases.ubuntu.com/18.04/)

**Step 4** - Download and install [Etcher](https://etcher.io/).  Etcher is software that is used to flash OS images to SD cards and USB Drives.
In this case we will be using Etcher to flash our USB Thumb Drive with the Ubuntu OS.

**Step 5** - Connect your USB keyboard, mouse, monitor and thumb drive.  Press the power button to boot your BTCPB using the thumb drive.  The Ubuntu installation process is pretty simple and easy to follow. Here's a tutorial from the Ubuntu website.  [Install Ubuntu Desktop](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0). The GB-BXBT-1900 with BIOS version F9 (and earlier) will need to be configured for compatibility with Ubuntu 18.04, due in part to Intel's cstates. Refer to this [BXBT-1900 Setup Guide](https://gist.github.com/plembo/4d52f7c71739a54f1a023814bbb87e00) for help.

**Step 6** - Give your BTCPB a static IP address on your local network. There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow [How to configure a static IP address on Ubuntu 18.04](https://linuxconfig.org/how-to-configure-static-ip-address-on-ubuntu-18-04-bionic-beaver-linux).  To avoid conflicts with other devices on your network you should also set a "reservation" for your BTCPB.

**Step 7** - Log into your router and forward ports 80, 443 and 9735 to your BTPCB's local IP address. Every router is different and you should be able to find instructions for your router by searching for "Port Forward + your router make and model".

**Step 8** - Install OpenSSH Server, Fail2ban and GIT.  OpenSSH server allows you to connect to your server using SSH clients (ie. [Putty](https://www.putty.org/)) Fail2ban bans IP's that attempt to connect to your server and show malicious signs.  GIT allows you to clone and manage repositories on github.com.
Open a new terminal window and type the following commands:

- `sudo apt update`
- `sudo apt install -y openssh-server fail2ban git`

**Step 9** - Install Uncomplicated Firewall (UFW) and allow only specific ports. UFW is a user-friendly front-end for managing iptables firewall rules and its main goal is to make managing iptables easier or as the name says uncomplicated.
Install UFW

- `sudo apt install ufw`

This command allows SSH connections from your LAN only. Replace 192.168.1.0 with your own subnet.

- `sudo ufw allow from 192.168.1.0/24 to any port 22`

These ports need to be accessible from anywhere.  The default subnet is 'any' unless you specify one.

- `sudo ufw allow 80, 443, 9735`

Verify your configuration.

- `sudo ufw status`

Enable your firewall.

- `sudo ufw enable`

Reboot your BTCB and disconnect the keyboard, mouse and monitor. You should now be able to connect to your BTCB from another computer on your LAN via SSH.

**Step 10** - Install BTCPayServer.
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

**Step 11**
Go to https://btcpay.yourdomain.com and confirm that your nodes are syncing.
Enjoy!

If you don't have the time or patience to build your own BTCPB there are a few merchants who can build one for you.

- [Lightning in a Box](https://lightninginabox.co)
- [Nodl.it](https://nodl.it)
