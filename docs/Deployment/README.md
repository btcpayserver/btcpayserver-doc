# Choosing a Deployment Method

There are several **different deployment methods** available, all using **the same BTCPay Server software**. Because BTCPay is a free and open-source cryptocurrency payment processor, we support diversity in deployment methods for users. Different solutions work best for [different use cases](../UseCase.md).

Business deployment methods can vary by setup, maintenance, support, price, etc. You can run **BTCPay as a self-hosted** solution on your own server, or use a **third-party host**. The self-hosted solution allows you not only to attach an unlimited number of stores and use the [Lightning Network](../LightningNetwork.md) but also become a payment processor for others.

BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party when managing funds. Payments with BTCPay go directly to your wallet. Your private keys are never uploaded to the server. Meaning **3rd Party BTCPay hosts do not control user funds**, they are simply hosting your instance of the BTCPay software for you.

![Decision diagram](../img//infographics/DecisionDiagInstallBTCPayServer.png "BTCPay Server Infographic")

:::warning PLEASE NOTE
Manual deployments and Hardware builds are not recommended for production environments and require the user to have technical knowledge related to the build.
:::

## To choose one that will best suit your needs, consider the following:<br>

|Deployment method     |   Difficulty   |    Production/Dev |      All features <br>available     |             Approx. cost<br> per month      |
|:-------------------------------------- |:--------------:|:----------------------:|:---------------:|:-------------:|
|**Lunanode**<br>[1-click install](./LunaNode.md)     |Easy          |Production| Yes| $10
|**Voltage-Cloud**<br>[1-click install](./voltagecloud.md)     |Easy          |Production| Yes| $10-$30
|**Dream Lab Network**<br>[1-click install](./DreamlabNetwork.md)     |Easy          |Production| Yes| $10
|**Third-Party Hosts**<br>[What is this ?](./ThirdPartyHosting.md)        |Easy     |Production| **Host:** Yes<br>**Hostee:** No| **Free** or **Paid** hosting,<br>depending on provider.
|**Hardware & Cloud As A Service:**<br>- [embassyOS](https://start9.com)<br>- [Lightning in a Box](https://lightninginabox.co/)<br>- [Nodl.it](https://www.nodl.it/)<br>- [Nodl.cloud](https://nodl.cloud/)<br>- [Voltage.cloud](https://voltage.cloud/)   |Easy to Moderate   |Production| Yes| Varies on provider
|**Virtual Private Server:** <br>OpenVZ not supported<br>- [LunaNode](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)<br>- [Microsoft Azure](./Azure.md)<br>- [Digital Ocean](https://medium.com/@molthoff/running-btcpay-on-digital-ocean-for-10-month-how-to-add-other-coins-7a497339fb2f)<br>- [Amazon AWS EC2](https://wiki.ion.radar.tech/tutorials/nodes/btcpay-+-aws-ec2)<br>- [Google Cloud](./GoogleCloud.md)<br>- Other VPS <br> ([minimal requirements](../FAQ/Deployment.md#what-are-the-minimal-requirements-for-btcpay))           |Moderate to Hard             |Production| Yes| $10-70<br>depending on provider
|**Manual Deployment:**<br>- [Install From Command Line](http://blog.sipsorcery.com/?p=1052)<br>- [Build Without Docker Image](./ManualDeployment.md)       |Very hard       |Development| Yes| Components + Electricity
|**[Hardware](./Hardware.md) build:**<br>- [Raspberry Pi 4](./RaspberryPi4.md)<br>- [Hack0](./Hack0.md)     <br>- [LightningInABox](./LightningInABox.md) | hard         |Development| Yes|  Components + Electricity

*Notes:*<br>
*- VPS providers that use OpenVZ are not supported.*<br>
*- [Fast Sync](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync) can be used to accelerate the initial setup sync time for most deployments.*
