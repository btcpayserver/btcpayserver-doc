# BTCPay Synchronization Issues

This document covers the most common questions and issues that may occur during BTCPay sync.

* [Why does BTCPay sync?](#why-does-btcpay-sync)
* [Can I skip/speed up the sync?](#can-i-skip-the-synchronization)
* [How do I know that the sync is finished?](#how-do-i-know-that-btcpay-synced-completely)
* [How can I check the block height of my bitcoin node?](#how-can-i-check-the-block-height-of-my-bitcoin-node)
* [BTCPay takes forever to synchronize](#btcpay-server-takes-forever-to-synchronize)
* [BTCPay Server keeps showing that my node is always starting](#btcpay-server-keeps-showing-that-my-node-is-always-starting)
* [I already have a synced full node, can I use it with BTCPay?](#im-running-a-full-node-and-have-a-synched-blockchain-can-btcpay-use-it-so-that-it-doesnt-have-to-do-a-full-sync)
* [How to enable Bitcoin node pruning?](#how-to-enable-bitcoin-node-pruning)
* [How to disable Bitcoin node pruning?](#how-to-disable-bitcoin-node-pruning)

## Why does BTCPay sync?

After deployment, your BTCPay Server needs to sync the entire blockchain and validate all the consensus rules. Depending on your machine specifications, bandwidth and number of altcoins you added, this process may take between 1-5 days.

It may seem tedious, but it's a critical step of running your own full node and not having to trust or rely on anyone. Your node will not only download ~300GB of data (less if you're using a pruned node) but also validate all the rules of the consensus. You can find more information about the importance of blockchain synchronization in [this video](https://www.youtube.com/watch?v=OrYDehC-8TU).

If you are only interested in learning about BTCPay Server i.e. simply [trying it out](../TryItOut.md) without deploying your own instance, you can avoid sync by using a [Third-Party host](../ThirdPartyHosting.md).

## Can I skip the synchronization?

You can't skip synchronization if you are deploying a BTCPay Server, but you can drastically decrease the time it takes. If you're comfortable with using the command line, you can use FastSync to synchronize your node faster. Be sure to [read this FastSync document](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync) to understand the potential trust issues involved with this feature.

To use FastSync, make sure your deployment has a [pruning option enabled](#how-to-enable-bitcoin-node-pruning) by using an `opt-save-storage` environment variable, otherwise bitcoind will not be able to sync. First step is to [ssh into](./FAQ-ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps) your BTCPayServer instance and run the following commands:

```bash
sudo su -
cd $BTCPAY_BASE_DIRECTORY/btcpayserver-docker/
btcpay-down.sh
cd contrib/FastSync
./load-utxo-set.sh
# Once FastSync has completed
btcpay-up.sh
```

After FastSync is complete and you have brought back up your instance, refresh your BTCPay domain and wait for remaining blockchain synchronization. You can also follow [this video](https://youtube.com/watch?v=VNMnd-dX9Q8?t=1730).

If your FastSync returns `You need to delete your Bitcoin Core wallet` after you load the uxto set, or you find this error: `Last wallet synchronisation goes beyond pruned data`, see the cause of [BTCPay Server keeps showing that my node is always starting](#btcpay-server-keeps-showing-that-my-node-is-always-starting).

## How do I know that BTCPay synced completely?

When you do not see a pop-up message in the bottom right corner, which shows the sync progress, that means that your server is fully synced and you can [begin using it](../RegisterAccount.md).

If you want to check that your BTCPay Server Bitcoin node is synchronized with the most recent block in the Bitcoin blockchain, [check your node height](#how-can-i-check-the-block-height-of-my-bitcoin-node) matches the current block height using any blockchain explorer. 

## How can I check the block height of my bitcoin node?

To verify the sync status of your Bitcoin node, you can use bitcoin-cli commands inside your server's Bitcoin container. SSH into your server and navigate to the directory where you [view Bitcoin logs](../Troubleshooting.md#23-bitcoin-node-logs) run the command: `bitcoin-cli.sh getblockcount` to view the current block of your server's Bitcoin node.

## BTCPay Server takes forever to synchronize

Synchronizing a Full Bitcoin node should take between 1 and 5 days. It should sync quickly at first and more slowly at the end. 

If the node appears to not be syncing, verify:

* Not enough CPU
* Using swap memory

### Cause 1: Not enough CPU

We recommend 2 CPU while synchronizing; however some hosting providers throttle your CPU if you use too much.

Check with

```bash
sudo su -
docker stats
```

If you see more than 100% CPU usage, while being very slow to sync:

```
8e7ac41e6e2a        btcpayserver_bitcoind               100%               560.5MiB / 3.853GiB   14.20%              4.17
```

Then you need to scale up your machine specification.

If you see very low CPU usage (less than 10%) during synchronization:

```
8e7ac41e6e2a        btcpayserver_bitcoind               10%               560.5MiB / 3.853GiB   14.20%              4.17
```

Your hosting provider might throttle your CPU. Please make sure your host supports the high use of CPU for an extended period.

If they don't allow it, shut down your server until they stop throttling you. Then you can limit the CPU via docker, and restart the server:

```bash
docker update btcpayserver_bitcoind --cpus ".8"
```

### Cause 2: Using swap memory

If you are synching and don't have enough memory, your server may use swap memory to continue operating:

```bash
sudo su -
df -h
```

If you see swap memory usage:

```bash
              total        used        free      shared  buff/cache   available
Mem:           2.0G        2.0G        0M         66M        0G        0M
Swap:          1.0G        200M      800M
```

Then it means you need to scale up your server by adding more memory.

## BTCPay Server keeps showing that my node is always starting

Possible cause:

* You do not have enough RAM
* You do not have enough storage
* You accidentally disabled pruning
* Your bitcoin data directory is corrupted
* Your last wallet synchronisation goes beyond pruned data

### Cause 1: You do not have enough RAM

Check your RAM:

```bash
sudo su -
free -h
```

If you see that you have no `free` or very little `available` memory:

```bash
              total        used        free      shared  buff/cache   available
Mem:           2.0G        2.0G        0M         66M        0G        0M
Swap:            0B          0B          0B
```

Then you need more memory. If you have already synched your node, you can add some swap memory. If you haven't, your server specs are too limited.

If you have already synched, you can add 2G of swap memory with:

```bash
fallocate -l 2G /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
echo "/mnt/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

### Cause 2: You do not have enough storage

Check the storage of your machine:

```bash
sudo su -
df -h
```

If you see you don't have any storage left (/dev/sda1 in my case)

```bash
Filesystem      Size  Used Avail Use% Mounted on
udev            2.0G     0  2.0G   0% /dev
tmpfs           395M   41M  354M  11% /run
/dev/sda1       125G  125G  0G   100% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/sdb1       7.8G   18M  7.4G   1% /mnt
```

[Choose the docker fragment](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose) for the amount of storage you aim to keep. Then [prune your node](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#how-i-can-prune-my-nodes).

### Cause 3: You accidentally disabled pruning

If you have recently tried to modify your environment variables using the `export BTCPAYGEN_ADDITIONAL_FRAGMENTS="xyz"` command to add an additional fragment, but forgot to include your current ones, you may have disabled pruning.

If you don't have enough memory to store the entire Bitcoin blockchain and you don't have an `opt-save-storage` listed when you [print the complete list of options](https://github.com/btcpayserver/btcpayserver-doc/blob/b0873a216f871b0f7dc4958c8fa63c17c35b603d/docs/FAQ/FAQ-Deployment.md#how-can-i-modify-or-deactivate-environment-variables) that you are running, it is very likely you have disabled pruning. 

You can verify by checking your Bitcoind logs:

```bash
sudo su -
cd btcpayserver-docker
docker logs --tail 100 btcpayserver_bitcoind
```

If you see:

```bash
Block files have previously been pruned.
You need to rebuild the database using -reindex to go back to unpruned mode.  
This will redownload the entire blockchain. 
Please restart with -reindex or -reindex-chainstate to recover.
```

You can simply [re-enable pruning](#how-to-enable-bitcoin-node-pruning) to solve the issue.

### Cause 4: Your bitcoin data directory is corrupted

Check the logs of your node:

```bash
sudo su -
docker logs --tail 10 btcpayserver_bitcoind
```

If you see:

```bash
Please restart with -reindex or -reindex-chainstate to recover.
```

Then your bitcoin data directory has been corrupted. It may be physical damage or failure of the hard drive.
To reindex your node:

```bash
btcpay-down.sh
# Delete 'blocks' and 'chainstate' folders
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/blocks
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/chainstate
btcpay-up.sh
```

### Cause 5: Your last wallet synchronisation goes beyond pruned data

This can happen if you use FastSync or import an already synched blockchain. It means that the bitcoin core wallet needs to be removed because it was created before the utxoset, likely because BTCPay Server started without the utxoset at the first boot. To verify this case, [check the bitcoind log](../Troubleshooting.md#2-1-btcpay-logs) for this:

```bash
Error: Prune: last wallet synchronisation goes beyond pruned data. You need to -reindex (download the whole blockchain again in case of pruned node)
```

If you see this error and agree to remove the wallet to finish syncing, use `docker volume rm generated_bitcoin_wallet_datadir` after you run `btcpay-down.sh` and before you run `btcpay-up.sh`
WARNING: Do not delete this wallet if you have any funds on it.

## I'm running a full node and have a synched blockchain, can BTCPay use it so that it doesn't have to do a full sync?

Yes you can!  However, before you do that, you'll want to stop bitcoind from updating docker's volume for it, as that job will be taken over by BTCPay Server.

If you want to run BTCPay Server inside a docker-compose, and that you have the data directory (`.bitcoin`) of a fully synched node on your docker host, then you can reuse it easily for BTCPay Server.

To do that, follow the following steps :
* Do the normal setup according to [this instruction](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md). Note the `opt-save-storage` environment variable, which is used to enable various pruning levels. If you do not want to prune your exiting data directory, then omit the following line in your BTCPay docker deployment: `export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-s"`.
* Once `btcpay-setup.sh` is over, turn down the docker compose with `btcpay-down.sh`.
* Login as root with `sudo su -`.
* Open the docker's volume for bitcoind : `cd /var/lib/docker/volumes/generated_bitcoin_datadir/`, and check its content with `ls -la`. You should see only one directory named `_data`.
* Now remove the `_data`directory : `rm -r _data`. If for any reason you want to keep this directory and its content you can also rename it instead : `mv _data/ _data.old/`
* Now create a [symbolic link](https://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/) between `/var/lib/docker/volumes/generated_bitcoin_datadir/_data` and your data directory (`.bitcoin`) on your host: `ln -s path/to/.bitcoin /var/lib/docker/volumes/generated_bitcoin_datadir/_data`
* Check that the link has been done with a `ls -la`
* Start your docker-compose again with `btcpay-up.sh`

Your BTCPay Server should now be fully synched.

If after this BTCPay Server keeps showing that your node is always starting, see the cause of [BTCPay Server keeps showing that my node is always starting](#btcpay-server-keeps-showing-that-my-node-is-always-starting).

## How to enable Bitcoin node pruning?

This will prune your Bitcoin full node to a maximum of 100GB (of blocks):

```bash
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage"
. ./btcpay-setup.sh -i
```

Other pruning options are [documented here](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose). See [this example](./FAQ-Deployment.md#how-can-i-modify-or-deactivate-environment-variables) for use with other additional fragments.

## How to disable Bitcoin node pruning?

To disable pruning of your Bitcoin node in BTCPay, first ensure you have enough memory to store the entire blockchain and BTCPayServer on your system. Then disable the `opt-save-storage` environment variable. See [this example](https://github.com/btcpayserver/btcpayserver-doc/blob/master/docs/FAQ/FAQ-Deployment.md#how-can-i-modify-or-deactivate-environment-variables) to view your fragment list and select only one for removal. The following example will remove **all** additional fragments: 

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS=""
. ./btcpay-setup.sh -i
```

Then run the following commands to recreate a non-pruned Bitcoin node:

```bash
btcpay-down.sh
# Delete 'blocks' and 'chainstate' folders
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/blocks
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/chainstate
btcpay-up.sh
```