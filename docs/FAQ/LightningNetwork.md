# Lightning Network FAQ

This document clarifies some of the most common questions and issues users face with the Lightning Network in BTCPay. Before you start using the off-chain protocol, familiarize yourself with the risks. Additionally, read [Getting Started with Lightning Network in BTCPay](../LightningNetwork.md)

[[toc]]

## Lightning Network General FAQ

Here are some general questions about LN in BTCPay, regardless of the implementation.

### How many users can use Lightning Network in BTCPay?

On a self-hosted server, you can use only one internal Lightning node. Server owners can use the same Lightning node for an unlimited number of stores tied to their admin account.

Since version 1.0.3.128, a BTCPay Server host can enable it's registrants to use the internal Lightning Network node.
It can be enabled in Server Settings > Policies > Allow non-admins to use the internal lightning node in their stores.

![Enable LN for Others](../img/ThirdPartyEnableLNOthers.png)

:::warning As a third-party host
All your registrants' funds will go to your own Lightning Wallet.
You will have to manually check and redispatch the funds to their respective owners. This could potentially become a maintenance and legal burden. Be aware of laws in your country.
:::

:::danger As an individual using a third-party host
All payments made through the Lightning Network will go to your third-party's wallet.
Take precautions and only use this option while using a trustworthy third-party host to ensure you get your funds back. In general this should be avoided and you should use available self-hosted options.
:::

Non-admin users can also connect to their own external nodes or connect their custodial and self-custodial wallets, refer to our [Lightning Network](../LightningNetwork.md) guide for more information.

### How to find node info and open a direct channel with a store using BTCPay?

If you're a customer trying to pay a Lightning Network invoice:

1. make sure to select "Lightning" from coin selection.
2. Select Copy/Scan
3. Select Node Info and scan or copy it manually.

![BTCPay Checkout](../img/btcpay-node-info.jpg)

The exact procedure of opening a direct Lightning Network channel depends on the wallet you’re using. But, you should be able to figure it out easily now that you have merchant’s node information.

### As a merchant, do I need to open direct channels?

Merchants need incoming channels. Other people opening a channel with them provides liquidity to the merchant. 

You can also ask well-connected nodes to open a direct channel with you. Opening a channel is not spending funds, it’s more like putting the funds on a pre-paid card, and spending it later, or withdrawing it by closing a channel.

