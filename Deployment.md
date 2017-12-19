# How to deploy a BTCPay server instance

You can deploy BTCPay Server in several ways.

Under the hood, BTCPay Server is using a minimalist block explorer called [NBXplorer](https://github.com/dgarage/NBXplorer) which track HD derived addresses. The Explorer depends on a trusted full node.

![Architecture](img/Architecture.png)

BTCPay server saves its data into either a SQLite or a PostgreSQL database.

## Minimal manual setup

The process is basically the following:

1. Download and sync [Bitcoin Core](https://bitcoincore.org)
2. Clone and run [NBXplorer](https://github.com/dgarage/NBxplorer)
3. Clone and run [BTCPay Server](https://github.com/btcpayserver/btcpayserver)

Take a look to our video to learn more:

[![BTCPay - Setup](http://img.youtube.com/vi/Xo_vApXTZBU/mqdefault.jpg)](http://www.youtube.com/watch?v=Xo_vApXTZBU "BTCPay - Setup")

## Docker-Compose setup

The minimal manual setup is not good enough for production environment (no reverse proxy, no HTTPS), and is a bit complicated to deploy.

The ideal deployment is similar to:

![Production BTCPay](https://raw.githubusercontent.com/btcpayserver/btcpayserver-docker/master/Production/Production.png)

There is a `docker-compose.yml` file available setting up this environment, please visit our [docker-compose for production environment](https://github.com/btcpayserver/btcpayserver-docker/tree/master/Production).

## Deploy to Azure setup

This setup is similar to the Docker-Compose Setup, except that the host machine of the `docker-compose` is hosted by Microsoft Azure.

If you have an Azure subscription you can then deploy with one click here.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbtcpayserver%2Fbtcpayserver-azure%2Fmaster%2Fazuredeploy.json)

Please see our video for a demo:

[![BTCPay - One Click Setup](http://img.youtube.com/vi/Bxs95BdEMHY/mqdefault.jpg)](http://www.youtube.com/watch?v=Bxs95BdEMHY "BTCPay - One Click Setup")

You can learn more on [our Azure repository](https://github.com/btcpayserver/btcpayserver-azure).

