# Extended Manual Setup

This document lists steps for manually deploying BTCPay Server and additional related components. Following these steps is likely to take a long time. A shorter and more pragmatic approach is to use a [docker based deployment](https://github.com/btcpayserver/btcpayserver-docker).

#### Warning: Not recommended for production use

Manual installation is NOT recommended for production use unless you are very confident with your Operating System and Bitcoin security expertise. If you are unsure use [docker](https://github.com/btcpayserver/btcpayserver-docker).

## Installation Steps Overview

The instructions in this document were tested on Ubuntu 18.04. They should be applicable to other Linux based distributions. These instructions are based on all components executing on the same single instance. It's possible to split things up any way you wish but these instructions don't describe that.

### Prerequisites:

1. Postgresql,
2. Tor,
3. NGINX.
4. Let's Encrypt.

### Application Components

1. Bitcoin Daemon*,
2. NBXplorer*,
3. BTCPay Server*,
4. Lightning Network Daemon (lnd),
5. Ride The Lightning (RTL).

\* The bare minimum install of a BTCPay server only requires the starred items. Using a bare minimum configuration reduces the functionality: no lightning payments, no auto-renewal of TLS certificates, less reliable data store, less capable of handling NAT and more.

## Postgresql

Postgresql can be used by BTCPay Server in place of the default SQLite file based storage.

##### :truck: Install

```bash
~$ sudo apt install postgresql postgresql-contrib
```
##### :black_nib: Configuration

Covered in BTCPay Server Configuration.

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

## Tor

Tor can be used by the following components to provide enhanced privacy and/or help with NAT traversal:
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
Covered further in Bitcoin and Lightning Network Daemon Configurations.

##### :thumbsup: Check
```bash
~$ netstat -tlnp # (lines below correspond to the tor control port and SOCKS proxy)
tcp        0      0 127.0.0.1:9050          0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:9051          0.0.0.0:*               LISTEN      -
```

## NGINX

NGINX is used as a web server to manage HTTP requests to BTCPay Server and Ride The Lightning. Paired with Let's Encrypt it allows seamless procurement and renewal of a TLS certificate for your BTCPay Server instance.

##### :truck: Install

```bash
~$ sudo apt install nginx
~$ sudo systemctl enable nginx
~$ sudo systemctl start nginx
```

##### :black_nib: Configuration

Covered in BTCPay Server Configuration.

##### :thumbsup: Check

```bash
~$ sudo nginx -v
 nginx version: nginx/1.14.0 (Ubuntu)
```

## Let's Encrypt

Let's Encrypt is a free service for procuring and renewing TLS certificates. The service comes with scripts that can be installed to automatically manage the whole process.

##### :truck: Install

```bash
~$ sudo add-apt-repository ppa:certbot/certbot
~$ sudo apt update
~$ sudo apt install certbot python-certbot-nginx
```

##### :black_nib: Configuration

You must create an A or AAAA record for **\<your domain name\>** that points to the IP address of your server instance.
If your server is behind NAT then you need to forward port 80 to your instance. 

The **certbot** script works by checking for a specific file on the web server hosting the requested domain. If it can't get the file the TLS certificate won't be issued. If the initial attempt fails it will be periodically re-attempted or you can simply re-run the command.

```bash
sudo certbot --nginx -d <your domain name> # (e.g: sudo certbot --nginx -d btcpaytest.sipsorcery.com)
```

##### :thumbsup: Check

It can be a little bit tricky to get everything set up correctly for the Let's Encrypt script to work correctly. Some additional commands are listed below to help with any troubleshooting.

```bash
~$ sudo certbot certificates
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: btcpaytest.sipsorcery.com
    Domains: btcpaytest.sipsorcery.com
    Expiry Date: 2019-08-10 18:00:31+00:00 (VALID: 79 days)
    Certificate Path: /etc/letsencrypt/live/btcpaytest.sipsorcery.com/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/btcpaytest.sipsorcery.com/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
```bash
~$ cat /etc/cron.d/certbot # (check the cron job exists)
0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/system && perl -e 'sleep int(rand(43200))' && certbot -q renew
```

```bash
~$ sudo tail /var/log/letsencrypt/letsencrypt.log # (check for problems)
2019-05-22 19:36:36,062:DEBUG:certbot.main:certbot version: 0.31.0
```
```bash
~$ sudo certbot renew --dry-run # (test renewal)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates below have not been saved.)

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/btcpaytest.sipsorcery.com/fullchain.pem (success)
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates above have not been saved.)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

## Bitcoin Daemon

The gateway to the Bitcoin network for BTCPay Server components.

##### :truck: Install

##### 1. Download the latest binaries from a trusted source such as [https://bitcoincore.org/en/download/](https://bitcoincore.org/en/download/).
```bash
~$ wget https://bitcoincore.org/bin/bitcoin-core-0.18.0/bitcoin-0.18.0-x86_64-linux-gnu.tar.gz
~$ wget https://bitcoincore.org/bin/bitcoin-core-0.18.0/SHA256SUMS.asc
```
##### 2. Verify the authenticity of the downloads. 
The Bitcoin Core code signing key is currently: 

>  "Wladimir J. van der Laan (Bitcoin Core binary release signing key) <laanwj@gmail.com>")
>  public key: 01EA5486DE18A882D4C2684590C8019E36C2E964

