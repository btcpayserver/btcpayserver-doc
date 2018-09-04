# Docker deployment

[The minimal manual setup](ManualDeployment.md) is not good enough for production environment (no reverse proxy, no HTTPS), and is a bit complicated to deploy.

The ideal architecture is `Docker-Compose`-driven, and looks similar to:

![Production BTCPay](https://raw.githubusercontent.com/btcpayserver/btcpayserver-docker/master/Production/Production.png)

Please visit [btcpayserver/btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) to see this production deployment and how it works.