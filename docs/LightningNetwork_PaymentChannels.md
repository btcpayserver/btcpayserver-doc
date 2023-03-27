# Opening and operating payment channels

Given that the Lightning Network is a relatively new technology under active development, getting your freshly deployed node ready to send and receive payments, still, requires a couple of steps.

Overview:

1. The lightning node is deployed, enabled and its on-chain wallet is funded
2. A peer is identified and the first payment channel is opened
3. Inbound and outbound liquidity is acquired. The node is now able to **send** and **receive**
4. Liquidity management, an ongoing process to maintain the capacity to **send** and **receive**

Key considerations:

- **Choosing** the channel partner. Consider opening the first channel to a well connected peer with robust uptime. This will increase the chances for your payments to be routed and settled.
- **Inbound** vs **outbound** capacity. Outbound capacity allows nodes to **send** payments whereas inbound capacity allows nodes to **receive** payments. As a merchant using lightning, having inbound capacity is essential for customers to be able to pay you.
- **Inbound capacity**. A node adds inbound capacity by either spending sats from its local balance or having other nodes in the network open channels to it.
- **Liquidity management**: maintaining the ability to send and receive is a continous process where a balance between inbound vs outbound capacity has to be maintained across payment channels. This capacity distribution must be adjusted depending upon the use case of the node operator.
- **Lightning Service Providers**: LSPs offer paid third-party services that improve the ease of operating a lightning network node. Such services can be used to acquire inbound capacity or to automate the rebalancing process.

Below a set of good resources for a deeper dive into topics such as:

- [Good peers on the LN](https://docs.lightning.engineering/the-lightning-network/the-gossip-network/identify-good-peers)
- [Lightning node types](https://bitcoin.design/guide/how-it-works/nodes/#lightning-nodes)
- [What is Lightning liquidity?](https://bitcoin.design/guide/how-it-works/liquidity/)
- [How to get inbound capacity?](https://lightningnetwork.plus/posts/234)
- [How to manage liquidity?](https://docs.lightning.engineering/the-lightning-network/liquidity/manage-liquidity#rebalancing-channels)
- [Lightning service providers (LSP)](https://bitcoin.design/guide/how-it-works/lightning-services/)
