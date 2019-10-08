# Deploying BTCPay Server on Raspberry Pi 4

This document guides you step by step on how to run BTCPay Server on a Raspberry Pi 4. See here the [Raspberry Pi 3 instructions](RPi3.md)

The newly released Raspberry Pi 4 is currently the best low-cost single-board computer available. You can use a Raspberry Pi 4 to run your BTCPay Server at home for around $150 worth of parts, described below.

## Required Hardware

### Raspberry Pi 4

- [Raspberry Pi 4 with **4GB RAM**](https://www.canakit.com/raspberry-pi-4-4gb.html) ($55)
- [Sandisk 16GB SD Card](https://www.amazon.com/dp/B073K14CVB/) ($5)

Don’t settle for only 1GB or 2GB of RAM. The **4GB RAM** version is harder to find than the other versions, but you absolutely want that **4GB of RAM** for a few extra bucks, and it’s totally worth spending a few extra minutes searching on the Internet to find a vendor that has the 4GB RAM version in stock. You’ll also need an **SD card reader** if you don’t already have one.

### Power Adapters and USB-C Cable

- [Official Raspberry Pi 4 USB-C Power Adapter 5.1V/3A for US ](https://shop.pimoroni.com/products/raspberry-pi-official-usb-c-power-supply-us?variant=29391144648787)($10)
- [Official Raspberry Pi 4 USB-C Power Adapter 5.1V/3A for EU](https://shop.pimoroni.com/products/raspberry-pi-official-usb-c-power-supply-eu?variant=29391130624083) ($10)
- [Official Raspberry Pi 4 USB-C Power Adapter 5.1V/3A for AU](https://shop.pimoroni.com/products/raspberry-pi-official-usb-c-power-supply-au?variant=29391160737875) ($10)

Don’t waste your time with random Chinese power adapters from Amazon, or expect that the existing ones you have at home are going to work fine. The Raspberry Pi 4 has issues with unofficial adapters, and for only $10 it’s better to just **get an official adapter** instead of learning this the hard way.

### Cooling options: Passive vs Active vs Passive+Active

- [Pimoroni Fan Shim](https://shop.pimoroni.com/products/fan-shim) ($10)

Strictly speaking, you don’t actually **need** a cooling solution, but you certainly **want** a cooling solution, because once the Raspberry PI core temperature reaches 70C, it will throttle the CPU down to avoid burning itself up.

### Case options: Naked vs. Protection

- [Flirc Heatsink Case](https://flirc.tv/more/raspberry-pi-4-case) ($12)
- [Pimoroni Pibow Coupé 4](https://shop.pimoroni.com/products/pibow-coupe-4?variant=29210100105299) ($9)

Of course, using a case is totally optional, but we recommend one to protect your Raspberry Pi over the long-term and prevent random dust from shorting out the pins.

### Data storage options: SSD vs USB memory vs SD card

- [Samsung 500GB SSD](https://www.amazon.com/dp/B073GZBT36/) ($75)

The 500GB SSD allows you to keep a full copy of the Bitcoin blockchain, until it grows past 500GB sometime in 2022. At that time, you’ll either have to enable pruning on your Bitcoin node, or upgrade to a 1TB SSD, which will presumably be cheaper then, probably even less than $75. You can also use BTCPay without a full copy of the Bitcoin blockchain.

### Display options: Display or Headless

- Display ($100)

## Assembling the Raspberry Pi 4 components

- Important: Attach a heatsink to the CPU! 🔥🔥🔥
- Connect the SSD to one of the blue colored USB 3 ports
- Prepare the USB Power Adapter but don’t plug it in yet

![RPI4 Components](/img/RPI4Components.jpeg)

## Install Linux on the Raspberry Pi

Start by downloading [Raspbian Linux](https://www.raspberrypi.org/downloads/raspbian/) to your existing computer. The “Lite” distribution is fine for BTCPay setup, but if you want to use your Raspberry Pi for other things, you might want the full image.

![RPI4 Linux Installation](/img/RPI4Linux.png)

### Flash your SD card with Raspbian Linux

Assuming you’re running macOS, first you need to identify which device is your SD card. Plug your SD card into your SD card reader and type:

```bash
sudo -sdiskutil list
```

You’ll see a list of disks like this:

![RPI4 Console](/img/RPI4Terminal1.png)

Here’s where your computer might be different from the above and you need to be careful. From the above list of disks on my computer, I can identify `disk0` and `disk1` are my mac’s internal hard disks. But that 32GB “external” and “physical” `disk2` is the same size as my SD card and has some Windows partition on it, so I can identify my SD card is `disk2`.

🚨 **WARNING: You need to correctly identify the drive number of your SD card, and modify the following commands before typing them, or you could accidentally erase your computer’s hard drive instead.** 🚨

Don’t copy and paste the following, you need to replace the 3 instances of `diskX` in these commands with your actual drive ID. For me this was `disk2`,but it might be different for you. The following commands will erase the SD card, and then write the Raspbian image to the SD card, so be careful not to mess up these commands.

```bash
diskutil unmountDisk diskX
dd if=/dev/zero of=/dev/rdiskX bs=4m count=100
dd if=/path/to/raspbian.img of=/dev/rdiskX bs=4m
```
🚨 **WARNING: If you incorrectly flash the wrong drive, you could erase your computer’s hard drive instead of the SD card. Double check you have the disk ID correct so you don’t accidentally erase your data.** 🚨

If all went well, you should see the commands return something like this:

![RPI4 Console](/img/RPI4Terminal2.png)

Next, enable SSH at bootup so you can remotely login, and finally eject the SD card so you can move it to the Raspberry Pi. The new SD card’s boot partition should automatically be mounted on `/Volumes/boot`

```bash
touch /Volumes/boot/ssh
diskutil eject disk2
```

![RPI4 Console](/img/RPI4Terminal4.png)

## Booting up the Raspberry Pi

After inserting the SD card into the Raspberry Pi, go ahead and connect the power and ethernet, and optionally the display and keyboard if you have those. It should boot up and get an IP address using DHCP. You can try searching for it with `ping raspberrypi.local` on your desktop PC, but if that doesn’t work you will need to login to your router to find its IP address.

The IP address that my Raspberry Pi got was 192.168.1.5 so I SSH’d to that

```
ssh 192.168.1.5 -l pi
```

The default password for the “pi” user is “raspberry”. After SSH’ing in, the first thing I want to do is check the device’s CPU temperature to make sure the cooling system are working correctly:

```bash
sudo -svcgencmd measure_temp
```

Next, let’s change the password for the “pi” user.

```bash
passwd pi
```

![](C:\Users\Pavle\Documents\GitHub\btcpayserver-doc\btcpayserver-doc\btcpayserver-doc\img\RPI4Terminal4.png)

I also recommend to disable swap to prevent burning out your SD card.

```bash
dphys-swapfile swapoff
dphys-swapfile uninstall
update-rc.d dphys-swapfile remove
systemctl disable dphys-swapfile
```

![RPI4 Console](/img/RPI4Terminal5.png)

Partition your SSD

```bash
fdisk /dev/sdatype 'p' to list existing partitions
type 'd' to delete currently selected partitions
type 'n' to create a new partition
type 'w' to write the new partition table and exit fdisk
```

Format the new partition on your SSD

```bash
mkfs.ext4 /dev/sda1
```

Configure the SSD partition to auto-mount at bootup

```bash
mkfs.ext4 /dev/sda1
mkdir /mnt/usb
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
echo "UUID=$UUID /mnt/usb ext4 defaults,noatime,nofail 0" | sudo tee -a /etc/fstab
mount -a
```

While you’re editing `/etc/fstab` add a RAM filesystem for logs (optional). This is also to prevent burning out your SD card too quickly.

```bash
none        /var/log        tmpfs   size=10M,noatime         00
```

Mount the SSD partition and create a symlink for docker to use the SSD

```bash
mkdir /mnt/usb/docker
ln -s /mnt/usb/docker /var/lib/docker
```

Upgrade your OS packages to latest

```bash
apt update && apt upgrade -y && apt autoremove
```

Install a firewall and allow SSH, HTTP, HTTPS, Bitcoin, and Lightning

```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8333/tcp
ufw allow 9735/tcp
ufw enable
```

Download BTCPay Server from GitHub

```bash
apt install -y fail2ban git
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
sudo su -
cd ~pi/btcpayserver-docker/
```

Configure BTCPay by setting some environment variables:

```bash
export BTCPAY_HOST="raspberrypi.local"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_LIGHTNING="lnd"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-more-memory"
export BTCPAYGEN_EXCLUDE_FRAGMENTS="opt-add-tor"
```

Run the BTCPay installation

```bash
. ./btcpay-setup.sh -i
```

It should be up and running within a few minutes. Try opening http://raspberrypi.local in your web browser. If everything is correct, you will see BTCPay Server front page.

Now, you just need to wait a day or so for the Bitcoin blockchain to [sync and full verify](FAQ/FAQ-Synchronization.md). The bottom of the BTCPay Server web GUI will show a pop-up dialog box to monitor the progress.
