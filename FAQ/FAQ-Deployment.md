# BTCPay Deployment Frequently Asked Questions

This document covers the most common questions, errors, and issues you may encounter prior and during the installation of the software. For a detailed list of deployments method and instructions for each, please see [Deployment page](/Deployment.md).

## General Deployment FAQ

Here are common questions about installation, regardless of the deployment method.

* [How much does it cost to run BTCPay Server?](FAQ-Deployment.md#how-much-does-it-cost-to-run-btcpay-server)
* [What are the minimal requirements for BTCPay?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [What is the easiest method to deploy a self-hosted BTCPay Server?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [How to choose a proper deployment method?](FAQ-Deployment.md#how-to-choose-a-proper-deployment-method)
* [Can I run BTCPay on my hardware?](FAQ-Deployment.md#can-i-run-btcpay-on-my-own-hardware)
* [Can I deploy on my existing VPS?](FAQ-Deployment.md#can-i-deploy-btcpay-on-my-existing-vps)
* [Are there free hosts where I can test?](FAQ-Deployment.md#are-there-free-hosts-where-i-can-test)
* [After initial deployment, I can't register and I don't have a login yet?](FAQ-Deployment.md#after-initial-deployment-i-cant-register-and-i-dont-have-a-login-yet)
* [With the docker deployment, how to use a different volume for the data?](FAQ-Deployment.md#with-the-docker-deployment-how-to-use-a-different-volume-for-the-data)
* [How do I activate Tor on my BTCPay Server?](FAQ-Deployment.md#how-do-i-activate-tor-on-my-btcpay-server)
* [How do I disable Tor on my BTCPay Server?](FAQ-Deployment.md#how-do-i-disable-tor-on-my-btcpay-server)
* [Why activate Tor? Does it mean that nobody knows who I am?](FAQ-Deployment.md#why-activate-tor-does-it-mean-that-nobody-knows-who-i-am)
* [How can I modify/deactivate environment variables?](FAQ-Deployment.md#How-can-i-modifydeactivate-environment-variables)
* [Can I start BTCPay only when I'm expecting a payment?](FAQ-Deployment.md#can-i-start-btcpay-only-when-im-expecting-a-payment)
* [Can I use my existing BTC or LN node with BTCPay?](FAQ-Deployment.md#can-i-use-my-existing-btc-or-ln-node-with-btcpay)

## Web Deployment FAQ
### Luna Node Web Deployment FAQ
* [How to change domain name on my LunaNode BTCPay?](FAQ-Deployment.md#how-to-change-domain-name-on-my-lunanode-btcpay)

## Manual Deployment FAQ
* [Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)](FAQ-Deployment.md#getting-500-nginx-error-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from)
* [How to manually install BTCPay on Ubuntu 18.04?](FAQ-Deployment.md#how-to-manually-install-btcpay-on-ubuntu-1804)
* [Error: BTCPay is expecting you to access this website from...](FAQ-Deployment.md#btcpay-is-expecting-you-to-access-this-website-from)

## General Deployment

### How much does it cost to run BTCPay Server?
BTCPay is a 100% free and open-source software. We do not charge you anything.
However, to run it, you should host it. You can run it as a self-hosted solution on your own local server, or use a cloud hosting provider, which is what a majority of users do. Advanced users can run BTCPay on [their own hardware](/HardwareDeployment.md) Visit our [Deployment Page](/Deployment.md) to see various ways in which you can run BTCPay.
If you do not wish to host your own server, you should use a free host. If you prefer to have control over your node and additional features, you can use a cloud solution, which goes from 5$ to 65$ /month depending on the provider you choose.

### What are the minimal requirements for BTCPay?
If you would like to run Bitcoin and Lightning Network nodes, the minimal requirements are :

* 2GB Ram
* 80 GB of storage [with enabled pruning](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose)
* Docker

### What is the easiest method to deploy a self-hosted BTCPay Server?
For beginners, we strongly recommend the [web-deployment](/LunaNodeWebDeployment.md) if you want a self-hosted solution or a [third-party host](ThirdPartyHosting.md)

If you're going to add more than one crypto coin, you need to expand the storage according to that coin(s) blockchain size.

### How to choose a proper deployment method?
Please see [Deployment page](/Deployment.md) for comparison of different installation methods and choose the one that suits your needs and skill level the most.

### Can I run BTCPay on my own hardware?
Yes, you can. Check our the [Hardware Deployment page](/HardwareDeployment.md) for detailed instructions.

### Can I deploy BTCPay on my existing VPS?
Yes. BTCPay is not limited to the documented deployment methods. You can use whichever hosting solution you prefer, that fits the minimal requirements.

### Are there free hosts where I can test?
On a self-hosted BTCPay, the unlimited amount of users and stores can be attached. That's why there are users who opened their servers for others to use. Most of them are community-driven and free. See this list of [third-party BTCPay hosts](/ThirdPartyHosting.md)

### After initial deployment, I can't register and I don't have a login yet?
When you deploy your BTCPay Server, you should first register a user (during server synchronization). This user is automatically the server admin. If your BTCPay only shows Login in the header menu, and you are unable to register the first user after initial deployment, someone else has registered on your server as the admin. Although this is unlikely to occur (the user would need to know and watch your BTCPay domain name), they had access to your ssh private keys, thus you should redeploy a new server for security reasons. 

### With the docker deployment, how to use a different volume for the data?

For example if you plug a USB drive, and find out that it is the volume `/dev/sda1`, then:

```bash
# Format the drive
sudo mkfs.ext4 /dev/sda1
# Create folder for mount.
sudo mkdir /mnt/usb
# Look up UUID of flash drive.
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
# Add mount to fstab.
echo "UUID=$UUID /mnt/usb ext4 defaults,nofail 0" | sudo tee -a /etc/fstab
# Define `/var/lib/docker` as symbolic link to /mnt/usb
sudo mkdir /mnt/usb/docker
sudo ln -s /mnt/usb/docker /var/lib/docker
```

If you want to mount specific folder (like only Bitcoin node data directory), please browse `/var/lib/docker/volumes` to chose the different docker volumes.

### How do I activate Tor on my BTCPay Server?

Tor is activated by default on the docker deployment.

### How do I disable Tor on my BTCPay Server?

That's really easy: just log in your instance with SSH, and enter the `root/btcpayserver-docker` directory as root. There, type the two following command lines:
```
root/btcpayserver-docker $ BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;opt-add-tor"
root/btcpayserver-docker $ . btcpay-setup.sh -i
```

Then wait a few minutes for the server to restart, and you're done!

### Why activate Tor? Does it mean that nobody knows who I am?

Tor for BTCPay server is intended more as an improvement of the setup process, and allows for more flexibility for hosting on one's own device at home or in an office. 

Having Tor activated would allow for simpler, plug-and-play usage of BTCPay, as it suppress the need for the following configuration steps:
* Opening multiple ports on the firewall
* Configuring the NAT for port redirection to your device on your local network
* Setting up a DNS entry to get a HTTPS certificate
* Having a fixed IP for Lightning

While these steps are usually not a problem when BTCPay is hosted on a VPS, it can be difficult to solve for non-technical users on home or office networks. 

Tor just solves all these issues in one shot, all you have to do is plug your device on the local network. It is especially useful for POS application.

But if you're looking for perfect privacy and security, **activating Tor with your BTCPay just won't do it.** 

Tor is a really tricky software to use for developers, as the slightest mistake can tear down the anonymity it provides. As BTCPay is evolving into a rather complex service and adding more and more plugins, even if we tried to route all this trafic through Tor, we couldn't guarantee that there would never be leaks of data in clear.

We think that the illusion of security is more dangerous that no security, or at least security we know is imperfect. So be aware that activating Tor doesn't prevent others to connect to your instance website, your bitcoin or lightning node in clear, **it doesn't make you anonymous at all.**

If you want to know more about the philosophy behind all this, you can read our [article on  Medium](https://medium.com/@BtcpayServer/about-tor-and-btcpay-server-2ec1e4bd5e51).

### How can I modify/deactivate environment variables?

In BTCPay, various options are activated through environment variables. You can modify or delete any of these options using command lines by exporting the new value with `export {environment variable}="{value}"` and then running `. ./btcpay-setup.sh -i` again.

For example, let's say I want to deactivate Tor for my BTCPay server:
```
# Login as root
sudo su -

# Go to the root/btcpayserver-docker directory
cd /root/btcpayserver-docker

# Print the complete list of options that you are running (for the sake of the demonstration, let's say that beside Tor you have pruning mode activated too)
echo $BTCPAYGEN_ADDITIONAL_FRAGMENTS
opt-save-storage-s;opt-add-tor

# Export the BTCPAYGEN_ADDITIONAL_FRAGMENTS variable without opt-add-tor
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-s"

# Run btcpay-setup.sh
. btcpay-setup.sh -i

exit
```

If you need to figure out which environment variable you need to modify, have a look at [this list](https://github.com/btcpayserver/btcpayserver-docker#environment-variables).

### Can I start BTCPay only when I'm expecting a payment?

No, you need to keep your BTCPay running at all times so that your Bitcoin node stays in sync with the blockchain to verify transactions. If you only start it up every now and then, it would take a long time to catch up on verifying recent blocks, and your payments would not show up until much later.

### Can I use my existing BTC or LN node with BTCPay?

It is theoretically possible, but not recommended. Reasons being that it's not documented, making it difficult and time consuming. You would need to understand what docker-compose is doing, watch this [video](https://vimeo.com/316630434). If you are not technically able, it's much easier to use the nodes included in the BTCPay deployment. 

## Web-deployment

Here you can find common questions and solutions to BTCPay web-deployments.

### LunaNode web-deployment

#### How to change domain name on my LunaNode BTCPay?
1. In your LunaNode dashboard, click on Virtual Machines > Your Virtual Machine > General Tab > External IP. Copy the external IP.
2. Go to your DNS provider and create an A record. Paste the external IP.
3. Go to Server Settings > Maintenance > Change Domain. Paste yourdomain.com without http or https prefix.

Additional documentation can be found on [domain change page](/ChangeDomain.md).

## Manual Deployment

#### Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)

You need to open port 80 and 443. Once you did that, restart docker `btcpay-restart.sh`

#### How to manually install BTCPay on Ubuntu 18.04?

Check this [community guide](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install). 

#### BTCPay is expecting you to access this website from

You might also see the following error: `You access BTCPay Server over an unsecured network`.

You might see this error on the front page of your BTCPay Server since version `1.0.3.73`.

This is caused by a breaking change made in BTCPay to be able to handle different domain on the same server.

It happens because your BTCPay Server is not exposed directly on internet, instead a reverse proxy (like nginx or IIS) receive the request and forward it to BTCPay Server.

Sadly, depending on the configuration of your reverse proxy, either the HTTP HOST header has been replaced, or the reverse proxy did not forwarded the protocol at the front with the http header `X-Forwarded-Proto`.

If you use NGinx, here is what you need to have at the top level in `/etc/nginx/conf.d/default.conf`:

```
map $http_x_forwarded_proto $proxy_x_forwarded_proto {
  default $http_x_forwarded_proto;
  ''      $scheme;
}
proxy_set_header Host $http_host;
proxy_set_header X-Forwarded-Proto $proxy_x_forwarded_proto;

server_names_hash_bucket_size 128;
proxy_buffer_size          128k;
proxy_buffers              4 256k;
proxy_busy_buffers_size    256k;
http2_max_field_size       32k;
```

If your reverse proxy is Apache 2, you need to set those two settings

```
<VirtualHost *:443>
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPreserveHost on
...
</VirtualHost>
```
