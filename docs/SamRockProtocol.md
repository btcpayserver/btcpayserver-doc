# Using the SamRock Protocol to setup your stores wallet

The [SamRock Protocol](https://github.com/rockstardev/SamRockProtocol) enables quick and easy setup for receiving payments from your BTCPay Server store directly to your self-custodial mobile wallet. This eliminates the need for manual wallet configuration and makes it simple to get started accepting Bitcoin payments.

## Overview

The SamRock Protocol plugin allows you to configure your BTCPay Server store to work with compatible mobile wallets by simply scanning a QR code. The protocol automatically sets up the necessary payment methods on your mobile device, including Bitcoin on-chain, Lightning Network, and Liquid.

**Compatible wallets:**
- [Aqua Wallet](https://aquawallet.io/)

## Requirements

- BTCPay Server v2.1.6 or newer
- [Boltz plugin](https://plugin-builder.btcpayserver.org/public/plugins/boltz) installed and enabled (required for Lightning support)
- [SamRock Protocol plugin](https://plugin-builder.btcpayserver.org/public/plugins/samrock-protocol) installed

## Setup Instructions

### 1. Install the Plugin

1. Navigate to **Server Settings > Plugins** in your BTCPay Server
2. Find "SamRock Protocol" in the **Available Plugins** list
3. Click **Install** and restart your server when prompted

:::tip
Make sure the Boltz plugin is also installed and enabled before using SamRock Protocol.
:::

### 2. Configure Your Store

1. Go to your **Store > Plugins > SamRock Protocol**
2. Select which payment methods you want to enable:
   - **Bitcoin (On-chain)**: Receive payments directly to your wallet via the Bitcoin blockchain
   - **Lightning (via Boltz API)**: Receive instant Lightning Network payments
   - **Liquid (On-chain)**: Receive payments via the Liquid Network (if enabled on your server)
3. Click **Generate QR Code**

### 3. Connect Your Mobile Wallet

1. Open your compatible mobile wallet (e.g., Aqua Wallet)
2. Scan the QR code displayed in BTCPay Server
3. Your wallet will automatically configure the selected payment methods and link them to your store

That's it! Your BTCPay Server store is now ready to receive payments directly to your self-custodial mobile wallet.

## Benefits

- **Quick setup**: No manual wallet configuration needed
- **Self-custodial**: You maintain full control of your private keys and funds
- **Multiple payment methods**: Support for Bitcoin, Lightning, and Liquid in one setup
- **Mobile-friendly**: Manage your store payments directly from your phone

## Resources

- [SamRock Protocol GitHub Repository](https://github.com/rockstardev/SamRockProtocol)
- [SamRock Protocol Plugin Page](https://plugin-builder.btcpayserver.org/public/plugins/samrock-protocol)
- [Boltz Plugin](https://plugin-builder.btcpayserver.org/public/plugins/boltz)