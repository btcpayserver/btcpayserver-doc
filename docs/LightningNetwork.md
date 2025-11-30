# Lightning Network (LN) and BTCPay Server

## Glossary

- **Lightning Network (LN)**: A second-layer payment protocol that enables fast, low-cost Bitcoin transactions by creating payment channels between parties.
- **Self-custodial**: Maintaining full control and ownership of your private keys and funds, without relying on third parties.
- **Custodial Wallet**: A wallet where a third party controls your private keys and manages your funds on your behalf.
- **Liquidity**: The available balance in a payment channel that can be used to send or receive payments.
- **Payment Channel**: A two-way payment relationship between two parties on the Lightning Network.
- **LSP (Liquidity Service Provider)**: A service that provides inbound liquidity by opening payment channels to your node.
- **On-chain**: Transactions that are recorded on the Bitcoin blockchain.
- **Off-chain**: Transactions that occur on second-layer solutions like the Lightning Network, not directly on the blockchain.
- **Sats (satoshis)**: The smallest unit of Bitcoin, equal to 0.00000001 BTC.
- **L-BTC**: Liquid Bitcoin, a tokenized version of Bitcoin on the Liquid Network.

## Lightning Network (LN) and BTCPay Server

As a merchant, you want to make payments as affordable as possible for your customers and yourself. With the growing adoption of Bitcoin, traditional on-chain payments will become increasingly expensive. The Lightning Network, also known as off-chain payments, offers a solution by enabling cheap and instant transactions. This makes it an ideal choice for online payments and in-person sales, also referred to as Point of Sale (PoS) sales.

There are many different ways for merchants to get the Lightning Network setup on BTCPay Server - depending on your technical skills and desire to be in control of your funds. We will start with the easiest, but custodial options and evolve gradually towards full self-custody and control. The thinking behind this is: Before you as a merchant do not accept bitcoin payments at all it’s better you do it via the most easy solution available for a great starting point and experience. We hope you will change your setup towards more self-sovereignty and control over your funds in the future, as you learn more about Bitcoin and its possibilities.

:::tip
If you want to get started quickly and have no time to read this all take a look in using SamRock Protocol to [setup wallets auto-magically](SamRockProtocol.md) for you.
:::

**Table of contents**:
[[toc]]

## Using a custodial wallet/service

**Pros:**
* easy to set up
* no liquidity management needed
* no need to run your own LN node
* you can choose to auto-convert to stablecoins/fiat
* works even on shared instances (as long as the admin enables that plugin)

**Cons:**
* trust in a 3rd party needed
* some form of KYC needed
* funds are at risk if the service goes bankrupt or does a rug-pull
* often limits on per payment amount
* often limits on total amounts processed per month


With this option you use a trusted service to do all the heavy lifting of running an LN node for you. They also charge some fee either directly or via exchange rate spread and have full control over your funds.

If you are worried about Bitcoin price volatility, both of the options listed below allow you to auto-convert your BTC to stablecoins or fiat currencies (USD, EUR).

All that said, it is the quickest and easiest way to accept LN payments and get started.

At the time of writing you have two options available via Plugins on BTCPay Server:

* Blink ([setup guide](https://dev.blink.sv/examples/btcpayserver-plugin))
* Strike ([setup guide](https://github.com/rockstardev/strike-btcpayserver-plugin))

:::tip
When using any custodial service, you should keep your balance on the service low and withdraw the funds to your self-custodial LN wallet or swap it to on-chain bitcoin via a swapping service like [Boltz](https://boltz.exchange). You can also swap funds to fiat currency via the [Bringin plugin](https://plugin-builder.btcpayserver.org/public/plugins/bringin) or Strike directly.
:::

## Using Boltz swapping service

**Pros:**
* easy to set up
* very cheap compared to other solutions
* works even on shared instances (as long as the admin enables that plugin)

**Cons:**
* 0-amount invoices not possible (see [this](https://docs.boltz.exchange/boltz-btcpay-plugin/limitations))
* swaps to L-BTC (needs swapping of L-BTC to BTC to be fully self-custodial)

This option is using the [boltz.exchange](https://boltz.exchange) service by swapping LN payments to Liquid BTC (L-BTC, more about Liquid Network [here](https://liquid.net)). Liquid requires trust in a federation of companies so it is not fully self-custodial, although many entities would need to collude to rug-pull you.

Same as with custodial services, you should regularly swap funds to real self-custodial on-chain BTC from time to time to be in full control. With a hot wallet the boltz plugin allows you to automatically swap to BTC.

You can find the docs for the plugin [here](https://btcpay.docs.boltz.exchange/) and a blog post with some more background information [here](https://blog.boltz.exchange/p/launching-the-boltz-btcpay-plugin)

In the process of setup you will need to set up a new Liquid wallet or use an existing one. The quickest and easiest way to do so is using [SamRock Protocol](SamRockProtocol.md). 

## Using Liquidity Service Providers (LSPs)

**Pros:**
* relatively easy to set up
* self-custodial
* no need to allocate capital

**Cons:**
* you need to buy liquidity (and pay for their capital costs)
* needs rebalancing (swapping LN to on-chain BTC) to reuse channel capacity
* expensive initial setup during high-fee environments

There are different ways on how you can interact with LSPs on BTCPay Server. The idea is that you pay the LSP so they open a LN channel to your node and you can receive payments without reserving your own funds. For this service the LSP charges a small fee; additionally you need to pay the cost for opening the channel to your node. One major benefit is that you can re-use channels by rebalancing funds. This means in practice you can let the LSP open an e.g. 10 million sats channel to you. When the channel balance is almost fully on your side you can send funds out over LN or do a swap to on-chain BTC over [Boltz](https://boltz.exchange) or other swapping services.

You can manually receive liquidity from LSPs like [LNBIG](https://lnbig.com/#/), [Lightning Network+](https://lightningnetwork.plus/), [Megalithic](https://megalithic.me/), [Zeus LSP](https://channels.zeuslsp.com/), [LN Server](https://lnserver.com/) or you can install the [LSPS plugin](https://plugin-builder.btcpayserver.org/public/plugins/get-lightning-channel) from Megalith using [this guide](https://github.com/MegalithicBTC/BTCPayserver-LSPS1/blob/master/README.md) which supports multiple LSPs you can choose from.


## Doing it all on your own (fully self sovereign)

**Pros:**
* you are in full control
* no 3rd party involved
* nobody can stop you

**Cons:**
* you need to manage payment channels
* you need to manage liquidity
* you need to allocate funds

By running your own node and also managing your channels on your own, you are in full control, and no 3rd party can deny you the ability to accept Bitcoin payments. This comes with a bit of a learning curve and ongoing management costs for managing channels and liquidity.

You can run CLN (Core Lightning) or LND alongside your BTCPay Server directly on your instance, or you can connect to your externally hosted LN node via REST, Socket or LNDHub connections.

**Ways to run and/or connect your LN node:**
* Use internal LN node (CLN, LND or Eclair)
* Connect your external LN node via REST, TCP or LNDHub (e.g. you can connect your Alby Hub node)
* Connect your LN wallet over [Nostr Wallet Connect](https://nwc.dev/) (NWC), you need to have the [Nostr plugin](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.NIP05) installed (also works for Alby Hub)
