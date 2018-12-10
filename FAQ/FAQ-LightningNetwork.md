This document clarifies some of the most common questions and issues users face with the Lightning Network in BTCPay. Before you start using the off-chain protocol, familiarize yourself with the risks. Additionally, read [Getting Started with Lightning Network in BTCPay](LightningNetwork.md)

## [Lightning Network General FAQ](FAQ-LightningNetwork.md#lightning-network-general-faq)
* [How many users can use Lightning Network in BTCPay?](FAQ-LightningNetwork.md#how-many-users-can-use-lightning-network-in-btcpay)
* [How to find node info and open a direct channel with a store using BTCPay?](FAQ-LightningNetwork.md#how-to-find-node-info-and-open-a-direct-channel-with-a-store-using-btcpay)
* [As a merchant, do I need to open direct channels?](FAQ-LightningNetwork.md#as-a-merchant-do-i-need-to-open-direct-channels) 
* [Previously installed BTCPay without the integrated LN support, can I migrate?](FAQ-LightningNetwork.md#i-previously-installed-btcpayserver-without-the-integrated-lightning-support-can-i-migrate)
* [Can I used pruned node with LN in BTCPay?](FAQ-LightningNetwork.md#can-i-used-pruned-node-with-ln-in-btcpay)
* [How to change from c-lightning to LND or vice-versa?](FAQ-LightningNetwork.md#how-to-change-from-c-lightning-to-lnd-or-vice-versa)
* [Switched Lightning Network implementation, getting "no payment available" error](FAQ-LightningNetwork.md#i-switched-lightning-network-implementation-but-getting-no-payment-available-error)
* [WARNING: The LIGHTNING_ALIAS variable is not set. Defaulting to a blank string" when starting container](FAQ-LightningNetwork.md#i-get-warning-the-lightning_alias-variable-is-not-set-defaulting-to-a-blank-string-when-starting-container)
* [Where can I get Lightning Network Support?](FAQ-LightningNetwork.md#lightning-network-questions-and-support)

## [Lightning Network (LND) FAQ](FAQ-LightningNetwork.md#lightning-network-lnd-faq)
* [How to restart my LND?](FAQ-LightningNetwork.md#how-to-restart-my-lnd)
* [How to see LND logs?](FAQ-LightningNetwork.md#how-to-see-lnd-logs)
* [What’s the default LND Directory in BTCPay?](FAQ-LightningNetwork.md#whats-the-default-directory-of-lnd-in-btcpay)
* [LND connection issue - cannot get macaroon: root key with id 0 doesn’t exist](FAQ-LightningNetwork.md#lnd-connection-issues-after-an-update)
* [How to change LND Node alias](FAQ-LightningNetwork.md#how-to-change-my-lnd-node-alias)

## [Lightning Network (c-lightning) FAQ](FAQ-LightningNetwork.md#lightning-network-c-lightning-faq)


## Lightning Network General FAQ

Here are some general questions about LN in BTCPay, regardless of the implementation.

### How many users can use Lightning Network in BTCPay?

In BTCPay, only server admin has the Lightning Network node, due to technical and security reasons. On a self-hosted server, you can use only 1 Lightning Node. If you want to accept LN in multiple stores, you'll have to deploy a separate server for each store.

### How to find node info and open a direct channel with a store using BTCPay?

If you're a customer trying to pay a Lightning Network invoice:
1. make sure to select "Lightning" from coin selection. 
2. Select Copy/Scan
3. Select Node Info and scan or copy it manually.

![BTCPay Checkout](/img/btcpay-node-info.jpg)

The exact procedure of opening a direct Lightning Network channel depends on the wallet you’re using. But, you should be able to figure it out easily now that you have merchant’s node information.

### As a merchant, do I need to open direct channels?

Merchants need incoming channels - other people opening a channel with them, providing liquidity. 
Your customer should be able to open a direct channel with you. You can also ask well-connected nodes to open a direct channel with you. Opening a channel is not spending funds, it’s more like putting the funds on a pre-paid card, and spending it later, or withdrawing it by closing a channel.

### I previously installed BTCPayServer without the integrated lightning support, can I migrate?

The integrated lightning support is only useful for scenario where you are at the same time the host and the merchant of BTCPay Server.

When logged as admin of your server you will then have a nice link to connect to plug your lightning node to BTCPay Server.

![LightningNode](/img/setuplightningnode.png)

You can then click on `Test Connection` in this page to see if you successfully configured your lightning node.

Depending on how you deployed BTCPayServer you might have different step to do:

#### Case 1: You manually installed

If you installed BTCPayServer manually without docker or Azure, then you only need to start run [CLightning](https://hub.docker.com/r/nicolasdorier/clightning/) with the correct network parameter.

Assuming you are running as root, CLightning will allow call to its API via a unix socket on `/root/.lightning/lightning-rpc`

Once this is done, make sure you start BTCPayServer with

```
-btclightning=/root/.lightning/lightning-rpc
```

If you are using CLightning for Litecoin, use the parameter `-ltclightning` instead.

Then, make sure the port lightning network ports `9735` (BTC) and `9736` (LTC) are open on your firewalls.

#### Case2: You are using docker (without Azure)

In this case, you only have to change the docker-compose you are using.
If before you were using `docker-compose -f "$(pwd)/Production/docker-compose.btc-ltc.yml" up -d` (as documented [here](https://github.com/btcpayserver/btcpayserver-docker#for-docker-noobs)), then you need to change to `docker-compose -f "$(pwd)/Production/docker-compose.btc-ltc-clightning.yml" up -d`.

Then, make sure the port lightning network ports `9735` (BTC) and `9736` (LTC) are open on your firewalls.

#### Case3: You are using Azure

Log as root:

```
sudo su -
```

Run

```
cd $DOWNLOAD_ROOT
wget -O - https://raw.githubusercontent.com/btcpayserver/btcpayserver-azure/master/btcpay-update.sh > btcpay-update.sh
btcpay-update.sh
```

Modify the file `/etc/profile.d/btcpay-env.sh`:

You should have something like:

```
export BTCPAY_DOCKER_COMPOSE="/var/lib/waagent/custom-script/download/0/btcpayserver-docker/Production/docker-compose.btc-ltc.yml"
```

Modify by adding `-clightning` at the end:

```
export BTCPAY_DOCKER_COMPOSE="/var/lib/waagent/custom-script/download/0/btcpayserver-docker/Production/docker-compose.btc-ltc-clightning.yml"
```
Update your environment variables in current session by running:

```
. /etc/profile.d/btcpay-env.sh
```

Then restart your server:

```
btcpay-restart.sh
```

Then, connect to your [Microsoft Azure Portal](https://portal.azure.com/),
Go to the resource group of your install, and add a new security rule in the Network Security Group inside it. (See [this example](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-create-nsg-arm-pportal#create-rules-in-an-existing-nsg))

If your resource group do not have a Network Security Group, you can skip this step. The Network Security Group has been introduced in new Azure installs.

Add a Security Inbound Rules:

Rule 1:

* Name: LightningBTC
* Priority: 150
* Source: Internet
* Destination: Any
* Port: 9735
* Protocol: TCP

Rule 2:

* Name: LightningLTC
* Priority: 151
* Source: Internet
* Destination: Any
* Port: 9736
* Protocol: TCP

Here is how it should look like:

![SecurityRules](/img/azuresecurityrule.png)

### Can I used pruned node with LN in BTCPay?

Both LND and c-lightning support prunning. 

This will prune your Bitcoin full node to a maximum of 100GB (of blocks):
```
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage"`
. ./btcpay-setup.sh -i
```
Other pruning options are [documented here](https://github.com/btcpayserver/btcpayserver-docker#generated-docker-compose-)

### How to change from c-lightning to LND or vice-versa?

You need to SSH log in into your virtual machine.

To switch to LND:
```
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_LIGHTNING="lnd"
. ./btcpay-setup.sh -i 
```
To switch to c-lightning:

```
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_LIGHTNING="clightning"
. ./btcpay-setup.sh -i
```
### I switched Lightning Network implementation, but getting "no payment available" error

When you switch from one implementation to another, you need to reconfigure your lightning connection string at a store level, to use adequate implementation. Stores > General Settings > Lightning nodes > Modify > **Connection string**. In connection string, click on the "click here" link. 

### I get "WARNING: The LIGHTNING_ALIAS variable is not set. Defaulting to a blank string" when starting container

You can ignore this.
If you want to set an alias for your lightning node, open the env file:

```
sudo su -
vim $BTCPAY_ENV_FILE
```

And add or modify the `LIGHTNING_ALIAS` entry to `LIGHTNING_ALIAS=myawesomenode`.

## Lightning Network (LND) FAQ 

Here are some of the common questions about the [LND implementation](https://github.com/lightningnetwork/lnd/issues) of the Lightning Network.

### How to restart my LND?

```
sudo su -
docker restart btcpayserver_lnd_bitcoin
```
### How to see LND logs?

To check the logs of your LND node in BTCPay Server (Docker installations) use the following command:

`docker logs --tail 40 btcpayserver_lnd_bitcoin`

You can change 40 to whatever number you wish. The number represents the lines of code that will be shown. For more information about the logs, see [Troubleshooting page](Troubleshooting.md)

### What’s the default directory of LND in BTCPay?

`/var/lib/docker/volumes/generated_lnd_bitcoin_datadir/_data`

### LND connection issues after an update

Authentication tends to fail on LND after an update, symptoms are:

* In store settings, when testing the connection to your node you get `Error while connecting to the API (The HTTP status code of the response was not expected (500).)`
* In Zap wallet, `Unable to connect to host: cannot retrieve macaroon: cannot get macaroon: root key with id 0 doesn’t exist`

In such case, you need to delete the macaroon of lnd and restart it.

If you are using docker deployment, please connect with SSH to your VM and the following command:

```bash
sudo su -
docker exec btcpayserver_lnd_bitcoin rm /data/admin.macaroon
docker exec btcpayserver_lnd_bitcoin rm /data/invoice.macaroon
docker exec btcpayserver_lnd_bitcoin rm /data/readonly.macaroon
docker exec btcpayserver_lnd_bitcoin rm /data/data/macaroons.db
docker exec btcpayserver_lnd_bitcoin rm /data/data/chain/bitcoin/mainnet/invoice.macaroon
docker exec btcpayserver_lnd_bitcoin rm /data/data/chain/bitcoin/mainnet/macaroons.db
docker exec btcpayserver_lnd_bitcoin rm /data/data/chain/bitcoin/mainnet/readonly.macaroon
docker restart btcpayserver_lnd_bitcoin
```

If a macaroon does not exist, you will see an error message, you can safely ignore it.

Because this will invalidate the previous macaroons, you need to manually reconnect with Zap with `Server Settings / Services / LND-gRPC`.

### How to change my LND Node alias?
To change the display name of your LND node, you should ssh log in into your virtual machine and apply the following:

```
sudo su -
cd btcpayserver-docker
export LIGHTNING_ALIAS="namehere"
. ./btcpay-setup.sh -i
```

## Lightning Network (c-lightning) FAQ 

Here are some of the common questions about the [c-lightning](https://github.com/ElementsProject/lightning/issues) implementation of the Lightning Network.

## Lightning Network Questions and Support

Community support for Lightning Network question is pretty limited, since the protocol is fairly new.

If you're facing a technical problem with your Lightning Network implementation, that's not documented here you may want to ask questions in their respective communities.

#### LND Support

* [LND GitHub](https://github.com/lightningnetwork/lnd/issues)
* [Lightning Community on Slack](lightningcommunity.slack.com)
* [#lightning-dev](https://webchat.freenode.net/?channels=lightning-dev&uio=d4) on IRC

#### c-lightning Support

* [c-lightning GitHub](https://github.com/ElementsProject/lightning/issues)
* [#lightning-dev](https://webchat.freenode.net/?channels=lightning-dev&uio=d4) on IRC
