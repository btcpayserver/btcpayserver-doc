# Docker-Compose setup

[The minimal manual setup](ManualDeployment.md) is not good enough for production environment (no reverse proxy, no HTTPS), and is a bit complicated to deploy.

The ideal deployment is similar to:

![Production BTCPay](https://raw.githubusercontent.com/btcpayserver/btcpayserver-docker/master/Production/Production.png)

There is a `docker-compose.yml` file available setting up this environment, please visit our [docker-compose for production environment](https://github.com/btcpayserver/btcpayserver-docker/tree/master/Production).