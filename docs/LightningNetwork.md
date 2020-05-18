# Lightning Network and BTCPay

After deploying BTCPay Server, you may want to experiment with an innovative second-layer payment system built on top of Bitcoin protocol - the [Lightning Network](https://en.bitcoin.it/wiki/Lightning_Network).

This guide will show you how to set up your Lightning Network node in BTCPay and guide you through the basics.

::: danger
**Before you proceed, please understand that Lightning Network is still in the experimental stage. Do not put the money you can't afford to lose. There is a high risk of you losing the money.**
:::

Take time to familiarize yourself with the risk.
**There's no backup for LND or c-lightning keys in BTCPay. Your keys are in a hot-wallet**. This means :

1. If you erase your BTCPay Server or your machine crashes - you lose all the funds.
2. If your server gets hacked - a hacker can take all of your funds by accessing your keys.

While the keys from your Lightning Network don't have a backup and someone can steal them theoretically, your on-chain Bitcoin funds are safe and are never uploaded on the server.

As the technology matures and develops, things like a proper backup will be easier to implement in BTCPay.

BTCPay currently offers two implementations of the Lightning Network:

* [LND](https://github.com/lightningnetwork/lnd)
* [c-lightning](https://github.com/ElementsProject/lightning)

## Choosing the Lightning Network implementation

On the installation, you'll have the option to choose the implementation. For [web-interface installations](LunaNodeWebDeployment.md), you can simply select the implementation from the drop-down menu. For [docker](https://github.com/btcpayserver/btcpayserver-docker) you need to :

```
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_LIGHTNING="implementationgoeshere"
. ./btcpay-setup.sh -i
```

For c-lightning use `export BTCPAYGEN_LIGHTNING="clightning"`
For LND use `export BTCPAYGEN_LIGHTNING="lnd"`

To begin using Lightning, your blockchain needs to be fully synced.

## Connecting your internal Lightning Node in BTCPay

Regardless of the implementation (c-lightning or LND) you've decided to use, the process of connecting your internal Lightning Node in BTCPay Server is the same.

1. If you do not have a store, create one.
2. Store Settings > General Settings > Lightning Network Experimental (located at the bottom of the page, scroll)
3. Under Crypto tab, select cryptocurrency > Modify.
4. At the next page, at the bottom under "connection string", click on the "click here" link. Your node information will be automatically added.
5. Enable. Submit.
6. Test Connection.

<strong> Your blockchain needs to be fully synced before you try to connect your Lightning Node, otherwise the connection will fail.</strong>

![LightningNetworkSettup1](./img/LightningNetworkNodeSetup1.jpg)

![LightningNetworkSettup2](./img/LightningNetworkNodeSetup2.jpg)

![LightningNetworkSettup3](./img/LightningNetworkNodeSetup3.jpg)

![LightningNetworkSettup4](./img/LightningNetworkNodeSetup4.jpg)

## Getting Started with BTCPay and LND

The easiest way to use LND implementation with BTCPay is to use [Ride The Lightning](https://github.com/ShahanaFarooqui/RTL) (RTL).

![RideTheLightningServices](./img/RideTheLightning.png)

RTL is a device agnostic web user interface for Lightning Network that allows you to operate your node without leaving BTCPay, from your browser.

![RideTheLightningServices](./img/RideTheLightningServices.png)

To initiate RTL in BTCPay, Go to **Server Settings > Services > RTL > See information**.

Read the [RTL Getting Started Guide](https://medium.com/@suheb.khan/how-to-ride-the-lightning-447af999dcd2) for more details.

For remote use of your LND node on iOS or PC, you can use [Zap wallet integration](https://github.com/LN-Zap/zap-tutorials/blob/master/docs/desktop/btcpay-server.mdx).

[![LNDBTCPay](https://img.youtube.com/vi/CWhTOunTb2Q/mqdefault.jpg)](https://www.youtube.com/watch?v=CWhTOunTb2Q "BTCPay Server - LND and Zap")

Besides Zap, there are a few more wallets that allow remote control of the LND node, [the Nayuta wallet](https://nayuta.co/) and the [ZeusLN](https://github.com/ZeusLN/zeus). Both of which have not yet extensively been tested by the community.

To remotely control your LND node via web browser, you can use Lightning Joule.

[![Joule](https://img.youtube.com/vi/a9_uHJhnKR4/mqdefault.jpg)](https://www.youtube.com/watch?v=a9_uHJhnKR4 "BTCPay Server - LND and Joule")

### LND Commands lncli

You can use lncli commands like described in their [API docs](https://api.lightning.community/) but instead of using lncli you use the shell script in of the btcpayserver-docker repository calles bitcoin-lncli.sh.

If you're on Docker make sure you're in docker directory.

```bash
sudo su -
cd btcpayserver-docker
./bitcoin-lncli.sh
```

So instead of running lncli getinfo you would run `./bitcoin-lncli.sh getinfo`

Run `./bitcoin-lncli.sh --help` to see a full list of commands or check above mentioned API docs.

## Getting Started with BTCPay and c-lightning

The most straightforward way to start using the c-lightning implementation in BTCPay is to use [Spark Wallet](https://github.com/shesek/spark-wallet) integration. Just like Zap for LND, Spark is a graphical interface of your internal c-lightning node.

You can use Spark as an internal or external wallet. Internal wallet allows users to use Spark via the web-browser inside their BTCPay Server. You can also connect externally to a Spark mobile or desktop app just by scanning a QR code.

[![c-lightningbtcpay](https://img.youtube.com/vi/uV1R6IQpmg8/mqdefault.jpg)](https://www.youtube.com/watch?v=uV1R6IQpmg8 "BTCPay Server - c-lightning and Spark")

Go to **Server Settings > Services > Spark Server > See information**

![Accessing Spark wallet](./img/SparkConnect.jpg)

![Accessing Spark wallet](./img/SparkConnect2.jpg.png)

### c-lightning Commands lightning-cli

To use clightning CLI it is the same like above for `lncli` but instead you use the shell script `bitcoin-lightning-cli.sh`

If you're on Docker make sure you're in docker directory.

```bash
sudo su -
cd btcpayserver-docker
./bitcoin-lightning-cli.sh
```

E.g. to list all commands: `./bitcoin-lightning-cli.sh help`
or show info about the node `./bitcoin-lightning-cli.sh getinfo`

### Lapps (Lightning Network Apps)

[Lapps](https://blockstream.com/2018/03/29/blockstreams-week-of-lapps-ends/) are applications built on top of the [Lightning Charge](https://blockstream.com/2018/01/16/lightning-charge/), a complimentary package that allows users and developers to easier use and develop on top of c-lightning. If you decided to use c-lightning, you can easily connect your BTCPay to any of the Lapps.

BTCPay exposes all the necessary information required to connect your internal BTCPay c-lightning node to a Lightning Network App.  Go to Server Settings > Services > Lightning charge server > See information > Credentials.

Below are videos that showcase how to connect some of the lapps to your BTCPay.

[![c-lightningbtcpay1](https://img.youtube.com/vi/6EHNq1anD1k/mqdefault.jpg)](https://www.youtube.com/watch?v=6EHNq1anD1k "BTCPay Server - c-lightning and lapps intro")

[![c-lightningbtcpay2](https://img.youtube.com/vi/ZbM3jcxau0o/mqdefault.jpg)](https://www.youtube.com/watch?v=ZbM3jcxau0o "BTCPay Server - c-lightning and lapps publisher")

[![c-lightningbtcpay3](https://img.youtube.com/vi/EYrsU3LGpbI/mqdefault.jpg)](https://www.youtube.com/watch?v=EYrsU3LGpbI "BTCPay Server - c-lightning and lapps woo lightning")
