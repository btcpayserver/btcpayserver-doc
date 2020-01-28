# Raspberry Pi 3 Deployment with Pruning and FastSync

This document guides you step by step on how to run BTCPay Server on a Raspberry Pi 3. See here the [Raspberry Pi 4 instructions](RPi4.md)

The overall process is as follows:

1. Purchase and assemble hardware
2. Install Raspbian Lite operating system, configure networking
3. Install BTCPayServer-Docker

BTCPayServer can be successfully installed on the following hardware:

1. Raspberry Pi 3 Model B+<br/>

![Raspberry Pi 3 Model B+](https://www.raspberrypi.org/app/uploads/2018/03/770A5842-462x322.jpg "Raspberry Pi 3 Model B+")

2. 64GB SanDisk Ultra Fit USB Flash Drive<br/>
![64 GB SanDisk Ultra Fit USB Flash Drive](https://drh1.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/SDCZ430-210.png "SanDisk Ultra Fit USB 3.1 Flash Drive")

3. 16 GB SanDisk Ultra MicroSDXC Card<br/>
![16 GB SanDisk Ultra MicroSDXC Card](https://drh2.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/ultra-microsd-16gb-sandisk-210x210.png "16 GB SanDisk Ultra MicroSDXC Card")

Other requirements are as follows:

1. Internet connection
2. Static IP
3. Domain Name
4. Ability to open ports `80`, `443`, `9735` on your router

Once you have the hardware and other requirements, you're ready to begin!

## Here are the setup instructions:

**Step 1** - Configure your domain name.

Login to your domain registrar and create an `A` record pointing your domain to the external IP address of your Pi's internet connection:

- IP Address: Visit [ipchicken.com](https://ipchicken.com) or search the web for "what's my ip" from any device on the network
- Domain / Hostname: `btcpay.YourDomain.com`. Name the subdomain where BTCPayServer will run (e.g. `btcpay`).
- TTL: Shortest, or Default

It can take several hours for DNS changes to propagate worldwide, so you should do this step first.

**Step 2** - Assemble your Pi.

**Step 3** - Get on a computer with a microSD card slot, or a USB port if you have a [USB-microSD adapter](https://www.canakit.com/mini-micro-sd-usb-reader.html). Download and extract [Raspbian Buster Lite](https://downloads.raspberrypi.org/raspbian_lite_latest) to this machine.

**Step 4** - On this same computer, download and install [Etcher](https://etcher.io/). Etcher is used to 'flash' Operating System disk images to SD cards and USB drives. **⚠️ 'Flashing' a drive wipes it completely; be careful**.

In this case, we will be using Etcher to flash your microSD card with the downloaded Raspbian Lite OS. Plug in the microSD card, and run Etcher. Select the unzipped Raspbian OS, select your microSD card, and confirm to flash it.

**Step 5** - On this same computer, **⚠️ before you plug the SD card into your Pi**, create an empty file named `ssh` in the boot partition of the SD card.

- On Mac and Linux, use `touch ssh` in the card's root directory via `Terminal`
- On Windows, use `type nul > ssh` in the card's root directory via `cmd`

**Step 6** - Insert your microSD card and flash drive into the Pi; connect the network cable and power supply.

**Step 7** - From another computer, use an SSH client (`ssh` on Mac and Linux, [PuTTY](https://putty.org) on Windows) to connect to your Raspberry Pi:

- hostname: `raspberrypi.local`
- username: `pi`
- password: `raspberry`

So: `ssh pi@raspberrypi.local`.

If `raspberrypi.local` doesn't work, you will have to either look up the Pi's IP address on your router, or run `ifconfig` on the Pi directly for the `eth0` `inet` address.

**Step 8 - ⚠️ IMPORTANT!** - Change your password:
```bash
passwd
```

**Step 9** - Give your Pi a static IP address and a DHCP reservation on your local network, via your router. Optionally, setup WiFi. There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow: [Setting up Raspberry Pi WiFi with Static IP on Raspbian Stretch Lite](https://electrondust.com/2017/11/25/setting-raspberry-pi-wifi-static-ip-raspbian-stretch-lite/).

To get your router's IP:

- On Linux: `ip route | grep default`
- On Mac: `netstat -nr | grep default`
- On Windows: `ipconfig | findstr /i "Gateway"`

**Step 10** - Log into your router and forward ports `80`, `443`, and `9735` to your Pi's local IP address. Every router is different and you should be able to find instructions for your router by searching the web for "Port Forwarding + {your router make and model}".

**Step 11** - Install `fail2ban` and `git`.

`fail2ban` bans IPs that attempt to connect to your server and show malicious signs. `git` allows you to clone and manage repositories on github.com.

So, open a new terminal window and type the following command:
```bash
sudo apt update && sudo apt install -y fail2ban git
```

**⚠️ Note for beginners:** Run all commands in these instructions **one line at a time**!

**Step 12** - Install `ufw` (Uncomplicated Firewall) and allow only specific ports. UFW is a user-friendly frontend for managing iptables firewall rules and its main goal is to make managing iptables easier, or as the name says: uncomplicated.

Install UFW:
```bash
sudo apt install ufw
```

This command allows SSH connections from internal networks only:
```bash
sudo ufw allow from 10.0.0.0/8 to any port 22 proto tcp
sudo ufw allow from 172.16.0.0/12 to any port 22 proto tcp
sudo ufw allow from 192.168.0.0/16 to any port 22 proto tcp
sudo ufw allow from 169.254.0.0/16 to any port 22 proto tcp
sudo ufw allow from fc00::/7 to any port 22 proto tcp
sudo ufw allow from fe80::/10 to any port 22 proto tcp
sudo ufw allow from ff00::/8 to any port 22 proto tcp
```

These ports need to be accessible from anywhere (The default subnet is 'any' unless you specify one):
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 9735
```

Verify your configuration:
```bash
sudo ufw status
```

Enable your firewall:
```bash
sudo ufw enable
```

**Step 13** - Reformat flash drive, to be configured as swap space.

**⚠️ Warning:** Using any SD card for swap space **kills it quickly!**. Instead, use a flash drive, as the instructions discuss.

The command `sudo fdisk -l` shows a list of the connected storage devices. Assuming you only have one flash drive connected, it will be
called `/dev/sda`. Double-check that `/dev/sda` exists, and that its storage capacity matches your flash memory.

Delete existing flash drive partition:
```bash
sudo fdisk /dev/sda
# Press 'd'
# Press 'w'
```

Create new primary flash drive partition:
```bash
sudo fdisk /dev/sda
# Press 'n'
# Press 'p'
# Press '1'
# Press 'enter'
# Press 'enter'
# Press 'w'
```

Format partition as ext4:
```bash
sudo mkfs.ext4 /dev/sda1
# Create folder for mount.
sudo mkdir /mnt/usb
# Look up UUID of flash drive.
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
# Add mount to fstab.
echo "UUID=$UUID /mnt/usb ext4 defaults,nofail 0" | sudo tee -a /etc/fstab
```

Test changes to `fstab` file:
```bash
sudo mount -a
```

Verify that drive is mounted:
```bash
df -h
```

`/dev/sda1` should appear as mounted on `/mnt/usb`.

Create symlink to flash drive for Docker:
```bash
sudo mkdir /mnt/usb/docker
sudo ln -s /mnt/usb/docker /var/lib/docker
```

**Step 14** - Finally, move Swapfile to USB and increase its size.

Edit its configuration file:
```bash
sudo nano /etc/dphys-swapfile
```

Change the CONF_SWAPFILE line to:
`CONF_SWAPFILE=/mnt/usb/swapfile`


Change the CONF_SWAPSIZE line to:
`CONF_SWAPSIZE=2048`

Stop and restart the swapfile service:
```bash
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```

**Step 15** - Install BTCPayServer!

Login as `root`:
```bash
sudo su -
```

Create a folder for BTCPayServer:
```bash
mkdir btcpayserver
cd btcpayserver
```

Clone the BTCPayServer-Docker repository into the folder:
```bash
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

Set your environment variables. Make sure the `BTCPAY_HOST` value uses your own domain & subdomain. As usual, run each command separately:
```bash
export BTCPAY_HOST="btcpay.YourDomain.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="lnd"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-xs;opt-save-memory"
export BTCPAY_ENABLE_SSH=true
```

Adding the `opt-save-storage-xs` fragment will tell Bitcoin Core to keep around 3 months of blocks, or 25 GB of disk space. See other pruning levels [here](https://github.com/btcpayserver/btcpayserver-docker#generated-docker-compose-). Pruning is necessary for FastSync to work.

If you want to use multiple hostnames, add them via the optional `BTCPAY_ADDITIONAL_HOSTS` variable:
```bash
export BTCPAY_ADDITIONAL_HOSTS="raspberrypi.local,btcpay.local"
```

In case you want to restrict access to your local network only, please note that you need to use a `.local` domain.

Finally, run the BTCPayServer setup script:
```bash
. ./btcpay-setup.sh -i
exit
```

**Step 16** - Go to `https://btcpay.YourDomain.com` and confirm that your site is up and your nodes are syncing.

Syncing is very slow on a Pi, since each block and transaction needs to go through validation. You can skip this, at your own risk, by using [FastSync](#Fast-Sync). Otherwise, simply leave the node running to sync to 100%; this may take weeks.

**Setup Complete!**

## Fast Sync

BTCPayServer's complete FastSync documentation is [available here](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync).

Please read very carefully to understand what FastSync is and why it's important to verify the UTXO set yourself.

**Step 17 - OPTIONAL** - FastSync:

```bash
cd /root/btcpayserver/btcpayserver-docker

./btcpay-down.sh
cd contrib
cd FastSync
./load-utxo-set.sh
```

FastSync currently takes about 30 minutes on a high-speed internet connection. After FastSync finishes, run the following command to restart BTCPayServer:
```bash
cd ../..
./btcpay-up.sh
```

## Total Verification

By using FastSync, you are exposing yourself to attacks if a [malicious UTXO Set snapshot](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#what-are-the-downsides-of-fast-sync) is sent to you.

If you have another trusted node somewhere else, you can check the validity of the UTXO Set gathered by FastSync by following [these instructions](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#dont-trust-verify).


## That's it! Enjoy your BTCPi! 🎉 🎉

If you don't have the time or patience to build your own BTCPi, there are a few merchants who can build one for you:

- [Lightning in a Box](https://lightninginabox.co)
- [Nodl.it](https://nodl.it)
