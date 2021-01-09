# Choosing a Deployment Method

There are several **different deployment methods** available, all using **the same BTCPay Server software**. Because BTCPay is a free and open-source cryptocurrency payment processor, we support diversity in deployment methods for users. Different solutions work best for [different use cases](./UseCase.md).

Business deployment methods can vary by setup, maintenance, support, price, etc. You can run **BTCPay as a self-hosted** solution on your own server, or use a **third-party host**. The self-hosted solution allows you not only to attach an unlimited number of stores and use the [Lightning Network](./LightningNetwork.md) but also become a payment processor for others.

BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party when managing funds. Payments with BTCPay go directly to your wallet. Your private keys are never uploaded to the server. Meaning **3rd Party BTCPay hosts do not control user funds**, they are simply hosting your instance of the BTCPay software for you.

:::danger
Manual deployments and Hardware builds are not recommended for production environments and require the user to have technical knowledge related to the build.
:::

![Decision diagram](./img/infographics/DecisionDiagInstallBTCPayServer.png "BTCPay Server Infographic")



## To choose one that will best suit your needs, consider the following:<br>

|Deployment method     |   Difficulty   |    Production/Dev |      All features <br>available     |             Approx. cost<br> per month      |
| -------------------------------- |:--------------:|:----------------------:|:---------------:|:-------------:|
|**Lunanode**<br>[1-click install](./LunaNodeWebDeployment.md)     |Easy          |Production| Yes| $10
|**Third-Party Hosts**<br>[What is this ?](./ThirdPartyHosting.md)        |Easy     |Production| **Host:** Yes<br>**Hostee:** No| **Free** or **Paid** hosting,<br>depending on provider.
|**Hardware As A Service:**<br>- [Lightning in a Box](https://lightninginabox.co/)<br>- [Nodl.it](https://www.nodl.it/)    |Easy to Moderate   |Production| Yes| Varies on provider 
|**Virtual Private Server:** <br>OpenVZ not supported<br>- [LunaNode](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)<br>- [Microsoft Azure](./AzureDeployment.md)<br>- [Digital Ocean](https://medium.com/@molthoff/running-btcpay-on-digital-ocean-for-10-month-how-to-add-other-coins-7a497339fb2f)<br>- [Amazon AWS EC2](https://wiki.ion.radar.tech/tutorials/nodes/btcpay-+-aws-ec2)<br>- [Google Cloud](./GoogleCloudDeployment.md)<br>- Other VPS <br> ([minimal requirements](./FAQ/FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay))           |Moderate to Hard             |Production| Yes| $10-70<br>depending on provider
|**Manual Deployment:**<br>- [Install From Command Line](http://blog.sipsorcery.com/?p=1052)<br>- [Build Without Docker Image](./ManualDeployment.md)       |Very hard       |Development| Yes| Components + Electricity 
|**Hardware build:**<br>- [ARM32v7](https://hub.docker.com/r/btcpayserver/btcpayserver/tags/)<br>- [Raspberry Pi](./RaspberryPiDeployment.md)<br>- [BTCPayBox](./HardwareDeployment.md)      |Very hard         |Development| Yes|  Components + Electricity

*Notes:*<br>
*- VPS providers that use OpenVZ are not supported.*<br>
*- [Fast Sync](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync) can be used to accelerate the initial setup sync time for most deployments.*

