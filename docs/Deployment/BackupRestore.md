# Back up & Restore. 

In this guide, you will get up to speed with BTCPay Server's `Backup & Restore` process, what you need to keep in mind when doing a backup, what's included, and how to restore a backup. 

:::warning
BTCPay Server is and will never be responsible for your backup. 
This process comes with its warnings, and they should be considered. 
Always make sure your backup solution works and fits your needs! 
:::


- [How does BTCPay Server backup work](#How-does-BTCPay-Server-backup-work?)
    - [Extra option to btcpay-backup.sh](#-Extra-options-for-`btcpay-backup.sh`)
    - [btcpay-backup.sh example](#backup-output)
- [How does the BTCpay-restore.sh work?](#how-does-the-btcpay-restoresh-work)
    - [btcpay-restore.sh Example](#restore-output)
- [What isn't included and should be considered before taking this backup approach](#what-isnt-included-and-should-be-considered-before-taking-this-backup-approach)
    - [Lightning Channel backups](#lightning-channel-backup)
    - [Automation by crontab, does it work?](#automation-by-crontab-does-it-work)

## How does BTCPay Server backup work? 

The original strategy of backups in BTCPay Server still exists and can be found [here](https://docs.btcpayserver.org/Docker/#how-can-i-back-up-my-btcpay-server).
While we did create a new process, the old scripts still do work and have only slightly been touched. See [pull request #641](https://github.com/btcpayserver/btcpayserver-docker/pull/641) for more details. 

:::tip 
Please be aware of these important issues:
The old channel state is toxic, and you can lose all your funds if you or someone else closes a channel based on the backup with the old state - and the state changes often! If you publish an old state (say from yesterday's backup) on-chain, you will most likely lose all your funds in the channel because the counterparty might publish a [revocation transaction](https://www.d11n.net/lightning-network-payment-channel-lifecycle.html#what-happens-in-case-of-a-false-close%3F)!
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
After the user has been determined suitable, the script will set itself up to take the next steps:

* checks for docker dir.
* Makes a dump of the postgres DB. 
* Sets BTCPay directory. 
* Sets backup directory. 
* Determines the DB dump path. 
* Determines the backup path. 

If the backup directory doesn't exist yet, the script will ensure to make one. 
With these preparations taken, the backup process is now starting. 

The script has checks to ensure it either works or fails with a comprehensive error message at every step of the way.
This gets determined by a `-e` tag at the start of the script. 

```
echo "🚨 Database container could not be started or found."
```

If everything is running smoothly, you'll get to see multiple completed marks in your console. 
Whenever the backup has been completed successfully, it will state:

```
printf "✅ Backup done => $backup_path\n\n"
```

Your BTCPay Server has now finished the backup process. It's now up to you to store these backups in a safe manner. 
After you've made a backup the first time, it's always wise to at least test your backup in a restore scenario. 
In the next topic, we will go over the extra options you can set with your backup.

## Extra options for `btcpay-backup.sh`

When you run the `btcpay-backup.sh` script, you're able to set certain flags.

### Set a Passphrase for BTCPay Server backup. 

One of the extra tags that you can set when running the `btcpay-backup.sh` is for a passphrase.
This would be run as follows :

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-backup.sh BTCPAY_BACKUP_PASSPHRASE 
```

This `BTCPAY_BACKUP_PASSPHRASE` if set, is neccesary to be in the restore process aswell, [Click here to read more](../Deployment/BackupRestore.md#Restore-with-`BTCPAY_BACKUP_PASSPHRASE`-flag-set)

### backup output

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
The `btcpay-restore.sh` script needs to be run with the path to your `backup.tar.gz` file. 

First off, open a terminal and type the following as root.  
Remember that if you set `BTCPAY_BACKUP_PASSPHRASE` on the backup, you also need to provide it for decryption :

```
cd "$BTCPAY_BASE_DIRECTORY"
export BTCPAY_BACKUP_PASSPHRASE="tOpSeCrEt"
./btcpay-restore.sh /var/backups/backup.tar.gz.gpg
```

This will start the restore process by unpacking the backup file.
If it can't find the file in the provided path, the script will give out an error.  

```
"\n🚨 $backup_path does not exist.\n\n"
```

Just as the `btcpay-backup.sh` script, the restore will stop at ANY error it may encounter. 
If the backup file was created while the `BTCPAY_BACKUP_PASSPHRASE` was set but not used on restoring, the following error would occur :

```
🚨  Decryption failed. Please check the error message above.
```

When the restore has been completed, you get the message : 

```
✅ Restore done
```

Everything should be up and running again when the restore is complete, and you've successfully restored your BTCpay Server.
Congratulations!

:::tip
We won't nail every aspect right away with this approach. This page will be subject to change. 
Always make sure your backup strategy is tested and fits your business needs. No one solution fits all.
For the latest updates, always feel free to ask on the BTCPay Server community channels. 
:::


### Restore output

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

## What isn't included and should be considered before taking this backup approach. 

### Lightning channel backup. 

:::warning
It has a high chance of failure in a disaster recovery scenario, where you may do a backup once per night and need to restore that one backup.
For instance, the Lightning static channel backup should be watched by a script and copied over to a remote server to ensure you always have the latest state available. The scripts will be sufficient in a migration case, where the shutdown of the old and the start of the new server happen directly. 
:::

## Automation by crontab, does it work?  

In short, yes. 
This is an example of a crontab script. 
As long as you've set the right `PATH`, the script sources the `.env` file itself. 

Crontab example :

```
SHELL=/bin/bash
PATH=/bin:/usr/sbin:/usr/bin:/usr/local/bin
15 4 * * * /root/btcpayserver-docker/btcpay-backup.sh >/dev/null 2>&1
```

# Questions ? 

If you have questions about BTCPay Server, check our documentation, [Frequently asked questions page](./FAQ.md).

Join the [community chat](https://chat.btcpayserver.org/) on Mattermost by downloading [Mattermost app](https://mattermost.com/download/), or on [Telegram](https://t.me/btcpayserver) in case you need further help or help or want to hang around with like-minded people.