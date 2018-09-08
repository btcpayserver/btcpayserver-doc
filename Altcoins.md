# Altcoins

Support is implemented for several coins:

* Litecoin
* BGold
* BCash
* Dash
* Dogecoin
* Feathercoin
* Groestlcoin
* Monacoin
* Polis
* UFO
* Viacoin

## How can I add an altcoin to BTCPayServer?

The steps for having a coin added are:

1. Add support for your crypto to [NBitcoin](https://github.com/MetacoSA/NBitcoin/tree/master/NBitcoin.Altcoins), [NBxplorer](https://github.com/dgarage/NBXplorer), and [BTCPayServer](https://github.com/btcpayserver/btcpayserver). (Use examples from other coins)
2. Create your own docker image ([Example for BTC](https://hub.docker.com/r/nicolasdorier/docker-bitcoin/))
3. Create a docker-compose fragment ([Example for BTC](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/bitcoin.yml))
4. Add your CryptoDefinition ([Example for BTC](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/src/CryptoDefinition.cs))

When testing your coin, **DO NOT USE `build.sh`**, since it uses a pre-built docker image.

Instead, install [.NET Core 2.1 SDK](https://www.microsoft.com/net/download/windows) and run:

```bash
BTCPAYGEN_CRYPTO1="EXAMPLE-COIN"
BTCPAYGEN_SUBNAME="test"
cd docker-compose-generator/src
dotnet run
```

This will generate your docker-compose in the `Generated` folder, which you can then run and test.

Note that BTCPayServer developers will not spend excessive time testing your image, so make sure it works.
