# Dynamic DNS Service

## Motivation

Dynamic DNS is needed if:
1. Install BTCPay Server on a host provider which do not provide a default domain for your server,
2. You don't want to buy your own domain name (ie, `mybusiness.com`)
3. Need to access your BTCPay Server over internet via HTTPS. (Your BTCPayServer is accessed by other internet users)

Or
1. BTCPay Server is installed on a hosting provider which does not provide a default domain for your server.
2. Need to access your BTCPay Server over internet via HTTPS.

Then you want to use BTCPayServer Dynamic DNS service.

You **don't need** Dynamic DNS Service if:

1. You host BTCPayServer at home and only access it via the local network (just using HTTP locally or using Tor is fine)
2. Your BTCPayServer should be only accessed by yourself (Just use Tor browser and the Tor address of you instance)
3. Your hosting provider provide some domain name for your server by default (ie, Lunanode for example provide a subdomain of `.lndyn.com` for free, and Azure provides for `.azurewebsites.net`)

A Dynamic DNS Providers allows you to have a free domain like `example.ddns.net` for your server, additionally Dynamic DNS Providers exposes a simple API to update the DNS record automatically when your BTCPayServer instance change its external IP address.

BTCPayServer, when configured to use Dynamic DNS, will periodically check and update the DNS record if an external IP change is detected.

## How to use

### Step 1: Create the domain
First, create an account on a Dynamic DNS provider, the most popular providers are:

* [noip](https://www.noip.com/) (free)
* [duckdns](https://www.duckdns.org/) (free)
* [dyndns](https://dyn.com/) (not free)
* [google](https://domains.google.com/) (not free)

Once you created an account, you can create a free domain name through their website.

### Step 2: Configure Dynamic DNS on BTCPayServer

You need to be administrator of your instance, go to Server Settings / Services / Dynamic DNS.

* Add a Dynamic DNS 
* Select your Dynamic DNS provider
* Enter the domain that you created in step 1
* Add the login and password that you created in step 1
* Check the `enabled` box
* Save

### Step 3: Configure your BTCPay docker install to provide HTTPS certificates

If you are using a docker deployment, you also need to update your BTCPayServer install.
Connect via SSH to your instance and run:

```bash
BTCPAY_ADDITIONAL_HOSTS="example.ddns.net"
. btcpay-setup.sh -i
```

If you have any other hosts in `BTCPAY_ADDITIONAL_HOSTS`, just separate them with `,`.