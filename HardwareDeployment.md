# Hardware Deployment

The process is basically the following:

1. Purchase and assemble hardware. 
2. Install base Operating System and configure networking.
3. Install BTCPayServer-Docker.
4. Kick back and drink a beer. 

While it may be possible to install BTCPayServer or parts of it's architecture on ARM based single board computer (ie. Raspberry Pi, 
Odroid or NanoPC) the process may require additional skills and knowledge that are beyond the scope of this tutorial. 
For the sake of speed, compatibility and ease of installation I would recommend an Intel/AMD based computer with a minimum of 4Gb RAM and a 500 Gb hard drive. 

I have successfully installed BTCPayServer on the following hardware.  It's small, quiet, fast enough and honestly pretty cool.   The total cost was approximatly $225 from Amazon.com but you could save a little bit by cutting the RAM and hard drive in half. 
It only took about 24 hours to sync the Bitcoin blockchain. 

1. Gigabyte Brix GB-BXBT-1900
2. Crucial 8GB DDR3L-1600 SODIMM
3. WD Blue 1TB Mobile Hard Disk Drive


Assuming you purchased the hardware mentioned above, here are the build instructions. 

Other requirements are as follows:

1. High speed internet connection.
2. Static IP
3. Domain Name
4. Ability to open ports (80, 443, 9735) on your router.
5. Tiny Screwdriver
6. USB Thumb Drive
7. USB Keyboard, Mouse and Monitor (for initial install only). Can be headless when completed.

Step 1 - Assemble your BTCPayBox (BTCPB)
  - Remove back cover with screwdriver.
  - Insert RAM
  - Install hard drive included cage. 

Step 2 - Download [Ubuntu 18.04 Desktop Image](http://releases.ubuntu.com/18.04/ubuntu-18.04.1-desktop-amd64.iso)

Step 3 - Download and install [Etcher](https://etcher.io/).  Etcher is software that is used to flash OS images to SD cards and USB Drives. 
In this case we will be using Etcher to flash our USB Thumb Drive with the Ubuntu OS. 

Step 4 - Connect your USB keyboard, mouse, monitor and thumb drive.  Press the power button to boot your BIAB using the thumb drive.  
The Ubuntu installation process is pretty simple and easy to follow.  Here's a tutorial from the Ubuntu website.  (Install Ubuntu Desktop](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0)

Step 5 - Give your BTCPB a static IP address on your local network. There are a few different ways to do this and you will find a ton of articles online. Here's a pretty simple one to follow (https://linuxconfig.org/how-to-configure-static-ip-address-on-ubuntu-18-04-bionic-beaver-linux).  To avoid conflicts with others devices on your network you should also set a "reservation" on your router so BTCPB's IP address doesn't get handed out to another devices on your network. 

