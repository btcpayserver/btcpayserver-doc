# Server Settings Frequently Asked Questions

This document covers all the questions and issues related to Server Settings. This option is only available to server admin. Take a look at the [walkthrough page](/Walkthrough.md) to easier understand the navigation 

## Maintenance
    
* [How to update BTCPay Server](FAQ-ServerSettings.md#how-to-update-btcpay-server)
* [How can I check my BTCPay Server version?](FAQ-ServerSettings.md#how-can-i-see-my-btcpay-version)
* [How can I check my BTCPay Server version via terminal?](FAQ-ServerSettings.md#how-can-i-see-my-btcpay-version)
* [What is BTCPay SSH key file](FAQ-ServerSettings.md#what-is-btcpay-ssh-key-file)
* [Error the BTCPAY_SSHKEYFILE variable is not set/ Unable to update](FAQ-ServerSettings.md#btcpay_sshkeyfile-is-not-set-when-running-the-docker-install-or-unable-to-update-through-server-settings--maintenance)
* [Forgot BTCPay Admin password](FAQ-ServerSettings.md#forgot-btcpay-admin-password)
* [How to configure SMTP settings in BTCPay?](FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay)

## Theme / Customization
    
* [How to customize my BTCPay theme style](FAQ-ServerSettings.md#how-to-customize-my-btcpay-theme-style)
* [How to add Google Analytics code to BTCPay](FAQ-ServerSettings.md#how-to-add-google-analytics-code-to-btcpay)
* [How to modify BTCPay checkout page](FAQ-ServerSettings.md#how-to-modify-the-checkout-page)

## Maintenance
   
### How to update BTCPay Server

There are 2 ways to update your BTCPay Server :
1. Updating through the front end: Server Settings > Maintenance > Update.
2. Updating through SSH: Login into your virtual machine with ssh, then apply following commands:
```
sudo su -
btcpay-update.sh
```
### How can I see my BTCPay version?
You can see your BTCPay version in the bottom right of the page footer when you're logged in as a server admin.
### How can I check my BTCPay Server version via terminal?
In the btcpayserver-docker folder:`bitcoin-cli.sh getnetworkinfo`
### What is BTCPay SSH key file?
BTCPay SSH key, enables users to update their server or quickly change the domain name from btcpay website, the front-end.
### Forgot BTCPay Admin password?
You need to edit your database.

First, register new user, for example: "newadmin@example.com".
If you can't create a new user because registrations are disabled, you reset your Policies settings with the following command line, please skip this step if you could create a new user.

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
DELETE FROM "Settings" WHERE "Id" = 'BTCPayServer.Services.PoliciesSettings';
```

Then, add `newadmin@example.com` as an admin:

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

## BTCPAY_SSHKEYFILE is not set when running the docker install, or unable to update through Server Settings / Maintenance

You may see such the following message when you run your docker-compose (either via `btcpay-up.sh` or `btcpay-setup.sh`):

```bash
WARNING: The BTCPAY_SSHKEYFILE variable is not set. Defaulting to a blank string.
WARNING: The BTCPAY_SSHTRUSTEDFINGERPRINTS variable is not set. Defaulting to a blank string.
```

`BTCPay Server` requires SSH access, to allow you to perform the following tasks from the front-end:

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
### How to configure SMTP settings in BTCPay?
Each e-mail provider has different configuration, so we can't provide you with exact setup, but here's the configuration for gmail which should work:
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SSL Protocol: ON
TLS Protocol: ON
SMTP Username: (your Gmail username)
SMTP Password: (your Gmail password)
```
If by any chance you have 2-step verification added to your gmail account, [visit this article](https://support.google.com/mail/answer/185833?hl=en).
## Theme / Customization

### How to customize my BTCPay theme style
Fork  BTCPay repository and apply desired design changes. Build and publish the docker image. Generate the docker-compose as usual from [BTCPay Docker](https://github.com/btcpayserver/btcpayserver-docker). Modify generated docker compose to use your custom docker image.
### How to add Google Analytics code to BTCPay
You should be able to do what you want by injecting your GA code to ~/wwwroot/checkout/js/core.js. Might be the easiest way but you have to redo it every time you update BTCPay to the latest version. Then you won’t have the hassle of forking the code, deploying it manually. Every time there is an update. Just do the docker update and add the same lines to the js file.

### How to modify the checkout page?
Create a new CSS Stylesheet and name it yourdomain.css on your local site. Then, add the link to the yordomain.css to your Stores > Checkout Experience.
Create  “yourdomain.css” similar to the template below, on your local site, then add that link to your BTCPay settings.
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
