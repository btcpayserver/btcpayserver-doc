# Proksi ya nyuma kuelekea Tor

## Faida

- hakuna haja ya kuelekeza bandari kwenye LAN ya mwenyeji
- muunganisho uliosimbwa kwa njia fiche
- huficha IP ya mwenyeji

## Mahitaji

- Seva ya Kibinafsi ya Mtandaoni (VPS) - mfano. kifurushi cha msingi kwenye Lunanode kwa ~$3.5/mwezi
- ufikiaji wa mizizi kwenye VPS - unahitaji kusanidi seva ya wavuti na kusakinisha vifurushi
- kikoa au kikoa kidogo - hiki kitasanidiwa kwenye seva ya wavuti ya proksi

Pata anwani ya `.onion` ya Tor ya BTCPay Server yako kupitia ukurasa wa `Mipangilio ya seva > Huduma`.
Angalia maelezo katika sehemu ya "HTTP-based TOR hidden services".

Kumbuka: Pia kuna [toleo la Docker](#fanya-yote-haya-katika-kontena-la-docker) la usanidi huu.

## Usanidi wa VPS

Utaunda proksi ya nyuma ya nginx na huduma ya `socat`, ambayo inaelekeza maombi kwenye BTCPay Server yako.

Ingia kama mizizi na usakinishe vitegemezi vinavyohitajika: (mfano unadhani mfumo wa msingi wa Debian)

```bash
# badilisha hadi mtumiaji wa mizizi (ikiwa haujaingia kama mizizi)
sudo su -

# sakinisha vitegemezi
apt update
apt install -y certbot nginx socat tor
```

### Usanidi wa Socat

Unda faili ya huduma `/etc/systemd/system/http-to-socks-proxy@.service`:

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

Unda usanidi wa huduma katika `/etc/http-to-socks-proxy/btcpayserver.conf`:

```bash
# unda saraka
mkdir -p /etc/http-to-socks-proxy/

# unda faili yenye maudhui hapa chini
nano /etc/http-to-socks-proxy/btcpayserver.conf
```

Badilisha `REMOTE_HOST` na urekebishe bandari ikiwa inahitajika:

```conf
PROXY_HOST=127.0.0.1
PROXY_PORT=9050
LOCAL_PORT=9081
REMOTE_HOST=heregoesthebtcpayserverhiddenserviceaddress.onion
REMOTE_PORT=80
```

Unda kiungo cha ishara katika `/etc/systemd/system/multi-user.target.wants` ili kuwezesha huduma na uianzishe:

```bash
# wezesha
ln -s /etc/systemd/system/http-to-socks-proxy\@.service /etc/systemd/system/multi-user.target.wants/http-to-socks-proxy\@btcpayserver.service

# anzisha
systemctl start http-to-socks-proxy@btcpayserver

# angalia hali ya huduma
systemctl status http-to-socks-proxy@btcpayserver

# angalia ikiwa njia ya siri inafanya kazi
netstat -tulpn | grep socat
# inapaswa kutoa kitu kama hiki:
# tcp        0      0 127.0.0.1:9081          0.0.0.0:*               LISTEN      951/socat
```

### Usanidi wa seva ya wavuti

#### Elekeza kikoa kwenye VPS

Unda rekodi ya A kwenye seva ya DNS ya kikoa/kikoa kidogo chako na uielekeze kwenye anwani yako ya IP ya VPS.

#### Andaa SSL na Let's Encrypt

```bash
# zalisha vigezo vya DH vya biti 4096 ili kuimarisha usalama, inaweza kuchukua muda
openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096

# unda saraka kwa faili za Let's Encrypt
mkdir -p /var/lib/letsencrypt/.well-known
chgrp www-data /var/lib/letsencrypt
chmod g+s /var/lib/letsencrypt
```

#### usanidi wa nginx: http

Unda ramani ya kigezo cha kutuma mbele mpangilio sahihi wa itifaki na angalia ikiwa kichwa cha Upgrade kimetumwa na mteja, mfano `/etc/nginx/conf.d/map.conf`:

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

Unda faili ya usanidi kwa kikoa, mfano `/etc/nginx/sites-available/btcpayserver.conf`:

```nginx
server {
  listen 80;
  server_name btcpayserver.mydomain.com;

  # Maombi ya uthibitishaji ya Let's Encrypt
  location ^~ /.well-known/acme-challenge/ {
    allow all;
    root /var/lib/letsencrypt/;
    default_type "text/plain";
    try_files $uri =404;
  }

  # Elekeza kila kitu kingine kwenye https
  location / {
    return 301 https://$server_name$request_uri;
  }
}
```

Tutasanidi sehemu ya seva ya https katika faili hiyo hiyo ya usanidi mara tu tutakapopata cheti cha SSL.

Wezesha usanidi wa seva ya wavuti kwa kuunda kiungo cha ishara na kuanzisha upya nginx:

```bash
ln -s /etc/nginx/sites-available/btcpayserver.conf /etc/nginx/sites-enabled/btcpayserver.conf

systemctl restart nginx
```

#### Pata cheti cha SSL kupitia Let's Encrypt

Endesha amri ifuatayo na vigezo vya barua pepe na kikoa vilivyorekebishwa:

```bash
certbot certonly --agree-tos --email admin@mydomain.com --webroot -w /var/lib/letsencrypt/ -d btcpayserver.mydomain.com
```

#### usanidi wa nginx: https

Sasa kwa kuwa tuna cheti halali cha SSL, ongeza sehemu ya seva ya https mwishoni mwa `/etc/nginx/sites-available/btcpayserver.conf`:

```nginx
server {
  listen 443 ssl http2;
  server_name btcpayserver.mydomain.com;

  # Mipangilio ya SSL
  ssl_stapling on;
  ssl_stapling_verify on;

  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;

  # Sasisha hii kwa njia ya faili zako za cheti
  ssl_certificate /etc/letsencrypt/live/btcpayserver.mydomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/btcpayserver.mydomain.com/privkey.pem;

  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers off;

  resolver 8.8.8.8 8.8.4.4 valid=300s;
  resolver_timeout 30s;

  add_header Strict-Transport-Security "max-age=63072000" always;
  add_header Content-Security-Policy "frame-ancestors 'self';";
  add_header X-Content-Type-Options nosniff;

  # Maombi ya proksi kwenye huduma ya socat
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

Anzisha upya nginx kwa mara nyingine:

```bash
systemctl restart nginx
```

Sasa, kutembelea `btcpayserver.mydomain.com` kunapaswa kuonyesha mfano wako wa BTCPay Server.

:::tip
Ikiwa unaona hitilafu ya nginx ya "503 Service Temporarily Unavailable" au sawa na hiyo lakini BTCPay Server yako inafikiwa vinginevyo, unahitaji kuifanya BTCPay Server ifahamishwe kuhusu kikoa chako kipya. Unaweza kufanya hivyo kwa kutumia vigezo vya mazingira (usanidi wa msingi wa Docker), ingia kwenye BTCPay Server yako kupitia SSH:

```bash
sudo su -
cd $BTCPAY_BASE_DIRECTORY/btcpayserver-docker/
export BTCPAY_ADDITIONAL_HOSTS="btcpayserver.mydomain.com"
. ./btcpay-setup.sh -i
```

:::

## Fanya yote haya katika kontena la Docker

[Picha ya Docker](https://hub.docker.com/r/cloudgenius/socator) iliyotengenezwa tayari ([Msimbo](https://github.com/beacloudgenius/socator))

### SocaTor = SOCAT + TOR

Kulingana na [Docker-Socator](https://github.com/Arno0x/Docker-Socator)

Inatumia socat kusikiliza kwenye bandari fulani ya TCP (5000 katika mfano huu) na kuelekeza trafiki inayoingia kwenye huduma iliyofichwa ya Tor iliyobainishwa kupitia vigezo vya mazingira.
Inafanya kazi kama kipelelezi kati ya wavuti ya kawaida na huduma iliyofichwa kwenye mtandao wa Tor.
Kwa hiari unaweza kuzuia anwani za IP zinazoruhusiwa kuunganisha kwenye huduma hii kwa kubainisha kigezo cha `ALLOWED_RANGE` na kutumia nukuu ya CIDR.

Tafadhali kumbuka:

Kontena hili halina sehemu yoyote ya nginx kwa sababu Kubernetes hutoa hiyo.

### Matumizi

Jikomboe na vikwazo vya watoa huduma za wingu, linda na ulinde nodi yako kamili ya Bitcoin, unganisha hiyo na seva ya BTC Pay, yote nyuma ya TOR.
Weka wazi lango la malipo la BTCPay Server na API kwenye clearnet kwa kutumia socat+tor inayoendesha kwenye Mtandao.

---

#### Jenga

```sh
docker build -t cloudgenius/socator .
```

#### Sukuma

```sh
docker push cloudgenius/socator
```

#### Anzisha picha chinichini (_hali ya daemon_) na kizuizi cha anwani ya IP

```sh
docker run -d \
        -p 5000:5000 \
        -e "ALLOWED_RANGE=192.168.1.0/24" \
        -e "TOR_SITE=zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion" \
        -e "TOR_SITE_PORT=80" \
        --name socator \
        cloudgenius/socator
```

#### Anzisha picha mbele ya uso

```sh
docker run --rm -ti \
        -p 5000:5000 \
        -e "TOR_SITE=zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion" \
        -e "TOR_SITE_PORT=80" \
        --name socator \
        cloudgenius/socator
```

Sasa `http://localhost:5000` inapaswa kukuonyesha huduma iliyofichwa ya tor uliyobainisha katika amri hapo juu.

## Tumia kontena hilo la Docker katika Nguzo ya Kubernetes kwa kutumia maelezo haya

Maelezo haya yanadhani nguzo ya kawaida ya Kubernetes inayoweka wazi huduma za ndani (kama socator inayoendesha ndani kwenye bandari 5000) kwenye clearnet/mtandao wa umma kupitia [Nginx Ingress](https://github.com/kubernetes/ingress-nginx) na kutoa vyeti vya Let's Encrypt TLS/SSL vya kiotomatiki kupitia [cert-manager](https://github.com/jetstack/cert-manager).

Maelezo ya Usambazaji

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
              value: 'zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion' # Anwani ya Tor ya BTCPay Server => docker exec tor cat /var/lib/tor/app-btcpay-server/hostname
            - name: TOR_SITE_PORT
              value: '80'
```

Maelezo ya Huduma

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

Maelezo ya Ingress

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

## Rasilimali

- [nginx reverse proxy to .onion site in Tor network](https://itgala.xyz/nginx-reverse-proxy-to-onion-site-in-tor-network/)
- [Tor-to-IP tunnel service](https://github.com/openoms/bitcoin-tutorials/blob/master/tor2ip_tunnel.md)
- [How to make a nginx reverse proxy direct to tor hidden service](https://stackoverflow.com/questions/55487324/how-to-make-a-nginx-reverse-proxy-direct-to-tor-hidden-service)
- [Secure Nginx with Let's Encrypt on Debian 10 Linux](https://linuxize.com/post/secure-nginx-with-let-s-encrypt-on-debian-10/)
- [Nginx WebSocket proxying](http://nginx.org/en/docs/http/websocket.html)
