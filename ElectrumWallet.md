# Electrum Wallet and ElectrumX with BTCPay Server - Introduction

This document has two "sections" which are independent (i.e. users can do section 1. OR 2. or both sections 1. AND 2 depending on their needs):
**Section 1.** How to connect Electrum Wallet on your desktop and use it with BTCPay Server (easy, all BTCPay versions)
**Section 2.** How you can go the extra mile to fully secure your bitcoin privacy and connect your Electrum Wallet to your very own ElectrumX Server (intermediate, only docker version of BTCPay Server)

**Note:** the [docker version of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker) (since Nov 7th 2019, version 1.0.3.137) supports full integration with [ElectrumX](https://electrumx.readthedocs.io/en/latest/features.html) is the most widely implemented software used for Electrum public servers that your local Electrum wallet relies upon to get all the details of, or broadcast transactions to the bitcoin blockchain.  Skip to Section 2 below, to read more on what this all means, and how to set it up on your BTCPay stack.

# Section 1. How to connect Electrum Wallet to BTCPay Server

**Word of caution** Using Electrum wallet (without following Section 2 of this document!) relies on Electrum servers that are controlled by third-parties. Information, like public addresses, balances and the transacted amount can potentially be leaked. To protect against such leaks, you can setup your own [ElectrumX Server](https://electrumx.readthedocs.io/en/latest/features.html) within BTCPay server in Section 2 of this document, or otherwise setting up [Electrum Personal Server - EPS](https://github.com/chris-belcher/electrum-personal-server), which is technically advanced task not covered in this document.  You can read about the differences between EPS and ElectrumX [here](https://www.reddit.com/r/Electrum/comments/7xb0lz/whats_the_difference_between_electrumx_server_and/). 

In short, for full privacy with BTCPay Server and your Electrum Wallet, also make sure to setup and use your own ElectrumX Server outlined in Section 2 below (Alternatively, you can also use [BTCPay Wallet](Wallet.md) with a compatible hardware wallet or [Wasabi](WasabiWallet.md)).

If you understood the risks of using Electrum Wallet without ElectrumX and still want to proceed with using public Electrum servers with your Electrum wallet, follow the instructions below.

1. Create a Store in BTCPay Server
2. [Download](https://electrum.org/#download) and install Electrum Wallet

## Electrum Wallet Setup

After the installation, open Electrum Wallet by clicking on the icon on your desktop.

### Quick Setup

1. Create a new Electrum Wallet
2. In Electrum, Wallet > Wallet Information - copy the **Master Public Key**.
3. In BTCPay Server, Store Settings > General > Derivation Scheme - Paste the Extended Public Key
4. Go to Receive tab in Electrum.
5. Compare the addresses in Electrum and BTCPay Server, they should match. 
6. Confirm the address match in BTCPay.

## Step by Step

The following setup guides you through setting up an entirely new Bech32(SegWit) Wallet in Electrum. If you already have a wallet skip to the Extended Public Key copying.

Firstly, give your wallet a name, for example, `BTCPay Server Wallet` and click `Next`.

![ElectrumWallet](img/ElectrumWallet1.png)

Choose `Standard wallet` and proceed by clicking the `Next`button.

![ElectrumWallet](img/ElectrumWallet2.png)

Since we're creating a brand-new wallet,choose  `Create a new seed` and `Next`

![ElectrumWallet](img/ElectrumWallet3.png)

From the multiple choice menu, select `SegWit` and `Next`

![ElectrumWallet](img/ElectrumWallet4.png)

**IMPORTANT NOTE:** Write down your recovery words in the order you see them on the screen. Write them down a piece of paper and store it somewhere secure. Take your time and triple check each word. Do not store your seed in a digital format (photograph, text document). Whoever has the access to your seed can access your funds. Confirm that the seed has been properly backed up by re-entering it in the same order. Once the seed is validated, proceed to the next step.

![ElectrumWallet](img/ElectrumWallet6.png)

It's highly recommended that you encrypt your wallet. Select a password that you can easily remember and mark make sure `Encrypt Wallet File` is marked. Proceed by clicking `Next`.

![ElectrumWallet](img/ElectrumWallet7.png)

When the wallet loads (it may take few moments), in the top menu, click on the `Wallet` and then`Information` .

![ElectrumWallet](img/ElectrumWallet9.png)

Select and **copy** the `Master Public Key`. This is the **public** key from which BTCPay will derive addresses.

![ElectrumWallet](img/ElectrumWallet10.png)

Return to your BTCPay Server. Click on the `Stores` in the header menu and scroll until you see `Derivation Scheme` section. Click on the `Modify` link.

![WasabiWallet](img/WassabiWalletSetupBTCPay10.png)

Paste the `Master Public Key` into derivation scheme field as it is, without adding anything else. Make sure that `Enabled` checkbox is ticked and click `Continue`.

![WasabiWallet](img/WassabiWalletSetupBTCPay11.png)

Return to the Electrum Wallet. Go to `Receive tab` which shows your wallet receiving address.

Compare the address you see in Electrum Wallet to Addresses shown in BTCPay Server. If there's a match, `continue`. If there is no match, copy the address from Electrum and paste it into `Hint Address Form`. If you still can't get the matching, double-check that you're actually pasting `Master Public Key`.

![ElectrumWallet](img/ElectrumWallet11.png)

### Configuring the Gap Limit in Electrum

 In the top menu, click on the `View` and then`Show Console` .

![ElectrumWallet](img/ElectrumWallet11a.png)

Enter following commands in Electrum console and press `enter`on your keyboard.

```
 wallet.change_gap_limit(100)
 wallet.storage.write()  
```

![ElectrumWallet](img/ElectrumWallet12.png)

Restart your Electrum and verify that the newly set gap limit is correct by entering in the console:

```
wallet.gap_limit
```

There's no good answer to how much you should set the gap limit to.  Most merchants set 100-200. If you're a big merchants with high  transaction volume, you can try with even higher gap limit.

For more details about the [Gap Limit, check the FAQ](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet).

Electrum and BTCPay Server are now connected. Any payments received to your BTCPay will be visible in Electrum, where you can further spend them.


# Section 2. How to integrate ElectrumX into your BTCPay Server and connect your Electrum Wallet to it for your complete privacy
### (only available in BTCPay docker version)

Before we proceed, it is important to understand how your Electrum wallet on your PC/Mac functions so well/fast, without having its own bitcoin full node.  In actual fact, Electrum Wallet relies on a community effort to maintain a bunch of servers all around the world with a bitcoin full node that do this job for you! They are called Electrum Servers, and you can be a part of that community to make that network even stronger, lets see how.

When you click the little traffic light at the bottom of your Electrum Wallet here:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

You will see this screen with a list of all the available Electrum servers that your wallet can connect to, normally with "Select Server Automatically" already checked:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png)

While there is nothing wrong with "Select Server Automatically" per se, every transaction that you make/browse/broadcast in your Electrum Wallet will be using someone else's server to do it all.  Don't take this point as a threat, that is exactly what the Electrum server network is there to do and indeed how most users will safely use their wallet.  The people running those ElectrumX public servers are just like us, bitcoin enthusiasts who want to help adoption by playing their part.  If you are not (yet) into becoming your own completely sovereign and private bitcoin "bank" there is no need for you to read further, because everything is hunky-dory.

But, let's say you DON'T want to rely on or trust anyone else with your detailed blockchain queries and transactions.  After all, sending the entirety of your online wallet activity (including your IP address, receive/send addresses, amounts etc) through another server as your "proxy" to the blockchain might give you the heebie-jeebies.  If this is you, read on!

## Section 2.1 Enable Your Own ElectrumX Server (fully integrated with your BTCPay Server's full bitcoin node)

### Prerequisites (mandatory):

1. You are using or will use the [Docker version of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker)
2. You do NOT [prune your full bitcoin node](https://docs.btcpayserver.org/faq-and-common-issues/faq-synchronization#can-i-skip-the-synchronization) in BTCPay Server (i.e. you have synched and stored from genesis block, and you do not use the opt-save-storage [Environment Variable](https://docs.btcpayserver.org/faq-and-common-issues/faq-deployment#how-can-i-modify-deactivate-environment-variables))
3. You have at least 400GB of drive space on the drive where your docker volumes are stored (as at the writing of this documentation on 8th Nov 2019, my BTCPay Server volumes directory uses in total is 333G with full node and ElectrumX enabled and obviously it will grow further with time).
4. You are familiar with how to use BTCPays [Additional Fragment](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#environment-variables) feature as part of your environment variable setup.
5. Basic Linux command line knowledge: I guess you have that already, as you are reading this far.  This is tested fully on Ubuntu 18.04 but we assume this will work on any linux with BTCPay server and docker.

### How will enabling ElectrumX affect current BTCPay implementations?:

Fundamentally, setting up ElectrumX in BTCPay server is simple, and will not affect the rest of your implementation.  The only pre-requisites are as above.  The [ElectrumX official docker release](https://github.com/lukechilds/docker-electrumx)) is enabled in BTCPay by activating the [additional fragment](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose-) called [`opt-add-electumx`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-add-electumx.yml). This fragment will not only enable and start the ElectrumX server, it will also enable `txindex=1` in your bitcoin full node.  `txindex=1` (Transaction Index=ON) is a bitcoin core feature required for ElectrumX to be able to serve your Electrum Wallet detailed transaction data for any transaction, directly from the blockchain, without getting it from any third party server.

If you have been running your BTCPay Server for a while but haven't had `txindex=1` set until now, then it might take a few hours to build the index, this is no issue and it should not involve downtime of more than a few hours - better to set this to run overnight though when nobody will be using your node. Note: If you want to rebuild the index from scratch, launch bitcoind once with the `reindex=1` option (warning: this reindex option may take a VERY long time, and is not enabled out of the box as you likely dont need it, and hence is not in scope of this document).

### OK OK, I got it, now what do I have to do to make it work?!:

If you have read this far (you're a star!) and theres not much to do in order to set it all up.  Below are the steps to enable it in your BTCPay node.

1. ElectrumX Server is accessible for Electrum Wallets via TCP port 50002.  You need to open this port up fully at least to be available within your own network to any PC or Android device running Electrum Wallet, and turn on port forwarding (you really should setup port forwarding, and open 50002 up on your router to the whole world so that your ElectrumX Server becomes part of the Electrum Server ecosystem and becomes available to other Electrum wallet users on the internet.  There is no risk to do this, port 50002 is SSL encrypted out of the box, and is designed to accept connections from unknown Electrum Users.  Although, it is assumed you have this knowledge already if you want to do that, as there are too many router models out there to cover it in the scope of this document).
2. Enable the Docker Additional Fragment on your BTCPay node by running the following commands (this is assuming a brand new BTCPay installation with LND and ElectrumX, please tweak accordingly using the [relevant documentation](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose-):

3. Follow the [normal setup and install of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker#full-installation-for-technical-users), then after this command `cd btcpayserver-docker`, follow the below instructions instead of those in the link.  If you already have a BTCPay Server running, then just follow from the next step.

4. Set your environment variables:
```
export BTCPAY_HOST="YOURHOST.com" && export NBITCOIN_NETWORK="mainnet" && export BTCPAYGEN_CRYPTO1="btc" && export BTCPAYGEN_REVERSEPROXY="nginx" && export BTCPAYGEN_LIGHTNING="lnd" && export LIGHTNING_ALIAS="MY_LN" && export LETSENCRYPT_EMAIL="you@example.com" && BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx;opt-more-memory"
```
You can run all of that as one command after you tweak it to your needs.  The main part for our purposes in this guide of course is `BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx;opt-more-memory"`.  Note: `opt-more-memory` can be removed if you like, but I really recommend it if your system has more than 1GB of RAM/memory that you can assign to BTCPay server, it will speed synching your node and ElectrumX up drastically.

5. Set up or reconfigure BTCPay Server with ElectrumX:
`cd ~/BTCPayServer/btcpayserver-docker && . ./btcpay-setup.sh -i`
This will setup (or re-setup) your server with everything needed including ElectrumX, and it all should "just work"!  But, it will cause at least a couple of hours of syncing, and if it is a new server, could be a couple of days depending on your hardware.

6. WAIT... for your node to fully sync:
You can check the status of bitcoin core sync by going to your domain for BTCPay server, and it will show you on the front page.  Or, you can check from the command line as well, using these commands:
`docker logs btcpayserver_bitcoind` - this will show you the bitcoin core blockchain sync status (and ALL other info about your node, including any errors)
`docker logs generated_electrumx_1` - this will show you the ElectrumX sync status.  Note: ElectrumX will NOT start syncing until bitcoin full node has finished syncing, you will see errors until that is done direct.

Once all syncing for both bitcoin and ElectrumX has finished, you can proceed to the next step.  Electrum wallets will not connect to an Electrum server that has not finished synching.

## Section 2.2 Finally!  Connect your Electrum Wallet to Your Own ElectrumX Server

### Connect to ElectrumX from Electrum Wallet on your Mac/PC/Linux Machine:
When you click the little traffic light at the bottom of your Electrum Wallet here:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

You will see this screen with a list of all the available Electrum servers that your wallet can connect to, normally with `Select Server Automatically` already checked:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png)

Now is the time to UNCHECK that `Select Server Automatically` setting, which will enable you to enter the IP address or domain or hostname of your ElectrumX Server.  In the case below, the ElectrumX server is on the local network at `192.168.1.3` so we enter that manually (leave port as 50002) and press `close`.

![EnterElectrumXServerIP](https://user-images.githubusercontent.com/1388507/68496320-4e276580-0252-11ea-8caf-facc8a246d70.png)

If all of the above worked well, and your node is healthy, you will get a green traffic light down the bottom right of the wallet interface as pictured here - that means success!:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

You are now running your very own ElectrumX Server, and all of your interactions with the bitcoin blockchain happen directly from your server to the blockchain, without going over any other 3rd party servers!  You have attained full bitcoin transaction privacy (at least from the perspective of your blockchain queries and transactions, payment/receive addresses etc, nobody except you and the blockchain can see what you are doing).  Cool isn't it.

### Troubleshooting:

So there is one thing you may encounter, where even after you did everything correctly, you still get a red traffic light (which means not connected to any server) in the steps above.  I will add any other troubleshooting tips that people contribute here as needed.

- If you get a red traffic light, shutdown Electrum Wallet completely, then go to your Electrum Wallet folder ([see here](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) if you don't know where that is).

Inside the Electrum Wallet folder (in this case below, it is what it looks like on a Mac) locate the `certs` directory and delete the certificate for the server you are trying to connect to, in this case `192.168.1.3`, by dragging it to the Trash.

![Certs](https://user-images.githubusercontent.com/1388507/68497330-9a73a500-0254-11ea-9349-71bdb3bd9511.png)

Start up Electrum Wallet again, and connect to your ElectrumX server.  If it is fully synched, it will now likely show a green traffic light, and you are good to go!
