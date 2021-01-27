# BTCPay Deployment Frequently Asked Questions

This document covers the most common questions, errors, and issues you may encounter prior and during the installation of the software. For a detailed list of deployment methods and instructions for each, please see [Deployment page](../Deployment.md).

## General Deployment FAQ

Here are common questions about installation, regardless of the deployment method.

- [How much does it cost to run BTCPay Server?](#how-much-does-it-cost-to-run-btcpay-server)
- [What are the minimal requirements for BTCPay?](#what-are-the-minimal-requirements-for-btcpay)
- [What is the easiest method to deploy a self-hosted BTCPay Server?](#what-is-the-easiest-method-to-deploy-a-self-hosted-btcpay-server)
- [How to choose a proper deployment method?](#how-to-choose-a-proper-deployment-method)
- [Can I run BTCPay on my own hardware?](#can-i-run-btcpay-on-my-own-hardware)
- [Can I deploy BTCPay on my existing VPS?](#can-i-deploy-btcpay-on-my-existing-vps)
- [Are there free hosts where I can test?](#are-there-free-hosts-where-i-can-test)
- [After initial deployment, I can't register and I don't have a login yet?](#after-initial-deployment-i-cant-register-and-i-dont-have-a-login-yet)
- [How do I activate Tor on my BTCPay Server?](#how-do-i-activate-tor-on-my-btcpay-server)
- [How do I disable Tor on my BTCPay Server?](#how-do-i-disable-tor-on-my-btcpay-server)
- [Why activate Tor? Does it mean that nobody knows who I am?](#why-activate-tor-does-it-mean-that-nobody-knows-who-i-am)
- [How to access the .onion address without clearnet?](#how-to-access-the-onion-address-without-clearnet)
- [How can I modify or deactivate environment variables?](#how-can-i-modify-or-deactivate-environment-variables)
- [How can I run BTCPay on testnet?](#how-can-i-run-btcpay-on-testnet)
- [Can I start BTCPay only when I'm expecting a payment?](#can-i-start-btcpay-only-when-im-expecting-a-payment)
- [Can I connect to my BTCPay Bitcoin P2P on port 8333?](#can-i-connect-to-my-btcpay-bitcoin-p2p-on-port-8333)
- [How can I renew my SSL certificate?](#how-can-i-renew-my-ssl-certificate)
- [Can I use an existing Nginx server as a reverse proxy with SSL termination?](#can-i-use-an-existing-nginx-server-as-a-reverse-proxy-with-ssl-termination)


## Web Deployment FAQ

### Luna Node Web Deployment FAQ

* [How to change domain name on my LunaNode BTCPay?](#how-to-change-domain-name-on-my-lunanode-btcpay)

## Manual Deployment FAQ

* [How to manually install BTCPay on Ubuntu 18.04?](#how-to-manually-install-btcpay-on-ubuntu-1804)
* [How do I completely uninstall BTCPay from a linux environment (docker version)](#how-do-i-completely-uninstall-btcpay-from-a-linux-environment-docker-version)
* [How to deploy BTCPay Server alongside existing Bitcoin full node?](#how-to-deploy-btcpay-server-alongside-existing-bitcoin-node)
* [With the docker deployment, how to use a different volume for the data?](#with-the-docker-deployment-how-to-use-a-different-volume-for-the-data)
* [I get 503 Service Temporarily Unavailable nginx](#i-get-503-service-temporarily-unavailable-nginx)
  * [Cause 1: Trying to access my BTCPay by IP address](#cause-1-trying-to-access-my-btcpay-by-ip-address)
  * [Cause 2: btcpayserver or letsencrypt-nginx-proxy is not running](#cause-2-btcpayserver-or-letsencrypt-nginx-proxy-is-not-running)
  * [Cause 3: Error: BTCPay is expecting you to access this website from](#cause-3-btcpay-is-expecting-you-to-access-this-website-from)
  * [Cause 4: Getting 500 nginx error on a local server https and for http BTCPay is expecting you to access this website from](#cause-4-getting-500-nginx-error-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from)
  * [Cause 5: Other](#cause-5-other)

## General Deployment

### How much does it cost to run BTCPay Server?

BTCPay is a 100% free and open-source software. We do not charge you anything.
However, to run it, you should host it. You can run it as a self-hosted solution on your own local server, or use a cloud hosting provider, which is what a majority of users do. Advanced users can run BTCPay on [their own hardware](../HardwareDeployment.md). Less technical users can use [Hardware As A Service options](../HardwareAsAService.md). If you do not wish to host your own server, you can use a free [Third-Party Host](../ThirdPartyHosting.md). Visit our [Deployment Page](../Deployment.md) for more information on the various ways in which you can run BTCPay.

### What are the minimal requirements for BTCPay?

If you would like to run Bitcoin and Lightning Network nodes, the minimal requirements are :

* 2GB Ram
* 80 GB of storage [with enabled pruning](../Docker/README.md#generated-docker-compose)
* Docker

### What is the easiest method to deploy a self-hosted BTCPay Server?

For beginners, we strongly recommend the [web-deployment](../LunaNodeWebDeployment.md) if you want a self-hosted solution or a [third-party host](../ThirdPartyHosting.md).

If you're going to add more than one crypto coin, you need to expand the storage according to that coin(s) blockchain size.

### How to choose a proper deployment method?

Please see the [Deployment page](../Deployment.md) for comparison of different installation methods and choose the one that suits your needs and skill level the most.

### Can I run BTCPay on my own hardware?

Yes, you can. Check our the [Hardware Deployment page](../HardwareDeployment.md) for detailed instructions.

### Can I deploy BTCPay on my existing VPS?

Yes. BTCPay is not limited to the documented deployment methods. You can use whichever hosting solution you prefer, that fits the minimal requirements.

### Are there free hosts where I can test?

On a self-hosted BTCPay, an unlimited amount of users and stores can be attached. Some community users have open registration on their servers for others to use their BTCPay Server mainly for testing and learning. Most of them are community-driven and free. See the [third-party hosts documentation](../ThirdPartyHosting.md) for more information.

### After initial deployment, I can't register and I don't have a login yet?

When you deploy your BTCPay Server, you should first register a user (during server synchronization). This user is automatically the server admin. If your BTCPay only shows Login in the header menu, and you are unable to register the first user after initial deployment, someone else has registered on your server as the admin. Although this is unlikely to occur (the user would need to know and watch your BTCPay domain name), they had access to your ssh private keys, thus you should redeploy a new server for security reasons.

### How do I activate Tor on my BTCPay Server?

Tor is activated by default on the docker deployment.

### How do I disable Tor on my BTCPay Server?

That's really easy: just log in your instance with SSH, and enter as root the enter following commands:

```bash
BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;opt-add-tor"
. btcpay-setup.sh -i
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

Tor is a really tricky software to use for developers, as the slightest mistake can tear down the anonymity it provides. As BTCPay is evolving into a rather complex service and adding more and more plugins, even if we tried to route all this traffic through Tor, we couldn't guarantee that there would never be leaks of data in clear.

We think that the illusion of security is more dangerous that no security, or at least security we know is imperfect. So be aware that activating Tor doesn't prevent others to connect to your instance website, your bitcoin or lightning node in clear, **it doesn't make you anonymous at all.**

If you want to know more about the philosophy behind all this, you can read our [article on  Medium](https://medium.com/@BtcpayServer/about-tor-and-btcpay-server-2ec1e4bd5e51).

### How to access the .onion address without clearnet?

To see the .onion address of your BTCPay instance without accessing it through the clearnet and clicking the Tor logo in top left corner, apply the following command:

```bash
cat /var/lib/docker/volumes/generated_tor_servicesdir/_data/BTCPayServer/hostname
```

### How can I modify or deactivate environment variables?

In BTCPay, various options are activated through environment variables. You can modify or delete any of these options using command lines by exporting the new value with `export {environment variable}="{value}"` and then running `. ./btcpay-setup.sh -i` again.

For example, let's say I want to deactivate Tor for my BTCPay server:

```bash
# Login as root
sudo su -

# Go to the root/btcpayserver-docker directory
cd /root/btcpayserver-docker

# Print the complete list of options that you are running (for the sake of the demonstration, let's say that besides Tor you have pruning mode activated too)
echo $BTCPAYGEN_ADDITIONAL_FRAGMENTS
opt-save-storage-s;opt-add-tor

# Export the BTCPAYGEN_ADDITIONAL_FRAGMENTS variable without opt-add-tor
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-s"

# Run btcpay-setup.sh
. btcpay-setup.sh -i

exit
```

Similarly if you are adding an environment variable, the export command would instead look like this:
```bash
# Enable Tor in addition to your existing environment variables (such as pruning)
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-add-tor"
```

If you need to figure out which environment variable you need to modify, have a look at [this list](https://github.com/btcpayserver/btcpayserver-docker#environment-variables).

### How can I run BTCPay on testnet?

Building on the section above, this is how you configure BTCPay to use `testnet` instead of the default `mainnet`:

```bash
# Export the NBITCOIN_NETWORK variable switching to testnet
export NBITCOIN_NETWORK="testnet"

# Run btcpay-setup.sh for the change to take effect
. btcpay-setup.sh -i
```

If you just want to test things quickly without deploying everything yourself, have a look at the [Try It Out](../TryItOut.md) section.
It provides links and explanations for a BTCPay testnet instance hosted by us.

### Can I start BTCPay only when I'm expecting a payment?

No, you need to keep your BTCPay running at all times so that your Bitcoin node stays in sync with the blockchain to verify transactions. If you only start it up every now and then, it would take a long time to catch up on verifying recent blocks, and your payments would not show up until much later.

### Can I connect to my BTCPay Bitcoin P2P on port 8333?

BTCPay's Bitcoin core node is not exposed externally by default. For BTCPay purposes, it is typically not in the interest of the user, as it increases the bandwidth requirement. BTCPay is also whitebinding connections to this port, so opening it would expose the node to potential DDoS.

However, we expose a P2P connection to your full node on Tor. You can get the Tor address by running:

```bash
cat /var/lib/docker/volumes/generated_tor_servicesdir/_data/BTC-P2P/hostname
```

Or via the `Server Settings` of your BTCPay Server instance, logged as an administrator.

Please do not share this tor hidden service with untrusted parties. Connections to this hidden service are whitelisted by the bitcoin node, malicious peer would be able to DDoS your node.

If you need to unsafely expose bitcoind P2P port 8333 (for example if you require P2P for Bisq, DOJO, Esplora, etc.) and you are using a docker deployment, you can use the [opt-unsafe-expose](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose) additional fragment.

:::danger WARNING
ONLY USE ON TRUSTED LAN OR WITH FIREWALL RULES WHITELISTING SPECIFIC HOSTS
:::

### How can I renew my SSL certificate?

If your SSL certificate has expired for your BTCPay Server, you can manually renew it. For Docker deployments the easiest way to do this is to [restart the container](../Troubleshooting.md#1-3-restarting-a-service) named `letsencrypt-nginx-proxy-companion` on your server. 

### Can I use an existing Nginx server as a reverse proxy with SSL termination?

Yes you can! Just make sure to use the proper configuration.

Create an extra config file for your vhost in `/etc/nginx/sites-available/btcpayserver` and create a symlink for this file at `/etc/nginx/sites-enabled/btcpayserver`

The contents of this vhost file should look like this:

```nginx
server {
	listen 80;

	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;

	# Put your domain name here
	server_name btcpay.domain.com;

	# Needed for Let's Encrypt verification
	location ~ /.well-known {
		allow all;
	}

	# Force HTTP to HTTPS
	location / {
		return 301 https://$http_host$request_uri;
	}
}

server {
	listen 443 ssl http2;

	ssl on;

	# SSL certificate by Let's Encrypt in this Nginx (not using Let's Encyrpt that came with BTCPay Server Docker)
	ssl_certificate      /etc/letsencrypt/live/btcpay.domain.com/fullchain.pem;
	ssl_certificate_key  /etc/letsencrypt/live/btcpay.domain.com/privkey.pem;

	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;

	# Put your domain name here
	server_name btcpay.domain.com;

	# Route everything to the real BTCPay server
	location / {
		# URL of BTCPay Server (i.e. a Docker installation with REVERSEPROXY_HTTP_PORT set to 10080)
		proxy_pass http://127.0.0.1:10080;

		proxy_set_header Host $http_host;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

		# For websockets (used by Ledger hardware wallets)
		proxy_set_header Upgrade $http_upgrade;
	}

	# Needed for Let's Encrypt verification
	location ~ /.well-known {
		allow all;
	}
}

```

Also, put the following in your main Nginx config file at `/etc/nginx/nginx.conf`:

```nginx
http {

	# ... # Existing stuff

	# Needed to allow very long URLs to prevent issues while signing PSBTs
	server_names_hash_bucket_size 128;
	proxy_buffer_size          128k;
	proxy_buffers              4 256k;
	proxy_busy_buffers_size    256k;
	client_header_buffer_size 500k;
	large_client_header_buffers 4 500k;
	http2_max_field_size       500k;
	http2_max_header_size      500k;

	# Needed websocket support (used by Ledger hardware wallets)
	map $http_upgrade $connection_upgrade {
    	default upgrade;
    	''      close;
	}

}
```

Now test your Nginx config with `service nginx configtest` and reload the config with `service nginx reload`.

Then, you need to make sure that BTCPayServer does not try to handle HTTPS on its side, you can do this by disabling it on your BTCPayServer instance.

```bash
BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;nginx-https"
. btcpay-setup.sh -i
```

Notice: If your BTCPay Server install has more than one domain (for example `WOOCOMMERCE_HOST` or `BTCPAY_ADDITIONAL_HOSTS`) you will need to modify your config for each domain name. The example above only covers 1 domain name called `btcpay.domain.com`.

## Web-deployment

Here you can find common questions and solutions to BTCPay web-deployments.

### Can I run BTCPay on my home computer?

Similar to the requirements for hosting a website, a web server is required for a BTCPay Server instance. While it is possible to run BTCPay Server locally on your PC, it would have to meet the minimal requirements and also run 24/7 if you don't want interruptions of service. You might also not want to expose your home IP address for the activity related to BTCPay Server payments. For all these reasons, while local hosting is suitable for testing, it's not a viable solution for production. A Virtual Private Server (VPS) is commonly used to address these problems.

### LunaNode web-deployment

#### How to change domain name on my LunaNode BTCPay?

1. In your LunaNode dashboard, click on Virtual Machines > Your Virtual Machine > General Tab > External IP. Copy the external IP.
2. Go to your DNS provider and create an A record. Paste the external IP.
3. Go to Server Settings > Maintenance > Change Domain. Paste yourdomain.com without http or https prefix.

Additional documentation can be found on [domain change page](../ChangeDomain.md).

## Manual Deployment

#### How to manually install BTCPay on Ubuntu 18.04?

Check this [community guide](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install).

### How do I completely uninstall BTCPay from a linux environment (docker version)

1. Shutdown BTCPay Server (after you ensure you have required backups etc) with `btcpay-down.sh` and cleanup the install with `btcpay-clean.sh`.
2. Change to your Base install directory `cd "$(dirname "$BTCPAY_ENV_FILE")"`
3. Delete all volumes in /var/lib/docker/volumes/ with `docker-compose -f $BTCPAY_DOCKER_COMPOSE down --v`
4. Remove other BTCPay system files with this: `rm /etc/systemd/system/btcpayserver.service && rm /etc/profile.d/btcpay-env.sh`
5. Go into /usr/local/bin and remove all of the symlinks that BTCPay put in there.  At the time of writing these were:
```
bitcoin-cli.sh -> /root/BTCPayServer/btcpayserver-docker/bitcoin-cli.sh
bitcoin-lncli.sh -> /root/BTCPayServer/btcpayserver-docker/bitcoin-lncli.sh
btcpay-admin.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-admin.sh
btcpay-clean.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-clean.sh
btcpay-down.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-down.sh
btcpay-restart.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-restart.sh
btcpay-setup.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-setup.sh
btcpay-up.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-up.sh
btcpay-update.sh -> /root/BTCPayServer/btcpayserver-docker/btcpay-update.sh
changedomain.sh -> /root/BTCPayServer/btcpayserver-docker/changedomain.sh
```
6. Remove your BTCPay installation folder with `rm -r "$(dirname "$BTCPAY_ENV_FILE")"`
7. Just to make sure, run `docker system prune` after a reboot to get rid of any other docker related artifacts.

### How to deploy BTCPay Server alongside existing Bitcoin node?

The instructions below are valid for Docker deployments:

* Run setup as described in [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker#full-installation-for-technical-users) up until `. ./btcpay-setup.sh -i`
* Create `bitcoin.custom.yml` in the `docker-compose-generator/docker-fragments/` folder.

```yml
version: "3"

services:
  btcpayserver:
      environment:
        BTCPAY_CHAINS: "btc"
        BTCPAY_BTCEXPLORERURL: http://nbxplorer:32838/
  nbxplorer:
      environment:
        NBXPLORER_CHAINS: "btc"
        NBXPLORER_BTCRPCURL: http://host.docker.internal:43782/
        NBXPLORER_BTCRPCUSER: "rpc-username"
        NBXPLORER_BTCRPCPASSWORD: "rpc-password"
        NBXPLORER_BTCNODEENDPOINT: host.docker.internal:39388
      volumes:
        - "localBitcoinfolder:/root/.bitcoin"
```

* Replace: `43782` with your bitcoin node's configured RPC port
* Replace: `rpc-username` with your bitcoin node's configured RPC username
* Replace: `rpc-password` with your bitcoin node's configured RPC password
* Replace: `39388` with your bitcoin node's configured p2p port
* Replace `localBitcoinfolder` with the path to your bitcoin data folder

If you are running on linux, due to [a limitation of docker](https://github.com/docker/for-linux/issues/264), you will also need to do the following:

* Run `ip route | grep docker0 | awk '{print $9}'`
  * Add the following at the end of the `bitcoin.custom.yml` file, replacing `$DOCKER_HOST_IP` with the result of the previous command.

```yml
      extra_hosts:
        - "host.docker.internal:$DOCKER_HOST_IP"
```

* Run `BTCPAYGEN_EXCLUDE_FRAGMENTS="bitcoin"`
* Run `BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS"`
* Run `. ./btcpay-setup.sh -i`

If you are looking for how to deploy alongside existing Lightning node [see this](./FAQ-LightningNetwork.md#can-i-use-my-existing-ln-node-with-btcpay).

### With the docker deployment, how to use a different volume for the data?

First, you need to make sure that btcpayserver and docker is not running

```bash
sudo su -
btcpay-down.sh
systemctl stop docker
```

Now, you need to format your drive. If you have already done it, you can skip this step.

```bash
# Step 1: Unplug the drive
lsblk

# Step 2: Plug the drive
lsblk
```

The second `lsblk` should show the drive you just plugged in. (of TYPE `disk`)
Make sure you don't make a mistake as the next command will erase all data on this disk.

For the sake of the example, let's suppose it has the NAME `/dev/sdd`.

```bash
# Save the name in a variable
DEVICE_NAME="/dev/sdd"
# Set the partition name
PARTITION_NAME="/dev/sdd1"
```

Now we can partition the disk and format the partition:
```bash
echo "Partitioning the external drive $DEVICE_NAME..."
### DANGER ZONE ###
(
	echo o # Create a new empty DOS partition table
	echo n # Add a new partition
	echo p # Primary partition
	echo 1 # Partition number
	echo   # First sector (Accept default: 1)
	echo   # Last sector (Accept default: varies)
	echo w # Write changes
) | fdisk ${DEVICE_NAME}
partprobe ${DEVICE_NAME}
while ! lsblk $PARTITION_NAME &> /dev/null; do
	sleep 1
done
mkfs.ext4 -F "$PARTITION_NAME"
```

Then we need to mount the partition on the linux filesystem.

```bash
# Mounting the partition
MOUNT_DIR="/mnt/external"
mkdir "$MOUNT_DIR"
mount -o defaults,noatime "$PARTITION_NAME" "$MOUNT_DIR"

# Make sure the partition exists at the next reboot, we use UUID in case
# the partition name is different in the next reboot
if ! grep -qF "$MOUNT_DIR" /etc/fstab; then
	UUID="$(sudo blkid -s UUID -o value $PARTITION_NAME)"
	echo "UUID=$UUID $MOUNT_DIR ext4 defaults,noatime,nofail 0 2" >> /etc/fstab
fi
```

Then, we need to make sure that docker not start before the mount.

```bash
MOUNT_UNIT="$(systemd-escape --path "$MOUNT_DIR").mount"
docker_service="/lib/systemd/system/docker.service"
if ! grep -qF "After=$MOUNT_UNIT" "$docker_service"; then
	sed -i "s/After=/After=$MOUNT_UNIT /g" "$docker_service"
fi
```

Now, imagine you want to put all the docker volume data on the previous partition

```bash
DOCKER_VOLUMES="/var/lib/docker/volumes"
# Copy all the data from our volume to the mount directory (this can take a while)
cp -a -r "$DOCKER_VOLUMES/." "$MOUNT_DIR"
# Make the folder a mountpoint
rm -rf "$DOCKER_VOLUMES"
mkdir -p "$DOCKER_VOLUMES"
mount --bind "$MOUNT_DIR" "$DOCKER_VOLUMES"
# Make sure the mountpoint is mounted after reboot
if ! grep -qF "$DOCKER_VOLUMES" /etc/fstab; then
	echo "$MOUNT_DIR $DOCKER_VOLUMES none bind,nobootwait 0 2" >> /etc/fstab
fi
```

Now restart docker and btcpayserver

```bash
systemctl start docker
btcpay-up.sh
```

Note: We use mount bind instead of symbolic link because docker would complain when running `docker volume rm`.

### I get 503 Service Temporarily Unavailable nginx

#### Cause 1: Trying to access my BTCPay by IP address

Your nginx config is set to route the HTTP request to a particular container based on the domain name of the request. For example, the official [deployment on pi 4](../RPi4.md) was to setup the souce domain name to http://raspberrypi.local/ yet getting automatic local domain raspberrypi.local does not always work. You are probably in this situation and trying to type the IP address of your BTCPay into the web-browser.

Since nginx gets the IP address in the request instead of raspberrypi.local it does not know where to route that request and returns:
```
503 Service Temporarily Unavailable
-----------------------------------
nginx
```

You can fix this by forcing nginx to route the HTTP request to BTCPay even if the request domain name is not recognized.
Simply, re-run the setup script like this:

```bash
sudo su -

REVERSEPROXY_DEFAULT_HOST="$BTCPAY_HOST" && . btcpay-setup.sh -i
```

Now putting local IP in the web-browser works.

#### Cause 2: btcpayserver or letsencrypt-nginx-proxy is not running

To check, run:

```bash
sudo  docker ps | less -S
```

Press "q" to quit out of less.

The output should contain:
* btcpayserver/letsencrypt-nginx-proxy-companion
* btcpayserver/btcpayserver

And the status should be "Up"

If the docker container is not running, then check the reason for crash like this:

```bash
 sudo  docker logs 6a6b9fd75692 --tail 20
```

Where 6a6b9fd75692 is the container ID that is having issues.

#### Cause 3: BTCPay is expecting you to access this website from

You might also see the following error: `You access BTCPay Server over an unsecured network`.

You might see this error on the front page of your BTCPay Server since version `1.0.3.73`.

This is caused by a breaking change made in BTCPay to be able to handle different domain on the same server.

It happens because your BTCPay Server is not exposed directly on internet, instead a reverse proxy (like nginx or IIS) receive the request and forward it to BTCPay Server.

Sadly, depending on the configuration of your reverse proxy, either the HTTP HOST header has been replaced, or the reverse proxy did not forwarded the protocol at the front with the http header `X-Forwarded-Proto`.

If you use NGinx, here is what you need to have at the top level in `/etc/nginx/conf.d/default.conf`:

```nginx
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
client_header_buffer_size 500k;
large_client_header_buffers 4 500k;
http2_max_field_size       500k;
http2_max_header_size      500k;
```

If your reverse proxy is Apache 2, you need to set those two settings

```
<VirtualHost *:443>
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPreserveHost on
...
</VirtualHost>
```

You will also need those settings in the `apache2.conf` to prevent issues while signing PSBTs.

```
LimitRequestLine 500000
LimitRequestFieldSize 500000
```

#### Cause 4: Getting 500 nginx error on a local server https and for http BTCPay is expecting you to access this website from

You need to open port 80 and 443. Once you did that, restart docker `btcpay-restart.sh`

#### Cause 5: Other

There could be many causes for 5XX HTTP errors. Please create an [Issue](https://github.com/btcpayserver/btcpayserver-docker/issues) and when cause becomes known add it here in the [Deployment FAQ](FAQ-Deployment.md) doc.
