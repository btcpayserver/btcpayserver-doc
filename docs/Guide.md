# BTCPay Server Documentation

## What is BTCPay Server?

BTCPay Server is a free, open-source & self-hosted bitcoin payment gateway that allows self-sovereign individuals and businesses to accept bitcoin payments online or in person without any fees.

![BTCPay Server](./img/BTCPayServerScreenshot.png 'BTCPay Server screenshot')

## How BTCPay Server works?

BTCPay Server is a self-hosted and automated invoicing system. At checkout, a customer is presented with an invoice that they pay from their wallet. BTCPay Server follows the status of the invoice through the blockchain and informs you when the payment has been settled so that you can fulfill the order. It also takes care of payment refunding and bitcoin management alongside plenty of other features.

[![How BTCPay Works](https://img.youtube.com/vi/nr0UNbz3AoQ/mqdefault.jpg)](https://www.youtube.com/watch?v=nr0UNbz3AoQ)

[![BTCPay Server Simply Explained](https://img.youtube.com/vi/dbX6qWZlxOw/mqdefault.jpg)](https://www.youtube.com/watch?v=dbX6qWZlxOw)

BTCPay Server is free to use and completely open-source, so developers or security auditors can always inspect the quality of the code.

## Features

- Direct, peer-to-peer Bitcoin payments
- No transaction fees (other than the [network fee](https://en.bitcoin.it/wiki/Miner_fees))
- No processing fees
- No middleman
- No KYC
- Non-custodial (complete control over the private key)
- Enhanced privacy
- Enhanced security
- Self-hosted software
- SegWit support
- Lightning Network support (LND, Core Lightning (CLN) & Eclair implementations)
- Tor support
- Opt-in [altcoin](./Development/Altcoins.md) integrations
- Full compatibility with legacy BitPay API (easy migration)
- Process payments for others
- Easy-embeddable payment buttons
- Point of sale app
- Crowdfunding app
- Payment Requests
- Internal, full-node reliant wallet with [hardware wallet integration](./HardwareWalletIntegration.md)
- [Payjoin Support](./Payjoin.md)

## Getting started

To start using BTCPay Server, [decide how you would like to deploy it](/Deployment/). If you decide on a self-hosted option, start by reviewing our extensive deployment documentation. We recommend [Docker deployment](/Docker/). If your choice is a third-party hosting, read our [third-party host docs](/Deployment/ThirdPartyHosting.md).

[![How BTCPay Server Features Overview](https://img.youtube.com/vi/R-yaXk4NvEs/mqdefault.jpg)](https://www.youtube.com/watch?v=R-yaXk4NvEs)

## Get involved

Contributing to an open-source project is a great way to learn, network, and build your portfolio. Volunteers around the internet maintain BTCPay Server. If you would like to contribute to the project development, check our [contributing guidelines](/Contribute.md)

If you're interested in helping out with documentation, look at the video below.

[![Contributing to Documentation](https://img.youtube.com/vi/bSDROcdSSWw/mqdefault.jpg)](https://www.youtube.com/watch?v=bSDROcdSSWw)

## Support

If you have trouble using BTCPay Server, consider joining the [communities listed on the official website](https://btcpayserver.org/#communityCTA) to get help from BTCPay community members.

Only file a [Github issue](https://github.com/btcpayserver/btcpayserver/issues) for technical issues you can't resolve through other channels or feature requests you've validated with other members of the community.

Please check out our [official website](https://btcpayserver.org/),and [FAQ](./FAQ/README.md#btcpay-frequently-asked-questions-and-common-issues) for more details.

!!!include(supporters.html)!!!
