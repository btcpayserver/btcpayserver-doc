# Connecting Coldcard Wallet to BTCPay Server

This document shows how to use a **Coldcard Wallet** with your BTCPay Server.

## Coldcard Wallet Setup

This guide assumes, you have a Coldcard wallet set up. To configure the **Coldcard**, please see the [quick setup guide on manufacturer's website](https://coldcardwallet.com/docs/quick).

### Quick Setup

1. Insert the MicroSD card into the Coldcard wallet.
2. Go to Advanced > MicroSD Card > Electrum Wallet > Native-Segwit
3. Insert the MicroSD card back into your PC
4. In BTCPay Server, Stores > Settings > Setup > Connect an existing wallet > `Import wallet file`
5. Choose File > select the wallet file earlier exported from Coldcard.
6. Click `Continue`
7. Confirm the addresses match the ones shown in your BTCPay Server.

The **Coldcard is now connected to your BTCPay Server**. Payments go directly to Coldcard. The video below shows how to connect your BTCPay store to your Coldcard.

[![BTCPay and Coldcard](https://img.youtube.com/vi/N0eVwdP_7EQ/mqdefault.jpg)](https://www.youtube.com/watch?v=N0eVwdP_7EQ "Connecting Coldcard to BTCPay Server")

### Spending from BTCPay Server wallet with Coldcard (PSBT)

Once there are some funds in received to your **BTCPay Wallet connected to Coldcard**, you can spend them by using [PSBT](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md#psbt-in-general) (Partially Signed Bitcoin Transactions). This allows completely offline signing of your transactions, without ever having to connect your hardware wallet to the internet.

1. Wallets > Manage > Send
2. Fill in destination address and the amount
3. Click on the Sign with `a wallet supporting PSBT` button.
4. You will be redirected to PSBT tab, with pre-filled information, click on the `Sign with a wallet supporting PSBT (save as file)`
5. Save the file onto MicroSD card
6. Insert MicroSD into your Coldcard.
7. In Coldcard, click on the `Ready To Sign`
8. Review the transaction information, and click OK button to sign it.
9. Transaction will be saved onto MicroSD.
10. In BTCPay, go to PSBT tab of the wallet and upload the signed PSBT file.
11. Click `Decode`
12. Click `Other Actions` and select `Review`
13. Review your transactions and click `Broadcast` to broadcast it on the network.

The video below shows **how to connect your BTCPay store to your Coldcard**.

[![BTCPay Server and Coldcard](https://img.youtube.com/vi/oK0h-76Giaw/mqdefault.jpg)](https://www.youtube.com/watch?v=oK0h-76Giaw "PSBT Coldcard and BTCPay Server")
