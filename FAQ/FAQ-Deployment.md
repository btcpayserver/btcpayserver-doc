# BTCPay Deployment Frequently Asked Questions

This document covers the most common questions, errors, and issues you may encounter prior and during the installation of the software. For a detailed list of deployments method and instructions for each, please see [Deployment page](/Deployment.md).

## General Deployment FAQ

Here are common questions about installation, regardless of the deployment method.

* [How much does it cost to run BTCPay Server?](FAQ-Deployment.md#how-much-does-it-cost-to-run-btcpay-server)
* [What are the minimal requirements for BTCPay?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [What is the easiest method to deploy a self-hosted BTCPay Server?](FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [How to choose a proper deployment method?](FAQ-Deployment.md#how-to-choose-a-proper-deployment-method)
* [Can I run BTCPay on my hardware?](FAQ-Deployment.md#can-i-run-btcpay-on-my-own-hardware)
* [Can I deploy on my existing VPS?](FAQ-Deployment.md#can-i-deploy-btcpay-on-my-existing-vps)
* [Are there free hosts where I can test?](FAQ-Deployment.md#are-there-free-hosts-where-i-can-test)
* [After initial deployment, I can't register and I don't have a login yet?](FAQ-Deployment.md#after-initial-deployment-i-cant-register-and-i-dont-have-a-login-yet)

## Web Deployment FAQ
### Luna Node Web Deployment FAQ
* [How to change domain name on my LunaNode BTCPay?](FAQ-Deployment.md#how-to-change-domain-name-on-my-lunanode-btcpay)

## Manual Deployment FAQ
* [Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)](FAQ-Deployment.md#getting-500-nginx-error-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from)
* [How to manually install BTCPay on Ubuntu 18.04?](FAQ-Deployment.md#how-to-manually-install-btcpay-on-ubuntu-1804)
* [Error: BTCPay is expecting you to access this website from...](FAQ-Deployment.md#btcpay-is-expecting-you-to-access-this-website-from)

## General Deployment

### How much does it cost to run BTCPay Server?
BTCPay is a 100% free and open-source software. We do not charge you anything.
However, to run it, you should host it. You can run it as a self-hosted solution on your own local server, or use a cloud hosting provider, which is what a majority of users do. Advanced users can run BTCPay on [their own hardware](/HardwareDeployment.md) Visit our [Deployment Page](/Deployment.md) to see various ways in which you can run BTCPay.
If you do not wish to host your own server, you should use a free host. If you prefer to have control over your node and additional features, you can use a cloud solution, which goes from 5$ to 65$ /month depending on the provider you choose.

### What are the minimal requirements for BTCPay?
If you would like to run Bitcoin and Lightning Network nodes, the minimal requirements are :

* 2GB Ram
* 80 GB of storage [with enabled pruning](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose)
* Docker

### What is the easiest method to deploy a self-hosted BTCPay Server?
For beginners, we strongly recommend the [web-deployment](/LunaNodeWebDeployment.md) if you want a self-hosted solution or a [third-party host](ThirdPartyHosting.md)

If you're going to add more than one crypto coin, you need to expand the storage according to that coin(s) blockchain size.

### How to choose a proper deployment method?
Please see [Deployment page](/Deployment.md) for comparison of different installation methods and choose the one that suits your needs and skill level the most.

### Can I run BTCPay on my own hardware?
Yes, you can. Check our the [Hardware Deployment page](/HardwareDeployment.md) for detailed instructions.

### Can I deploy BTCPay on my existing VPS?
Yes. BTCPay is not limited to the documented deployment methods. You can use whichever hosting solution you prefer, that fits the minimal requirements.

### Are there free hosts where I can test?
On a self-hosted BTCPay, the unlimited amount of users and stores can be attached. That's why there are users who opened their servers for others to use. Most of them are community-driven and free. See this list of [third-party BTCPay hosts](/ThirdPartyHosting.md)

### After initial deployment, I can't register and I don't have a login yet?
When you deploy your BTCPay Server, you should first register a user (during server synchronization). This user is automatically the server admin. If your BTCPay only shows Login in the header menu, and you are unable to register the first user after initial deployment, someone else has registered on your server as the admin. Although this is unlikely to occur (the user would need to know and watch your BTCPay domain name), they had access to your ssh private keys, thus you should redeploy a new server for security reasons. 

## Web-deployment

Here you can find common questions and solutions to BTCPay web-deployments.

### LunaNode web-deployment

#### How to change domain name on my LunaNode BTCPay?
1. In your LunaNode dashboard, click on Virtual Machines > Your Virtual Machine > General Tab > External IP. Copy the external IP.
2. Go to your DNS provider and create an A record. Paste the external IP.
3. Go to Server Settings > Maintenance > Change Domain. Paste yourdomain.com without http or https prefix.

Additional documentation can be found on [domain change page](/ChangeDomain.md).

## Manual Deployment

#### Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)

You need to open port 80 and 443. Once you did that, restart docker `btcpay-restart.sh`

#### How to manually install BTCPay on Ubuntu 18.04?

Check this [community guide](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install). 

#### BTCPay is expecting you to access this website from

You might see this error on the front page of your BTCPay Server since version `1.0.3.73`.

This is caused by a breaking change made in BTCPay to be able to handle different domain on the same server.

It happens because your BTCPay Server is not exposed directly on internet, instead a reverse proxy (like nginx or IIS) receive the request and forward it to BTCPay Server.

Sadly, depending on the configuration of your reverse proxy, either the HTTP HOST header has been replaced, or the reverse proxy did not forwarded the protocol at the front with the http header `X-Forwarded-Proto`.

If you use NGinx, here is what you need to have at the top level in `/etc/nginx/conf.d/default.conf`:

```
map $http_x_forwarded_proto $proxy_x_forwarded_proto {
  default $http_x_forwarded_proto;
  ''      $scheme;
}
proxy_set_header Host $http_host;
proxy_set_header X-Forwarded-Proto $proxy_x_forwarded_proto;
```

If your reverse proxy is Apache 2, you need to set those two settings

```
<VirtualHost *:443>
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPreserveHost on
...
</VirtualHost>
```
