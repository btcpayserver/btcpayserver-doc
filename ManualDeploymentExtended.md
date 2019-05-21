# Extended Manual Setup

This document lists steps for manually deploying BTCPay Server and additional related components. Following these steps is likely to take a long time. A shorter and more pragmatic approach is to use a [docker based deployment](https://github.com/btcpayserver/btcpayserver-docker).

#### Warning: Not recommended for production use

Manual installation is NOT recommended for production use unless you are very confident with your Operating System and Bitcoin security expertise. If you are unsure use [docker](https://github.com/btcpayserver/btcpayserver-docker).

## Installation Steps Overview

The instructions in this document were tested on Ubuntu 18.04. They should be applicable to other Linux based distributions. The instructions are also based on all components running on the same instance. It's possible to split the components across different instances but that is not covered.

### Prerequisites:

1) Postgresql,
2) Tor,
3) NGINX.

### Application Components

1) Bitcoin-core Daemon,
2) NBXplorer,
3) BTCPay Server,
4) Lightning Network Daemon (lnd),
5) Ride The Lightning (RTL).

### Services

1) Let's Encrypt.

## Postgresql

Postgresql is used by BTCPay Server. If you're happy using the default of an SQLite to store your BTCPay Server settings then you do not need to install Postgresql.

##### :truck: Install

```bash
~$ sudo apt install postgresql postgresql-contrib
```

##### :thumbsup: Check

```bash
~$ psql --version
psql (PostgreSQL) 10.8 (Ubuntu 10.8-0ubuntu0.18.04.1)
~$ sudo systemctl status postgresql
~$ sudo -u postgres psql
psql (10.8 (Ubuntu 10.8-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# \q
```

##### :black_nib: Configuration

See BTCPay Server Configuration.

## Tor

Tor is optional. It can be used by the following components to provide enhanced privacy and/or help with NAT traversal:

- Bitcoin-core Daemon
- Lightning Network Daemon (lnd).

##### :truck: Install

```bash
~$ sudo apt install apt-transport-https
~$ sudo vi /etc/apt/sources.list # (and append two lines below)
deb https://deb.torproject.org/torproject.org bionic main
deb-src https://deb.torproject.org/torproject.org bionic main
~$ curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
~$ gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -
~$ sudo apt update
~$ sudo apt install tor deb.torproject.org-keyring
```
##### :black_nib: Configuration
```bash
~$ sudo vi /etc/tor/torrc  # (and uncomment two lines below)
ControlPort 9051
CookieAuthentication 1
~$ sudo systemctl restart tor
```

##### :thumbsup: Check
```bash
~$ netstat -tlnp # (lines below correspond to the tor control port and SOCKS proxy)
tcp        0      0 127.0.0.1:9050          0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:9051          0.0.0.0:*               LISTEN      -
```
## NGINX

NGINX is used as a web server to manage traffic to the BTCPay Server and Ride The Lightning components. It is also optional but if you do not already have a TLS certificate to use with BTCPay Server then NGINX solves the problem via the Let's Encrypt free and automated TLS certificate service.

##### :truck: Install

```bash
~$ sudo apt update
~$ sudo apt-get install nginx
~$ sudo systemctl enable nginx
~$ sudo systemctl start nginx
```

##### :thumbsup: Check

```bash
~$ sudo nginx -v
 nginx version: nginx/1.14.0 (Ubuntu)
```

##### :black_nib: Configuration

See BTCPay Server Configuration.
