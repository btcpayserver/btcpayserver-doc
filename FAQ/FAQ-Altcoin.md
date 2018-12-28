# Altcoins Frequently Asked Questions

This page answers some of the common questions about alternative cryptocurrencies - altcoins.

* [Which coins BTCPay Server supports?](FAQ-Altcoin.md#which-coins-btcpay-server-supports)
* [Can an XYZ coin be added in BTCPay?](FAQ-Altcoin.md#can-an-xyz-coin-be-added-in-btcpay)
* [How to an altcoin in BTCPay?](FAQ-Altcoin.md#how-to-an-altcoin-in-btcpay)
* [How to add an altcoin to an existing BTCPay deployment?](FAQ-Altcoin.md#how-to-add-an-altcoin-to-an-existing-btcpay-deployment)
* [How to remove a coin from BTCPay?](FAQ-Altcoin.md#how-to-remove-a-coin-from-btcpay)

## Which coins BTCPay Server supports?
Besides, Bitcoin as the main focus of the project, BTCPay natively supports following alternative cryptocurrencies:

* Bitcoin Gold (BTG)
* Bitcore (BTX)
* Dash (DASH)
* Dogecoin (DOGE)
* Feathercoin (FTC)
* Groestlcoin (GRS)
* Litecoin (LTC)
* Monacoin (MONA)
* Polis (POLIS)
* Viacoin (VIA)

Native support means that these coins are using full nodes and that the payments are direct. There are certain third-party providers integrated which enable merchants to accept a more significant number of coins.

## Can an XYZ coin be added in BTCPay?
No. BTCPay developers can't add alternative coins on request. Adding a new coin explicitly depends on the community and developers of those coins. Furthermore, BTCPay developers do not spend excessive time testing nor maintaining the altcoins. If you're submitting a PR for a new coin, make sure that it works. If the altcoin integration is not actively maintained it will be removed.

## How to an altcoin in BTCPay?
To add a new coin to BTCPay, please [follow the instructions here](/Altcoins.md#how-can-i-add-an-altcoin-to-btcpayserver).

## How to add an altcoin to an existing BTCPay deployment?

If you want to expand the number of coins in your existing BTCPayServer installation, make sure that you have enough storage space.

In this example, we only have Bitcoin, and we're adding Litecoin to our docker deployment.

The coin structure:
```
BTCPAYGEN_CRYPTO1: First supported cryptocurrency (e.g., BTC, LTC. Default: btc)
BTCPAYGEN_CRYPTO2: Second supported crypto currency (e.g. btc, ltc. Default: (empty))
BTCPAYGEN_CRYPTON: N'th supported crypto currency where N is 9 at maximum. (eg. btc, ltc. Default: (empty))
```

To add Litecoin, as your second coin (CRYPTO2) do this :

```
sudo su -
export BTCPAYGEN_CRYPTO2="ltc"
. ./btcpay-setup.sh -i
```
## How to remove a coin from BTCPay?

In the [example above](#how-to-add-an-altcoin-to-an-existing-btcpay-deployment) we've added Litecoin as the second coin. To remove a particular coin, use the following command:
```
sudo su -
export BTCPAYGEN_CRYPTO2=""
. ./btcpay-setup.sh -i
```
Where CRYPTO**02** should be replaced with a coin number you wish to remove. If you have an XYZ coin as `BTCPAYGEN_CRYPTO3`, and you want to remove it, you should use CRYPT**O3**.
