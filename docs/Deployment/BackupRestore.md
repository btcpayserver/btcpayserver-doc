# Back up & Restore. 

In this guide, you will get up to speed with BTCPay Server's `Backup & Restore` process, what you need to keep in mind when doing a backup, what's included, and how to restore a backup. 

:::warning
BTCPay Server is and will never be responsible for your backup. 
This process comes with its warnings, and they should be considered. 
Always make sure your backup solution works and fits your needs! 
:::

## How does BTCPay Server backup work? 

The original strategy of backups in BTCPay Server still exists and can be found [here](https://docs.btcpayserver.org/Docker/#how-can-i-back-up-my-btcpay-server).
While we did create a new process, the old scripts still do work and have only slightly been touched. See [pull request #641](https://github.com/btcpayserver/btcpayserver-docker/pull/641) for more details. 

:::tip 
Please be aware of these important issues:
The old channel state is toxic, and you can lose all your funds if you or someone else closes a channel based on the backup with the old state - and the state changes often! If you publish an old state (say from yesterday's backup) on-chain, you will most-likely lose all your funds in the channel because the counterparty might publish a [revocation transaction](https://www.d11n.net/lightning-network-payment-channel-lifecycle.html#what-happens-in-case-of-a-false-close%3F)!
:::

The backup process gets started from the `btcpay-backup.sh` script. 
Open a command prompt and type the following. 

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-backup.sh
```
A bash script will start running your backup when running the above command. 
Below we will talk you through the steps taken. 
The backup process needs to be started as root, which it will check for and let you know if you have to switch users.

```
if [ "$(id -u)" != "0" ]; then
  printf "\n🚨 This script must be run as root.\n"
  printf "➡️  Use the command 'sudo su -' (include the trailing hypen) and try again.\n\n"
  exit 1
fi
```
After the user has been determined suitable, the script will set itself up to take the next step:

```
# preparation
docker_dir=$(docker volume inspect generated_btcpay_datadir --format="{{.Mountpoint}}" | sed -e "s%/volumes/.*%%g")
dbdump_name=postgres.sql.gz
btcpay_dir="$BTCPAY_BASE_DIRECTORY/btcpayserver-docker"
backup_dir="$docker_dir/volumes/backup_datadir/_data"
dbdump_path="$docker_dir/$dbdump_name"
backup_path="$backup_dir/backup.tar.gz"

# ensure backup dir exists
if [ ! -d "$backup_dir" ]; then
  mkdir -p $backup_dir
fi
```
With this preparation taken, the backup process is now starting. 
The script has checks to ensure it either works or fails with a comprehensive error message at every step of the way.

```
echo "🚨 Database container could not be started or found."
```

If everything is running fine, you'll get to see multiple completed marks in your console. 

Example :

``` 
echo "✅ Database dump done."
echo "✅ Archive done."
```

When the backup has been completed and run successful it will state :

```
printf "✅ Backup done => $backup_path\n\n"
```

### Extra options for `btcpay-backup.sh`

One of the extra tags that you can set when running the `btcpay-backup.sh` is for a passphrase.
This would be run as follows :

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-backup.sh BTCPAY_BACKUP_PASSPHRASE 
```

`btcpay-backup.sh` output example : 

```
ℹ️  Dumping database …
✅ Database dump done.

ℹ️  Stopping BTCPay Server …

Stopping letsencrypt-nginx-proxy-companion     ... done
Stopping nginx-gen                             ... done
Stopping generated_btcpayserver_1              ... done
Stopping generated_clightning_bitcoin_charge_1 ... done
Stopping generated_clightning_bitcoin_spark_1  ... done
Stopping generated_clightning_bitcoin_rest_1   ... done
Stopping btcpayserver_clightning_bitcoin       ... done
Stopping btcpayserver_bitcoind                 ... done
Stopping tor-gen                               ... done
Stopping generated_nbxplorer_1                 ... done
Stopping generated_postgres_1                  ... done
Stopping tor                                   ... done
Stopping generated_bitcoin_rtl_1               ... done
Stopping nginx                                 ... done
Removing letsencrypt-nginx-proxy-companion     ... done
Removing nginx-gen                             ... done
Removing generated_btcpayserver_1              ... done
Removing generated_clightning_bitcoin_charge_1 ... done
Removing generated_clightning_bitcoin_spark_1  ... done
Removing generated_clightning_bitcoin_rest_1   ... done
Removing btcpayserver_clightning_bitcoin       ... done
Removing btcpayserver_bitcoind                 ... done
Removing tor-gen                               ... done
Removing generated_nbxplorer_1                 ... done
Removing generated_postgres_1                  ... done
Removing tor                                   ... done
Removing generated_bitcoin_rtl_1               ... done
Removing nginx                                 ... done
Removing network generated_default

ℹ️  Archiving files in /var/lib/docker…
postgres.sql.gz
volumes/generated_bitcoin_wallet_datadir/
volumes/generated_bitcoin_wallet_datadir/_data/
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/.walletlock
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/wallet.dat
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/db.log
volumes/generated_btcpay_datadir/
volumes/generated_btcpay_datadir/_data/
volumes/generated_btcpay_datadir/_data/FastSynced
volumes/generated_btcpay_datadir/_data/LocalStorage/
volumes/generated_btcpay_datadir/_data/LocalStorage/tmp/
volumes/generated_btcpay_datadir/_data/btcpay20220512.log
volumes/generated_btcpay_datadir/_data/tmp/
volumes/generated_btcpay_datadir/_data/host_id_rsa
volumes/generated_btcpay_datadir/_data/Main/
volumes/generated_btcpay_datadir/_data/Main/settings.config
volumes/generated_btcpay_datadir/_data/host_id_rsa.pub
volumes/generated_btcpay_datadir/_data/host_authorized_keys
volumes/generated_btcpay_datadir/_data/key-47ec2b82-ed01-45ef-8a63-390470cc10e5.xml
[...]
volumes/generated_tor_torrcdir/
volumes/generated_tor_torrcdir/_data/
volumes/generated_tor_torrcdir/_data/torrc
volumes/generated_tor_torrcdir/_data/torrc-2
✅ Archive done.

🔐 BTCPAY_BACKUP_PASSPHRASE is set, and the backup will be encrypted.
✅ Encryption done.

ℹ️  Restarting BTCPay Server …

/root/btcpayserver-docker
Creating network "generated_default" with the default driver
Creating nginx                   ... done
Creating generated_postgres_1    ... done
Creating generated_bitcoin_rtl_1 ... done
Creating tor                     ... done
Creating btcpayserver_bitcoind   ... done
Creating tor-gen                         ... done
Creating generated_nbxplorer_1           ... done
Creating btcpayserver_clightning_bitcoin ... done
Creating generated_clightning_bitcoin_charge_1 ... done
Creating generated_clightning_bitcoin_spark_1  ... done
Creating generated_btcpayserver_1              ... done
Creating generated_clightning_bitcoin_rest_1   ... done
Creating nginx-gen                             ... done
Creating letsencrypt-nginx-proxy-companion     ... done

ℹ️  Cleaning up …

✅ Backup done => /var/lib/docker/volumes/backup_datadir/_data/backup.tar.gz.gpg

```

## How does the BTCpay-restore.sh work? 

It's very similar to the `btcpay-backup.sh` process but in reverse. 
The `btcpay-restore.sh` script will search for the `backup.tar.gz` file. 

First off, open a terminal and type the following as root. Remember that if you set `BTCPAY_BACKUP_PASSPHRASE` on the backup, you have to set it on the restore too ; 

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-restore.sh BTCPAY_BACKUP_PASSPHRASE 
```
This will start the restore process, it start by looking for the `backup.tar.gz` file.
If it can't find the file in the right path, the script will give out an error.  

```
if [ -z "$backup_path" ]; then
  printf "\nℹ️  Usage: btcpay-restore.sh /path/to/backup.tar.gz\n\n"
  exit 1
fi

if [ ! -f "$backup_path" ]; then
  printf "\n🚨 $backup_path does not exist.\n\n"
  exit 1
fi
```

Like the backup script, the restore will stop at ANY error it may encounter. 
This gets determined by the `-e` tag at the start of the script. 

```
#!/bin/bash -e
```

If the backup file was created while the `BTCPAY_BACKUP_PASSPHRASE` was set, but not used on restoring, the following error would occur :

```
if [[ "$backup_path" == *.gpg ]]; then
  echo "🔐 Decrypting backup file …"
  {
    gpg -o "${backup_path%.*}" --batch --yes --passphrase "$BTCPAY_BACKUP_PASSPHRASE" -d $backup_path
    backup_path="${backup_path%.*}"
    printf "✅ Decryption done.\n\n"
  } || {
    echo "🚨  Decryption failed. Please check the error message above."
    exit 1
  }
fi
```

When the restore has been completed, it will tell in the terminal, like the backup process. 

```
printf "✅ Restore done\n\n"
```

Below you will find the full restore script and an output example of the restore. 

```
#!/bin/bash -e

set -o pipefail -o errexit

if [ "$(id -u)" != "0" ]; then
  printf "\n🚨 This script must be run as root.\n"
  printf "➡️  Use the command 'sudo su -' (include the trailing hypen) and try again.\n\n"
  exit 1
fi

backup_path=$1
if [ -z "$backup_path" ]; then
  printf "\nℹ️  Usage: btcpay-restore.sh /path/to/backup.tar.gz\n\n"
  exit 1
fi

if [ ! -f "$backup_path" ]; then
  printf "\n🚨 $backup_path does not exist.\n\n"
  exit 1
fi

if [[ "$backup_path" == *.gpg && -z "$BTCPAY_BACKUP_PASSPHRASE" ]]; then
  printf "\n🔐 $backup_path is encrypted. Please provide the passphrase to decrypt it."
  printf "\nℹ️  Usage: BTCPAY_BACKUP_PASSPHRASE=t0pSeCrEt btcpay-restore.sh /path/to/backup.tar.gz.gpg\n\n"
  exit 1
fi

# preparation
docker_dir=$(docker volume inspect generated_btcpay_datadir --format="{{.Mountpoint}}" | sed -e "s%/volumes/.*%%g")
restore_dir="$docker_dir/volumes/backup_datadir/_data/restore"
dbdump_name=postgres.sql.gz
btcpay_dir="$BTCPAY_BASE_DIRECTORY/btcpayserver-docker"

# ensure clean restore dir
printf "\nℹ️  Cleaning restore directory $restore_dir …\n\n"
rm -rf $restore_dir
mkdir -p $restore_dir

if [[ "$backup_path" == *.gpg ]]; then
  echo "🔐 Decrypting backup file …"
  {
    gpg -o "${backup_path%.*}" --batch --yes --passphrase "$BTCPAY_BACKUP_PASSPHRASE" -d $backup_path
    backup_path="${backup_path%.*}"
    printf "✅ Decryption done.\n\n"
  } || {
    echo "🚨  Decryption failed. Please check the error message above."
    exit 1
  }
fi

cd $restore_dir

echo "ℹ️  Extracting files in $(pwd) …"
tar -xvf $backup_path -C $restore_dir

# basic control checks
if [ ! -f "$dbdump_name" ]; then
  printf "\n🚨 $dbdump_name does not exist.\n\n"
  exit 1
fi

if [ ! -d "volumes" ]; then
  printf "\n🚨 volumes directory does not exist.\n\n"
  exit 1
fi

cd $btcpay_dir
. helpers.sh

printf "\nℹ️  Stopping BTCPay Server …\n\n"
btcpay_down

cd $restore_dir

{
  printf "\nℹ️  Restoring volumes …\n"
  # ensure volumes dir exists
  if [ ! -d "$docker_dir/volumes" ]; then
    mkdir -p $docker_dir/volumes
  fi
  # copy volume directories over
  cp -r volumes/* $docker_dir/volumes/
  # ensure datadirs excluded in backup exist
  mkdir -p $docker_dir/volumes/generated_bitcoin_datadir/_data
  mkdir -p $docker_dir/volumes/generated_litecoin_datadir/_data
  mkdir -p $docker_dir/volumes/generated_postgres_datadir/_data
  echo "✅ Volume restore done."
} || {
  echo "🚨  Restoring volumes failed. Please check the error message above."
  printf "\nℹ️  Restarting BTCPay Server …\n\n"
  cd $btcpay_dir
  btcpay_up
  exit 1
}

{
  printf "\nℹ️  Starting database container …\n"
  docker-compose -f $BTCPAY_DOCKER_COMPOSE up -d postgres
  sleep 10
  dbcontainer=$(docker ps -a -q -f "name=postgres")
  if [ -z "$dbcontainer" ]; then
    echo "🚨 Database container could not be started or found."
    printf "\nℹ️  Restarting BTCPay Server …\n\n"
    cd $btcpay_dir
    btcpay_up
    exit 1
  fi
} || {
  echo "🚨  Starting database container failed. Please check the error message above."
  printf "\nℹ️  Restarting BTCPay Server …\n\n"
  cd $btcpay_dir
  btcpay_up
  exit 1
}

cd $restore_dir

{
  printf "\nℹ️  Restoring database …"
  gunzip -c $dbdump_name | docker exec -i $dbcontainer psql -U postgres postgres -a
  echo "✅ Database restore done."
} || {
  echo "🚨  Restoring database failed. Please check the error message above."
  printf "\nℹ️  Restarting BTCPay Server …\n\n"
  cd $btcpay_dir
  btcpay_up
  exit 1
}

printf "\nℹ️  Restarting BTCPay Server …\n\n"
cd $btcpay_dir
btcpay_up

printf "\nℹ️  Cleaning up …\n\n"
# rm -rf $restore_dir
# rm -rf $backup_path $backup_path.gpg

printf "✅ Restore done\n\n"
```

`btcpay-restore.sh` Output example : 

```
ℹ️  Cleaning restore directory /var/lib/docker/volumes/backup_datadir/_data/restore …

🔐 Decrypting backup file …
gpg: AES256.CFB encrypted data
gpg: encrypted with 1 passphrase
✅ Decryption done.

ℹ️  Extracting files in /var/lib/docker/volumes/backup_datadir/_data/restore…
postgres.sql.gz
volumes/generated_bitcoin_wallet_datadir/
volumes/generated_bitcoin_wallet_datadir/_data/
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/.walletlock
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/wallet.dat
volumes/generated_bitcoin_wallet_datadir/_data/mainnet/db.log
volumes/generated_btcpay_datadir/
volumes/generated_btcpay_datadir/_data/
volumes/generated_btcpay_datadir/_data/FastSynced
volumes/generated_btcpay_datadir/_data/LocalStorage/
volumes/generated_btcpay_datadir/_data/LocalStorage/tmp/
volumes/generated_btcpay_datadir/_data/btcpay20220512.log
volumes/generated_btcpay_datadir/_data/tmp/
volumes/generated_btcpay_datadir/_data/host_id_rsa
volumes/generated_btcpay_datadir/_data/Main/
volumes/generated_btcpay_datadir/_data/Main/settings.config
volumes/generated_btcpay_datadir/_data/host_id_rsa.pub
volumes/generated_btcpay_datadir/_data/host_authorized_keys
volumes/generated_btcpay_datadir/_data/key-47ec2b82-ed01-45ef-8a63-390470cc10e5.xml
[...]
volumes/generated_tor_torrcdir/
volumes/generated_tor_torrcdir/_data/
volumes/generated_tor_torrcdir/_data/torrc
volumes/generated_tor_torrcdir/_data/torrc-2

ℹ️  Restoring database …--
-- PostgreSQL database cluster dump
--
SET default_transaction_read_only = off;
SET
SET client_encoding = 'UTF8';
SET
SET standard_conforming_strings = on;
SET
--
-- Drop databases (except Postgres and template1)
--
DROP DATABASE btcpayservermainnet;
DROP DATABASE nbxplorermainnet;
ERROR:  database "btcpayservermainnet" is being accessed by other users
DETAIL:  There is 1 other session using the database.

[...]

--
-- PostgreSQL database dump complete
--
--
-- PostgreSQL database cluster dump complete
--

ℹ️  Cleaning up …

✅ Restore done
```

Everything should be up and running again when the restore is complete, and you've successfully restored your BTCpay Server.
Congratulations!

:::tip
We won't nail every aspect right away with this approach. This page will be subject to change. 
Always make sure your backup strategy is tested and fits your business needs. No one solution fits all.
For the latest updates, always feel free to ask on the BTCPay Server community channels. 
:::

## What isn't included and should be considered before taking this backup approach. 

### Lightning channel backup. 

:::warning
It has a high chance of failure in a disaster recovery scenario, where you may do a backup once per night and need to restore that one backup.
For instance, the Lightning static channel backup should be watched by a script and copied over to a remote server to ensure you always have the latest state available. The scripts will be sufficient in a migration case, where the shutdown of the old and the start of the new server happen directly. 
:::

## Can these scripts be run from crontab? 

In short, yes. 
This is an example of a crontab script. 
As long as you've set the right `PATH`, the script sources the `.env` file itself. 

Example of a crontab :

```
SHELL=/bin/bash
PATH=/bin:/usr/sbin:/usr/bin:/usr/local/bin
15 4 * * * /root/btcpayserver-docker/btcpay-backup.sh >/dev/null 2>&1
```

