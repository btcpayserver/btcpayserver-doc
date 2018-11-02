# BTCPay Syncronization Issues

In this document, we will cover some the most common issues when syncing your BTCPay Server

## BTCPay Server takes forever to synchronize...

Synchronizing a Bitcoin full node should take between 1 and 3 days.

If this is not the case:

* Not enough CPU
* Using swap

### Cause 1: Not enough CPU

We recommend 2 CPU while synchronizing, however some hosting providers throttle your CPU if you us too much.

Check with

```bash
sudo su -
docker stat
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

Then your hosting provider might throttle your CPU. Please make sure your host support high use of CPU for extended period of time.

If they don't allow it, shutdown your server until they stop throttling you. Then you can limit the CPU via docker, and restart the server:

```
docker update btcpayserver_bitcoind --cpus ".8"
```

### Cause 2: Using swap memory

If you are synching and don't have enough memory, your server may use swap in order to continue operating:

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

## BTCPay Server keep showing that my node is always starting...

Possible cause:

* Your bitcoin data directory is corrupted
* You do not have enough RAM
* Your do not have enough storage


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

Then your bitcoin data directory has been corrupted. It may be a physical damage or failure of the hard drive.
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

Then you need more memory. If you have already synched your node, you can add some swap. If you have not yet synched, your server specs is too limited.

If you already synched, you can add 2G of swap with:

```bash
fallocate -l 2G /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
echo "/mnt/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

### Cause 3: Your do not have enough storage

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
