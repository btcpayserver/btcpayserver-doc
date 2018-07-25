# How to deploy a BTCPay server instance

BTCPay Server is a project which ties together several applications into a coherent user experience for managing your own payment processor.

The minimal setup involve:

* BTCPay Server
* [NBXplorer](https://github.com/dgarage/NBXplorer) (Lightweight block explorer, responsible for tracking payments)
* Bitcoin Core
* (Optional) Postgres

By default, it uses SqlLite as database, but for production use, we advise you to use Postgres.

![Architecture](img/Architecture.png)

On top of this, if you need Lightning Network support, NBXplorer can support connection to:

* C-Lightning instance via unix domain socket
* Lightning Charge
* LND via the REST Proxy

If you want altcoin supports we support connection to the following full nodes:

* BGold
* Dogecoin
* Feathercoin
* Groestlcoin
* Litecoin
* Monacoin
* Polis
* Viacoin

Because BTCPay Server has lot's of dependencies, we provide different way of deploying depending if you favor flexibility or ease of use.
From the hardest way to the easiest:

* [Manual deployment](ManualDeployment.md)
* [Docker deployment](DockerDeployment.md)
* [Azure deployment](AzureDeployment.md)

For people who wants to try BTCPay Server and does not require lightning network payment, and are not willing to host BTCPay by themselves, we advise you to see the list of third party on [The Ultimate List of BTCPay Server Hosts and Merchants](https://bitcoinshirt.co/btcpay-stores/).
