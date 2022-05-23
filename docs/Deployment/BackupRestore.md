# Back up & Restore. 

In this guide you will get up to speed with BTCPay Server's `Backup & Restore` process, what do you need to keep i mind when doing a backup, whats included in backups and how to restore a backup. 

:::warning
BTCPay Server is and will never be responsible for your backup. 
This process comes with it's warnings and they should be considered. 
Always make sure your backup solution works and fits your needs! 
:::

## How does BTCPay Server backup work? 

The original strategy of backups in BTCPay Server does still exist and can be found [Here](https://docs.btcpayserver.org/Docker/#how-can-i-back-up-my-btcpay-server).
While we did create a new process, the old scripts still do work and have only slightly been touched, please see [Github #641](https://github.com/btcpayserver/btcpayserver-docker/pull/641) for more details. 

:::tip 
Please be aware of these important issues:
Old channel state is toxic and you can loose all your funds, if you or someone else closes a channel based on the backup with old state - and the state changes often! If you publish an old state (say from yesterday's backup) on chain, you WILL LOSE ALL YOUR FUNDS IN A CHANNEL, because the counterparty will publish a revocation key!
:::

The backup process get's started from the `btcpay-backup.sh` script. 
Open a command prompt and type the following 

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-backup.sh
```
When running the above command a bash script will start running your backup. 
Below we talk you through the steps taken. 
The backup process needs to be started as root, which it will check for and let you know if you have to switch user.

```
if [ "$(id -u)" != "0" ]; then
  printf "\n🚨 This script must be run as root.\n"
  printf "➡️  Use the command 'sudo su -' (include the trailing hypen) and try again.\n\n"
  exit 1
fi
```
After the user has been determined right, the script will set it self up to take the next step:

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
With these preparation's taken, backup process is now starting. 
On every step of the way, the script has checks to ensure it either works or either fails with a comprehensive error msg.

```
echo "🚨 Database container could not be started or found."
```

If everything is running fine you'll get to see multiple completed marks in your console. 

Example :

``` 
echo "✅ Database dump done."
echo "✅ Archive done."
```

When the backup has completed and ran succesfull it will state :

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

Output would look similar to this : 

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

🔐 BTCPAY_BACKUP_PASSPHRASE is set, the backup will be encrypted.
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

## How does a BTCPay Server Restore work? 

The starting procedure is similar to the `btcpay-backup.sh`. 
But instead of running backup, we run the `btcpay-restore.sh` script. 
This will start the restore process.

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-restore.sh
```

The script will start with the same credential check as the backup. 
Again, this script needs to be run as `root`.

Did you run the backup with `BTCPAY_BACKUP_PASSPHRASE` ? Then you do have to run the restore with this tag aswell. 

```
cd "$BTCPAY_BASE_DIRECTORY"
./btcpay-restore.sh BTCPAY_BACKUP_PASSPHRASE
```

If you do not set the flag, the script will give you an error. 

```
printf "\n🔐 $backup_path is encrypted. Please provide the passphrase to decrypt it."
```

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

The restore will stop on any of the errors that it may encounter, like it does with the backup script. 

Example : 

```
 echo "🚨  Restoring volumes failed. Please check the error message above."
```

When all steps complete in a proper mannor, the process will end with : 

```
printf "✅ Restore done\n\n"
```

As one of the steps in the process is to restart your BTCPay Server 

```
printf "\nℹ️  Restarting BTCPay Server …\n\n"
```

When the restore is complete everything should be running again and you've savely restored your BTCpay Server.
Congratulations!

:::tip
We won't nail every aspect right away with this approach, this is why this page will be subjected to change. 
For the latest updates, always feel free to ask on the known community channels. 
Allways make sure your backup strategy is tested and fits your business needs. There is no one solution fits all. 
:::

## What isn't included and should be considerd before taking this backup approach. 

