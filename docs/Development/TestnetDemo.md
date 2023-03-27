# Testnet demo

First let's create a new store:

1. Go to the [Testnet website](https://testnet.demo.btcpayserver.org/)
2. On the right side click on **Create an account** to [create an account](https://testnet.demo.btcpayserver.org/register) or **Sign In** if you already have an account.
3. After having signed in, create a new store.

Let's use Electrum to create a testnet wallet for your store:

1. Download [Electrum](https://electrum.org)
2. Run Electrum with parameter `--testnet` (i.e. on Mac OS using `open -a Electrum.app --args --testnet`)
3. Click through the wizard and create a test wallet, using the default settings Electrum proposes
4. After the wallet is set up, go to "Wallet" > "Information" in the Electrum menu.
5. Copy the "Master Public Key" string (starting by `*pub...`)

Let's configure the store so it uses your Electrum wallet:

1. Go to the Settings page of your store in BTCPay
2. On the "General Settings" page you will find the "Wallet" section - click the "Setup" button for configuring an on-chain wallet.
3. Paste the "Master Public Key" copied from Electrum into the "Derivation Scheme" text field and click "Continue"
4. Confirm the addresses by clicking on "Receive" in Electrum: The "Receiving address" should match the first address shown in BTCPay
5. After that your test wallet should appear on the [Wallets page](https://testnet.demo.btcpayserver.org/wallets) of your BTCPay account

Then you can create an invoice, either through

- The "Invoice" menu on the website or
- The process documented in the [Custom integration](../CustomIntegration.md)

## Questions

If you have questions about the BTCPay Server on Testnet, you can join the [community chat](https://chat.btcpayserver.org/).
If you have questions about any of the other tools or commands, etc. it's likely you can find answers to your questions by doing a search on the internet or on [StackOverflow](https://stackoverflow.com/).