It's advisable to double check the signing key corresponds with other available sources. A good one is [https://github.com/bitcoin/bitcoin/tree/master/contrib/verifybinaries](https://github.com/bitcoin/bitcoin/tree/master/contrib/verifybinaries).

```bash
~$ gpg --receive-key 0x01EA5486DE18A882D4C2684590C8019E36C2E964
~$ gpg --verify SHA256SUMS.asc
 gpg: Good signature from "Wladimir J. van der Laan (Bitcoin Core binary release signing key) <laanwj@gmail.com>" [unknown]
~$ sha256sum --ignore-missing -c SHA256SUMS.asc
 bitcoin-0.18.0-x86_64-linux-gnu.tar.gz: OK
```
##### 3. Install the binaries.

```bash
~$ tar zxf bitcoin-0.18.0-x86_64-linux-gnu.tar.gz
~$ pushd bitcoin-0.18.0/bin; sudo cp bitcoind bitcoin-cli /usr/bin; popd;
~$ bitcoind --version
Bitcoin Core Daemon version v0.18.0
```
##### 4. Create a systemd service.
Download the example systemd service file from the Bitcoin Core source code repository.
```bash
~$ wget https://raw.githubusercontent.com/bitcoin/bitcoin/master/contrib/init/bitcoind.service
```
Edit the service file depending on your needs. 

