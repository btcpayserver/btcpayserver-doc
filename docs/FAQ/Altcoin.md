# Altcoins FAQ

This page answers some of the common questions about alternative cryptocurrencies - altcoins.

[[toc]]

## Which coins does BTCPay Server support?

Bitcoin is the only focus of the project and its core developers. However, opt in integrations are present for several altcoins:

- BGold (BTG) (also known as Bitcoin Gold)
- BPlus (XBC) (also known as Bitcoin Plus)
- Bitcore (BTX)
- Dash (DASH)
- Dogecoin (DOGE)
- Feathercoin (FTC)
- Groestlcoin (GRS)
- Htmlcoin (HTML) (also known as Althash)
- Liquid Bitcoin (LBTC) (comes with Liquid Tether support USDt) [(notes on deployment & usage)](https://github.com/btcpayserver/btcpayserver/issues/1282)
- Litecoin (LTC)
- Monacoin (MONA)
- Monero (XMR) [(notes on deployment)](https://github.com/btcpayserver/btcpayserver-docker/issues/204#issuecomment-552755422)
- Polis (POLIS)
- Viacoin (VIA)
- Ethereum (ETH) and related tokens [notes on deployment)](https://github.com/btcpayserver/btcpayserver/pull/1730)

Altcoins are maintained by their respective communities and are listed here only for convenience. For support regarding Altcoin deployment, functionalities or issues, please contact the Altcoin maintainer or community directly.

## Can an XYZ coin be added in BTCPay?

No. BTCPay developers don't add alternative coins on request. Adding a new coin explicitly depends on the community and developers of those coins. Furthermore, BTCPay developers do not spend excessive time testing nor maintaining the altcoins. If you're submitting a PR for a new coin, make sure that it works. If the altcoin integration is not actively maintained it will be removed from BTCPay.

## How to add an altcoin in BTCPay?

To add a new coin to BTCPay, please [follow the instructions here](../Development/Altcoins.md#how-can-i-add-an-altcoin-to-btcpayserver).

## How to add an altcoin to an existing BTCPay deployment?

If you want to expand the number of coins in your existing BTCPay Server installation, make sure that you have enough storage space on your machine.

In this example, we only have Bitcoin, and we're adding Litecoin to our docker deployment.

The coin structure:

```
BTCPAYGEN_CRYPTO1: First supported cryptocurrency (e.g., BTC, LTC. Default: btc)
BTCPAYGEN_CRYPTO2: Second supported crypto currency (e.g. btc, ltc. Default: (empty))
BTCPAYGEN_CRYPTON: N'th supported crypto currency where N is 9 at maximum. (eg. btc, ltc. Default: (empty))
```

To add Litecoin, as your second coin (CRYPTO2) do this :

```bash
sudo su -
export BTCPAYGEN_CRYPTO2="ltc"
. ./btcpay-setup.sh -i
```

## How to remove a coin from BTCPay?

In the [example above](#how-to-add-an-altcoin-to-an-existing-btcpay-deployment) we've added Litecoin as the second coin. To remove a particular coin, use the following command:

```bash
sudo su -
export BTCPAYGEN_CRYPTO2=""
. ./btcpay-setup.sh -i
```

Where CRYPTO**2** should be replaced with a coin number you wish to remove. If you have an XYZ coin as `BTCPAYGEN_CRYPTO3`, and you want to remove it, you should use CRYPTO**3**.
