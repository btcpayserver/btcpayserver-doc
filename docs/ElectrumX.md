# ElectrumX

This document explains how to **connect Electrum Wallet to an ElectrumX Server**.

**Note:** the [docker version of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker) (since Nov 7th 2019, version 1.0.3.137) supports full integration with [ElectrumX](https://electrumx.readthedocs.io/en/latest/features.html) is the most widely implemented software used for Electrum public servers that your local Electrum wallet relies upon to get all the details of, or broadcast transactions to the bitcoin blockchain. Skip to Section 2 below, to read more on what this all means, and how to set it up on your BTCPay stack.

## How to integrate ElectrumX into your BTCPay Server and connect your Electrum Wallet to it for your complete privacy

### (only available in BTCPay docker version)

Before we proceed, it is important to understand how your Electrum wallet on your PC/Mac functions so well/fast, without having its own bitcoin full node.  In actual fact, Electrum Wallet relies on a community effort to maintain a bunch of servers all around the world with a bitcoin full node that do this job for you! They are called Electrum Servers, and you can be a part of that community to make that network even stronger, lets see how.

When you click the little traffic light at the bottom of your Electrum Wallet here:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png "Electrum Wallet History")

You will see this screen with a list of all the available Electrum servers that your wallet can connect to, normally with "Select Server Automatically" already checked:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png "Electrum Wallet Network")

While using Electrum Wallet with "Select Server Automatically" on is the easiest, every transaction that you make/browse/broadcast in your Electrum Wallet will be done via someone else's server - this is a privacy risk, that will be mitigated by setting up and using your own ElectrumX Server.

## Section 2.1 Enable Your Own ElectrumX Server (fully integrated with your BTCPay Server's full bitcoin node)

### Prerequisites (mandatory):

