# BTCPay Server Deployment

There are several different deployment methods available, all using the same BTCPay Server software. Because BTCPay is a free and open-source cryptocurrency payment processor, we support diversity in deployment methods for users. Different solutions work best for [different use cases](UseCase.md). 

Business deployment methods can vary by setup, maintenance, support, price, etc. You can run BTCPay as a self-hosted solution on your own server, or use a third-party host. The self-hosted solution allows you not only to attach an unlimited number of stores and use the [Lightning Network](LightningNetwork.md) but also become a payment processor for others.

BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party when managing funds. Payments with BTCPay go directly to your wallet. Your private keys are never uploaded to the server. Meaning 3rd Party BTCPay hosts do not control user funds, they are simply hosting your instance of the BTCPay software for you.

Developer deployments are not recommended for production environments and require the user to have technical knowledge related to the build. 

## What are my options?

* [Web Deployment](LunaNodeWebDeployment.md)
* [Azure Deployment](AzureDeployment.md)
* [Docker Deployment](DockerDeployment.md)
* [Google Cloud Deployment](GoogleCloudDeployment.md)
* [Hardware Deployment](HardwareDeployment.md)
* [Third-Party Hosting](ThirdPartyHosting.md)
* [Manual Deployment](ManualDeployment.md)

## To chose one that will best suit your needs, consider the following:

<br>

|Web Solutions                             |1.                            |2.          |Why?          |     
| ---------------------------------------- |:----------------------------:|:----------:|:------------:|
|Business<br>(Fast Setup)                  |[3rd Party <br> BTCPay Hosts](ThirdPartyHosting.md)  |[LunaNode <br> Web-Wizard](LunaNodeWebDeployment.md)* |- Low Difficulty<br>- BTCPayServer Support (1)<br>- Lightning Network (2)     |
|Cost / Month                                     | Free                    | $10 |BTC Accepted  |

**LunaNode Web-Wizard is a VPS solution, deployable from an easy-web interface.*

<br>

|VPS Solutions                 |1.               |2.          |3.       |4.       |5.       |Why?     |
| ---------------------------- |:---------------:|:----------:|:-------:|:-------:|:-------:|:-------:|
|Business<br>(Self Setup)      |[LunaNode](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)|[Digital<br>Ocean](https://medium.com/@molthoff/running-btcpay-on-digital-ocean-for-10-month-how-to-add-other-coins-7a497339fb2f)|[Amazon<br>AWS EC2](https://wiki.ion.radar.tech/tutorials/nodes/btcpay-+-aws-ec2)|[Microsoft<br>Azure](AzureDeployment.md)    |[Google<br>Cloud](GoogleCloudDeployment.md) |-Moderate Difficulty<br>-Docker Compose<br>-Lightning Network    |
|Cost / Month          |$10 | $10 | $35 | $60 | $70  |BTC Accepted (1)|

*- BTCPay can also be deployed on any VPS that meets the [minimal requirements](FAQ/FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay).*<br>
*- VPS providers that use OpenVZ are not supported.*

<br>

|Hardware Solutions                    |1.                        |2.        |Why?      |   
| ------------------------------------ |:------------------------:|:--------:|:--------:|
|Business<br>(Hardware Setup)          |   [Lightning<br>in a Box](https://lightninginabox.co/)  | [Nodl.it](https://www.nodl.it/) |- Ready Out Of The Box<br>- Prices Vary By Service<br>- Lightning Network<br>|
|                                      |                            |            |BTC Accepted|

<br>

|Developer Solutions                     |                     |                   |              |    
| -------------------------------------- |:-------------------:|:-----------------:|:------------:|
|Developer<br>(Testing Setup)            |Manual Install       |Manual Build       |Hardware Build|
|**Not Recommended<br>For New Users**    |[Install From<br>Command Line](ManualDeploymentExtended.md)|[Build Without<br>Docker Image](ManualDeployment.md) |[Raspberry Pi 3](RaspberryPiDeployment.md)<br>[Raspberry Pi 4](https://medium.com/@wiz/1731a56719d5)<br>[Fast Sync](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync)<br>[BTCPayBox](HardwareDeployment.md) |

