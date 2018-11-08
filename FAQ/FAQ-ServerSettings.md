# Server Settings Frequently Asked Questions

This document covers all the questions and issues related to Server Settings. This option is only available to server admin. Take a look at the [walkthrough page](/Walkthrough.md) to easier understand the navigation 

## Maintainance
    
* How to update BTCPay Server[]
* How can I check my BTCPay Server version via terminal?[]
* What is BTCPay SSH key file[]
* Error the BTCPAY_SSHKEYFILE variable is not set[]

## Theme / Customization
    
* How to customize my BTCPay theme style[]
* How to add Google Analytics code to BTCPay[]
* How to modify BTCPay checkout page[]

## Maintainance
   
### How to update BTCPay Server

There are 2 ways to update your BTCPay Server :
1. Updating through the front end: Server Settings > Maintenance > Update.
2. Updating through SSH: Log in into your virtual machine with ssh, then apply following commands:
```
sudo su -
btcpay-update.sh
```
### How can I see my BTCPay version?
You can see your BTCPay version in the bottom right of the page footer, when you're logged in as a server admin.
### How can I check my BTCPay Server version via terminal?
In the btcpayserver-docker folder:`bitcoin-cli.sh getnetworkinfo`
### What is BTCPay SSH key file?
BTCPay SSH key, enables users to update their server or quickly change the domain name from btcpay website, the front-end.

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

If you did not set up the SSH keys, then BTCPay prompts you for SSH information when trying to run those actions.

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
Fork  BTCPay repository and apply desired design changes. Build and publish the docker image. Generate the docker-compose as usual from [BTCPay Docker](https://github.com/btcpayserver/btcpayserver-docker). Modify generated docker compose to use your custom docker image.
### How to add Google Analytics code to BTCPay
You should be able to do what you want by injecting your GA code to ~/wwwroot/checkout/js/core.js. Might be the easiest way but you have to redo it every time you update BTCPay to the latest version. Then you won’t have the hassle of forking the code, deploying it manually. Every time there is an update. Just do the docker update and add the same lines to the js file.

### How to modify the checkout page?
Create a new CSS Stylesheet and name it yourdomain.css on your local site. Then, add the link to the yordomain.css to your Stores > Checkout Experience.
Create  “yourdomain.css” similar to the template below, on your local site, then add that link to your BTCPay settings.
.
Here is a sample template you can use:
```
.top-header {background-color: #fff;}
.top-header .timer-row__progress-bar {background:#ef8022;}
.top-header .timer-row {background: #ffc313;}
.payment-tabs__slider {background: #ef8022;    }
.separatorGem {background: #ef8022;}
.action-button {color: #fff; background-color: #ef8022;border-color: #ef8022;}
.action-button:hover {background-color: #ffc313;}
.action-button:focus, .action-button.focus {color: #fff;background-color: #ef8022;
    border-color: #ef8022;}
.action-button:active, .action-button.active, .open>.action-button.dropdown-toggle {    color: #fff;    background-color: #ef8022;    border-color: #ef8022;}
.action-button:active:hover, .action-button:active:focus, .action-button:active.focus, .action-button.active:hover, .action-button.active:focus, .action-button.active.focus, .open>.action-button.dropdown-toggle:hover, .open>.action-button.dropdown-toggle:focus, .open>.action-button.dropdown-toggle.focus {    color: #fff;    background-color: #ef8022;    border-color: #ef8022;}
```
