# Getting started with the Lightning Network (LN) for merchants

You as a merchant want to make it as cheap as possible for your customers (and yourself) to pay. Normal Bitcoin payments (also called on-chain payments) will only get more expensive as Bitcoin adoption grows in the future. With the Lightning Network (also called off-chain payments) it is possible to do cheap payments and on top of that unlike with normal Bitcoin payments the settlement is instant, which is a huge UX improvement. This makes the Lightning Network (LN) ideal for online payments but also very convenient for in person sales, also referred to as Point of Sale (PoS) sales.

There are many different ways for merchants to get the Lightning Network setup on BTCPay Server - depending on your technical skills and desire to be in control of your funds. We will start with the easiest, but custodial options and evolve gradually towards full self custody and control. The thinking behind this is: Before you as a merchant do not accept bitcoin payments at all it’s better you do it via the most easy solution available for a great starting point and experience. We hope you will change your setup towards more self-sovereignty and control over your funds in the future, as you learn more about Bitcoin and its possibilities.


## Using a custodial wallet/service

**Pros:**
* easy to setup
* no liquidity management needed
* no need to run your own LN node

**Cons:**
* trust in third party needed
* some form of KYC needed
* funds at risk if the service goes bankrupt or rugpulls
* often limits on per payment amount
* often limits on total amounts processed per month

With this option you use a trusted service to do all the heavy lifting of running a LN node for you. They also charge some Fee either directly or via exchange rate spread. and have full control over your funds. That said, it is the quickest and easiest way to accept LN payments and get started.

At the time of writing you have two options available via Plugins on BTCPay Server:

* Blink ([setup guide](https://dev.blink.sv/examples/btcpayserver-plugin))
* Strike ([setup guide](https://github.com/rockstardev/strike-btcpayserver-plugin))

:::tip
When using a custodial service you should keep your balance on the service low and withdraw the funds to your non-custodial LN wallet or swap it to on-chain bitcoin via a swapping service like boltz.exchange. Or you can swap funds to Fiat currency via our Bringin plugin or Strike directly.
:::

## Using Boltz swapping service

**Pros:**
* easy to setup
* works even on shared instances (as long as the admin enables that plugin)
* cheap compared to other solutions

**Cons:**
* 0-amount invoices not possible (see [this](https://docs.boltz.exchange/boltz-btcpay-plugin/limitations))
* swaps to L-BTC (needs swapping of L-BTC to BTC to be fully non-custodia)

This is option is using the [boltz.exchange](https://boltz.exchange) service by swapping LN payments to Liquid BTC (L-BTC, more about Liquid Network [here](https://liquid.net)). Liquid requires trust in a federation of companies so it is not fully non-custodial although many entities would need to collude to rugpull you.

Same as with custodial services you should regularly swap funds to real non-custodial on-chain BTC from time to time to be in full control. With a hot wallet the boltz plugin allows you to automatically swap to BTC.


## Using Liquidity Service Providers (LSPs)

**Pros:**
* easy to setup
* non-custodial
* no need to allocate capital

**Cons:**
* you need to buy liquidity (and pay for their capital costs)
* needs rebalancing (swapping LN to on-chain BTC) to reuse channel capacity
* expensive initial setup during high fee environments

There are different ways on how you can interact with LSPs on BTCPay Server. The idea is that you pay the LSP so they open a LN channel to your node and you can receive payments without reserving your own funds. For this service the LSP charges a small fee and additionally you need to pay the cost for opening the channel to your node. One major benefit is that you can re-use channels by rebalancing funds. This means in practice you can let the LSP open an e.g. 10 million Sats channel to you. When the channel balance is almost fully on your side you can send funds out over LN or do a swap to on-chain BTC over Boltz or other swapping services.


## Doing it all on your own (fully self sovereign)

**Pros:**
* you are in full control
* no 3rd party involved
* nobody can stop you

**Cons:**
* you need to manage payment channels
* you need to manage liquidity
* you need to allocate funds

By running your own node and also managing your channels on your own you are in full control and no 3rd party can deny you the ability to accept Bitcoin payments. This comes with a bit of a learning curve and ongoing management costs for managing channels and liquidity.

You can run CLN (Core Lightning) or LND alongside your BTCPay Server directly on your instance or you can connect to your externally hosted LN node via REST, Socket or LNDHub connections.

**Ways to run and/or connect your LN node:**
* Use internal LN node (CLN, LND or Eclair)
* Connect your external LN node via REST, TCP or LNDHub (e.g. you can connect your Alby Hub node)
* Connect your LN wallet over Nostr Wallet Connect (NWC), you need to have the [Nostr plugin](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.NIP05) installed (also works for Alby Hub)
