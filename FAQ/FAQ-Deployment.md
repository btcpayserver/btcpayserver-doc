# BTCPay Deployment Frequently Asked Questions

This document covers the most common questions, errors, and issues you may encounter prior and during the installation of the software. For a detailed list of deployments method and instructions for each, please see [Deployment page](Deployment.md).

## General Deployment FAQ

Here are common questions about installation, regardless of the deployment method.

* [How much it costs to run BTCPay Server?](FAQ-Deployment.md#how-much-it-costs-to-run-btcpay-server)
* [What are the minimal requirements for BTCPay?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [What is the easiest method to deploy a self-hosted BTCPay Server?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [How to choose a proper deployment method?](FAQ-Deployment.md#how-to-choose-a-proper-deployment-method)
* [Can I run BTCPay on my hardware?](FAQ/FAQ-Deployment.md#can-i-run-btcpay-on-my-own-hardware)
* [Can I deploy on my existing VPS?](FAQ-Deployment.md#can-i-deploy-btcpay-my-existing-vps)
* [Are there free hosts where I can test?](FAQ-Deployment.md#can-i-deploy-btcpay-my-existing-vps)

### How much it costs to run BTCPay Server?
BTCPay is a 100% free and open-source software. We do not charge you anything.
However, to run it, you should host it. You can run it as a self-hosted solution on your own local server, or use a cloud hosting provider, which is what a majority of users do. Advanced users can run BTCPay on [their own hardware](HardwareDeployment.md) Visit our [Deployment Page](Deployment.md) to see various ways in which you can run BTCPay.
If you do not wish to host your own server, you should use a free host. If you prefer to have control over your node and additional features, you can use a cloud solution, which goes from 5$ to 65$ /month depending on the provider you choose.

### What are the minimal requirements for BTCPay?
If you would like to run Bitcoin and Lightning Network nodes, the minimal requirements are :

* 2GB Ram
* 80 GB of storage [with enabled prunining](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose)
* Docker

### What is the easiest method to deploy a self-hosted BTCPay Server?
For beginers, we strongly recommend the [web-deployment](LunaNodeWebDeployment.md) if you want a self-hosted solution or a [third-party host](ThirdPartyHosting.md)

If you're going to add more than one crypto coin, you need to expand the storage according to that coin(s) blockchain size.

### How to choose a proper deployment method?
Please see [Deployment page] for comparison of different installation methods and choose the one that suits your needs and skill level the most.

### Can I run BTCPay on my own hardware?
Yes, you can. Check our the [Hadrdware Deployment page](HardwareDeployment.md) for detailed instructions.

### Can I deploy BTCPay my existing VPS?
Yes. BTCPay is not limited to the documented deployment methods. You can use whichever hosting solution you prefer, that fits the minimal requirements.

### Are there free hosts where I can test?
On a self-hosted BTCPay, the unlimited amount of users and stores can be attached. That's why there are users who opened their servers for others to use. Most of them are community-driven and free. See this list of [thid-party BTCPay hosts](ThirdPartyHosting.md)

## Web-deployment

### LunaNode web-deployment
- [How to change lunanode domain on my server?](https://nbitstack.com/t/how-to-change-custom-lunanode-btcpay-domain-to-my-own-domain-web-wizard-installation/82/3)

### Deployment Manual
- [Can I deploy BTCPay on my existing VPS?](https://nbitstack.com/t/how-to-set-up-btcpay-server-on-my-existing-vps/74)
- [How to manually install BTCPay on Ubuntu 18.04?](https://nbitstack.com/t/how-to-manually-install-btcpay-on-ubuntu-18-04/76/2)
- [How to install BTCPay if I am already running a full node?](https://nbitstack.com/t/how-to-install-btcpay-if-i-already-have-full-bitcoin-and-lightning-node/77)
- [Getting 500 nginx error on a local server](https://nbitstack.com/t/getting-500-nginx-error-for-my-btcpay-installed-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from/109)
