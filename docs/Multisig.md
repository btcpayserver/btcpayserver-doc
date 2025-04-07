# MultiSig support in BTCPay Server

BTCPay Server v2.1.0 introduced refined support for multi signature (multisig) wallets designed to empower your  setup with added security, collaboration, and flexibility.

This document provides step-by-step instructions for configuring and utilizing multisig wallets within your BTCPay Server instance.

## Overview

Multisig functionality in BTCPay Server enables:

- Collaborative custody: Create a wallet that requires multiple signatures to authorize a transaction.
- Self-hosted multisig coordination:  Control of your company’s public keys and signing flow without relying on a third-party.
- Hardware wallet support: Works seamlessly with the BTCPay Vault and is compatible with majority hardware signing devices. 
- Notification system: Stay informed with email alerts when transactions are created, pending, (requiring sufficient amount of signatures), and broadcasted.
- Integration with plugins: Works with Vendor Pay and future features, enabling multisig-based payouts. Integrates with Xpub Extractor, allowing all multisig participants to easily get appropriate format

## Prerequisites

Ensure the following components are installed and configured:

- BTCPay Server instance (v2.1 or later)
- [BTCPay Vault](https://github.com/btcpayserver/BTCPayServer.Vault)
- [XpubExtractor Plugin](https://github.com/btcpayserver/BTCPayServer.Plugins.XpubExtractor)

## Step 1: Collect Extended Public Keys (Xpubs)

The following explains how to get required public key from the hardware wallet. If you're using software wallet, you can proceed to step 2.

1. Navigate to `Manage Plugins` and confirm that **XpubExtractor** is installed and published by *rockstarDev*.
2. Connect the hardware wallet and launch **BTCPay Vault**.
3. Use the `Fetch Xpub` function to retrieve:
   - Extended public key (xpub)
   - Root fingerprint
   - Derivation path
4. Save data for the wallet.

Example value:

```
xpub6Eh12KpYoorF2phGJErUqk6A9SSezH2VBHZnVPMdk1diUgraoYpgTsAsWKiNfzFc73MKVqfvMymtqR8UBf2stztAFj8SWk2EML87WotrDfx
Root Fingerprint: a919595d
Key Path: 48'/0'/21'/2'
```
### Inviting Additional Signers

1. Go to `Settings` > `Users`.
2. Add each participant’s email address and share the generated invite link with them directly. If you have Email SMTP in your server, they'll receive an inite email.
3. Instruct participants to:
   - Accept the invitation
   - Create a BTCPay Server Store
   - Use XpubExtractor to provide their xpub information
4. They should save data for their wallets and share them with you.

## Step 2: Create the Multisignature Wallet

After collecting all required public keys, (e.g., 2-of-3 setup), proceed as follows:

1. Go to `Bitcoin Wallets`.
2. Select `Connect an existing wallet` > `Enter extended public key`.
3. Choose `Show multisig examples` and input the collected xpubs in the required format.
4.  Click `Continue` to validate and preview the derived addresses. You can validate the preview via external software wallet, or simply by testing in the final step of this document.

An example of your multisig could look like this:
```
2-of-xpub6Eh12KpYoorF2phGJErUqk6A9SSezH2VBHZnVPMdk1diUgraoYpgTsAsWKiNfzFc73MKVqfvMymtqR8UBf2stztAFj8SWk2EML87WotrDfx-xpub6FChbvMdDCViWxLKu2PfSKkndZgNquGLVF3AxJAKmhrqYzzagtp7T9a6Jq9y6uWQVTNsa8UTRkgD1Erxt15hzbAaDuWUVy55LDtMDLem7EK-xpub6Ddo52iB3E3QUniDwsbMyGQVsYCCzyNdV4ULCFSeUw6h3LW4hYYcZsFAni8E5wEuMRuwr6fPtTrvRswitivuBmhiwwQ7dXyu6ibaKbcMMRy
```

This means 2 out of 3 listed signatures are required to authorize  a transaction. 

Next, adjust wallet settings to ensure proper compatability with various formats and easier signing.

1. Navigate to `Wallet Settings`.
2. Enable the **Multisig on Server** option.
3. Input the root fingerprint and derivation path for each key.
4. Enable `Include non-witness UTXO in PSBTs` for enhanced compatability.
5. `Save` changes.

### (Optional) Testing the receive funds setup

1. In the sidebar, click `Bitcoin > Receive`
2. Label the address (e.g. "Test")
3. Send a small amount of Bitcoin to verify the setup
4. Optionally you can import the multisig into a different software to verify receiving works.

## 3. Configure email notifications

To receive updates on multisig activity:

1. Go to `Store Settings > Emails > Email Rules`
2. Add the following rules with multisig participants email addresses:
- Pending Transaction Created
- Signature Collected
- Transaction Broadcasted

This ensures all participants receive email when the new transaction is created, requires their signature and finally broadcasted sucessfully.

## Step 4: Send a transaction from the multisig wallet

1. Go to your multisig wallet
2. Enter recipient address and amount (or sweep all funds)
3. Click `Create Pending Transaction`
4. Participants will not receive an email if you followed the Step 3.

## Step 5. Signing a mutli-sig transaction:

1. In wallet transaction list, you will see a pending transaction.
2. Click on `View`
3.  If you're signing with a hardware wallet, connect your hardware wallet and ensure BTCPay Vault is running
2. Click Sign
3. Follow on-screen and device prompts to sign the transaction

Once the required number of signatures is collected, click Broadcast to send the transaction.

Congratulations! You’ve sent your first multisig transaction using BTCPay Server.