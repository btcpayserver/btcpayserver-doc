# Prestashop Plugin for BTCPay server, an opensource Payment processor

Warning this is a Beta version. Use it at your own risk.

## Description

A bitcoin payment plugin for **PrestaShop** using BTCPay Server.

# Using the BTCPay plugin for Prestashop

## Prerequisites

* [Self-hosted BTCPay](./Deployment.md) or a server [hosted by a third-party](./ThirdPartyHosting.md)
* [Registered account on the instance](./RegisterAccount.md)
* [Created BTCPay store](./CreateStore.md)
* [Connected wallet to a store](./WalletSetup.md)

If you want to test in test mode, just paste an other btcpayserver url with testing port.

## Making a release

* Add Bitpay [https://github.com/btcpayserver/php-bitpay-client/tree/master/src/Bitpay](https://github.com/btcpayserver/php-bitpay-client/tree/master/src/Bitpay) into `modules/bitpay/lib`
* Zip btcpay directory into btcpay.zip
* Add bitcoin icon into Order state configuration / icon !

## Server Requirements

* PrestaShop 1.7
* PHP 5+
* Curl PHP Extension
* JSON PHP Extension

## Plugin Configuration

### For Prestashop versions 1.7:

1. Download the latest release from [https://github.com/btcpayserver/prestashop-plugin/releases](https://github.com/btcpayserver/prestashop-plugin/releases)
2. Go to your PrestaShop administration. Under "Modules and services" select "Upload a module" (v1.7)
3. Go to your "installed modules" -> "BTCPay" and click [Configure]<br />
4. Go on your BTCPay server, in your store and display access tokens.
5. Click on "Create a new token API", select your store and then approve
6. You will see: "Server initiated pairing code: XXXX". Go back to prestashop and enter your pairing code.
7. Validate.
8. Test a payment.

## Support

### Tested successfully

* Prestashop 1.7.x
* BTCPay server v1.0.1 and v1.0.2

### Contribute

To contribute to this project, please fork and submit a pull request.

* [GitHub Issues](https://github.com/btcpayserver/prestashop-plugin/issues)

### PrestaShop Support

* [Homepage](http://www.prestashop.com)
* [Documentation](http://doc.prestashop.com/)
* [Support Forums](http://www.prestashop.com/forums/)