1. Docker only: Only the [Docker version of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md) is supported.
2. Unpruned BTCPay node: Make sure your BTCPay implementation is NOT [pruned](./FAQ/FAQ-Synchronization.md#can-i-skip-the-synchronization) (i.e. you have synched and stored from genesis block. Check that you do NOT use the opt-save-storage [Environment Variable](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose))
3. Drive space: At least 400GB of drive space on the device where your docker volumes are stored is required (as at the writing of this documentation on 9th Nov 2019, the total hard drive space used is 333GB - with full node and ElectrumX enabled - and of course this will grow further over time).
4. Additional Fragments: You are familiar with how to use BTCPay's [Additional Fragment](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#environment-variables) feature as part of your environment variable setup.
5. Server architecture: The (official) [ElectrumX docker](https://github.com/lukechilds/docker-electrumx) used here is only tested on a BTCPay Server running on x86_64 architecture. So far it is tested extensively on Ubuntu 18.04 and Debian Buster. Unless it is overhauled and tested well on Raspberry Pi (and other architectures) it likely will not work.
6. Basic Linux command line knowledge: is assumed.

### How will enabling ElectrumX Server affect an existing BTCPay implementation?:

Fundamentally, setting up ElectrumX in BTCPay server is simple, and will not affect the rest of your implementation. The only pre-requisites are as above. The [ElectrumX official docker release](https://github.com/lukechilds/docker-electrumx) is enabled in BTCPay by activating the [additional fragment](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose) called [`opt-add-electumx`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-add-electrumx.yml). This fragment will not only enable and start the ElectrumX server, it will also enable `txindex=1` in your bitcoin full node.  `txindex=1` (Transaction Index=ON) is a bitcoin core feature required for ElectrumX to be able to serve your Electrum Wallet detailed transaction data for any transaction, directly from the blockchain, without getting it from any third party server.

If you have been running your BTCPay Server for a while but haven't had `txindex=1` set until now, then it might take a few hours to build the index, this is no issue and it should not involve downtime of more than a few hours - better to set this to run overnight though when nobody will be using your node. Note: If you want to rebuild the index from scratch, launch bitcoind once with the `reindex=1` option (warning: this reindex option may take a VERY long time, and is not enabled out of the box as you likely dont need it, and hence is not in scope of this document).

### Steps to enable ElectrumX Server in BTCPay:

Here are all the steps to **enable ElectrumX Server in your BTCPay node** (read carefully as you may need to adjust for your specific setup, especially if you use other custom or conflicting "fragments" (pruning, less-memory etc.  To reiterate, you should NOT proceed further here if you run a pruned BTCPay node.

1. ElectrumX Server is accessible for Electrum Wallets via TCP port 50002.  You need to open this port up fully at least to be available within your own network to any PC or Android device running Electrum Wallet, and turn on port forwarding (you can also port forward 50002 from your Internet/WAN, to enable other Electrum Wallet users from the Internet to query your server).

2. Enable the Docker Additional Fragment on your BTCPay node by running the following commands (this is assuming a brand new BTCPay installation with LND and ElectrumX, please tweak accordingly using the [relevant documentation](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose):

3. Follow the [normal setup and install of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker#full-installation-for-technical-users), then after this command `cd btcpayserver-docker`, follow the below instructions instead of those in the link.  If you already have a BTCPay Server running, then just follow from the next step.

4. Set your environment variables:

```bash
export BTCPAY_HOST="YOURHOST.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="lnd"
export LIGHTNING_ALIAS="MY_LN"
export LETSENCRYPT_EMAIL="you@example.com"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx;opt-more-memory"
```

You can run all of that as one command after you tweak it to your needs.  The main part for our purposes in this guide of course is `BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx"`.  Note: `opt-more-memory` can be removed if you like, but I really recommend it if your system has more than 1GB of RAM/memory that you can assign to BTCPay server, it will speed synching your node and the general performance of ElectrumX up drastically.

5. Set up or reconfigure BTCPay Server with ElectrumX:

    `cd ~/BTCPayServer/btcpayserver-docker && . ./btcpay-setup.sh -i`

    This will setup (or re-setup) your server with everything needed including ElectrumX, and it all should "just work".  But, it will trigger at least a couple of hours of syncing the `txindex`, and if it is a new server, could be a couple of days depending on your hardware.

6. WAIT for your node to fully sync:
    You can check the status of bitcoin core sync by going to your domain for BTCPay server, and it will show you on the front page.  Or, you can check from the command line as well, using these commands:

    `docker logs btcpayserver_bitcoind` - this will show you the bitcoin core blockchain sync status (and ALL other info about your node, including any errors)

    `docker logs generated_electrumx_1` - this will show you the ElectrumX sync status.  Note: ElectrumX will NOT start syncing until bitcoin full node has finished syncing, you will see errors until that is finished and these can be ignored.

Once all syncing for both bitcoin and ElectrumX has finished you can proceed to the next step.  (Note: Electrum wallets will not connect to an Electrum server that has not finished synching)

## Section 2.2 Connect your Electrum Wallet (Desktop or Android) to your ElectrumX Server

### Connect to ElectrumX from Electrum Wallet on your Mac/PC/Linux Machine:

Read all of this first before proceeding.  You may wish to do just the "Protip" below instead of the manual steps in the Electrum Wallet GUI.

Open Electrum Wallet.  When you click the traffic light at the bottom of your Electrum Wallet:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png "Open Electrum Wallet network config")

You will see this screen with a list of all the available Electrum servers that your wallet can connect to, normally with `Select Server Automatically` already checked:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png "Electrum Wallet Network tab")

Now is the time to UNCHECK that `Select Server Automatically` setting, which will enable you to enter the IP address or domain or hostname of your ElectrumX Server.  In the case below, the ElectrumX server is on the local network at `192.168.1.3` so we enter that manually (leave port as 50002) and press `close`.

![EnterElectrumXServerIP](https://user-images.githubusercontent.com/1388507/68496320-4e276580-0252-11ea-8caf-facc8a246d70.png "Electrum Wallet personal ElectrumX")

If all of the above worked well, and your node is healthy, you will get a green traffic light down the bottom right of the wallet interface as pictured here - that means success!:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png "Electrum Wallet main tab")

#### Protip - optionally perform the above steps directly in Electrum Wallet config file before even opening the wallet GUI:
If you prefer to avoid connecting to other servers from the outset when you open Electrum Wallet, do the following before you open Electrum Wallet GUI.

In the Electrum Wallet folder ([see here](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) if you don't know where that is), open and edit the `config` file like this:

1. Find line: `"auto_connect": true,` and switch it to: `"auto_connect": false,` - this will prevent your Electrum Wallet from auto-connecting to other 3rd party Electrum Servers at launch time (to obtain block headers and transaction information).

2. Find line: `"oneserver": false,` and switch it to: `"oneserver": true,` - ensures that all data is obtained from just one server.

3. Find or add line: `"server": "SOMEIPADDRESS:50002:s",`and switch it to your own ElectrumX Server's IP address, in the example above this would be: `"server": "192.168.1.3:50002:s",`- hard code your IP address as the default upon opening the Wallet.

These 3 steps optional but recommended for full privacy by locking down Electrum Wallet to one single connection with your private server ([Reference](https://github.com/chris-belcher/electrum-personal-server#how-to)).

### Reflection on what has been achieved:

You are now running your very **own private ElectrumX Server**.  All Electrum Wallet related data transfer happens directly between your ElectrumX Server and the bitcoin blockchain, without going over any other 3rd party servers.  You have attained full bitcoin transaction privacy (at least from the perspective of your blockchain queries and transactions, payment/receive addresses etc - nobody except you and the blockchain can see what you are doing).

### Troubleshooting:

So there is one thing you may encounter, where even after you did everything correctly, you still get a red traffic light (which means not connected to any server) in the steps above.  Any other troubleshooting tips that people encounter can be added, I would suggest to make a PR to this document directly.

- If you get a red traffic light, shutdown Electrum Wallet completely, then go to your Electrum Wallet folder ([see here](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) if you don't know where that is).

Inside the Electrum Wallet folder (in this case below, it is what it looks like on a Mac) locate the `certs` directory and delete the certificate for the server you are trying to connect to, in this case `192.168.1.3`, by dragging it to the Trash.

![Certs](https://user-images.githubusercontent.com/1388507/68497330-9a73a500-0254-11ea-9349-71bdb3bd9511.png "Certificates")

Start up Electrum Wallet again, and connect to your ElectrumX server.  If it is fully synched, it will now likely show a green traffic light, and you are good to go.
