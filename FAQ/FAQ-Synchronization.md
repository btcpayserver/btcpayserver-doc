# BTCPay Synchronization Issues

This document covers the most common questions and issues that may occur during BTCPay sync.

* [Why does BTCPay sync?](#why-does-btcpay-sync)
* [Can I skip/speed up the sync?](#can-i-skip-the-synchronization)
* [How do I know that the sync is finished?](#how-do-i-know-that-btcpay-synced-completely)
* [BTCPay takes forever to synchronize](#btcpay-server-takes-forever-to-synchronize)
* [BTCPay Server keep showing that my node is always starting](#btcpay-server-keep-showing-that-my-node-is-always-starting)
* [I already have a synced full node, can I use it with BTCPay?](#im-running-a-full-node-and-have-a-synched-blockchain-can-btcpay-use-it-so-that-it-doesnt-have-to-do-a-full-sync)

## Why does BTCPay sync?

After deployment, your BTCPay Server needs to sync the entire blockchain and validate all the consensus rules. Depending on your machine specification, bandwidth and number of altcoins you added, this process may take between 1-5 days.

## Can I skip the synchronization?

There's nothing you can do to bypass the sync process. It may seem tedious, but it's a critical step of running your own full node and not having to trust or rely on anyone. Your node will not only download 200GB of data (less if you're using a pruned node) but also validate all the rules of the consensus. You can find more information about the importance of blockchain synchronization in [this video](https://www.youtube.com/watch?v=OrYDehC-8TU).

## How do I know that BTCPay synced completely?

When you do not see a pop-up message in the bottom right corner, which shows the sync progress, that means that your server is fully synced and you can [begin using it](../GettingStarted.md).

## BTCPay Server takes forever to synchronize

Synchronizing a Full Bitcoin node should take between 1 and 3 days.

If this is not the case:

* Not enough CPU
* Using swap

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

Then your hosting provider might throttle your CPU. Please make sure your host supports the high use of CPU for an extended period.

If they don't allow it, shut down your server until they stop throttling you. Then you can limit the CPU via docker, and restart the server:

```
docker update btcpayserver_bitcoind --cpus ".8"
```

### Cause 2: Using swap memory

If you are synching and don't have enough memory, your server may use swap to continue operating:

```bash
sudo su -
df -h
```

If you see swap usage:

```bash
              total        used        free      shared  buff/cache   available
Mem:           2.0G        2.0G        0M         66M        0G        0M
Swap:          1.0G        200M      800M
```

Then it means you need to scale up your server by adding more memory.

## BTCPay Server keep showing that my node is always starting

Possible cause:

* Your bitcoin data directory is corrupted
* You do not have enough RAM
* You do not have enough storage


### Cause 1: Your bitcoin data directory is corrupted

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
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data
mkdir /var/lib/docker/volumes/generated_bitcoin_datadir/_data
btcpay-up.sh
```

### Cause 2: You do not have enough RAM

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

Then you need more memory. If you have already synched your node, you can add some swap. If you have not yet synched, your server specs are too limited.

If you already synched, you can add 2G of swap with:

```bash
fallocate -l 2G /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
echo "/mnt/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

### Cause 3: You do not have enough storage

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

[Choose the docker fragment](https://github.com/btcpayserver/btcpayserver-docker#generated-docker-compose-) for the amount of storage you aim to keep.

Then [prune your node](https://github.com/btcpayserver/btcpayserver-docker#how-i-can-prune-my-nodes).

## I'm running a full node and have a synched blockchain, can BTCPay use it so that it doesn't have to do a full sync?

If you want to run BTCPay inside a docker-compose, and that you have the data directory (`.bitcoin`) of a fully synched node on your docker host, then you can reuse it easily for BTCPay.

To do that, follow the following steps :
* Do the normal setup according to [this instruction](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md).
* Once `btcpay-setup.sh` is over, turn down the docker compose with `btcpay-down.sh`.
* Login as root with `sudo su -`.
* Open the docker's volume for bitcoind : `cd /var/lib/docker/volumes/generated_bitcoin_datadir/`, and check its content with `ls -la`. You should see only one directory named `_data`.
* Now remove the `_data`directory : `rm -r _data`. If for any reason you want to keep this directory and its content you can also rename it instead : `mv _data/ _data.old/`
* Now create a [symbolic link](https://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/) between `/var/lib/docker/volumes/generated_bitcoin_datadir/_data` and your data directory (`.bitcoin`) on your host: `ln -s path/to/.bitcoin /var/lib/docker/volumes/generated_bitcoin_datadir/_data`
* Check that the link has been done with a `ls -la`
* Start your docker-compose again with `btcpay-up.sh`

Your BTCPay Server should now be fully synched.
