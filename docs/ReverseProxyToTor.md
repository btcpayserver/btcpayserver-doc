# Reverse proxy to Tor

## Advantages

* no port forwarding needed on the LAN of the host
* encrypted connection
* hides the IP of the host

## Requirements

* a Virtual Private Server (VPS) - eg. a minimal package on Lunanode for ~3.5$/month
* root access on the VPS - you need to set up webserver and install packages
* a domain or subdomain - this will be setup on the proxy webserver

Get the Tor `.onion` address of your BTCPay Server via the `Server settings > Services` page.
See information in the "HTTP-based TOR hidden services" section.

Note: There is also a [Docker version](#do-all-this-in-a-docker-container) of this setup.

## VPS Setup

You will create a nginx reverse proxy and a `socat` service, which forwards requests to your BTCPay Server.

Login as root and install the required dependencies: (example assumes a Debian based system)

```bash
# switch to root user (if not logged in as root)
sudo su -

# install dependencies
apt update
apt install -y certbot nginx socat tor
```

### Socat setup

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
nano /etc/http-to-socks-proxy/btcpayserver.conf
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

# check service status
systemctl status http-to-socks-proxy@btcpayserver

# check if tunnel is active
netstat -tulpn | grep socat
# should give something like this:
# tcp        0      0 127.0.0.1:9081          0.0.0.0:*               LISTEN      951/socat
```

### Webserver setup

#### Point domain to the VPS

Create the A record on the DNS server of your domain/subdomain and point it to your VPS IP address.

#### Prepare SSL and Let's Encrypt

```bash
# generate 4096 bit DH params to strengthen the security, may take a while
openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096

# create directory for Let's Encrypt files
mkdir -p /var/lib/letsencrypt/.well-known
chgrp www-data /var/lib/letsencrypt
chmod g+s /var/lib/letsencrypt
```

#### nginx configuration: http

Create a variable mapping to forward the correct protocol setting and check if the Upgrade header is sent by the client, e.g. `/etc/nginx/conf.d/map.conf`:

```nginx
map $http_x_forwarded_proto $proxy_x_forwarded_proto {
  default $http_x_forwarded_proto;
  ''      $scheme;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}
```

Create a config file for the domain, e.g. `/etc/nginx/sites-available/btcpayserver.conf`:

```nginx
server {
  listen 80;
  server_name mydomain.com;

  # Let's Encrypt verification requests
  location ^~ /.well-known/acme-challenge/ {
    allow all;
    root /var/lib/letsencrypt/;
    default_type "text/plain";
    try_files $uri =404;
  }

  # Redirect everything else to https
  location / {
    return 301 https://$server_name$request_uri;
  }
}
```

We will configure the https server part in the same config file once we obtained the SSL certificate.

Enable the web server config by creating a symlink and restarting nginx:

```bash
ln -s /etc/nginx/sites-available/btcpayserver.conf /etc/nginx/sites-enabled/btcpayserver.conf

systemctl restart nginx
```

#### Obtain SSL certificate via Let's Encrypt

Run the following command with adapted email and domain parameters:

```bash
certbot certonly --agree-tos --email admin@mydomain.com --webroot -w /var/lib/letsencrypt/ -d mydomain.com
```

#### nginx configuration: https

Now that we have a valid SSL certificate, add the https server part at the end of `/etc/nginx/sites-available/btcpayserver.conf`:

```nginx
server {
  listen 443 ssl http2;
  server_name mydomain.com;

  # SSL settings
  ssl on;
  ssl_stapling on;
  ssl_stapling_verify on;

  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;

  # Update this with the path of your certificate files
  ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers off;

  resolver 8.8.8.8 8.8.4.4 valid=300s;
  resolver_timeout 30s;

  add_header Strict-Transport-Security "max-age=63072000" always;
  add_header Content-Security-Policy "frame-ancestors 'self';";
  add_header X-Content-Type-Options nosniff;

  # Proxy requests to the socat service
  location / {
    proxy_pass http://127.0.0.1:9081/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $proxy_x_forwarded_proto;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```

Restart nginx once more:

```bash
systemctl restart nginx
```

Now, visiting `mydomain.com` should show your BTCPay Server instance.


## Do all this in a Docker container

Ready made [Docker image](https://hub.docker.com/r/cloudgenius/socator) ([Code](https://github.com/beacloudgenius/socator))

### SocaTor = SOCAT + TOR
Based on [Docker-Socator](https://github.com/Arno0x/Docker-Socator)

It uses socat to listen on a given TCP port (5000 in this example) and to redirect incoming traffic to a Tor hidden service specified through environment variables. It acts as a relay between the standard web and a hidden service on the Tor network. You can optionally restrict the IP addresses that are allowed to connect to this service by specifying an `ALLOWED_RANGE` environment variable and using CIDR notation.

Please note: 

This container does not have any nginx component because Kubernetes provides for it. 
### Usage

Break free from cloud services providers limitations, secure and protect your bitcoin full node, connect that with a BTC Pay server, all behind TOR.
Selectively expose the BTCPay Server payment gateway and API to clearnet using socat+tor running on the Internet.

--------------

##### build

```sh
docker build -t cloudgenius/socator .
```

##### push

```sh
docker push cloudgenius/socator
```

##### Start the image in background (*daemon mode*) with IP address restriction:

```sh
docker run -d \
        -p 5000:5000 \
        -e "ALLOWED_RANGE=192.168.1.0/24" \
        -e "TOR_SITE=zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion" \
        -e "TOR_SITE_PORT=80" \
        --name socator \
        cloudgenius/socator
```

##### Start the image in foreground:

```sh
docker run --rm -ti \
        -p 5000:5000 \
        -e "TOR_SITE=zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion" \
        -e "TOR_SITE_PORT=80" \
        --name socator \
        cloudgenius/socator
```

Now http://localhost:5000 should show you the tor hidden service you specified in the above command.

## Use that Docker container in a Kubernetes Cluster using these manifests

These manifest assumes a typical Kubernetes cluster that exposes internal services (like socator running internallly at port 5000) to the clearnet/public internet via Nginx Ingress https://github.com/kubernetes/ingress-nginx and provide automated Let's Encrypt TLS/SSL certificates via https://github.com/jetstack/cert-manager. 

Deployment manifest

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: socator
spec:
  replicas: 1
  selector:
    matchLabels:
      role: socator
  template:
    metadata:
      labels:
        role: socator
    spec:
      containers:
      - image: cloudgenius/socator # code https://github.com/beacloudgenius/socator
        imagePullPolicy: IfNotPresent
        name: socator
        env:
          - name: TOR_SITE
            value: "zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion" # BTCPay Server Tor address => docker exec tor cat /var/lib/tor/app-btcpay-server/hostname
          - name: TOR_SITE_PORT
            value: "80"
```

Service manifest

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: socator
spec:
  ports:
    - name: http
      port: 5000
  selector:
    role: socator
```

Ingress manifest

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: socator
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  rules:
    - host: btcpayserver.mydomain.com
      http:
        paths:
          - backend:
              service:
                name: socator
                port:
                  number: 5000
            path: /
            pathType: Prefix
  tls:
    - hosts:
        - btcpayserver.mydomain.com
      secretName: socator-tls

```

## Resources

* [nginx reverse proxy to .onion site in Tor network](https://itgala.xyz/nginx-reverse-proxy-to-onion-site-in-tor-network/)
* [Tor-to-IP tunnel service](https://github.com/openoms/bitcoin-tutorials/blob/master/tor2ip_tunnel.md)
* [How to make a nginx reverse proxy direct to tor hidden service](https://stackoverflow.com/questions/55487324/how-to-make-a-nginx-reverse-proxy-direct-to-tor-hidden-service)
* [Secure Nginx with Let's Encrypt on Debian 10 Linux](https://linuxize.com/post/secure-nginx-with-let-s-encrypt-on-debian-10/)
* [Nginx WebSocket proxying](http://nginx.org/en/docs/http/websocket.html)
