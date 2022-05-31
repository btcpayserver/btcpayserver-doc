# Backup & Restore

This guide gets you up to speed with BTCPay Server's `Backup & Restore` process, what you need to keep in mind when doing a backup and how to restore a backup.

:::warning
BTCPay Server is and will never be responsible for your backup.
This process comes with its warnings, and they should be considered.
Always make sure your backup solution works and fits your needs!
:::

[[toc]]

## How does BTCPay Server backup work?

The original strategy of backups in BTCPay Server still exists and can be found [here](https://docs.btcpayserver.org/Docker/#how-can-i-back-up-my-btcpay-server).
While we did create a new process, the old scripts still do work and have only slightly been touched. See [pull request #641](https://github.com/btcpayserver/btcpayserver-docker/pull/641) for more details.

:::tip
Please be aware of these important issues:
The old channel state is toxic, and you can lose all your funds if you or someone else closes a channel based on the backup with the old state - and the state changes often! If you publish an old state (say from yesterday's backup) on-chain, you will most likely lose all your funds in the channel because the counterparty might publish a [revocation transaction](https://www.d11n.net/lightning-network-payment-channel-lifecycle.html#what-happens-in-case-of-a-false-close%3F)!
:::

The backup process gets started from the `btcpay-backup.sh` script.
Open a command prompt and type the following.

```bash
cd $BTCPAY_BASE_DIRECTORY
./btcpay-backup.sh
```

A bash script will start running your backup when running the above command.
Below we will talk you through the steps taken.
The backup process needs to be started as root, which it will check for and let you know if you have to switch users.
After the user has been determined suitable, the script will set itself up to take the next steps:

* Makes a dump of the database
* Sets BTCPay directory
* Sets backup directory
* Determines the DB dump path
* Determines the backup path

If the backup directory doesn't exist yet, the script will ensure to make one.
With these preparations taken, the backup process is now starting.

The script has checks to ensure it either works or fails with a comprehensive error message at every step of the way.
This gets determined by a `-e` flag at the start of the script.

```
🚨 Database container could not be started or found.
```

If everything is running smoothly, you'll get to see multiple completed marks in your console.
Whenever the backup has been completed successfully, it will state:

```
✅ Backup done => /var/lib/docker/volumes/backup_datadir/_data/backup.tar.gz
```

Your BTCPay Server has now finished the backup process. It's now up to you to store these backups in a safe manner.
After you've made a backup the first time, it's always wise to at least test your backup in a restore scenario.
In the next topic, we will go over the extra options you can set with your backup.

### Set a backup passphrase

You can set the `BTCPAY_BACKUP_PASSPHRASE` environment variable for encrypting the backup.
This passphrase will be used by the backup and restore scripts to encrypt and decrypt the backup file.
For the backup script, this would look like the following:

```bash
cd $BTCPAY_BASE_DIRECTORY
export BTCPAY_BACKUP_PASSPHRASE="tOpSeCrEt"
./btcpay-backup.sh BTCPAY_BACKUP_PASSPHRASE
```

Please keep in mind, that the passphrase will be added to your shell history.

This `BTCPAY_BACKUP_PASSPHRASE` if set, is necessary to be in the [restore process](#how-to-restore) as well.

## How to restore?

It's very similar to the `btcpay-backup.sh` process but in reverse.
The `btcpay-restore.sh` script needs to be run with the path to your `backup.tar.gz` file.

First off, open a terminal and type the following as root.
Remember that if you set `BTCPAY_BACKUP_PASSPHRASE` on the backup, you also need to provide it for decryption :

```bash
cd "$BTCPAY_BASE_DIRECTORY"
export BTCPAY_BACKUP_PASSPHRASE="tOpSeCrEt"
./btcpay-restore.sh /var/backups/backup.tar.gz.gpg
```

Please keep in mind, that the passphrase will be added to your shell history.

This will start the restore process by unpacking the backup file.
If it can't find the file in the provided path, the script will exit with an error.

```
🚨 /var/backups/backup.tar.gz.gpg does not exist.
```

Just as the `btcpay-backup.sh` script, the restore will stop at ANY error it may encounter.
If the backup file was created while the `BTCPAY_BACKUP_PASSPHRASE` was set but not used on restoring, the following error would occur :

```
🚨  Decryption failed. Please check the error message above.
```

When the restore has been completed, you get the message:

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

## What isn't included and should be considered before taking this backup approach

### Lightning channel backup

:::warning
It has a high chance of failure in a disaster recovery scenario, where you may do a backup once per night and need to restore that one backup.
For instance, the Lightning static channel backup should be watched by a script and copied over to a remote server to ensure you always have the latest state available. The scripts will be sufficient in a migration case, where the shutdown of the old and the start of the new server happen directly.
:::

## Automation by crontab

Here is an example of a crontab script that does a nightly backup at 4:15 AM:

```
SHELL=/bin/bash
PATH=/bin:/usr/sbin:/usr/bin:/usr/local/bin
15 4 * * * /root/btcpayserver-docker/btcpay-backup.sh >/dev/null 2>&1
```

As long as you've set the right `PATH`, the script sources the `.env` file itself.

# Questions ?

If you have questions about BTCPay Server, check our documentation, [Frequently asked questions page](./FAQ.md).

Join the [community chat](https://chat.btcpayserver.org/) on Mattermost by downloading [Mattermost app](https://mattermost.com/download/), or on [Telegram](https://t.me/btcpayserver) in case you need further help or help or want to hang around with like-minded people.