You can also look into getting inbound liquidity by using Lightning Service Providers (LSPs), refer to our [managing liquidity guide](../LightningNetwork-Setup/#manage-liquidity-via-a-lightning-service-provider-lsp) for more information.

### How can I get inbound capacity to my node?

There are many ways in which one can get an inbound capacity. E.g. by spending your existing LN balance, [collaboratively opening channels with others](https://lightningnetwork.plus/), or [using LSPs](../LightningNetwork-Setup/#manage-liquidity-via-a-lightning-service-provider-lsp). For a more technical explanation, you can read [practical tips to inbound capacity](https://medium.com/lightningto-me/practical-solutions-to-inbound-capacity-problem-in-lightning-network-60224aa13393).
When asking for inbound capacity or using LSPs, you may want to consider any routing policy fees the service may have as well as reliability and connections of the service.

### I previously installed BTCPayServer without lightning, can I enable it?

BTCPay Server will allow you to set up your Lightning at any moment after creating your first store.
We currently support three implementations of the Lightning Network.

- [LND](https://github.com/lightningnetwork/lnd)
- [Core Lightning (CLN)](https://github.com/ElementsProject/lightning)
- [eclair](https://github.com/ACINQ/eclair)

![Connecting Lightning to store](../img/FAQ/btcpaylightningfaq1.jpg)

Want to learn more on how to set up your store with Lightning ?
Follow along the [Lightning Network](../LightningNetwork.md) guide, and you will get your store connected to Lightning Network!

### Can I use a pruned node with LN in BTCPay?

It is recommended to use Core Lightning (CLN) because the implementation supports pruned nodes.

### Can I use my existing LN node with BTCPay?

If you already have a well connected Lightning Network node with sufficient inbound liquidity, you may want to use it with BTCPay instead of the included lightning node.

To do so, go to the lightning node settings page of your store (Store > Settings > Lightning > Modify). Here on the lightning node setting page, select the option for Use a custom lightning node.

The connection strings vary per lightning implementation, the [settings page](../LightningNetwork-Setup.md#connecting-an-external-lightning-node-in-btcpay-server) contains the documentation for the connection settings to give you further guidance.

<a id="how-to-change-from-c-lightning-to-lnd-or-vice-versa"></a>

### How to change from Core Lightning (CLN) to LND or vice-versa?

:::warning
Be sure to have closed all channels and removed both on-chain and Lightning funds from the Lightning node before switching from one to the other.
:::

You need to SSH log in into your virtual machine.

To switch to LND:

```bash
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_LIGHTNING="lnd"
. ./btcpay-setup.sh -i
```

To switch to Core Lightning (CLN):

```bash
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_LIGHTNING="clightning"
. ./btcpay-setup.sh -i
```

### I switched Lightning Network implementation, but getting "no payment available" error

When you switch from one implementation to another, you need to reconfigure your lightning connection string at a store level, to use adequate implementation. Stores > Settings > Lightning > Setup > **Connection string**. In connection string, click on the "click here" link.

### I get "WARNING: The LIGHTNING_ALIAS variable is not set. Defaulting to a blank string" when starting container

You can ignore this.
If you want to set an alias for your lightning node, open the env file:

```bash
sudo su -
vim $BTCPAY_ENV_FILE
```

And add or modify the `LIGHTNING_ALIAS` entry to `LIGHTNING_ALIAS=myawesomenode`.

### How to display my Lightning Node information so that others can connect to me?

:::tip
As the Lightning Network matured it turned out that connecting your own LN node to each merchant is not recommended. If you even run your own LN node these days, it's more common to have connections to a few well connected LN nodes like LSPs or exchanges.
::: 


The information other users need to connect to your node, is already displayed at the checkout. Sometimes, merchants want to display their node so that their customers can connect beforehand.

There are numerous ways to find your node information, but the easiest way to display it to others is by using Lightning Node info page. Go to Store > Settings > Lightning > Modify. At the bottom of the page, there is a "Open Public Node Page" button. Click on it to see the information. The page can be embedded into your website with `<iframe>`.

![BTCPay Checkout](../img/LightningNodepPageInfo.png)


### Where can I find recovery seed backup for my Lightning Network wallet in BTCPay Server?

Originally BTCPay did use `noseedbackup`, so you couldn’t backup your LN wallet or get your recovery seed. This was because in Lightning Network there was no solution for backing up funds in channels, just in your on-chain wallet.
By now LND has functionality like static channel backup that depends on seed presence.
But once again, please understand that the Lightning Network is still in an experimental phase and do not put funds into it, which you're not [willing to lose](https://www.youtube.com/watch?v=5fMv8MpzLgQ).

#### Using LND with seed (since [`v1.0.3.138`](https://github.com/btcpayserver/btcpayserver/releases/tag/v1.0.3.138))

You can find the LND Seed Service under:

- Server Settings > Services > LND Seed Backup

![LND Seed Backup service](../img/LND-Service-Seed-Backup.jpg)

Safely backup and store your recovery seed. The seed is a backup of your on-chain Lightning wallet, but is also necessary to perform static channel backups.

![LND Seed Backup example](../img/LND-With-Seed-Example.jpg)

If you backed it up safely you can remove it from the server.

If you migrate from an older version to `v1.0.3.138` [this blog post on how to do the migration](https://blog.btcpayserver.org/btcpay-lnd-migration) might be helpful.

### How to disable on-chain payments and use LN payments only?

There are two easy ways to do this:

1. Store > Settings > Checkout experience > Choose default payment method at checkout
2. Store > Settings > Modify > Uncheck the Enabled box to disable on-chain payments

### How to see my Lightning Network version?

You can check your Lightning Network version from the command line.
For LND

```bash
sudo su -
cd btcpayserver-docker
./bitcoin-lncli.sh help
```

For Core Lightning (CLN)

```bash
sudo su -
./bitcoin-lightning-cli.sh getinfo
```

Most of the wallets (RTL, Zap, Zeus, etc.) that are able to your lightning node remotely will display the version on the front-end as well.

### How to redirect a Lightning Address?

Use case: Your run a BTCPay server at `pay.example.com`, but want to use `me@example.com` as your Lightning Address, because it looks nicer than `me@pay.example.com`.

All you need to do is set up a `301` redirect from `example.com/.well-known/lnurlp/me` to `pay.example.com/.well-known/lnurlp/me`.
You can do so in your webserver configuration, here is an example for nginx:

```nginx
server {
  server_name example.com;

  # Redirect Lightning Address requests to BTCPay Server
  rewrite ^/\.well-known/lnurlp/(.*)$ https://pay.example.com/.well-known/lnurlp/$1 permanent;
}
```

## Lightning Network LND FAQ

Here are some of the common questions about the [LND implementation](https://github.com/lightningnetwork/lnd/issues) of the Lightning Network.

### How to restart my LND?

```bash
sudo su -
docker restart btcpayserver_lnd_bitcoin
```

### How to rescan the LND on-chain wallet?

:::warning
only enable this fragment temporarily to reset the on-chain wallet transactions of lnd and to trigger a rescan
after a successful rescan, you should disable this fragment again, or it will rescan the on-chain wallet at
every restart!
WARNING: The rescan can only pick up the transactions within your archived blocks (beware of PRUNED nodes!)
:::
To customize LND settings which are not available as environment variables, you can [create a custom fragment](../Docker/README.md#how-can-i-customize-the-generated-docker-compose-file) in `docker-compose-generator/docker-fragments/opt-lnd-wallet-rescan.custom.yml` like this:

```
version: "3"
services:
  lnd_bitcoin:
    environment:
      LND_EXTRA_ARGS: |
        reset-wallet-transactions=1
  lnd_litecoin:
    environment:
      LND_EXTRA_ARGS: |
        reset-wallet-transactions=1
  lnd_bitcoingold:
    environment:
      LND_EXTRA_ARGS: |
        reset-wallet-transactions=1
```

For more information on this LND feature, see [their documentation](https://github.com/lightningnetwork/lnd/blob/master/docs/recovery.md#forced-in-place-rescan).

### How to see LND logs?

To check the logs of your LND node in BTCPay Server (Docker installations) use the following command:

`docker logs --tail 40 btcpayserver_lnd_bitcoin`

You can change 40 to whatever number you wish. The number represents the lines of code that will be shown. For more information about the logs, see [Troubleshooting page](../Troubleshooting.md)

### What’s the default directory of LND in BTCPay?

`/var/lib/docker/volumes/generated_lnd_bitcoin_datadir/_data`

### Which macaroon needs to be provided for external nodes?

BTCPay Server needs the `admin.macaroon` to check whether the lightning node is fully synced before creating an invoice.
If you want to tailor a macaroon specific to the BTCPay Server connection, use the LND macaroon bakery:

```bash
lncli bakemacaroon address:read address:write info:read invoices:read invoices:write onchain:read
```

### LND connection issues after an update

Authentication tends to fail on LND after an update, symptoms are:

- In store settings, when testing the connection to your node you get `Error while connecting to the API (The HTTP status code of the response was not expected (500).)`
- In Zap wallet, `Unable to connect to host: cannot retrieve macaroon: cannot get macaroon: root key with id 0 doesn’t exist`

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

### LND wallet stays locked: invalid passphrase for master public key

If Lightning stopped working after an update and the LND logs (`docker logs --tail 40 btcpayserver_lnd_bitcoin`) show one of these lines:

```
[initunlocklnd] Password change or macaroon rotation failed: {"code":2, "message":"invalid passphrase for master public key", "details":[]}
[initunlocklnd] Wallet unlocking failed, lnd returned: {"code":2, "message":"invalid passphrase for master public key", "details":[]}
```

then LND's wallet password no longer matches the one BTCPay Server saved in `walletunlock.json`, so BTCPay cannot unlock the wallet ([as explained in this issue](https://github.com/btcpayserver/btcpayserver-docker/issues/1112)).
Your funds are not lost: the wallet can be rebuilt from your seed with a new password while keeping your channels.

To recover your LND, follow the guide below. [Credit to damanic for the original recovery instructions and testing](https://github.com/btcpayserver/btcpayserver-docker/issues/1112#issuecomment-6107536989).

:::danger
Do not delete `wallet.db` and simply restart BTCPay Server. When LND has no wallet, BTCPay Server creates a **new** wallet with a **new** seed and overwrites `walletunlock.json`, and your channels can no longer be used.
Never run two LND instances on the same data, and never start LND from an old copy of `channel.db` once the node has run again.
:::

You need the 24-word seed of this node: either under Server Settings > Services > LND Seed Backup (if you did not remove it from the server), or your own written backup.
If the node has a seed passphrase, you need it too.

Connect to your server with SSH and run, as root (`sudo su -`). Replace `mainnet` if your node runs on another network:

```bash
lnd_network=mainnet
lnd_container=btcpayserver_lnd_bitcoin
lnd_image=$(docker inspect -f '{{.Config.Image}}' $lnd_container)
lnd_docker_network=$(docker inspect -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{end}}' $lnd_container)
rescue_dir=/root/lnd-rescue
```

1. Stop LND and back up its data:

   ```bash
   docker stop $lnd_container
   mkdir -p $rescue_dir && chmod 700 $rescue_dir
   docker run --rm --volumes-from $lnd_container -v $rescue_dir:/backup --entrypoint tar $lnd_image czf /backup/lnd-full.tgz -C /data .
   ```

   Keep this archive until the node works again. It contains your seed, so treat it like the seed.

2. Create the new wallet password and save it before using it:

   ```bash
   head -c 24 /dev/urandom | base64 > $rescue_dir/new-password && chmod 600 $rescue_dir/new-password
   cat $rescue_dir/new-password
   ```

3. Move the locked wallet, all macaroon files and any pending password change (`walletunlock.json.newpassword`) aside. `channel.db`, which holds your channels, stays in place.
   The macaroon files must move too: LND only creates new ones when none exist, and the old ones do not work with the rebuilt wallet.

   ```bash
   docker run --rm -i --volumes-from $lnd_container --entrypoint sh $lnd_image -s $lnd_network <<'EOF'
   set -e
   d=/data/data/chain/bitcoin/$1
   mkdir -p /data/locked-wallet/chain /data/locked-wallet/root
   for f in $d/wallet.db $d/macaroons.db $d/*.macaroon $d/walletunlock.json.newpassword; do
     if [ -e "$f" ]; then mv "$f" /data/locked-wallet/chain/; fi
   done
   for f in /data/*.macaroon; do
     if [ -e "$f" ]; then mv "$f" /data/locked-wallet/root/; fi
   done
   if [ -e $d/wallet.db ]; then echo "wallet.db is still in place: stop here"; exit 1; fi
   ls -l /data/data/graph/$1/channel.db
   EOF
   ```

4. Start a temporary LND without BTCPay Server's automatic unlock, so it cannot create a new wallet. The `lnd_bitcoin` alias is needed because LND's configuration listens on that name:

   ```bash
   docker run -d --name lnd_rescue --volumes-from $lnd_container --network $lnd_docker_network --network-alias lnd_bitcoin --entrypoint lnd $lnd_image --lnddir=/data
   ```

5. Recreate the wallet from your seed with the new password:

   ```bash
   docker exec -it lnd_rescue lncli --lnddir=/data --network=$lnd_network create
   ```

   Paste the password from step 2 (twice), answer `y` to "existing cipher seed mnemonic", enter the 24 words, enter your seed passphrase if you have one (otherwise press Enter), and keep the default recovery window.

6. Check that this is the same node. The `identity_pubkey` must be your node's old public key; if it is not, the seed is wrong: stop here and ask for help.

   ```bash
   docker exec lnd_rescue lncli --lnddir=/data --network=$lnd_network --macaroonpath=/data/admin.macaroon getinfo
   ```

7. Wait until LND has found your on-chain funds. Repeat this command until it shows `"recovery_finished": true`; on mainnet this can take a while:

   ```bash
   docker exec lnd_rescue lncli --lnddir=/data --network=$lnd_network --macaroonpath=/data/admin.macaroon getrecoveryinfo
   ```

8. Stop the temporary LND, save the new password for BTCPay Server, and start LND again:

   ```bash
   docker exec lnd_rescue lncli --lnddir=/data --network=$lnd_network --macaroonpath=/data/admin.macaroon stop
   docker wait lnd_rescue && docker rm lnd_rescue
   docker run --rm -i --volumes-from $lnd_container -v $rescue_dir:/rescue --entrypoint sh $lnd_image -s $lnd_network <<'EOF'
   set -e
   f=/data/data/chain/bitcoin/$1/walletunlock.json
   jq --arg p "$(cat /rescue/new-password)" '.wallet_password = $p' $f > $f.new
   mv $f.new $f
   EOF
   docker start $lnd_container
   ```

9. Check that BTCPay Server unlocked it and your channels are back:

   ```bash
   docker logs --tail 40 $lnd_container 2>&1 | grep initunlocklnd
   docker exec $lnd_container lncli --network=$lnd_network --macaroonpath=/data/admin.macaroon listchannels
   ```

   The log should end with `Wallet unlocked`. Then restart BTCPay Server (`btcpay-restart.sh`) so it uses the new macaroon.

The rebuilt wallet has new macaroons, so reconnect any external wallet (for example Zeus) under Server Settings > Services, and recreate custom macaroons.
When everything works, delete `$rescue_dir` and `/data/locked-wallet` (it holds the locked wallet and the old macaroons).

If the seed does not match your node, or your channels do not come back, keep all files and follow [Recovering LND with a static channel backup](/Docker/backup-restore/#recovering-lnd-with-a-static-channel-backup), which asks your peers to close the channels and returns the funds on-chain.

### How to change my LND Node alias?

To change the display name of your LND node, you should ssh log in into your virtual machine and apply the following:

```bash
sudo su -
cd btcpayserver-docker
export LIGHTNING_ALIAS="namehere"
. ./btcpay-setup.sh -i
```

### How to edit lnd.conf?

To customize [LND settings](https://docs.lightning.engineering/lightning-network-tools/lnd/lnd.conf) which are not available as environment variables, you can [create a custom fragment](../Docker/README.md#how-can-i-customize-the-generated-docker-compose-file) in `docker-compose-generator/docker-fragments/opt-lnd-config.custom.yml` like this:

```yml
version: '3'
services:
  lnd_bitcoin:
    environment:
      LND_EXTRA_ARGS: |
        minchansize=1234567
```

You can add your customizations in the `LND_EXTRA_ARGS` value, like shown by setting the `minchansize` value.

Afterwards the configuration has to be added to the additional fragments and setup needs to be run:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-lnd-config.custom"
. ./btcpay-setup.sh -i
```

This way your custom settings gets added to the config and they will persist updates.

### How to connect to a LND watchtower?

To connect a LND watchtower you need to integrate the [`opt-lnd-wtclient`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-lnd-wtclient.yml) fragment and optionally configure the `LND_WTCLIENT_SWEEP_FEE`:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-lnd-wtclient"
export LND_WTCLIENT_SWEEP_FEE=10 # Fee to be used for sweep transaction, 10 sat/vbyte is the default
. ./btcpay-setup.sh -i
```

Afterwards you can use the `wtclient` RPC commands for managing the connections to watchtowers:

```bash
# Connect to a remote watchtower
./bitcoin-lncli.sh wtclient add PUBKEY@IP:PORT

# See your watchtower connections
./bitcoin-lncli.sh wtclient towers
```

### How to run a LND watchtower?

You can run a watchtower alongside your LND instance by integrating the [`opt-lnd-watchtower`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-lnd-watchtower.yml) fragment:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-lnd-watchtower"
. ./btcpay-setup.sh -i
```

This will make the watchtower available on the server.

To allow connections from other watchtower clients (via the [wtclient RPC commands]()), you will need to add the `watchtower.externalip` to a [custom fragment](../Docker/README.md#how-can-i-customize-the-generated-docker-compose-file) in `docker-compose-generator/docker-fragments/opt-lnd-config.custom.yml` like this:

```yml
version: '3'
services:
  lnd_bitcoin:
    environment:
      LND_EXTRA_ARGS: |
        watchtower.externalip=YOUR_SERVER_IP
```

Afterwards the configuration has to be added to the additional fragments and open the port `9911` in the firewall settings:

```bash
# Add the custom LND fragment
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-lnd-config.custom"
. ./btcpay-setup.sh -i

# Open port the watchtower RPC port in the firewall
ufw allow 9911/tcp
```

Running the `tower info` command should then list your public watchtower instance in  the `uris` section.

```bash
# ./bitcoin-lncli.sh tower info
{
    "pubkey": "YOUR_TOWER_PUBKEY",
    "listeners": [
        "172.23.0.9:9911",
        "127.0.0.1:9911"
    ],
    "uris": [
        "YOUR_TOWER_PUBKEY@YOUR_SERVER_IP:9911"
    ]
}
```

Learn more about [configuring watchtowers](https://docs.lightning.engineering/lightning-network-tools/lnd/watchtower).

### How to install ThunderHub?

To install ThunderHub on your instance apply the following:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-add-thunderhub"
. btcpay-setup.sh -i
```

If you get the following warning message **Unable to connect to this node** it is probably because the certificate used to communicate with LND doesn't have the correct domains. LND doesn't generate new ones unless the previous ones are deleted first.

To delete the old certificate and key and have LND generate new ones, apply the following:

```bash
docker exec btcpayserver_lnd_bitcoin rm /data/tls.cert
docker exec btcpayserver_lnd_bitcoin rm /data/tls.key
docker restart btcpayserver_lnd_bitcoin
docker restart generated_bitcoin_thub_1
```

<a id="lightning-network-c-lightning-faq"></a>

## Lightning Network Core Lightning (CLN) FAQ

Here are some of the common questions about the [Core Lightning (CLN)](https://github.com/ElementsProject/lightning/issues) implementation of the Lightning Network.

<a id="how-to-restart-my-c-lightning"></a>

### How to restart my Core Lightning (CLN)?

```bash
sudo su -
docker restart btcpayserver_clightning_bitcoin
```

### How to announce an IPv6 address?

First, copy `bitcoin-clightning.yml` into the docker fragment folder as `bitcoin-clightning.custom.yml`.
Important: the file must end with `.custom.yml`, or there will be git conflicts whenever you run `btcpay-update.sh`.

Modify the new `bitcoin-clightning.custom.yml` as the following:

```yaml
services:
  clightning_bitcoin:
    environment:
      LIGHTNINGD_OPT: |
        announce-addr=[ipv6 here]
```

Make sure to insert the address between the two square brackets [].

Then set it up:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="bitcoin-clightning.custom"
. ./btcpay-setup.sh -i
```

### How to edit .lightning/config?

To customize the [Core Lightning settings](https://docs.corelightning.org/reference/lightningd-config) which are not available as environment variables, you can [create a custom fragment](../Docker/README.md#how-can-i-customize-the-generated-docker-compose-file) in `docker-compose-generator/docker-fragments/opt-lightningd-config.custom.yml` like this:

```yml
version: '3'
services:
  clightning_bitcoin:
    environment:
      LIGHTNINGD_OPT: |
        alias=MyNodeName
        rgb=003366
```

You can add your customizations in the `LIGHTNINGD_OPT` value, like shown by setting the `alias` and `rgb` values.

Afterwards the configuration has to be added to the additional fragments and setup needs to be run:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-lightningd-config.custom"
. ./btcpay-setup.sh -i
```

This way your custom settings gets added to the config and they will persist updates.

## Lightning Network Questions and Support

Community support for Lightning Network questions is pretty limited, since the protocol is fairly new.

If you're facing a technical problem with your Lightning Network implementation, that's not documented here you may want to ask questions in their respective communities.

#### LND Support

- [LND GitHub](https://github.com/lightningnetwork/lnd/issues)
- [Lightning Community on Slack](https://lightningcommunity.slack.com)

#### Core Lightning (CLN) Support

- [CLN GitHub](https://github.com/ElementsProject/lightning/issues)
- [CLN Telegram Group](https://t.me/lightningd)
- [CLN docs](https://lightning.readthedocs.io/)
