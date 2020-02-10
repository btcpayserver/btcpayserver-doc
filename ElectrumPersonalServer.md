[Electrum Personal Server or EPS](https://github.com/chris-belcher/electrum-personal-server) is a personal version of public Electrum servers like [ElectrumX](https://github.com/btcpayserver/btcpayserver-doc/blob/master/ElectrumX.md).

EPS can be integrated into BTCPay Server using the optional docker fragment [opt-add-electrum-ps.yml](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-add-electrum-ps.yml).  Use EPS when you want to use your own full node (included in BTCPay Server) to verify your own transactions privately when using Electrum Wallet. The biggest difference with public Electrum servers (eg. ElectrumX), is that EPS is for monitoring only your own wallet(s).  The "XPUB" (extended public key) of the wallet you use in Electrum must be shared with EPS in order for it to function all all. Other than this, it functions (from an end user perspective) in the same way as ElectrumX etc.  It is easy to integrate into BTCPay just follow the instructions below.

# How to integrate Electrum Personal Server (EPS) into your BTCPay Server and connect your Electrum Wallet to it for your complete privacy
### (only available in BTCPay docker version)


### Steps to enable Electrum Personal Server (EPS) in BTCPay:

1. EPS Server is accessible for Electrum Wallets via TCP port 50002.  You need to open this port up fully at least to be available within your own network to any PC or Android device running Electrum Wallet, and turn on port forwarding (you can also port forward 50002 from your Internet/WAN, to enable other Electrum Wallet users from the Internet to query your server).

2a. Enable the Docker Additional Fragment on your BTCPay node by running the following commands (this is assuming a brand new BTCPay installation with LND and EPS, please tweak accordingly using the [relevant documentation](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose-):

2b. You must specify the XPUB/YPUB/ZPUB of your wallet in the docker fragment before you enable it.  In Electrum Wallet go to the "Wallet" menu then select "Information" to copy and paste yours.  Add it to the relevant line in the docker-fragment.

3. Follow the [normal setup and install of BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker#full-installation-for-technical-users), then after this command `cd btcpayserver-docker`, follow the below instructions instead of those in the link.  If you already have a BTCPay Server running, then just follow from the next step.

4. Set your environment variables:
```
export BTCPAY_HOST="YOURHOST.com" && export NBITCOIN_NETWORK="mainnet" && export BTCPAYGEN_CRYPTO1="btc" && export BTCPAYGEN_REVERSEPROXY="nginx" && export BTCPAYGEN_LIGHTNING="lnd" && export LIGHTNING_ALIAS="MY_LN" && export LETSENCRYPT_EMAIL="you@example.com" && BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrum-ps;opt-more-memory"
```
You can run all of that as one command after you tweak it to your needs.  The main part for our purposes in this guide of course is `BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrum-ps"`.  Note: `opt-more-memory` can be removed if you like, but I really recommend it if your system has more than 1GB of RAM/memory that you can assign to BTCPay server, it will speed synching your node and the general performance of EPS up drastically.

5. Set up or reconfigure BTCPay Server with EPS:
`cd ~/BTCPayServer/btcpayserver-docker && . ./btcpay-setup.sh -i`
This will setup (or re-setup) your server with everything needed including EPS, and it all should "just work".  But, it will trigger at least a couple of hours of syncing the `txindex`, and if it is a new server, could be a couple of days depending on your hardware.

6. WAIT for your node to fully sync:
You can check the status of bitcoin core sync by going to your domain for BTCPay server, and it will show you on the front page.  Or, you can check from the command line as well, using these commands:
`docker logs btcpayserver_bitcoind` - this will show you the bitcoin core blockchain sync status (and ALL other info about your node, including any errors)
`docker logs generated_electrum_ps_1` - this will show you the EPS sync status.  Note: EPS will NOT start syncing until bitcoin full node has finished syncing, you will see errors until that is finished and these can be ignored.

Once all syncing for both bitcoin and EPS has finished you can proceed to the next step.  (Note: Electrum wallets will not connect to an EPS server that has not finished synching)

## Section 2.2 Connect your Electrum Wallet (Desktop or Android) to your EPS Server

### Connect to EPS from Electrum Wallet on your Mac/PC/Linux Machine:

Read all of this first before proceeding.  You may wish to do just the "Protip" below instead of the manual steps in the Electrum Wallet GUI.

Open Electrum Wallet.  When you click the traffic light at the bottom of your Electrum Wallet:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

You will see this screen with a list of all the available Electrum servers that your wallet can connect to, normally with `Select Server Automatically` already checked:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png)

Now is the time to UNCHECK that `Select Server Automatically` setting, which will enable you to enter the IP address or domain or hostname of your EPS Server.  In the case below, the EPS server is on the local network at `192.168.1.3` so we enter that manually (leave port as 50002) and press `close`.

![EnterElectrumXServerIP](https://user-images.githubusercontent.com/1388507/68496320-4e276580-0252-11ea-8caf-facc8a246d70.png)

If all of the above worked well, and your node is healthy, you will get a green traffic light down the bottom right of the wallet interface as pictured here - that means success!:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

#### Protip - optionally perform the above steps directly in Electrum Wallet config file before even opening the wallet GUI:
If you prefer to avoid connecting to other servers from the outset when you open Electrum Wallet, do the following before you open Electrum Wallet GUI.

In the Electrum Wallet folder ([see here](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) if you don't know where that is), open and edit the `config` file like this:

1. Find line: `"auto_connect": true,` and switch it to: `"auto_connect": false,` - this will prevent your Electrum Wallet from auto-connecting to other 3rd party Electrum Servers at launch time (to obtain block headers and transaction information).

2. Find line: `"oneserver": false,` and switch it to: `"oneserver": true,` - ensures that all data is obtained from just one server.

3. Find or add line: `"server": "SOMEIPADDRESS:50002:s",`and switch it to your own EPS Server's IP address, in the example above this would be: `"server": "192.168.1.3:50002:s",`- hard code your IP address as the default upon opening the Wallet.

These 3 steps optional but recommended for full privacy by locking down Electrum Wallet to one single connection with your private server ([Reference](https://github.com/chris-belcher/electrum-personal-server#how-to)).

### Reflection on what has been achieved:

You are now running your very own private EPS Server.  All Electrum Wallet related data transfer happens directly between your EPS Server and the bitcoin blockchain, without going over any other 3rd party servers.  You have attained full bitcoin transaction privacy (at least from the perspective of your blockchain queries and transactions, payment/receive addresses etc - nobody except you and the blockchain can see what you are doing).

### Troubleshooting:

So there is one thing you may encounter, where even after you did everything correctly, you still get a red traffic light (which means not connected to any server) in the steps above.  Any other troubleshooting tips that people encounter can be added, I would suggest to make a PR to this document directly.

- If you get a red traffic light, shutdown Electrum Wallet completely, then go to your Electrum Wallet folder ([see here](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) if you don't know where that is).

Inside the Electrum Wallet folder (in this case below, it is what it looks like on a Mac) locate the `certs` directory and delete the certificate for the server you are trying to connect to, in this case `192.168.1.3`, by dragging it to the Trash.

![Certs](https://user-images.githubusercontent.com/1388507/68497330-9a73a500-0254-11ea-9349-71bdb3bd9511.png)

Start up Electrum Wallet again, and connect to your EPS server.  If it is fully synched, it will now likely show a green traffic light, and you are good to go.
