# Altcoins Frequently Asked Questions

This page answers some of the common questions about alternative cryptocurrencies - altcoins.

* Which coins BTCPay Server supports?
* Can an XYZ coin be added in BTCPay?
* How to an altcoin in BTCPay?
* How to add an altcoin to an existing BTCPay deployment?

## Which coins BTCPay Server supports?
Besides, Bitcoin as the main focus of the project, BTCPay natively supports following alternative cryptocurrencies:

* Bitcoin Gold (BTG)
* Dash (DASH)
* Dogecoin (DOGE)
* Feathercoin (FTC)
* Groestlcoin (GRS)
* Litecoin (LTC)
* Monacoin (MONA)
* Polis (POLIS)
* Viacoin (VIA)

Native support, means that these coins are using full nodes, and that the payments are direct. There are certain third-party providers integrated which enable merchants to accept larger number of coins.

## Can an XYZ coin be added in BTCPay?
No. BTCPay developers can't add alternative coins on request. Adding a new coin explicliy depends on the community and developers of those coins. Furthermore, BTCPay developers will not spend an extensive time testing nor maintaining altcoins. If you're subitting a PR for a new coin, make sure that it works. If the altcoin integration is not actively maintained it will be removed.

## How to an altcoin in BTCPay?
To add a new coin to BTCPay, please [follow the instructions here](/Altcoins.md#how-can-i-add-an-altcoin-to-btcpayserver).

## How to add an altcoin to an existing BTCPay deployment?

If you want to expand the amount of coins in your existing BTCPayServer installation, make sure that you have enough storage space.

In this example, we're only have Bitcoin and we're adding Litecoin to our docker deployment.

This is how coin numbers are structured

BTCPAYGEN_CRYPTO1: First supported crypto currency (eg. btc, ltc. Default: btc)
BTCPAYGEN_CRYPTO2: Second supported crypto currency (eg. btc, ltc. Default: (empty))
BTCPAYGEN_CRYPTON: N'th supported crypto currency where N is 9 at maximum. (eg. btc, ltc. Default: (empty)) ```

So if you only have Bitcoin, to add Litecoin do this :

```
sudo su -
export BTCPAYGEN_CRYPTO2="ltc"
. ./btcpay-setup.sh -i```
