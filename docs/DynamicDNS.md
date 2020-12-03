# Dynamic DNS Service

## Motivation

**Dynamic DNS** is needed if:

* You are running BTCPay Server with a hosting provider that does not provide a default domain for your server
* You don't want to buy your own domain name (e.g. `mybusiness.com`)
* You need to access your BTCPay Server over internet via HTTPS. (Your BTCPayServer is accessed by other internet users)

Then you want to use **BTCPayServer Dynamic DNS service**.

You **don't need** Dynamic DNS Service if:

* You host BTCPay Server at home and only access it via the local network (just using HTTP locally or using Tor is fine)
* Your BTCPay Server should be only accessed by yourself (just use Tor browser and the Tor address of you instance)
* Your hosting provider provides a domain name for your server by default (i.e. Lunanode for example provides a subdomain of `.lndyn.com` for free, and Azure provides for `.azurewebsites.net`)

A **Dynamic DNS Providers** allows you to have a free domain like `example.ddns.net` for your server.
Additionally Dynamic DNS Providers expose a simple API to update the DNS record automatically when your BTCPay Server instance changes its external IP address.

BTCPay Server, when configured to use Dynamic DNS, will periodically check and update the DNS record if an external IP change is detected.

## How to use

### Step 1: Create the domain

First, create an account on a Dynamic DNS provider, the most popular providers are:

* [noip](https://www.noip.com/) (free)
* [duckdns](https://www.duckdns.org/) (free)
* [dyndns](https://dyn.com/) (not free)
* [google](https://domains.google.com/) (not free)

Once you've created an account, you can create a free domain name through their website.

### Step 2: Configure Dynamic DNS on BTCPay Server

You need to be administrator of your instance.
Go to Server Settings > Services > Dynamic DNS.

* Add a Dynamic DNS
* Select your Dynamic DNS provider
* Enter the domain you created in step 1
* Add the login and password you created in step 1
* Check the `enabled` box and save

### Step 3: Configure your BTCPay docker install to provide HTTPS certificates

If you are using a docker deployment, you also need to update your BTCPayServer install.
Connect via SSH to your instance and run:

```bash
BTCPAY_ADDITIONAL_HOSTS="example.ddns.net"
. btcpay-setup.sh -i
```

If you have any other hosts in `BTCPAY_ADDITIONAL_HOSTS`, just separate them with `,`.
