# Payjoin implementation notes

## Introduction

Payjoin is a generic term for any privacy mechanism where merchants can protect their own and the privacy of their customers by mixing merchant's UTXOs with customer's payment.

This has two purposes:

* It protects the sender by fighting against one of the biggest heuristic used by privacy invading technology: No longer can it be assumed that all the inputs in a transaction belongs to the same entity
* It allows the receiver to consolidate UTXOs and [batch](#batching) his own payments to economize on-chain fee.

[Bustapay (BIP79)](https://github.com/bitcoin/bips/blob/master/bip-0079.mediawiki) is a specification of such mechanism and has been the first attempt to properly standardize it.

However, we identified some issues in the Bustapay specification, so we needed to deviate from it.

This document attempts at describing the protocol BTCPay Server is using, along with our implementation choices and rationale behind all of them.

Not only the will allow additional wallets to interoperate with us more easily, but this provides a way to get feedback from the community of things we may have overlooked. We may submit this protocol as a Bitcoin Improvement Proposal once we are confident nothing is missing.

## In a nutshell

We are using the same one step process as [bustapay (BIP79)](https://github.com/bitcoin/bips/blob/master/bip-0079.mediawiki), where the sender is creating a PSBT (or transaction) called the `original transaction`, which is a valid payment which can be broadcasted by the receiver as-is if the payjoin fails.

If a payjoin is possible, the receiver sends back a `payjoin transaction proposal` which represents a transaction or PSBT signed by the receiver. Such proposal includes additional inputs or outputs from the receiver.

The sender validates this `payjoin transaction proposal`, signs it and broadcasts the resulting valid `payjoin transaction`.

## Difference with Bustapay

The [bustapay (BIP79)](https://github.com/bitcoin/bips/blob/master/bip-0079.mediawiki) proposal has been written as a proposal protocol for payjoin.

We initially implemented it, but found out that the specification was missing certain important aspects.
Also, because this is a new proposal, we expect that even our own proposal will experience breaking changes in the short-term.
As such, we preferred writing our own specification for the time being.
Once the specification stabilizes and has gone through review and testing by the community, we will decide whether we will submit to the BIP process, or if we can just modify bustapay BIP79.

Bustapay is currently not widely deployed, so we are not worried about breaking backwards compatibility.

Our implementation is identical to bustapay with the following differences.

```diff
- The standard way of letting a sender know where to send a bustapay transaction is done via a bip21 encoded address. The key value "bpu" (short for "BustaPayUrl") should be used. An example of such address would be bitcoin:2NABbUr9yeRCp1oUCtVmgJF8HGRCo3ifpTT?bpu=https://bp.bustabit.com/submit It is highly encouraged that urls are kept short.
+ The standard way of letting a sender know where to send a bustapay transaction is done via a bip21 encoded address. The key value "pj" (short for "payjoin URL") should be used. An example of such address would be bitcoin:2NABbUr9yeRCp1oUCtVmgJF8HGRCo3ifpTT?pj=https://example.com/submit It is highly encouraged that urls are kept short.

- Step 1. Sender creates a bitcoin transaction paying the receiver
+ Step 1. Sender creates a bitcoin transaction OR PSBT paying the receiver
+ While we also support the use of raw transaction instead of PSBT, we strongly advise against it.

- This transaction must use segwit for all inputs, and be fully valid and signed. The transaction must be eligible for propagation on the network (but not done so at this stage)
+ If using PSBT, the PSBT must be finalized with witness UTXO information.
+ If using transactions, the transaction must use segwit for all inputs, and be fully valid and signed. The transaction must be eligible for propagation on the network (but not done so at this stage

- Step 2. Sender gives the "template transaction" to the receiver
+ Step 2. If using PSBT, sender gives "original PSBT" to the receiver, in base64 or hex format.
+ If using transactions, sender gives "original transaction" to the receiver, in hex format.
- This is done via an HTTP POST request, sent to a "[bustapay] url"
+ This is done via an HTTP POST request, sent to a "[payjoin] url"

Step 3. Receiver processes the transaction and returns a partially signed coinjoin

- The receiver validates the transaction, and pays himself. The receiver then adds one or more of his own inputs (known as the contributed inputs) and (optionally) increases the output that pays himself (generally by the sum of the contributed inputs). Doing so creates a partial transaction, which the receiver returns to the sender. It is called such as it requires the sender to re-sign his own inputs.
+ The receiver extracts the transaction, optionally verifying it is valid. (by calling testmempoolaccept on the extracted transaction)
+ The receiver extracts the feerate, adds one of his inputs and decreases the change output of the payer by the increased fee difference his input added such that the feerate is the same as the "orginal PSBT" or "original transaction".
```

The rest of the process is similar to bustapay.

We will refer to the sender's PSBT by the name of `original PSBT` and the receiver's payjoin proposal as `payjoin PSBT`.

There is no guarantee concerning the ordering of outputs and inputs in either the `original PSBT` or the `payjoin PSBT`. (Note about [BIP69](Payjoin-spec.md#increasing-privacy-of-clients-using-bip69))

Note: We strongly recommend the sender to submit a PSBT in Base64 format.
However, we also accept the PSBT or a bitcoin transaction in hex format.

## Rationale

Here is the rationale for using PSBT instead of raw transactions, and why the receiver should be responsible to bump the fee of the payjoin transaction.

### Respecting the minimum relay fee policy

To be properly relayed, a Bitcoin transaction needs to pay at least 1 satoshi per virtual byte.
When fees are low, the original transaction is already 1 satoshi per virtual byte, so if the merchant adds their own input, they need to make sure the fee is increased such that the rate does not drop below 1 satoshi per virtual byte.

### Preventing mempool replacement

A safe way to implement payjoin, is for both the sender and receiver to try broadcasting the original transaction at some fixed interval period regardless of the state of the payjoin.

If the receiver was not properly adding fees to the payjoin transaction, the original transaction would end up replacing the payjoin transaction in the mempool.

### Defeating heuristics based on the fee calculation

Most wallets are creating a round fee rate (like 2 sat/b).
If the payjoin transaction's fee was not increased by the added size, then those payjoin transaction could easily be identifiable on the blockchain.

Not only would those transactions would stand out by not having a round fee (like 1.87 sat/b), but any suspicion of payjoin could be confirmed by checking if removing one input would create a round fee rate.

### Receiver does not need to be a full node

Because the receiver needs to bump the fee to keep the same fee rate as the original PSBT, it needs the input's UTXO information to know what is the original fee rate. Without PSBT, light wallets like Wasabi Wallet would not be able to receive a payjoin transaction.

The validation (policy and consensus) of the original transaction is optional: a receiver without a full node can decide to create the payjoin transaction and automatically broadcast the original transaction after a timeout of 1 minute, and only verifying that it has been propagated in the network.

However, automated systems (like BTCPay Server) need to verify the transaction to prevent UTXO probing attacks.

This is not a concern for receivers using end-user wallets such as Wasabi Wallet, such receivers can just limit the number of original PSBT proposals of a specific address to one. With such wallets, the attacker has no way to generate new deposit addresses to probe the UTXOs.

## Implementation notes

### Receiver side

The BTCPay Server implementation is making the following checks on the original PSBT:

* The original PSBT must be finalized (Fails with error `psbt-not-finalized`)
* All the inputs must be P2WPKH or P2SH-P2WPKH and only if the the store has utxos that match the original tx inputs (Fails with error `unsupported-inputs`) [*](#unsupported-inputs)
* The PSBT is sane (Fails with error `insane-psbt`)
* All inputs have the `witnessUTXO` (Fails with error `need-utxo-information`)
* Check that there is no global xpubs, HD Key or public key information in the PSBT (Fails with error `leaking-data`)
* Check that the extracted transaction can be accepted by mempool (Fails with error `invalid-transaction`)

Then the original PSBT is deemed valid, however, other checks are done which depends on the state of the receiver's state.

* Check that it pays an actual invoice (Fails with error `invoice-not-found`)
* Check that the invoice does not have any outstanding payment (Fails with error `already-paid`)
* Check that the whole amount of the invoice is paid (Fails with error `invoice-not-fully-paid`)
* Check that the inputs used in the original PSBT have never been used for another payjoin (Fails with `inputs-already-used`)
* Check that the receiver has available UTXO to contribute to the payjoin (Fails with error `out-of-utxos`, the receiver will broadcast the original transaction)
* Check that the receiver can actually sign (Fails with error `unavailable`)

From this point, the receiver will automatically try to broadcast the original transaction after 1 minute, whatever happens.
Then, we proceed to create the payjoin transaction by cloning the original transaction:

* If there is only one output, we add a second output [*](#spare-change)
* We include some of the receiver's inputs

Finally, we need to increase the fees to pay for the increased size of the payjoin transaction to pay for additional inputs and outputs of the receiver.

* If the sender overpaid the invoice, we substract fees on the overpaid part of the output paying the invoice. [**](#receiver-pay)
* We substract the rest to other outputs that we assume are change outputs, making sure their value does not go below dust.
* If there is not enough money to pay for the increased fee, check that the fee rate of the payjoin transaction is above the minimum relay fee (today 1 satoshi per byte). If not, fails with error `not-enough-money`.

From this point, we consider the invoice `paid` in BTCPay Server. As the receiver can broadcast the original transaction at any time. It appears in the invoice details as a transaction with `-1` confirmations. (That is, a transaction not yet broadcasted but still accounted for)

We then send the payjoin transaction proposal back to the sender.

\* <a name="unsupported-inputs"></a>: We currently only support receivers and senders using P2WPKH or P2SH-P2WPKH, while we plan to relax this in a later release, it is important for the receiver to use the same input's type as the sender, otherwise the payjoin transaction would provide no privacy benefit. Since most wallets do not support P2WSH or wrapped P2WSH for the sender, we decided to not offer this feature for now.

\*\* <a name="receiver-pay"></a>: If the sender overpays the invoice, we can substract fees from his over paid amount. This is especially useful when somebody wants to make a donation from a small unspent output in his own wallet the amount of his change may be overpaying the invoice. If we were not substracting the fees on the output paying the invoice, we would fall into a `not-enough-money` error, as no change exists.

### Sender side <a name="sender"></a>

Before sending the original PSBT to the receiver, the sender should make sure that the original PSBT is at least attempted to be broadcasted automatically after 1 minute of submission.

The sender then follows the steps:

* Check that the payjoin PSBT must not contain global xpub, hd key path or public key information.
* Check that the PSBT is sane.
* Check that all the spent outpoints in the original PSBT still exists in the coinjoin PSBT.
* Check that all the spent outpoints in the original PSBT does not have any partial signature.
* Check that the receiver added at least one input.
* Check that the receiver added P2WPKH or P2SH-P2WPKH inputs.
* Check that the receiver inputs type match the inputs type of the sender. (ie. both using P2SH-P2WPKH or both using P2WPKH)
* Check that any other outpoints (those added by the receiver) are finalized.
* Check that the transaction version, and nLockTime are unchanged.
* Check that the sender's input's sequence numbers are unchanged.
* Update `WitnessUTXO` of the PSBT.
* Fill out only the HD Key paths and public keys of inputs and outputs that were present in the original PSBT.
* Check that the sent amount in the payjoin transaction is the same as the sent amount of the original transaction. [*](#calculate-balance)
* If those are different:
  * Check that the additional paid amount is not more than the additional fee paid in the payjoin transaction.
  * Check that the additional paid amount is not more than twice the original fee
  * Check that the additional paid amount is not more than the expected fee once the payjoin transaction is fully signed [**](#calculate-increased-fee)

After all those checks, the sender can proceed to sign the payjoin transaction.

Our client is able to pay a onion payjoin endpoint, this will allow wallets hosted on BTCPay Server to pay desktop or mobile wallets without any NAT configuration.

Note:

* The sender **does NOT check** whether ouputs have been removed or modified. This allows flexibility to the receiver to adapt his receiving address type to match the other outputs's address type of the sender, or, on the contrary, to create a payment output which would be considered a change address by common chain analysis heuristic. For example, if the receiver supports both P2WPKH and P2SH-P2WPKH, even if the invoice's address in the original transaction was P2WPKH, the receiver may change the address to be P2SH-P2WPKH to match sender's change address format. This is safe because the sender only cares that they do not send too much money in the payjoin transaction. It is also useful if the receiver wants to batch some of their own payments in the transaction.
* Our method of checking fee allows the receiver to batch payments in the payjoin transaction as long as they pay the fee above the sender's expected amount. (See [batching](Payjoin-spec.md#receivers-payment-batching))

\*<a name="calculate-balance"></a>: For calculating the sent amount of the payjoin transaction, you must only include in the calculation the inputs and outputs that were also present in the original PSBT. (in other words, those with HD key paths and public keys set)

\**<a name="calculate-increased-fee"></a>: To calculate the expected fee once the payjoin transaction is fully signed, we estimate its virtual size and multiply by the fee rate of the original transaction, then we add: `fee_rate * 2 * input_count`. This allow small error of fee estimation and account for outputs that may have been removed if they ended up below dust.

## Other considerations

### Analysis poisoning

Malicious entities often send very small amounts of bitcoin to used, tainted addresses in an effort to deanonymise the receiver.

For example if Mallory knows that address A belongs to Bob, and Mallory wants to know the other unspent outputs of Bob, she can send 1000 satoshi to address A.
Then Bob would eventually make a payment including this unspent output and other unspent output B and C. Mallory could learn from this that B and C belongs to Bob.

However, if Bob is suspicious about those 1000 satoshi and knows about Mallory attempts to deanonymise him, Bob can decide to send those 1000 satoshi to Alice in a payjoin transaction. Mallory would then have her analysis poisoned with the mistaken belief that some of Alice's unspent output belong to Bob.

Another example of analysis poisoning is explained in [the following section](Payjoin-spec.md#blockchain-analytics-heuristics-affected-by-our-implementation).

### Spare change donation <a name="spare-change"></a>

Small change inside wallets are detrimental to privacy. Mixers like Wasabi wallet, because of its protocol, eventually generate such [small change](https://docs.wasabiwallet.io/using-wasabi/ChangeCoins.html#spend-the-change-with-another-entity-where-you-don-t-mind-if-each-of-the-two-know-that-you-transact-with-the-other-entity).

A common way to protect your privacy is to donate those spare changes to your favorite developer (ie Nicolas Dorier), to deposit them in an exchange or on your favorite merchant's store account. Those kind of transactions can easily be spotted on the blockchain: There is only one output.

However, if you donate via payjoin, it will look like a normal transaction.

On top of this we poison analysis by randomly faking a round amount of satoshi for the additional output. (See [the heuristic section](Payjoin-spec.md#blockchain-analytics-heuristics-affected-by-our-implementation))

### Blockchain analytics heuristics affected by our implementation <a name="heuristics"></a>

Our implementation of payjoin is breaking the following blockchain heuristics:

* Common inputs heuristics.

Because payjoin is mixing the inputs of the sender and receiver, this heuristic becomes unreliable.

* Change identification from scriptPubKey type heuristics.

When Alice pays Bob, if Alice is using P2SH but Bob's deposit address is P2WPKH, the heuristic would assume that the P2SH output is the change address of Alice.
This is now however a broken assumption, as the payjoin receiver has the freedom to mislead analytics by purposefully changing the invoice's address in the payjoin transaction.

If Bob's original address is P2WPKH and Alice is sending from P2SH, then Bob can change the receiving address in the payjoin transaction to be P2SH, preventing the use of this heuristic.

Alternatively, if the original address of Bob is P2WPKH and Alice is also P2WPKH, Bob can change the receiving address in the payjoin to P2SH. The heuristic would wrongfully identify the payjoin's receiving address as the change address of the transaction.

* Change identification from round change amount

If Alice pays Bob, she might be tempted to pay him a round amount, like `1.23000000 BTC`. When this happens, blockchain analysis often identify the output without the round amount as the change of the transaction.

For this reason, during a [spare change](Payjoin-spec.md#spare-change-donation) situation, we randomly round the amount in the output added by the receiver to the payjoin transaction.

## Risks

### On the receiver side: UTXO probing attack

When the receiver creates a payjoin proposal, they expose one or more inputs belonging to them.

An attacker could create multiple original transactions in order to learn the UTXOs of the receiver, while not broadcasting the payjoin proposal.

While we cannot prevent this type of attack entirely, we implemented the following mitigations:

* When the receiver detects an original transaction being broadcasted, or if the receiver detects that the original transaction has been double spent, then they will reuse the UTXO that was exposed for the next payjoin.
* Only a single payjoin is possible per invoice.
* While the exposed UTXO will be reused in priority to not leak other UTXOs, there is no strong guarantee about it. This prevents the attacker from detecting with certainty the next payjoin of the merchant to another peer.

Note that probing attacks are only a problem for automated payment systems such as BTCPay Server. End-user wallets with payjoin capabilities are not affected, as the attacker can't create multiple invoices to force the receiver to expose their UTXOs.

### On the sender side: Double payment risk for hardware wallets

For a successful payjoin to happen, the sender needs to sign two transactions double spending each other: The original transaction and the payjoin proposal.

BTCPay Server or end user wallets can verify that the payjoin proposal is legitimate by following [the sender's steps explained earlier](Payjoin-spec.md#sender-side).

However, a hardware wallet can't verify that this is indeed the case. This means that the security guarantee of the hardware wallet is decreased. If BTCPay Server or the end user wallet is compromised, the hardware wallet would sign two valid transactions, thus sending two payments.

Without payjoin, the maximum amount of money that could be lost by a compromised software is equal to one payment (via address substitution).

With payjoin, the maximum amount of money that can be lost is equals to two payments.

## Future work

### Supporting P2WPKH and P2SH-P2WPKH for the same store

In order to be useful, a sender and a receiver must share the same type of bitcoin address.

Ideally, this means that the receiver could adapt the invoice's payment address and contributed input to match the sender's orginal PSBT. In the context of BTCPay Server, this would mean that one merchant needs to setup two wallets for a single store. While this is theorically possible, this requires a big refactoring in our code and is not yet available.

Also, even in the event that we developed such feature, merchants are rarely technically apt to understand the reason of using two wallets for their store to accomodate such technical limitation.

Another proposition is to allow one wallet to support both, P2WPKH and P2SH-P2WPKH. But this is problematic as it is non standard so no wallet or tool supports fund recovery for such a type of wallet.

For now, we only support a single wallet for the store of the merchant, P2SH-P2WPKH or P2WPKH which are [the most common type of inputs](https://transactionfee.info/charts/inputs-segwit-distribution/).

This means that if the type does not match the sender's wallet type, the payjoin will not be created and the payment will fallback to a normal transaction.

### Receiver's payment batching <a name="batching"></a>

Because the sender is not verifying the outputs of the payjoin transaction proposal, the receiver has the freedom to add output for payments they want to make.

Imagine Alice making transaction of 1 BTC to Bob. Bob decided he wanted to send 2 BTC to an exchange.
When Alice is negotiating a payjoin, Bob can add 2 BTC in the outputs in addition to his inputs. In such way, he will economize fees.

### Analysis poisoning

While our protocol allows the receiver to change the output address in order to break some blockchain analysis heuristic, we are still not taking advantage of it.

### Increasing privacy of clients using BIP69 <a name="bip69"></a>

Currently, the sender and the receiver we implemented in BTCPay Server does not make any guarantee on the order of inputs and outputs.

The main reason for the receiver to not order the inputs and outputs of the `payjoin transaction` according to BIP69, is that it would make clear to a blockchain analyst that transactions not following BIP69 are not payjoin transactions.

However, some senders may implement BIP69. In order to improve their privacy, our receiver implementation should make an effort to follow BIP69 as well in such situation.

However, some concerns have been reported that this mean that the distributions of payjoin payments would slightly favor BIP69. This happen because a payjoin transaction compliant with BIP69 would happen in both cases: By chance when randomly ordering the payjoin inputs and outputs, but also by the fact the sender had a BIP69 compliant original transaction.

Existing wallets using BIP69: [Electrum wallet](https://github.com/spesmilo/electrum/commit/e2c05c2400399fe24ddacfe114673cd75b9ba3c1) and [Samourai Wallet](https://github.com/Samourai-Wallet/samourai-wallet-android#bip69).

## References

* [BIP174: Partially Signed Bitcoin Transaction Format](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki)
* [BIP69: Lexicographical Indexing of Transaction Inputs and Outputs](https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki)
* [BIP79: Bustapay](https://github.com/bitcoin/bips/blob/master/bip-0079.mediawiki)
* [Segwit input type distribution](https://transactionfee.info/charts/inputs-segwit-distribution/)
* [Wasabi wallet: Privacy best practices on change coins](https://docs.wasabiwallet.io/using-wasabi/ChangeCoins.html#spend-the-change-with-another-entity-where-you-don-t-mind-if-each-of-the-two-know-that-you-transact-with-the-other-entity)
* [Bitcoin wiki: Payjoin](https://en.bitcoin.it/wiki/PayJoin)
