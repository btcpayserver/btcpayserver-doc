# Altcoins

Bitcoin is the only focus of the project and its core developers. However, opt-in integrations are available for several altcoins:

- Bitcore (BTX)
- Dash (DASH)
- Dogecoin (DOGE)
- Feathercoin (FTC)
- Groestlcoin (GRS)
- Liquid Bitcoin (LBTC) (comes with Liquid Tether support USDt)
- Litecoin (LTC)
- Monacoin (MONA)
- Monero (XMR)
- Polis (POLIS)
- Viacoin (VIA)
- BGold (BTG)

Altcoins are maintained by their respective communities.

For more information, check the [Altcoin FAQ page](./FAQ/FAQ-Altcoin.md).

## How can I add an altcoin to BTCPayServer?

The steps for having a coin added are:

1. Add support for your crypto to [NBitcoin](https://github.com/MetacoSA/NBitcoin/tree/master/NBitcoin.Altcoins), [NBxplorer](https://github.com/dgarage/NBXplorer), and [BTCPayServer](https://github.com/btcpayserver/btcpayserver). (Use examples from other coins)
2. Create your own docker image ([Example for BTC](https://hub.docker.com/r/btcpayserver/bitcoin))
3. Create a docker-compose fragment ([Example for BTC](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/bitcoin.yml))
4. Add your CryptoDefinition ([Example for BTC](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/src/CryptoDefinition.cs))

When testing your coin, **DO NOT USE `build.sh`**, since it uses a pre-built docker image.

Instead, install [.NET Core 3.1 SDK](https://www.microsoft.com/net/download/windows) and run:

```bash
BTCPAYGEN_CRYPTO1="EXAMPLE-COIN"
BTCPAYGEN_SUBNAME="test"
cd docker-compose-generator/src
dotnet run
```

This will generate your docker-compose in the `Generated` folder, which you can then run and test.

Note: BTCPay developers do not implement alternative coins on request. Adding a new coin explicitly depends on the community and developers of those coins. Furthermore, BTCPay developers do not spend excessive time testing nor maintaining the altcoins. If you're submitting a PR for a new coin, make sure that your image works. If the altcoin integration is not actively maintained it will be removed from BTCPay.
