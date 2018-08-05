# FAQ

See also [The Merchants Guide to accepting Bitcoin directly with no intermediates through BTCPay](https://www.reddit.com/r/Bitcoin/comments/81h1oy/the_merchants_guide_to_accepting_bitcoin_directly/).

## Why is my ledger not detected by BTCPay Server?

Check that you are running the ledger app with a version equals or above 1.2.4.
 
 If the problem persists, contact the owner of the BTCPay Server: The reverse proxy of the BTCPay server hosting BTCPay might not support Websocket.

To confirm this is the issue, create a new invoice and go on its checkout page, you can also go on your store's "Wallet" page.
You should then you will see this error in the javascript console.

```
WebSocket connection to ‘wss://pay.example.com/i/4yhCmpWxJcHfVG3rV4EmEu/status/ws’ failed: Error during WebSocket handshake: Unexpected response code: 404
```

To fix the situation, if your reverse proxy is nginx, make sure that the following is included at the top of `/etc/nginx/conf.d/default.conf`.

```
# If we receive Upgrade, set Connection to "upgrade"; otherwise, delete any
# Connection header that may have been passed to this server
map $http_upgrade $proxy_connection {
  default upgrade;
  '' close;
}
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $proxy_connection;
```

Then restart nginx.

```
/etc/init.d/nginx reload
```

## Does BTCPay Server support crypto to fiat conversion?

No

## Where can I get help/support?

BTCPay is an open-source project. The best way to ask questions is through the Slack group.

## How much does it cost?

If you are using the simplest way to deploy, it costs around 70$ per month.

You have to register with Microsoft Azure server. Upon registration, you'll get 200$ free credits which will be enough for the first few months of for running the server, so basically, there are no upfront costs. Be aware that BTCPay is free; it does not cost a dime, you're paying Microsoft here for the server which will keep your node online 24/7.

After you buy the server, there is a single one-click deploy button you have to click. It will take you to your Azure VM and configure everything for you. There are few things you have to change yourself. ([See this video](https://www.youtube.com/watch?v=Bxs95BdEMHY) for a demonstration)

## Can the cost of running BTCPay be cheaper?

Yes it can. Currently, the one-click deployment requires Azure Virtual Machine, but if you’re a programmer or understand VM’s you can deploy one on a different VM. Furthermore, the changes in the Bitcoin Core 0.16.0 (BIP159) make it possible to run the full node in pruned mode to save more disk space.

Also, once the full node is synchronized to the network, you can downgrade the machine on Azure to take a less expensive one.

Please checkout out [The guide for penny pinching your Azure install](PennyPinching.md).

## I previously installed BTCPayServer without the integrated lightning support, can I migrate?

The integrated lightning support is only useful for scenario where you are at the same time the host and the merchant of BTCPay Server.

When logged as admin of your server you will then have a nice link to connect to plug your lightning node to BTCPay Server.

![LightningNode](img/setuplightningnode.png)

You can then click on `Test Connection` in this page to see if you successfully configured your lightning node.

Depending on how you deployed BTCPayServer you might have different step to do:

### Case 1: You manually installed

If you installed BTCPayServer manually without docker or Azure, then you only need to start run [CLightning](https://hub.docker.com/r/nicolasdorier/clightning/) with the correct network parameter.

Assuming you are running as root, CLightning will allow call to its API via a unix socket on `/root/.lightning/lightning-rpc`

Once this is done, make sure you start BTCPayServer with

```
-btclightning=/root/.lightning/lightning-rpc
```

If you are using CLightning for Litecoin, use the parameter `-ltclightning` instead.

Then, make sure the port lightning network ports `9735` (BTC) and `9736` (LTC) are open on your firewalls.

### Case2: You are using docker (without Azure)

In this case, you only have to change the docker-compose you are using.
If before you were using `docker-compose -f "$(pwd)/Production/docker-compose.btc-ltc.yml" up -d` (as documented [here](https://github.com/btcpayserver/btcpayserver-docker#for-docker-noobs)), then you need to change to `docker-compose -f "$(pwd)/Production/docker-compose.btc-ltc-clightning.yml" up -d`.

Then, make sure the port lightning network ports `9735` (BTC) and `9736` (LTC) are open on your firewalls.

### Case3: You are using Azure

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

![SecurityRules](img/azuresecurityrule.png)

## I get "WARNING: The LIGHTNING_ALIAS variable is not set. Defaulting to a blank string" when starting container

You can ignore this.
If you want to set an alias for your lightning node, open the env file:

```
sudo su -
vim $BTCPAY_ENV_FILE
```

And add or modify the `LIGHTNING_ALIAS` entry to `LIGHTNING_ALIAS=myawesomenode`.

## I lost the password of my admin account, can I fix the situation?

Yes, you need to edit your database. Register new user, says "newadmin@example.com":

Assuming you use docker:

```bash
# In root
sudo su -
# Connect to your postgres container
docker exec -ti $(docker ps -a -q -f "name=postgres_1") bash
# Switch to postgres user
su postgres
# Run psql
psql
# Connect to db
\c btcpayservermainnet
INSERT INTO "AspNetUserRoles" Values ( (SELECT "Id" FROM "AspNetUsers" WHERE "Email"='newadmin@example.com'), (SELECT "Id" FROM "AspNetRoles" WHERE "NormalizedName"='SERVERADMIN'));
```

Now you can access with `newadmin@example.com` as admin.
