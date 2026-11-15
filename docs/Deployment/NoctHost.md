# Deploying BTCPay Server on NoctHost

This article explains how to deploy **BTCPay Server on a NoctHost VPS** with the official [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) setup. [NoctHost](https://nocthost.com) sells hourly-billed servers on Vultr, DigitalOcean, Hetzner and Linode through one account. The server can be paid for with Bitcoin, USDT or other coins, and sign-up needs only an email address.

Before you begin, make sure you have:

* A NoctHost account with balance for the server
* A domain or subdomain, and access to its DNS settings
* An SSH client, such as Terminal, Windows PowerShell or PuTTY

## 1. Choose a server size

BTCPay Server with a pruned Bitcoin node needs at least **4 GB of RAM** and about **80 GB of disk**. On NoctHost the smallest plan that fits is **Standard** (2 vCPU, 4 GB RAM, 80 GB NVMe). Pick a larger plan if you plan to add Lightning, more coins or plugins.

Servers are billed by the hour from your prepaid balance. A payment server has to stay online, so keep enough balance on the account: when the balance runs out, the server is archived and goes offline until you top up.

## 2. Create the server

1. Sign in to the [NoctHost dashboard](https://nocthost.com/login) and top up your balance.
2. Click **+ Deploy server**.
3. Choose a city close to you or your customers, and the **Standard** plan or larger.
4. Select **Ubuntu 24.04** as the operating system.
5. Set a **Root password**, and optionally paste your SSH public key into the **SSH key** field.
6. Click **Deploy server**. The server is usually ready in about a minute.

Copy the server's **IPv4 address** from the server page.

## 3. Point your domain to the server

In your domain's DNS settings, create an **A record** for the domain or subdomain you want to use, pointing to the server's IPv4 address. For example, for `pay.example.com`:

```text
Type: A
Name: pay
Value: <your server IP>
```

DNS changes can take a few minutes to propagate. Let's Encrypt needs the record to resolve before it can issue the HTTPS certificate in the next step.

If you use a CDN or DNS proxy (for example Cloudflare), set the record to **DNS only** until the certificate is issued.

## 4. Install BTCPay Server

Connect to the server over SSH:

```bash
ssh root@<your server IP>
```

There is no firewall on NoctHost's side. If `ufw` is enabled on your image, open the ports BTCPay needs:

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 9735/tcp
```

Then run the standard btcpayserver-docker installation, replacing `pay.example.com` with your domain:

```bash
mkdir BTCPayServer && cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker

export BTCPAY_HOST="pay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-s"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="lnd"
export BTCPAY_ENABLE_SSH=true

. ./btcpay-setup.sh -i
```

`opt-save-storage-s` keeps the Bitcoin node pruned so it fits on the 80 GB disk. Leave out `BTCPAYGEN_LIGHTNING` if you don't need Lightning. All options are described in the [Docker configuration reference](/Docker/configuration/).

## 5. Finish the setup

1. Open `https://pay.example.com` in your browser.
2. Create the administrator account. The first account registered becomes the server admin.
3. Wait for the Bitcoin node to sync before accepting payments. BTCPay shows the progress; on a pruned node this usually takes one to three days.

After the sync, continue with [Creating a store](/CreateStore/) and [connecting a wallet](/WalletSetup/).

## Notes

* **Backups:** BTCPay keeps your store data in Docker volumes on the server. Follow [Backup and restore](/Docker/backup-restore/) and keep copies off the server.
* **Changing the domain later:** run `changedomain.sh your.new.domain` from the `btcpayserver-docker` folder.
* **Updates:** use **Server Settings → Maintenance → Update** in BTCPay, or run `btcpay-update.sh` over SSH.