In the example below the **User** and **Group** have been changed and the permissions on the **ConfigurationDirectory** have been modified to make it usable without needing to explicitly set ownership see [this issue](https://github.com/bitcoin/bitcoin/pull/15995).

```text
[Unit]
Description=Bitcoin daemon
After=network.target

[Service]
ExecStart=/usr/bin/bitcoind -daemon \
                            -pid=/run/bitcoind/bitcoind.pid \
                            -conf=/etc/bitcoin/bitcoin.conf \
                            -datadir=/var/lib/bitcoind

# Process management
####################

Type=forking
PIDFile=/run/bitcoind/bitcoind.pid
Restart=on-failure

# Directory creation and permissions
####################################
User=admin
Group=admin

# /run/bitcoind
RuntimeDirectory=bitcoind
RuntimeDirectoryMode=0710

# /etc/bitcoin
ConfigurationDirectory=bitcoin
ConfigurationDirectoryMode=0755

# /var/lib/bitcoind
StateDirectory=bitcoind
StateDirectoryMode=0710

# Hardening measures
####################
# Provide a private /tmp and /var/tmp.
PrivateTmp=true

# Mount /usr, /boot/ and /etc read-only for the process.
ProtectSystem=full

# Disallow the process and all of its children to gain
# new privileges through execve().
NoNewPrivileges=true

# Use a new /dev namespace only populated with API pseudo devices
# such as /dev/null, /dev/zero and /dev/random.
PrivateDevices=true

# Deny the creation of writable and executable memory mappings.
MemoryDenyWriteExecute=true

# Deny access to /home.
ProtectHome=true

[Install]
WantedBy=multi-user.target
```
Once the service file is ready complete the commands below. Note that the service will fail in its attempt to start due to the configuration file not yet being present. This is desired as the service will still create the **/etc/bitcoin** directory with the correct permissions ready for the next step.

```bash
~$ sudo cp bitcoind.service /etc/systemd/system
~$ sudo systemctl enable bitcoind
~$ sudo systemctl start bitcoind
~$ sudo systemctl stop bitcoind
```
##### 5. Create the configuration file.
An example configuration file is available on the Bitcoin Core repository at https://github.com/bitcoin/bitcoin/blob/master/share/examples/bitcoin.conf.

Create a bitcoin.conf file to suit your needs. An example file that is suitable for BTCPay Server is shown below. This configuration does not prune blocks which means as of May 2019 you will require 235GB for the Bitcoin blockchain. 
```text
mainnet=1
server=1                              # need RPC for btcpay.
rpcbind=127.0.0.1                     # loopback is default for 0.18.0 but no harm making sure.
whitelist=127.0.0.1                   # for nbxplorer.
rpcallowip=127.0.0.1/32               # loopback is default but again no harm.
disablewallet=1                       # btcpay does not host a bitcoin wallet.
zmqpubrawblock=tcp://127.0.0.1:28332  # needed for lightning.
zmqpubrawtx=tcp://127.0.0.1:28333     # needed for lightning.
```
Copy the file to the directory specified in the systemd service file and give users read permissions.
```bash
~$ sudo cp bitcoin.conf /etc/bitcoin
~$ sudo chmod 644 /etc/bitcoin/bitcoin.conf
~$ sudo systemctl restart bitcoind
```
##### 6. Create a symbolic link to the bitcoind cookie file.
The `bitcoin-cli` client needs to authenticate to `bitcoind` for RPC calls. The easiest way to allow this is to create a symbolic link to the cookie file.
```bash
~$ cd ~
~$ ln -s /var/lib/bitcoind/.cookie .bitcoin/.cookie
```
It's not vital to perform this step but if not done then every `bitcoin-cli` command needs to specify the path to the cookie file as below.
```bash
~$ bitcoin-cli -rpccookiefile=/var/lib/bitcoind/.cookie getblockchaininfo
```

##### :thumbsup: Check
It will take Bitcoin anywhere from a few hours to a few days to synchronise the blockchain. Use any or all of the commands below to check its status.

```bash
~$ sudo systemctl status bitcoind
Active: active (running) since Thu 2019-05-23 18:23:48 UTC; 21min ago
```

```bash
~$ tail /var/lib/bitcoind/debug.log -f
20800000 log2_work=90.667233 tx=416658838 date='2019-05-23T18:46:27Z' progress=1.000000 cache=13.6MiB(103874txo) warning='32 of last 100 blocks have unexpected version'
```

```bash
~$ bitcoin-cli getblockchaininfo
{
  "chain": "main",
  "blocks": 577444,
  "headers": 577444,
  ...
}
```
##### :thumbsup: Check Tor + Bitcoin
If Tor was installed prior to the Bitcoin Daemon then it should have automatically registered and begun listening on a torv2 onion address (note support for torv3 onion addresses is in the [pipeline](https://gist.github.com/laanwj/4fe8470881d7b9499eedc48dc9ef1ad1#file-addrv2-mediawiki)).

The easiest way to get your Bitcoin Daemon torv2 address is from the log file:
```bash
~$ cat /var/lib/bitcoind/debug.log | grep onion
2019-05-23T18:24:22Z tor: Got service ID 4d4al7v4hj5p7bb6, advertising service 4d4al7v4hj5p7bb6.onion:8333
2019-05-23T18:24:22Z AddLocal(4d4al7v4hj5p7bb6.onion:8333,4)
```
To change your onion address:
```bash
~$ rm /var/lib/bitcoind/onion_private_key
~$ sudo systemctl restart bitcoind
~$ cat /var/lib/bitcoind/debug.log | grep onion
2019-05-23T19:06:30Z tor: Got service ID zrzoqb4e5bengdju, advertising service zrzoqb4e5bengdju.onion:8333
2019-05-23T19:06:30Z AddLocal(zrzoqb4e5bengdju.onion:8333,4)
```
To check your onion address accessibility from a remote host with tor installed:
```bash
~$ torsocks --shell 
~$ telnet 4d4al7v4hj5p7bb6.onion 8333
 Trying 127.42.42.0...
 Connected to 127.42.42.0.
 Escape character is '^]'.
~$ exit
```
To connect a remote `'bitcoind` to your new node:
```bash
~$ bitcoin-cli addnode "4d4al7v4hj5p7bb6.onion" "add"
~$ bitcoin-cli getaddednodeinfo
{
   "addednode": "4d4al7v4hj5p7bb6.onion",
   "connected": true,
   "addresses": [
     {
       "address": "4d4al7v4hj5p7bb6.onion:8333",
       "connected": "outbound"
     }
   ]
 }
```
