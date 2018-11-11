# BTCPay Server Deployment

There are several different deployment methods available, all using the same BTCPay Server software. Because BTCPay is a free and open-source cryptocurrency payment processor, we support diversity in deployment methods for users. Different solutions work best for [different use cases](https://github.com/btcpayserver/btcpayserver-doc/blob/master/UseCase.md). 

Business deployment methods can vary by setup, maintenance, support, price, etc. You can run BTCPay as a self-hosted solution on your own server, or use a third-party host. The self-hosted solution allows you not only to attach an unlimited number of stores and use the [Lightning Network](https://github.com/btcpayserver/btcpayserver-doc/blob/master/LightningNetwork.md) but also become a payment processor for others.

BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party when managing funds. Payments with BTCPay go directly to your wallet. Your private keys are never uploaded to the server. Meaning 3rd Party BTCPay hosts do not control user funds, they are simply hosting your instance of the BTCPay software for you.

Developer deployments are not recommended for production environments and require the user to have technical knowledge related to the build. 

## What are my options?

* [Web Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/LunaNodeWebDeployment.md)
* [Azure Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/AzureDeployment.md)
* [Docker Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/DockerDeployment.md)
* [Google Cloud Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/GoogleCloudDeployment.md)
* [Hardware Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/HardwareDeployment.md)
* [Third-Party Hosting](https://github.com/btcpayserver/btcpayserver-doc/blob/master/ThirdPartyHosting.md)
* [Manual Deployment](https://github.com/btcpayserver/btcpayserver-doc/blob/master/ManualDeployment.md)

## To chose one that will best suit your needs, consider the following:

<br>

|Web Solutions                             |1.                            |2.          |Why?          |     
| ---------------------------------------- |:----------------------------:|:----------:|:------------:|
|Business<br>(Fast Setup)                  |[3rd Party <br> BTCPay Hosts](https://github.com/btcpayserver/btcpayserver-doc/blob/master/ThirdPartyHosting.md)  |[LunaNode <br> Web-Wizard](https://github.com/btcpayserver/btcpayserver-doc/blob/master/LunaNodeWebDeployment.md)* |- Low Difficulty<br>- BTCPayServer Support (1)<br>- Lightning Network (2)     |
|Cost                                      |Free / Pay                    |10 USD / mo |BTC Accepted  |

**LunaNode Web-Wizard is a VPS solution, deployable from an easy-web interface.*

<br>

|VPS Solutions                          |1.                      |2.          |3.          |Why?     | 
| ------------------------------------- |:----------------------:|:----------:|:----------:|:-------:|
|Business<br>(Self Setup)               |[LunaNode](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)           |[Microsoft<br>Azure](https://github.com/btcpayserver/btcpayserver-doc/blob/master/AzureDeployment.md)    |[Google<br>Cloud](https://github.com/btcpayserver/btcpayserver-doc/blob/master/GoogleCloudDeployment.md) |- Moderate Difficulty<br>- Docker Compose Build<br>- Lightning Network    |
|Cost                                   |10 USD / mo             |60 USD / mo |70 USD /mo  |BTC Accepted (1)|

*BTCPay can also be deployed on any VPS that meets the [minimal requirements](https://github.com/btcpayserver/btcpayserver-doc/blob/master/FAQ.md#what-are-the-minimal-requirements-to-run-btcpay).*

<br>

|Hardware Solutions                    |1.                          |2.          |Why?      |   
| ------------------------------------ |:--------------------------:|:----------:|:--------:|
|Business<br>(Hardware Setup)          |Ready Out Of<br>The Box   |  Installation &<br>Consultation |- Prices Vary By Service<br>- BTCPayServer Support<br>- Lightning Network<br>[Nodl.it](https://www.nodl.it/) / [Lightning in a Box](https://lightninginabox.co/) |
|                                      |                            |            |BTC Accepted|

<br>

|Developer Solutions                     |                     |                   |              |    
| -------------------------------------- |:-------------------:|:-----------------:|:------------:|
|Developer<br>(Testing Setup)            |Manual Install       |Manual Build       |Hardware Build|
|**Not Recommended<br>For New Users**    |[Install From<br>Command Line](http://blog.sipsorcery.com/?p=1052)|[Build Without<br>Docker Image](https://github.com/btcpayserver/btcpayserver-doc/blob/master/ManualDeployment.md) |[ARM32v7](https://hub.docker.com/r/ketominer/btcpayserver-arm32v7/)<br>[BTCPayBox](https://github.com/btcpayserver/btcpayserver-doc/blob/master/HardwareDeployment.md) |

