# Reverse proxy to Tor

## Advantages

* no port forwarding needed on the LAN of the host
* encrypted connection
* hides the IP of the host

## Requirements

* a Virtual Private Server (VPS) - eg. a minimal package on Lunanode for ~3.5$/month
* root access on the VPS - you need to set up webserver and install packages

## Setup

You will create a nginx reverse proxy and a `socat` service, which forwards requests to your BTCPay Server.

### On the host server

Get the Tor `.onion` address of your BTCPay Server via the `Server settings > Services` page.
See information in the "HTTP-based TOR hidden services" section.

### On the VPS

Login as root and install the required dependencies: (example assumes a Debian based system)

```bash
# switch to root user (if not logged in as root)
sudo su -

# install dependencies
apt-get install -y nginx socat
```

#### Socat setup

Create the service file `/etc/systemd/system/http-to-socks-proxy@.service`:

```ini
[Unit]
Description=HTTP-to-SOCKS proxy
After=network.target

[Service]
EnvironmentFile=/etc/http-to-socks-proxy/%i.conf
ExecStart=/usr/bin/socat tcp4-LISTEN:${LOCAL_PORT},reuseaddr,fork,keepalive,bind=127.0.0.1 SOCKS4A:${PROXY_HOST}:${REMOTE_HOST}:${REMOTE_PORT},socksport=${PROXY_PORT}

[Install]
WantedBy=multi-user.target
```

Create the configuration for the service in `/etc/http-to-socks-proxy/btcpayserver.conf`:

```bash
# create the directory
mkdir -p /etc/http-to-socks-proxy/

# create the file with the content below
nano /etc/systemd/system/http-to-socks-proxy@.service
```

Replace the `REMOTE_HOST` and adapt the ports if needed:

```conf
PROXY_HOST=127.0.0.1
PROXY_PORT=9050
LOCAL_PORT=9081
REMOTE_HOST=heregoesthebtcpayserverhiddenserviceaddress.onion
REMOTE_PORT=80
```

Create a symlink in `/etc/systemd/system/multi-user.target.wants` to enable the service and start it:

```bash
# enable
ln -s /etc/systemd/system/http-to-socks-proxy\@.service /etc/systemd/system/multi-user.target.wants/http-to-socks-proxy\@btcpayserver.service

# start
systemctl start http-to-socks-proxy@btcpayserver

# check status
systemctl status http-to-socks-proxy@btcpayserver
```

#### Webserver configuration

Create a variable mapping to forward the correct protocol setting, e.g. `/etc/nginx/conf.d/map.conf`:

```nginx
map $http_x_forwarded_proto $proxy_x_forwarded_proto {
  default $http_x_forwarded_proto;
  ''      $scheme;
}
```

Create a config file for the domain, e.g. `/etc/nginx/sites-available/btcpayserver.conf`:

```nginx
server {
  listen 80;
  server_name mydomain.com;

  location / {
    return 301 https://$server_name$request_uri;
  }
}

server {
  listen 443 ssl http2;
  server_name mydomain.com;

  # SSL config goes here …

  location / {
    proxy_pass http://127.0.0.1:9081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $proxy_x_forwarded_proto;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

Enable it by creating a symlink and restart nginx:

```bash
ln -s /etc/nginx/sites-available/btcpayserver.conf /etc/nginx/sites-enabled/btcpayserver.conf

sudo systemctl restart nginx
```

Now, visiting `mydomain.com` should show your BTCPay Server instance.

## Resources

* [Nginx reverse proxy to .onion site in TOR network](https://itgala.xyz/nginx-reverse-proxy-to-onion-site-in-tor-network/)
* [How to make a nginx reverse proxy direct to tor hidden service](https://stackoverflow.com/questions/55487324/how-to-make-a-nginx-reverse-proxy-direct-to-tor-hidden-service)
