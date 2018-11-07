# Server Settings Frequently Asked Questions

This document covers all the questions and issues related to Server Settings. This option is only available to server admin. Take a look at the [walkthrough page](/Walkthrough.md) to easier understand the navigation 

## Maintainance
    
* How to update BTCPay Server
* How can I check my BTCPay Server version via terminal?
* What is BTCPay SSH key file
* Error the BTCPAY_SSHKEYFILE variable is not set

## Theme / Customization
    
* How to customize my BTCPay theme style
* How to add Google Analytics code to BTCPay
* How to modify BTCPay checkout page

## Maintainance
   
### How to update BTCPay Server

There are 2 ways to update your BTCPay Server :
1. Updating through the front end. Server Settings > Maintenance > Update.
2. Updating through SSH. Log in into your virtual machine wih ssh, then apply following commands:
```
sudo su -
btcpay-update.sh
```
### How can I see my BTCPay version?
You can see your BTCPay version in the bottom right of the page footer footer, when you're logged in as a server admin.
### How can I check my BTCPay Server version via terminal?
In the btcpayserver-docker folder:`bitcoin-cli.sh getnetworkinfo`
### What is BTCPay SSH key file?
BTCPay SSH key, enables users to update their server or easily change the domain name from btcpay website, the front-end.

### Forgot BTCPay Admin password?

You need to edit your database. Register new user, for example: "newadmin@example.com":

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

### Warning `The BTCPAY_SSHKEYFILE variable is not set` when running docker

You may see such error message when you run your docker-compose (either via `btcpay-up.sh` or `btcpay-setup.sh`):

```bash
WARNING: The BTCPAY_SSHKEYFILE variable is not set. Defaulting to a blank string.
WARNING: The BTCPAY_SSHTRUSTEDFINGERPRINTS variable is not set. Defaulting to a blank string.
```
This means that your BTCPay Server does not have access to SSH to your VM.

If you did not setup the SSH keys, then BTCPay will prompt you for SSH information when trying to run those actions.

If you decide you want to give access SSH to BTCPay Server, run:

```bash
# Log as root
sudo su -

# Add SSH access to a key generated for btcpay
ssh-keygen -t rsa -f /root/.ssh/id_rsa_btcpay -q -P ""
echo "# Key used by BTCPay Server" >> /root/.ssh/authorized_keys
cat /root/.ssh/id_rsa_btcpay.pub >> /root/.ssh/authorized_keys

# Change your settings to pass the key to btcpay
BTCPAY_HOST_SSHKEYFILE=/root/.ssh/id_rsa_btcpay
cd $BTCPAY_BASE_DIRECTORY/btcpayserver-docker
. ./btcpay-setup.sh -i
```
## BTCPAY_SSHKEYFILE is not set when running the docker install, or unable to update through Server Settings / Maintenance

`BTCPay Server` needs SSH access so you can perform some tasks through the front-end like:

* Updating the server
* Changing the domain name of the server

You can run the following command line to give access to BTCPay to your server via SSH.

```bash 
sudo su -
cd $BTCPAY_BASE_DIRECTORY/btcpayserver-docker
git checkout master
# Setup SSH access via private key
ssh-keygen -t rsa -f /root/.ssh/id_rsa_btcpay -q -P ""
echo "# Key used by BTCPay Server" >> /root/.ssh/authorized_keys
cat /root/.ssh/id_rsa_btcpay.pub >> /root/.ssh/authorized_keys
BTCPAY_HOST_SSHKEYFILE=/root/.ssh/id_rsa_btcpay
. ./btcpay-setup.sh -i
```
## Theme / Customization

### How to customize my BTCPay theme style
### How to add Google Analytics code to BTCPay
### How to modify BTCPay checkout page
