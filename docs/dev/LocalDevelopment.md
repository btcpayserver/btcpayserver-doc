# Local development

## Prerequisites

For the development environment you need to install these tools:

* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download)
* Docker: [Windows](https://docs.docker.com/docker-for-windows/install/) | [Mac OS](https://docs.docker.com/docker-for-mac/install/) | [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## Dependencies

To execute tests and run the project for debugging you also need instances of the following running and configured on the right ports:

* [NBXplorer](https://github.com/dgarage/NBxplorer)
* [Postgres](https://www.postgresql.org/)
* [Bitcoin Core](https://bitcoincore.org/) (and optionally other full nodes)

We recommend you use our dockerized setup to bootstrap the development environment:
The file [BTCPayServer.Tests/docker-compose.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.yml) can be used to spin everything up:

```bash
git clone https://github.com/btcpayserver/btcpayserver.git
cd btcpayserver/BTCPayServer.Tests
docker-compose up dev
```

To get started see the [README of the test project](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/README.md).

## Which IDE?

We recommend using Visual Studio Code (cross platform) or Visual Studio 2019 (Windows Only) or Rider (cross platform).
You can of course use VIM if you are hardcore, .NET Core is command-line environment friendly.

Visual Studio Code, Visual Studio and Rider will run the debug profile Docker-Regtest.
This will run a BTCPayServer instance connecting to the services in your Docker service, so you can easily debug and step through the code.

## Videos

For more information check out these videos:

* [How to contribute to BTCPay Server Development (Windows)](https://youtube.com/watch?v=ZePbMPSIvHM) by Nicolas Dorier
* [Setting up BTCPayServer development environment on Linux (Ubuntu)](https://youtube.com/watch?v=j486T_Rk-yw) by RockStarDev
* [BTCPay Server Development - Testing pull request, payments (MacOS)](https://youtube.com/watch?v=GWR_CcMsEV0) by Pavlenex

and these notes:

* [How to get started with development](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/README.md) by Nicolas Dorier (covering relevant docker commands, paying regtest invoices)
