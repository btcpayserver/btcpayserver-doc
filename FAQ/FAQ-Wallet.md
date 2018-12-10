# BTCPay Wallet FAQ

This document contains frequently asked questions and solution to common issues regarding internal or external wallets you're using with or within BTCPay.

* [What is BTCPay wallet](#what-is-btcpay-wallet)
* [What is wallet re-scan in BTCPay?](#what-is-wallet-re-scan-in-btcpay)
* [Recommended external wallets](#recommended-external-wallets)
* [How to connect my wallet](#how-to-connect-my-wallet-to-btcpay-server)
* [Missing payments in wallet](#missing-payments-in-my-software-or-hardware-wallet)
* [Electrum and Zap show different addresses](#receiving-address-in-zap-and-electrum-is-different)
* [How to see payments on a mobile device](#can-i-see-my-payments-on-mobile)

## What is BTCPay wallet?

BTCPay has an internal wallet which you can use to see the transactions and even send the money out of it. The wallet works only with a supported hardware wallet, like Ledger Nano S. 

You'll have to confirm and sign the transaction on your hardware wallet. BTCPay wallet is not a hot wallet. The private keys are secured inside your hardware wallet.

## What is wallet re-scan in BTCPay?

The Rescan feature is best explained in a real-life situation:

* You use a wallet outside of BTCPay (for example Ledger Nano S with the Ledger Live app)
* You receive payment worth 1BTC to your Nano S wallet. 
* After a while you decide to use Ledger wallet with the same xpub key with BTCPay Server. You add this xpub as a derivation scheme in your Store.
* You then find out that BTCPay has no information about transaction A, and shows 0 BTC balance while Ledger Live shows 1BTC.

This happens because when you use a new derivation scheme with your store, BTCPay Server doesn't know the past transactions of your wallet.

To solve this issue, you need to use the **Rescan feature**. The Rescan relies on Bitcoin Core 0.17.0's [scantxoutset](https://bitcoincore.org/en/doc/0.17.0/rpc/blockchain/scantxoutset/) to scan the current state of the blockchain (called UTXO Set) for coins belonging to your derivation scheme.
Once the scan is complete, BTCPay Server will show the correct balance, along with some of past transactions of your wallet.

## Recommended external wallets?

We highly recommend you to use an internal wallet in case you need to double-check the transaction. If you wish to use an external wallet, here are our recomendations

* Electrum - desktop wallet
* Ledger Nano S - hardware wallet (other hardware wallets should be added at some point)
* Zap - Lightning Network LND wallet
* Spark - Lightning Network c-lightning wallet
* Sentinel - Watch-only on-chain wallet Android
* ArcBit / bitWallet - Watch-only on-chain wallet Android

## How to connect my wallet to BTCPay Server?

The process of connecting a wallet to your BTCPay server is the same for both third-party or self-hosted deplpyment. Your private keys are never uploaded nor required by the BTCPay Server. You’re only uploading the xpubkey.

There are two ways to connect your BTCPay and your wallet:

1. Automatic with Ledger Nano S hardware wallet
2. Manual with any wallet supporting xpubkey (Electrum highly recommended)

Watch the video below or read [this article](https://bitcoinshirt.co/how-to-create-store-accept-bitcoin/8/#Connecting-BTCPay-with-your-wallet) for step by step instructions.

[![ConnectBTCPayWallet](https://img.youtube.com/vi/xX6LyQej0NQ/mqdefault.jpg)](https://www.youtube.com/watch?v=xX6LyQej0NQ "BTCPay - Connecting Wallet")

## Missing payments in my software or hardware wallet

If your internal BTCPay wallet is showing the transactions and you do not see the funds on your desktop, mobile or hardware wallet, you need to **increase the gap limit** of the external wallet you're using. Do not worry, your funds are safe.

Most wallets, have a gap limit of 20. This means that after 20 consecutive unpaid invoices, wallet will stop fetching the transactions beyond that and won't show them. The solution is to increase the gap limit. Not all wallets have this feature.

For that reason, it's highly recommended that you use [Electrum wallet](https://electrum.org/). To set increase the gap limit in Electrum, [follow this video](https://www.youtube.com/watch?v=Fi3pYpzGmmo)

Enter following commands in Electrum console:

```
 wallet.change_gap_limit(100)
 wallet.storage.write()  
```
Restart your Electrum and verify that the newly set gap limit is correct by entering:

`wallet.gap_limit`

There's no good answer to how much you should set the gap limit to. Most merchants set 100-200. If you're a big merchants with high transaction volume, you can try with even higher gap limit. 

Be aware that :

* Higher gap limit may slow down the performance of your wallet
* Not all wallets support the increased gap limit. If you import Electrum recovery seed into another wallet, you may not see all the funds again.

When an invoice is created in BTCPay, it does it for all coins you have setup. You may want to increase the gap limit for altcoins as well in their supported wallets.

If you do not see your funds yet, you may have set up your derivation scheme incorrectly.

## Why is my Ledger not detected by BTCPay Server?

Check that you are running the ledger app with a version equals or above 1.2.4. Make sure to use Google Chrome. Plug your Ledger Nano S into PC. Enter the PIN, and select the coin wallet app, for example > Bitcoin. Try refreshing the browser.
 
If the problem persists, contact the owner of the BTCPay Server: The reverse proxy of the BTCPay server hosting BTCPay might not support Websocket.

To confirm this is the issue, create a new invoice and go on its checkout page, you can also go on your store's "Wallet" page.
You should then you will see this error in the javascript console.

```
WebSocket connection to ‘wss://pay.example.com/i/4yhCmpWxJcHfVG3rV4EmEu/status/ws’ failed: Error during WebSocket handshake: Unexpected response code: 404
```

To fix the situation, if your reverse proxy is nginx, make sure that the following is included at the top of `/etc/nginx/conf.d/default.conf`.

```
# If we receive Upgrade, set Connection to "upgrade"; otherwise, delete any
# Connection header that may have been passed to this server
map $http_upgrade $proxy_connection {
  default upgrade;
  '' close;
}
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $proxy_connection;
```

Then restart nginx.

```
/etc/init.d/nginx reload
```
## Receiving address in Zap and Electrum is different?

Zap and Electrum are two different wallets. Zap is for [Lightning Network](LightningNetwork.md) and Electrum is for on-chain transactions. They are unrelated and use different private keys. Use Electrum or internal BTCPay wallet to check your on-chain payments and Zap for your Lightning Network payments. 

In future, there will be wallets merging both on-chain and off-chain into one, but for now, you have to use them separately.

## Can I see my payments on mobile?

If you wish to follow your on-chain payments on a mobile device, you can use a watch-only wallet like [Sentinel for Android](https://play.google.com/store/apps/details?id=com.samourai.sentinel) and [bitWallet](https://itunes.apple.com/us/app/bitwallet-bitcoin-wallet/id777634714) or [ArcBit](https://itunes.apple.com/ca/app/arcbit-bitcoin-wallet/id999487888) for iOS. Watch-only wallets allow xpub import and don't require the private key.
