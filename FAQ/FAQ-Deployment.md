# BTCPay Deployment Frequently Asked Questions

This document covers the most common questions, errors, and issues you may encounter prior and during the installation of the software. For a detailed list of deployments method and instructions for each, please see [Deployment page](/Deployment.md).

## General Deployment FAQ

Here are common questions about installation, regardless of the deployment method.

* [How much does it cost to run BTCPay Server?](FAQ-Deployment.md#how-much-does-it-cost-to-run-btcpay-server)
* [What are the minimal requirements for BTCPay?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [What is the easiest method to deploy a self-hosted BTCPay Server?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [How to choose a proper deployment method?](FAQ-Deployment.md#how-to-choose-a-proper-deployment-method)
* [Can I run BTCPay on my hardware?](FAQ/FAQ-Deployment.md#can-i-run-btcpay-on-my-own-hardware)
* [Can I deploy on my existing VPS?](FAQ-Deployment.md#can-i-deploy-btcpay-my-existing-vps)
* [Are there free hosts where I can test?](FAQ-Deployment.md#can-i-deploy-btcpay-my-existing-vps)

## Web Deployment FAQ
### Luna Node Web Deployment FAQ
* [How to change domain name on my LunaNode BTCPay?](FAQ-Deployment.md#how-to-change-domain-name-on-my-lunanode-btcpay)

## Manual Deployment FAQ
* [Getting 500 nginx error on aa local server https and for http (BTCPay is expecting you to access this website from)](FAQ-Deployment.md#getting-500-nginx-error-on-aa-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from)
* [How to manually install BTCPay on Ubuntu 18.04?](FAQ-Deployment.md#how-to-manually-install-btcpay-on-ubuntu-1804)

## General Deployment

### How much does it cost to run BTCPay Server?
BTCPay is a 100% free and open-source software. We do not charge you anything.
However, to run it, you should host it. You can run it as a self-hosted solution on your own local server, or use a cloud hosting provider, which is what a majority of users do. Advanced users can run BTCPay on [their own hardware](/HardwareDeployment.md) Visit our [Deployment Page](/Deployment.md) to see various ways in which you can run BTCPay.
If you do not wish to host your own server, you should use a free host. If you prefer to have control over your node and additional features, you can use a cloud solution, which goes from 5$ to 65$ /month depending on the provider you choose.

### What are the minimal requirements for BTCPay?
If you would like to run Bitcoin and Lightning Network nodes, the minimal requirements are :

* 2GB Ram
* 80 GB of storage [with enabled prunining](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose)
* Docker

### What is the easiest method to deploy a self-hosted BTCPay Server?
For beginers, we strongly recommend the [web-deployment](/LunaNodeWebDeployment.md) if you want a self-hosted solution or a [third-party host](ThirdPartyHosting.md)

If you're going to add more than one crypto coin, you need to expand the storage according to that coin(s) blockchain size.

### How to choose a proper deployment method?
Please see [Deployment page](/Deployment.md) for comparison of different installation methods and choose the one that suits your needs and skill level the most.

### Can I run BTCPay on my own hardware?
Yes, you can. Check our the [Hadrdware Deployment page](/HardwareDeployment.md) for detailed instructions.

### Can I deploy BTCPay my existing VPS?
Yes. BTCPay is not limited to the documented deployment methods. You can use whichever hosting solution you prefer, that fits the minimal requirements.

### Are there free hosts where I can test?
On a self-hosted BTCPay, the unlimited amount of users and stores can be attached. That's why there are users who opened their servers for others to use. Most of them are community-driven and free. See this list of [thid-party BTCPay hosts](/ThirdPartyHosting.md)

## Web-deployment

Here you can find common questions and solutions to BTCPay web-deployments.

### LunaNode web-deployment

#### How to change domain name on my LunaNode BTCPay?
1. In your LunaNode dashboard, click on Virtual Machines > Your Virtual Machine > General Tab > External IP. Copy the external IP.
2. Go to your DNS provider and create an A record. Paste the external IP.
3. Go to Server Settings > Maintainance > Change Domain. Paste yourdomain.com without http or https prefix.

Additional documentation can be found on [domain change page](/ChangeDomain.md).

## Manual Deployment

#### Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)

You need to open port 80 and 443. Once you did that, restart docker `btcpay-restart.sh`

### How to manually install BTCPay on Ubuntu 18.04?

Check this [community guide](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install). 
