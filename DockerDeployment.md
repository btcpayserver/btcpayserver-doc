# Docker deployment

[The minimal manual setup](ManualDeployment.md) is not good enough for production environment (no reverse proxy, no HTTPS), and is a bit complicated to deploy.

The ideal architecture is `Docker-Compose`-driven, and looks similar to:

![Production BTCPay](https://raw.githubusercontent.com/btcpayserver/btcpayserver-docker/master/Production/Production.png)

Video below guides you step by step on how to set up BTCPay Server on a VPS with Docker.

[![](img/thumbnails/BTCPayDockerDeploymentVPS.png)](https://www.youtube.com/watch?v=x6hqTFgHqhA)

Please visit [btcpayserver/btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) to see this production deployment and how it works.

This method of deployment is used under the hood for:
* [LunaNode Web Deployment](LunaNodeWebDeployment.md) *
* [Azure Deployment](AzureDeployment.md) *
* [Google Cloud Deployment](GoogleCloudDeployment.md) *

## Hardening your Linux VPS

Securing your BTCPay Server istance is important to protect your and your customers' data from the hands of hackers.
It would take a whole chapter to explain best security practices; for this reason, we will simply explain the basic hardening.
If you want to deepen this topic, you can follow [this tutorial](https://www.cyberciti.biz/tips/linux-security.html).

###  Use strong passwords

Make sure you set a good and strong password for your users.
A good password should be at least 12 characters long and a mixture of alphabets, number, special character, upper and lower alphabets, etc.

### Harden the BIOS

Enable BIOS password and protect GRUB with password to restrict physical access of your system.
Next, disable booting from CD/DVD, External Devices, Floppy Drive in BIOS.

Steps:
* Open a terminal and type `grub-md5-crypt`.
* Digit your desired password and retype it again to confirm it.
Output should be:
```
[root@btcpayserver ~]# grub-md5-crypt
Password: 
Retype password: 
$1$19oD/1$NklcucLPshZVoo5LvUYEp1
```
* Open and edit `/boot/grub/menu.lst` or `/boot/grub/grub.conf` file.
* Add the newly created MD5-hashed password in the configuration file (`password --md5 $1$TNUb/1$TwroGJn4eCd4xsYeGiBYq`).

### Change SSH port

By default, SSH listens on port 22.
Changing the default SSH port adds an extra layer of security to your vps by reducing the risk of automated attacks.

Steps:
* Choose a random port above 1024 to be used as the new ssh port.
Remember that in Linux, port numbers below 1024 are reserved for well-known services and can only be bound to by root.
* Adjust the firewall with your new port (if you forget this step, you risk being locked out of your VPS).
* Edit `/etc/ssh/sshd_config` and search for the line starting with `Port 22`.
* Change the 22 with your new ssh port.
* Open a new terminal and restart ssh by typing `sudo systemctl restart ssh`.

### Disable root login

You should never login as root user with ssh.
Instead, you should use `sudo` to execute root level commands as and when required.

Steps:
* Edit `/etc/ssh/sshd_config` and set `PermitRootLogin no`.
* Open a terminal and restart ssh daemon by typing `/etc/init.d/ssh restart` in a terminal.

### Disable USB, Firewire and Thunderbolt

Since you usually don't need any external device such as keyboards, mice, etc. you should disable USB, firewire and thunderbolt ports and ensure malicious files do not find their way onto your VPS.

Steps:
* Create a new `/etc/modprobe.d/block_usb.conf` file and add `install usb-storage /bin/true` into it.
* Create a new `/etc/modprobe.d/block_firewire.conf` file and add `blacklist firewire-core` into it.
* Create a new `/etc/modprobe.d/block_thunderbolt.conf` file and add `blacklist thunderbolt` into it.

### Install fail2ban
Additional steps should be taken to prevent an attacker to just try out all possible passwords for ssh logins.
`fail2ban` is a a service that cuts off any system with five failed login attempts for ten minutes.
This makes a brute-force attack unfeasible, as it would simply take too long.

Steps:
* Run `sudo apt install fail2ban`

The initial configuration should be fine as it is enabled for SSH by default.
