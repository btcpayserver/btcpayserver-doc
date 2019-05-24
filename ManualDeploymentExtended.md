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
Covered further in Bitcoin and Lightning Network Daemon sections.

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
##### 4. Create the configuration file.
An example configuration file is available on the Bitcoin Core repository at https://github.com/bitcoin/bitcoin/blob/master/share/examples/bitcoin.conf.

Create a bitcoin.conf file to suit your needs. An example file that is suitable for BTCPay Server is shown below. This configuration does not prune blocks which means as of May 2019 you will require 235 GB for the Bitcoin blockchain. 
```bash
~$ vi bitcoin.conf
```
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
Copy the file to the directory specified in the systemd service file and assign read permissions to all users.
```bash
~$ sudo mkdir -p /etc/bitcoin
~$ sudo cp bitcoin.conf /etc/bitcoin
~$ sudo chmod 644 /etc/bitcoin/bitcoin.conf
```

##### 5. Create a systemd service.
An example systemd service file is available in the Bitcoin Core  repository at https://raw.githubusercontent.com/bitcoin/bitcoin/master/contrib/init/bitcoind.service.

Edit the service file depending on your needs. 

In the example below the **User** and **Group** have been changed and the permissions on the **ConfigurationDirectory** have been modified to make it usable without needing to explicitly set ownership see [this issue](https://github.com/bitcoin/bitcoin/pull/15995).

```bash
~$ vi bitcoind.service
```
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
Once the service file is ready complete the commands below. 
```bash
~$ sudo cp bitcoind.service /etc/systemd/system
~$ sudo systemctl enable bitcoind
~$ sudo systemctl start bitcoind
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
To check your onion address from a remote host with tor installed:
```bash
~$ torsocks --shell 
~$ telnet 4d4al7v4hj5p7bb6.onion 8333
 Trying 127.42.42.0...
 Connected to 127.42.42.0.
 Escape character is '^]'.
~$ exit
```
To connect another `bitcoind` instance to your new node:
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
## NBXplorer
NBXplorer is a dotnet core application that monitors the Bitcoin blockchain for transactions of interest to your BTCPay Server.
##### :truck: Install

##### 1. Install dotnet core
Check [download link for latest version](https://dotnet.microsoft.com/download/dotnet-core) (.Net Core 2.2 at the time of writing)
```bash
~$ wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
~$ sudo dpkg -i packages-microsoft-prod.deb
~$ sudo add-apt-repository universe
~$ sudo apt-get install apt-transport-https
~$ sudo apt-get update
~$ sudo apt-get install dotnet-sdk-2.2
~$ dotnet --version
2.2.203
```
##### 2. Build NBXplorer
```bash
~$ cd ~; mkdir -p src; cd src
~/src$ git clone https://github.com/dgarage/NBXplorer
~/src$ cd NBXplorer
~/src/NBXplorer$ ./build.sh
```
##### 3. Create a systemd service.
An example systemd service file is shown below. Adjust the paths, User and Group accordingly.
```bash
~$ vi nbxplorer.service
```
```text
[Unit]
Description=NBXplorer daemon
Requires=bitcoind.service
After=bitcoind.service

[Service]
WorkingDirectory=/home/admin/src/NBXplorer
ExecStart=/home/admin/src/NBXplorer/run.sh
User=admin
Group=admin
Type=simple
PIDFile=/run/nbxplorer/nbxplorer.pid
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
```bash
~$ sudo cp nbxplorer.service /etc/systemd/system
~$ sudo systemctl enable nbxplorer
~$ sudo systemctl start nbxplorer
```
##### :thumbsup: Check
```bash
~$ sudo journalctl -xe --unit nbxplorer --follow
May 23 19:13:35 btc run.sh[8065]: info: Configuration:  Data Directory: /home/admin/.nbxplorer/Main
May 23 19:13:35 btc run.sh[8065]: info: Configuration:  Configuration File: /home/admin/.nbxplorer/Main/settings.config
May 23 19:13:35 btc run.sh[8065]: info: Configuration:  Network: Mainnet
...
May 23 19:20:04 btc run.sh[8065]: info: Events:         BTC: New block 0000000000000000000c405ba5df5f5533359a4393247a0c52d26c458d4dd989 (577449)
```

If it doesn't start correctly stop the service and run the application directly to get any error messages.
```bash
~$ sudo systemctl stop nbxplorer
~$ cd ~; pushd ./src/NBXplorer; ./run.sh; popd
```
#####  :rotating_light: Update
Updating could break things. Be careful on a live system.
```bash
~$ sudo systemctl stop nbxplorer
~$ cd ~; pushd ~/src/NBXplorer; git pull; ./build.sh; popd;
~$ sudo systemctl start nbxplorer
```

## BTCPay Server

Like NBXplorer the BTCPay Server application is also dotnet core. The install steps assume dotnet core was installed in the 
previous step.

##### :truck: Install

##### 1. Build BTCPay Server
```bash
~$ cd ~; mkdir -p src; cd src
~/src$ git clone https://github.com/btcpayserver/btcpayserver.git
~/src$ cd btcpayserver
~/src/btcpayserver$ ./build.sh
```
##### 2. Create Postgresql Database.

By default BTCPay Server will store data in a single SQLite file. A more robust option is to use Postgresql which requires the appropriate database and user exist.

```bash
~$ sudo -u postgres psql
postgres=# create database btcpay;
postgres=# create user btcpay with encrypted password 'urpassword';
postgres=# grant all privileges on database btcpay to btcpay;
postgres=#\q
```
##### 3. Create a configuration file.
```bash
$ vi btcpay.config
```
```text
### Database ###
postgres=User ID=btcpay;Password=urpassword;Host=localhost;Port=5432;Database=btcpay;
```
```bash
~$ sudo mkdir /etc/btcpay
~$ sudo cp btcpay.config /etc/btcpay
~$ sudo chmod 644 /etc/btcpay/btcpay.config
```
##### 4. Create a systemd service.
An example systemd service file is shown below. Adjust the paths, User and Group accordingly.
```bash
~$ vi btcpay.service
```
```text
[Unit]
Description=BTCPay Server
Requires=nbxplorer.service
After=nbxplorer.service

[Service]
WorkingDirectory=/home/admin/src/btcpayserver
ExecStart=/home/admin/src/btcpayserver/run.sh --conf=/etc/btcpay/btcpay.config
User=admin
Group=admin
Type=simple
PIDFile=/run/btcpayserver/btcpayserver.pid
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
```bash
~$ sudo cp btcpay.service /etc/systemd/system
~$ sudo systemctl enable btcpay
~$ sudo systemctl start btcpay
```
##### :thumbsup: Check
```bash
~$ sudo journalctl -xe --unit btcpay --follow
-- The start-up result is RESULT.
May 23 20:01:25 btc run.sh[10263]: info: Configuration:  Data Directory: /home/admin/.btcpayserver/Main
May 23 20:01:25 btc run.sh[10263]: info: Configuration:  Configuration File: /etc/btcpay/btcpay.config
May 23 20:01:25 btc run.sh[10263]: info: Configuration:  Network: Mainnet
```

If it doesn't start correctly stop the service and run the application directly to get any error messages.
```bash
~$ sudo systemctl stop btcpay
~$ cd ~; pushd ~/src/btcpayserver --conf=/etc/btcpay/btcpay.config; ./run.sh; popd;
```
An example of checking information in the database.
```bash
~$ sudo -u postgres psql
postgres=# \connect btcpay;
btcpay=# \dt
btcpay=# select * from "Invoices";
btcpay=# \q
```

#####  :rotating_light: Update
Updating could break things. Be careful on a live system.
```bash
~$ sudo systemctl stop btcpay
~$ cd ~; pushd ~/src/btcpayserver; git pull; ./build.sh; popd;
~$ sudo systemctl start btcpay
```
## Lightning Network Daemon (lnd)

##### :truck: Install
##### 1. Install Go.
```bash
~$ sudo apt install make
~$ wget https://dl.google.com/go/go1.12.3.linux-amd64.tar.gz
~$ sha256sum go1.12.3.linux-amd64.tar.gz | awk -F " " '{ print $1 }'
 3924819eed16e55114f02d25d03e77c916ec40b7fd15c8acb5838b63135b03df
~$ sudo tar -C /usr/local -xzf go1.12.3.linux-amd64.tar.gz
~$ export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
~$ export GOPATH=~/gocode
~$ go version
 go version go1.12.3 linux/amd64
 ```

##### 2. Build and install lnd.
```bash
~$ go get -d github.com/lightningnetwork/lnd
~$ cd $GOPATH/src/github.com/lightningnetwork/lnd
~$ make
~$ make install # installs to /home/admin/gocode/bin which is $GOPATH/bin
~$ lnd --version
lnd version 0.6.1-beta commit=v0.6.1-beta-12-gf8c824fb1d6c5ef8524148f59ea5650af65af98b
~$ sudo cp $GOPATH/bin/lnd $GOPATH/bin/lncli /usr/bin
```
##### 3. Create a symbolic link to the Bitcoin configuration file.

lnd looks for bitcoin.conf in a specific location to get necessary RPC and zeromq details.

```bash
~$ ln -s /etc/bitcoin/bitcoin.conf ~/.bitcoin/bitcoin.conf 
```

##### 4. Create a configuration file.
```bash
~$ vi lnd.conf
```
```text
[Application Options]
datadir=/var/lib/lnd/data
tlscertpath=/var/lib/lnd/tls.cert
tlskeypath=/var/lib/lnd/tls.key
logdir=/var/lib/lnd/logs
maxlogfiles=3
maxlogfilesize=10
#externalip=1.1.1.1 # change to your public IP address if required.
alias=i_luv_btcpay
listen=0.0.0.0

[Bitcoin]
bitcoin.active=1
bitcoin.node=bitcoind
bitcoin.mainnet=true

[tor]
tor.active=true
tor.v3=true
```
```bash
~$ sudo mkdir -p /etc/lnd
~$ sudo mkdir -p /var/lib/lnd
~$ sudo chown admin:admin -R /var/lib/lnd
~$ sudo cp lnd.conf /etc/lnd
~$ sudo chmod 644 /etc/lnd/lnd.conf
```
##### 5. Create a systemd service.
An example systemd service file is shown below. Adjust the paths, User and Group accordingly.
```bash
~$ vi lnd.service
```
```text
[Unit]
Description=LND Lightning Network Daemon
Requires=bitcoind.service
After=bitcoind.service

[Service]
ExecStart=/usr/bin/lnd --configfile=/etc/lnd/lnd.conf
ExecStop=/usr/bin/lncli --lnddir /var/lib/lnd stop
PIDFile= /run/lnd/lnd.pid

User=admin
Group=admin

Type=simple
KillMode=process
TimeoutStartSec=60
TimeoutStopSec=60
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target
```
```bash
~$ sudo cp lnd.service /etc/systemd/system
~$ sudo systemctl enable lnd
~$ sudo systemctl start lnd
```
##### :black_nib: Configuration
**Running a Bitcoin Lightning daemon requires a hot wallet on your BTCPay Server.**
Repeating for emphasis.
**Running a Bitcoin Lightning daemon requires a hot wallet on your BTCPay Server.**

With Bitcoin the protocol has evolved and deterministic key derivation means the keys for your wallet can be kept in a different location to the BTCPay Server. Lightning daemons do not have this facility so any Bitcoins committed or received in your lightning channels are controlled by the private keys in the lnd hot wallet.

##### 1. Create a symbolic link to the lnd data directory.
The install steps above use `/var/lib/lnd` as the data directory rather than the default `/home/user/.lnd`. In order to save typing when using the `lncli` client it's useful to add a symbolic directory link.

```bash
ln -s /var/lib/lnd .lnd
```

##### 2. Create Lightning wallet.
The first time the lnd is started a new wallet must be created and the backup seed safely recorded (if someone else gets your seed they can steal your funds so keep it safe).
```bash
~$ lncli create
Input wallet password:
Confirm wallet password:
---------------BEGIN LND CIPHER SEED---------------
 1. above      2. catch    3. start     4. tape
 5. sound      6. friend   7. water     8. royal
 9. solid     10. poet    11. wisdom   12. match
13. virtual   14. zero    15. slender  16. thrive
17. idle      18. catch   19. robot    20. clay
21. resemble  22. angry   23. work     24. until
---------------END LND CIPHER SEED-----------------
```
Note that if the symbolic directory link from the previous step was not created the command is:
```bash
lncli --lnddir /var/lib/lnd create
```

##### 3. Unlock the wallet.
Every time lnd is restarted the wallet needs to be unlocked. This is not ideal for a BTCPay Server that can is designed to run unattended but Lighting is still in its infancy.

```bash
~$ lncli unlock
```
##### :thumbsup: Check
```bash
~$ lncli getinfo
 {
   "version": "0.6.1-beta commit=v0.6.1-beta-12-gf8c824fb1d6c5ef8524148f59ea5650af65af98b",
   ...
 }
```
Check the service:

```bash
~$ sudo journalctl -xe --unit lnd --follow
...
May 24 19:21:54 btc lnd[8067]: 2019-05-24 19:21:54.683 [INF] DISC: Broadcasting batch of 27 new announcements
May 24 19:23:24 btc lnd[8067]: 2019-05-24 19:23:24.683 [INF] DISC: Broadcasting batch of 163 new announcements
```

##### :thumbsup: Check Tor + lnd

As with the Bitcoin daemon if Tor is installed and the configuration file enables it (the one above does) then lnd will automatically register an onion address. In lnd's case torv3 addresses are supported. 

The torv3 onion address below is a lot longer than the torv2 one from the Bitcoin daemon section (16 characters compared to 56 characters).

```bash
~$ lncli getinfo | grep onion
"029b0e3c05595074afcffdca0fb22fb68a95a9c4698dd20962f647de4891eceabd@liyuvwbbycrvvuzcrsd5rq7svwckabejlsymcxiwzkj3smvlwcsqpjyd.onion:9735"
```
The Tor address created by lnd can be used to connect to other Lighting peers on the Tor network. The Tor address can work in parallel with an IPv4 or IPv6 address. To register one of those make sure the `externalip` is set in the lnd configuration file.

## Ride The Lightning (RTL)

##### :truck: Install
