# Connecting Electrum Wallet to BTCPay Server

This documents shows how to connect Electrum Wallet to BTCPay Server. 

1. Create a Store in BTCPay Server
2. [Download](https://electrum.org/#download) and install Electrum Wallet

## Electrum Wallet Setup

After installation, open the Electrum Wallet by clicking on the icon on your desktop.

### Quick Setup

1. Create a new Electrum Wallet
2. In Electrum, Wallet > Wallet Information - copy the **Master Public Key**.
3. In BTCPay Server, Store Settings > General > Derivation Scheme - Paste the Extended Public Key
4. Go to Receive tab in Electrum.
5. Compare the addresses in Electrum and BTCPay Server, they should match. 
6. Confirm the address match in BTCPay.

## Step by Step

The following setup guides you through setting up an entirely new Bech32(SegWit) Wallet in Electrum. If you already have a wallet skip to the Extended Public Key copying.

Firstly, give your wallet a name, for example, `BTCPay Server Wallet` and click `Next`.

![ElectrumWallet]()

Choose Standard wallet and proceed by clicking the `Next`button.

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet2.png)

Since we're creating a brand-new wallet,choose  `Create a new seed` and `Next`

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet3.png)

From the multiple choice menu, select `SegWit` and `Next`

![ElectrumWallet]()

**IMPORTANT NOTE:** Write down your recovery words in the order you see them on the screen. Write them down a piece of paper and store it somewhere secure. Take your time and triple check each word. Do not store your seed in a digital format (photograph, text document). Whoever has the access to your seed can access your funds. Confirm that the seed has been properly backed up by re-entering it in the same order. Once the seed is validated, proceed to the next step.

![ElectrumWallet]()

It's highly recommended that you encrypt your wallet. Select a password that you can easily remember and mark make sure `Encrypt Wallet File` is marked. Proceed by clicking `Next`.

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet7.png)

When the wallet loads (it may take few moments), in the top menu, click on the `Wallet` and then`Information` .

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet9.png)

Select and **copy** the `Master Public Key`. This is the **public** key from which BTCPay will derive addresses.

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet10.png)

Return to your BTCPay Server. Click on the `Stores` in the header menu and scroll until you see `Derivation Scheme` section. Click on the `Modify` link.

![WasabiWallet]()

Paste the `Master Public Key` into derivation scheme field as it is, without adding anything else. Make sure that `Enabled` checkbox is ticked and click `Continue`.

![WasabiWallet]()

Return to the Electrum Wallet. Go to `Receive tab` which shows your wallet receiving address.

Compare the address you see in Electrum Wallet to Addresses shown in BTCPay Server. If there's a match, `continue`. If there is no match, copy the address from Electrum and paste it into `Hint Address Form`. If you still can't get the matching, double-check that you're actually pasting `Master Public Key`.

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet11.png)

### Configuring the Gap Limit in Electrum

 In the top menu, click on the `View` and then`Show Console` .

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet11a.png)

Enter following commands in Electrum console and press `enter`on your keyboard.

```
 wallet.change_gap_limit(100)
 wallet.storage.write()  
```

![ElectrumWallet](C:/Users/Pavle/Desktop/img/ElectrumWallet12.png)

Restart your Electrum and verify that the newly set gap limit is correct by entering in the console:

```
wallet.gap_limit
```

There's no good answer to how much you should set the gap limit to.  Most merchants set 100-200. If you're a big merchants with high  transaction volume, you can try with even higher gap limit.

For more details about the [Gap Limit, check the FAQ](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet).

Electrum and BTCPay Server are now connected. Any payments received to your BTCPay will be visible in Electrum, where you can further spend them.