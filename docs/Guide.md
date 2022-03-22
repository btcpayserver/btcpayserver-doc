# BTCPay Server Documentation

## What is BTCPay Server?

BTCPay Server is a free, open-source & self-hosted bitcoin payment gateway that allows self-sovereign individuals and businesses to accept bitcoin payments online or in-person without fees; zero, zip, nada!

To start using BTCPay Server, [deploy](/Deployment/README.md) your own instance, or use a [third-party host](/Deployment/ThirdPartyHosting.md).

## How BTCPay Server works?

[![How BTCPay Works](https://img.youtube.com/vi/nr0UNbz3AoQ/mqdefault.jpg)](https://www.youtube.com/watch?v=nr0UNbz3AoQ "How BTCPay Server Works")

[![BTCPay Server Simply Explained](https://img.youtube.com/vi/dbX6qWZlxOw/mqdefault.jpg)](https://www.youtube.com/watch?v=dbX6qWZlxOw "BTCPay Server Simply Explained")

## Features

* Direct, peer-to-peer Bitcoin payments
* No transaction fees (other than the [network fee](https://en.bitcoin.it/wiki/Miner_fees))
* No processing fees
* No middleman
* No KYC
* Non-custodial (complete control over the private key)
* Enhanced privacy
* Enhanced security
* Self-hosted
* SegWit support
* Lightning Network support (LND, c-lightning, Eclair and Ptarmigan)
* Tor support
* Opt-in [altcoin](./Development/Altcoins.md) integrations
* Full compatibility with BitPay API (easy migration)
* Process payments for others
* Easy-embeddable Payment buttons
* Point of sale app
* Crowdfunding app
* Payment Requests
* Internal, full-node reliant wallet with [hardware wallet integration](./HardwareWalletIntegration.md)
* [Payjoin Support](./Payjoin.md)

[![How BTCPay Server Features Overview](https://img.youtube.com/vi/R-yaXk4NvEs/mqdefault.jpg)](https://www.youtube.com/watch?v=R-yaXk4NvEs)

### How it resists censorship

* Self-hosted
* Can be run everywhere, from a low-powered device like Raspberry Pi at home to enterprise-grade servers
* No third-party
* Can easily be re-deployed

BTCPay Server does not have a central point of failure since nobody is controlling it except for the user running it. If run on the cloud server, the hosting providers can potentially censor users by suspending hosting accounts or disabling access to virtual machines. This is always a risk for anyone using a hosting provider. Since no private keys are stored on the server, a censored individual can easily re-deploy the server with another host. Your coins are always inside your wallet.

If an invoice is paid while your BTCPay Server is down, the software will automatically determine and notify the merchant of offline invoice payments when your server is back up. If a hosting provider suspends the server, and there was no proper backup, server settings and invoice data may be lost, but on-chain payments are always in your wallet. For ultimate censorship-resistance, users should run [BTCPay on their own hardware](/Deployment/Hardware.md). The software can even be run on a single-board computer, like [Raspberry Pi](/Deployment/RaspberryPi.md) from the comfort of your home.

## Support

If you have trouble using BTCPay Server, consider joining the [communities listed on the official website](https://btcpayserver.org/#communityCTA) to get help from BTCPay community members.

Only file a [Github issue](https://github.com/btcpayserver/btcpayserver/issues) for technical issues you can't resolve through other channels or feature requests you've validated with other members of the community.

Please check out our [official website](https://btcpayserver.org/), our [complete documentation](https://github.com/btcpayserver/btcpayserver-doc) and [FAQ](./FAQ/README.md#btcpay-frequently-asked-questions-and-common-issues) for more details.

![BTCPay Server](./img/BTCPayServerScreenshot.png "BTCPay Server")

### Get involved

Pull requests are welcome and appreciated.

If you're a beginner, take a look at the step by step guide on how to contribute to BTCPay Server documentation below.

[![Contributing to Documentation](https://img.youtube.com/vi/bSDROcdSSWw/mqdefault.jpg)](https://www.youtube.com/watch?v=bSDROcdSSWw "How BTCPay Server Works")

!!!include(supporters.html)!!!
