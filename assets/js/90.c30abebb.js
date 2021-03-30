(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{681:function(s,t,a){"use strict";a.r(t);var e=a(25),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"raspberry-pi-3-deployment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#raspberry-pi-3-deployment"}},[s._v("#")]),s._v(" Raspberry Pi 3 Deployment")]),s._v(" "),a("p",[s._v("This document guides you step by step on "),a("strong",[s._v("how to run BTCPay Server on a Raspberry Pi 3")]),s._v(". See here the "),a("RouterLink",{attrs:{to:"/RPi4/"}},[s._v("Raspberry Pi 4 instructions")])],1),s._v(" "),a("p",[s._v("The overall process is as follows:")]),s._v(" "),a("ol",[a("li",[s._v("Purchase and assemble hardware")]),s._v(" "),a("li",[s._v("Install Raspbian Lite operating system, configure networking")]),s._v(" "),a("li",[s._v("Install BTCPayServer-Docker")])]),s._v(" "),a("p",[s._v("BTCPayServer can be successfully installed on the following hardware:")]),s._v(" "),a("ol",[a("li",[s._v("Raspberry Pi 3 Model B+"),a("br")])]),s._v(" "),a("figure",[a("img",{attrs:{src:"https://www.raspberrypi.org/app/uploads/2018/03/770A5842-462x322.jpg",alt:"Raspberry Pi 3 Model B+",title:"Raspberry Pi 3 Model B+"}})]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[s._v("64GB SanDisk Ultra Fit USB Flash Drive"),a("br"),s._v(" "),a("img",{attrs:{src:"https://drh1.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/SDCZ430-210.png",alt:"64 GB SanDisk Ultra Fit USB Flash Drive",title:"SanDisk Ultra Fit USB 3.1 Flash Drive"}})])]),s._v(" "),a("li",[a("p",[s._v("16 GB SanDisk Ultra MicroSDXC Card"),a("br"),s._v(" "),a("img",{attrs:{src:"https://drh2.img.digitalriver.com/DRHM/Storefront/Company/sandiskus/images/product/detail/ultra-microsd-16gb-sandisk-210x210.png",alt:"16 GB SanDisk Ultra MicroSDXC Card",title:"16 GB SanDisk Ultra MicroSDXC Card"}})])])]),s._v(" "),a("p",[s._v("Other requirements are as follows:")]),s._v(" "),a("ol",[a("li",[s._v("Internet connection")]),s._v(" "),a("li",[s._v("Static IP")]),s._v(" "),a("li",[s._v("Domain Name")]),s._v(" "),a("li",[s._v("Ability to open ports "),a("code",[s._v("80")]),s._v(", "),a("code",[s._v("443")]),s._v(", "),a("code",[s._v("9735")]),s._v(" on your router")])]),s._v(" "),a("p",[s._v("Once you have the hardware and other requirements, you're ready to begin!")]),s._v(" "),a("h2",{attrs:{id:"here-are-the-setup-instructions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#here-are-the-setup-instructions"}},[s._v("#")]),s._v(" Here are the setup instructions:")]),s._v(" "),a("p",[a("strong",[s._v("Step 1")]),s._v(" - Configure your domain name.")]),s._v(" "),a("p",[s._v("Login to your domain registrar and create an "),a("code",[s._v("A")]),s._v(" record pointing your domain to the external IP address of your Pi's internet connection:")]),s._v(" "),a("ul",[a("li",[s._v("IP Address: Visit "),a("a",{attrs:{href:"https://ipchicken.com",target:"_blank",rel:"noopener noreferrer"}},[s._v("ipchicken.com"),a("OutboundLink")],1),s._v(' or search the web for "what\'s my ip" from any device on the network')]),s._v(" "),a("li",[s._v("Domain / Hostname: "),a("code",[s._v("btcpay.YourDomain.com")]),s._v(". Name the subdomain where BTCPayServer will run (e.g. "),a("code",[s._v("btcpay")]),s._v(").")]),s._v(" "),a("li",[s._v("TTL: Shortest, or Default")])]),s._v(" "),a("p",[s._v("It can take several hours for DNS changes to propagate worldwide, so you should do this step first.")]),s._v(" "),a("p",[a("strong",[s._v("Step 2")]),s._v(" - Assemble your Pi.")]),s._v(" "),a("p",[a("strong",[s._v("Step 3")]),s._v(" - Get on a computer with a microSD card slot, or a USB port if you have a "),a("a",{attrs:{href:"https://www.canakit.com/mini-micro-sd-usb-reader.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("USB-microSD adapter"),a("OutboundLink")],1),s._v(". Download and extract "),a("a",{attrs:{href:"https://downloads.raspberrypi.org/raspbian_lite_latest",target:"_blank",rel:"noopener noreferrer"}},[s._v("Raspbian Buster Lite"),a("OutboundLink")],1),s._v(" to this machine.")]),s._v(" "),a("p",[a("strong",[s._v("Step 4")]),s._v(" - On this same computer, download and install "),a("a",{attrs:{href:"https://etcher.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Etcher"),a("OutboundLink")],1),s._v(". Etcher is used to 'flash' Operating System disk images to SD cards and USB drives. "),a("strong",[s._v("⚠️ 'Flashing' a drive wipes it completely; be careful")]),s._v(".")]),s._v(" "),a("p",[s._v("In this case, we will be using Etcher to flash your microSD card with the downloaded Raspbian Lite OS. Plug in the microSD card, and run Etcher. Select the unzipped Raspbian OS, select your microSD card, and confirm to flash it.")]),s._v(" "),a("p",[a("strong",[s._v("Step 5")]),s._v(" - On this same computer, "),a("strong",[s._v("⚠️ before you plug the SD card into your Pi")]),s._v(", create an empty file named "),a("code",[s._v("ssh")]),s._v(" in the boot partition of the SD card.")]),s._v(" "),a("ul",[a("li",[s._v("On Mac and Linux, use "),a("code",[s._v("touch ssh")]),s._v(" in the card's root directory via "),a("code",[s._v("Terminal")])]),s._v(" "),a("li",[s._v("On Windows, use "),a("code",[s._v("type nul > ssh")]),s._v(" in the card's root directory via "),a("code",[s._v("cmd")])])]),s._v(" "),a("p",[a("strong",[s._v("Step 6")]),s._v(" - Insert your microSD card and flash drive into the Pi; connect the network cable and power supply.")]),s._v(" "),a("p",[a("strong",[s._v("Step 7")]),s._v(" - From another computer, use an SSH client ("),a("code",[s._v("ssh")]),s._v(" on Mac and Linux, "),a("a",{attrs:{href:"https://putty.org",target:"_blank",rel:"noopener noreferrer"}},[s._v("PuTTY"),a("OutboundLink")],1),s._v(" on Windows) to connect to your Raspberry Pi:")]),s._v(" "),a("ul",[a("li",[s._v("hostname: "),a("code",[s._v("raspberrypi.local")])]),s._v(" "),a("li",[s._v("username: "),a("code",[s._v("pi")])]),s._v(" "),a("li",[s._v("password: "),a("code",[s._v("raspberry")])])]),s._v(" "),a("p",[s._v("So: "),a("code",[s._v("ssh pi@raspberrypi.local")]),s._v(".")]),s._v(" "),a("p",[s._v("If "),a("code",[s._v("raspberrypi.local")]),s._v(" doesn't work, you will have to either look up the Pi's IP address on your router, or run "),a("code",[s._v("ifconfig")]),s._v(" on the Pi directly for the "),a("code",[s._v("eth0")]),s._v(" "),a("code",[s._v("inet")]),s._v(" address.")]),s._v(" "),a("p",[a("strong",[s._v("Step 8 - ⚠️ IMPORTANT!")]),s._v(" - Change your password:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v("\n")])])]),a("p",[a("strong",[s._v("Step 9")]),s._v(" - Give your Pi a static IP address and a DHCP reservation on your local network, via your router. Optionally, setup WiFi. There are a few different ways to do this and you will find a ton of articles online.")]),s._v(" "),a("p",[s._v("To get your router's IP:")]),s._v(" "),a("ul",[a("li",[s._v("On Linux: "),a("code",[s._v("ip route | grep default")])]),s._v(" "),a("li",[s._v("On Mac: "),a("code",[s._v("netstat -nr | grep default")])]),s._v(" "),a("li",[s._v("On Windows: "),a("code",[s._v('ipconfig | findstr /i "Gateway"')])])]),s._v(" "),a("p",[a("strong",[s._v("Step 10")]),s._v(" - Log into your router and forward ports "),a("code",[s._v("80")]),s._v(", "),a("code",[s._v("443")]),s._v(", and "),a("code",[s._v("9735")]),s._v(' to your Pi\'s local IP address. Every router is different and you should be able to find instructions for your router by searching the web for "Port Forwarding + {your router make and model}".')]),s._v(" "),a("p",[a("strong",[s._v("Step 11")]),s._v(" - Install "),a("code",[s._v("fail2ban")]),s._v(" and "),a("code",[s._v("git")]),s._v(".")]),s._v(" "),a("p",[a("code",[s._v("fail2ban")]),s._v(" bans IPs that attempt to connect to your server and show malicious signs. "),a("code",[s._v("git")]),s._v(" allows you to clone and manage repositories on github.com.")]),s._v(" "),a("p",[s._v("So, open a new terminal window and type the following command:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" update "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y fail2ban "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n")])])]),a("p",[a("strong",[s._v("⚠️ Note for beginners:")]),s._v(" Run all commands in these instructions "),a("strong",[s._v("one line at a time")]),s._v("!")]),s._v(" "),a("p",[a("strong",[s._v("Step 12")]),s._v(" - Install "),a("code",[s._v("ufw")]),s._v(" (Uncomplicated Firewall) and allow only specific ports. UFW is a user-friendly frontend for managing iptables firewall rules and its main goal is to make managing iptables easier, or as the name says: uncomplicated.")]),s._v(" "),a("p",[s._v("Install UFW:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ufw\n")])])]),a("p",[s._v("This command allows SSH connections from internal networks only:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.0")]),s._v(".0.0/8 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("172.16")]),s._v(".0.0/12 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.0/16 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("169.254")]),s._v(".0.0/16 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from fc00::/7 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from fe80::/10 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow from ff00::/8 to any port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" proto tcp\n")])])]),a("p",[s._v("These ports need to be accessible from anywhere (The default subnet is 'any' unless you specify one):")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("443")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw allow "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9735")]),s._v("\n")])])]),a("p",[s._v("Verify your configuration:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw status\n")])])]),a("p",[s._v("Enable your firewall:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ufw "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v("\n")])])]),a("p",[a("strong",[s._v("Step 13")]),s._v(" - Reformat flash drive, to be configured as swap space.")]),s._v(" "),a("p",[a("strong",[s._v("⚠️ Warning:")]),s._v(" Using any SD card for swap space "),a("strong",[s._v("kills it quickly!")]),s._v(". Instead, use a flash drive, as the instructions discuss.")]),s._v(" "),a("p",[s._v("The command "),a("code",[s._v("sudo fdisk -l")]),s._v(" shows a list of the connected storage devices. Assuming you only have one flash drive connected, it will be\ncalled "),a("code",[s._v("/dev/sda")]),s._v(". Double-check that "),a("code",[s._v("/dev/sda")]),s._v(" exists, and that its storage capacity matches your flash memory.")]),s._v(" "),a("p",[s._v("Delete existing flash drive partition:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("fdisk")]),s._v(" /dev/sda\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'd'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'w'")]),s._v("\n")])])]),a("p",[s._v("Create new primary flash drive partition:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("fdisk")]),s._v(" /dev/sda\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'n'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'p'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press '1'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'enter'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'enter'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Press 'w'")]),s._v("\n")])])]),a("p",[s._v("Format partition as ext4:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" mkfs.ext4 /dev/sda1\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Create folder for mount.")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /mnt/usb\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Look up UUID of flash drive.")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("UUID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" blkid -s UUID -o value /dev/sda1"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Add mount to fstab.")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"UUID='),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$UUID")]),s._v(' /mnt/usb ext4 defaults,nofail 0"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tee")]),s._v(" -a /etc/fstab\n")])])]),a("p",[s._v("Test changes to "),a("code",[s._v("fstab")]),s._v(" file:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mount")]),s._v(" -a\n")])])]),a("p",[s._v("Verify that drive is mounted:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("df")]),s._v(" -h\n")])])]),a("p",[a("code",[s._v("/dev/sda1")]),s._v(" should appear as mounted on "),a("code",[s._v("/mnt/usb")]),s._v(".")]),s._v(" "),a("p",[s._v("Create symlink to flash drive for Docker:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /mnt/usb/docker\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s /mnt/usb/docker /var/lib/docker\n")])])]),a("p",[a("strong",[s._v("Step 14")]),s._v(" - Finally, move Swapfile to USB and increase its size.")]),s._v(" "),a("p",[s._v("Edit its configuration file:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("nano")]),s._v(" /etc/dphys-swapfile\n")])])]),a("p",[s._v("Change the CONF_SWAPFILE line to:\n"),a("code",[s._v("CONF_SWAPFILE=/mnt/usb/swapfile")])]),s._v(" "),a("p",[s._v("Change the CONF_SWAPSIZE line to:\n"),a("code",[s._v("CONF_SWAPSIZE=2048")])]),s._v(" "),a("p",[s._v("Stop and restart the swapfile service:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" /etc/init.d/dphys-swapfile stop\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" /etc/init.d/dphys-swapfile start\n")])])]),a("p",[a("strong",[s._v("Step 15")]),s._v(" - Install BTCPayServer!")]),s._v(" "),a("p",[s._v("Login as "),a("code",[s._v("root")]),s._v(":")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("su")]),s._v(" -\n")])])]),a("p",[s._v("Create a folder for BTCPayServer:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" btcpayserver\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" btcpayserver\n")])])]),a("p",[s._v("Clone the BTCPayServer-Docker repository into the folder:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/btcpayserver/btcpayserver-docker\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" btcpayserver-docker\n")])])]),a("p",[s._v("Set your environment variables. Make sure the "),a("code",[s._v("BTCPAY_HOST")]),s._v(" value uses your own domain & subdomain. As usual, run each command separately:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAY_HOST")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"btcpay.YourDomain.com"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NBITCOIN_NETWORK")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mainnet"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAYGEN_CRYPTO1")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"btc"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAYGEN_REVERSEPROXY")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"nginx"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAYGEN_LIGHTNING")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"lnd"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAYGEN_ADDITIONAL_FRAGMENTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"opt-save-storage-xs;opt-save-memory"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAY_ENABLE_SSH")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true\n")])])]),a("p",[s._v("Adding the "),a("code",[s._v("opt-save-storage-xs")]),s._v(" fragment will tell Bitcoin Core to keep around 3 months of blocks, or 25 GB of disk space. See other pruning levels "),a("a",{attrs:{href:"https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose",target:"_blank",rel:"noopener noreferrer"}},[s._v("here"),a("OutboundLink")],1),s._v(". Pruning is necessary for FastSync to work.")]),s._v(" "),a("p",[s._v("If you want to use multiple hostnames, add them via the optional "),a("code",[s._v("BTCPAY_ADDITIONAL_HOSTS")]),s._v(" variable:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BTCPAY_ADDITIONAL_HOSTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"raspberrypi.local,btcpay.local"')]),s._v("\n")])])]),a("p",[s._v("In case you want to restrict access to your local network only, please note that you need to use a "),a("code",[s._v(".local")]),s._v(" domain.")]),s._v(" "),a("p",[s._v("Finally, run the BTCPayServer setup script:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" ./btcpay-setup.sh -i\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v("\n")])])]),a("p",[a("strong",[s._v("Step 16")]),s._v(" - Go to "),a("code",[s._v("https://btcpay.YourDomain.com")]),s._v(" and confirm that your site is up and your nodes are syncing.")]),s._v(" "),a("p",[s._v("Syncing is very slow on a Pi, since each block and transaction needs to go through validation. You can skip this, at your own risk, by using "),a("a",{attrs:{href:"#fast-sync"}},[s._v("FastSync")]),s._v(". Otherwise, simply leave the node running to sync to 100%; this may take weeks.")]),s._v(" "),a("p",[a("strong",[s._v("Setup Complete!")])]),s._v(" "),a("h2",{attrs:{id:"fast-sync"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fast-sync"}},[s._v("#")]),s._v(" Fast Sync")]),s._v(" "),a("p",[s._v("BTCPayServer's complete FastSync documentation is "),a("a",{attrs:{href:"https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync",target:"_blank",rel:"noopener noreferrer"}},[s._v("available here"),a("OutboundLink")],1),s._v(".")]),s._v(" "),a("p",[s._v("Please read very carefully to understand what FastSync is and why it's important to verify the UTXO set yourself.")]),s._v(" "),a("p",[a("strong",[s._v("Step 17 - OPTIONAL")]),s._v(" - FastSync:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /root/btcpayserver/btcpayserver-docker\n\n./btcpay-down.sh\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" contrib\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" FastSync\n./load-utxo-set.sh\n")])])]),a("p",[s._v("FastSync currently takes about 30 minutes on a high-speed internet connection. After FastSync finishes, run the following command to restart BTCPayServer:")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n./btcpay-up.sh\n")])])]),a("h2",{attrs:{id:"total-verification"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#total-verification"}},[s._v("#")]),s._v(" Total Verification")]),s._v(" "),a("p",[s._v("By using FastSync, you are exposing yourself to attacks if a "),a("a",{attrs:{href:"https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#what-are-the-downsides-of-fast-sync",target:"_blank",rel:"noopener noreferrer"}},[s._v("malicious UTXO Set snapshot"),a("OutboundLink")],1),s._v(" is sent to you.")]),s._v(" "),a("p",[s._v("If you have another trusted node somewhere else, you can check the validity of the UTXO Set gathered by FastSync by following "),a("a",{attrs:{href:"https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#dont-trust-verify",target:"_blank",rel:"noopener noreferrer"}},[s._v("these instructions"),a("OutboundLink")],1),s._v(".")]),s._v(" "),a("h2",{attrs:{id:"thats-it-enjoy-your-btcpi-"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#thats-it-enjoy-your-btcpi-"}},[s._v("#")]),s._v(" That's it! Enjoy your BTCPi! 🎉")]),s._v(" "),a("p",[s._v("If you don't have the time or patience to build your own BTCPi, there are a few merchants who can build one for you:")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://lightninginabox.co",target:"_blank",rel:"noopener noreferrer"}},[s._v("Lightning in a Box"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://nodl.it",target:"_blank",rel:"noopener noreferrer"}},[s._v("Nodl.it"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);