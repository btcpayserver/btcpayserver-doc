This document clarifies some of the most common questions and issues users face with the Lightning Network in BTCPay. Before you start using the off-chain protocol, familiarize yourself with the risks. Additionally, read [Getting Started with Lightning Network in BTCPay](LightningNetwork.md)

## Lightning Network General FAQ

### How to find node info and open a direct channel with a store using BTCPay?

If you're a customer trying to pay a Lightning Network invoice:
1. make sure to select "Lightning" from coin selection. 
2. Select Copy/Scan
3. Select Node Info and scan or copy it manually.

The exact procedure of opening a direct Lightning Network channel depends on the wallet you’re using. But, you should be able to figure it out easily now that you have merchant’s node information.

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

### How many users can use Lightning Network in BTCPay?

In BTCPay, only server admin has the Lightning Network node, due to technical and security reasons. On 1 self-hosted server, you can use only 1 Lightning Node. If you want to accept LN in multiple stores, you'll have to deploy a server for each store.

## Lightning Network (LND) FAQ 

Here are some of the common questions about the LND implementation of the Lightning Network.

## Lightning Network (c-lightning) FAQ 

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
