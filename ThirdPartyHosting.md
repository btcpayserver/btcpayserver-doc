# Third-party hosting

A third-party host is an individual or a business which self-hosts a BTCPay instance and enables other users to register and use the server. On a self-hosted server, the owner can add an unlimited amount of users and stores and allow those users to manage their stores independently and receive payments to their own wallets. 

While this feature in BTCPay Server exists for complex multi-store business management, community enthusiasts use it to help other users, (mostly beginners), sometimes skip an overwhelming step of deploying a self-hosted BTCPay server. Users who want to test or develop applications on top of BTCPay also use instances hosted by third parties. Some hosts try to spread the adoption of cryptocurrencies by allowing their local merchants to receive payments for free or for a small sign-up fee.

In layman words, think of this feature as a payment processor factory which allows anyone to deploy a server and help others receive payments which are validated via the server owner [full Bitcoin node](https://en.bitcoin.it/wiki/Full_node).

## The list of BTCPay third-party hosts

* [btcpayjungle.com](https://btcpayjungle.com)
* [btcpaynow.net](https://btcpaynow.net)
* [btcpayprovider.com](https://btcpayprovider.com/)
* [exitpay.org](https://exitpay.org/)
* [lightbo.lt](https://lightbo.lt)
* [lightninginabox.co](https://lightninginabox.co)
* [lpay.io](https://lpay.io)
* [luxnode.io](https://luxnode.io/)
* [merklesig.com](https://merklesig.com/)
* [nodl.it](https://nodl.it)
* [pay.d-central.tech](https://pay.d-central.tech/)
* [~~ltcpay.com~~](https://ltcpay.com/)
* [~~register.btcpal.online~~](https://register.btcpal.online)

Feel free to chat with the [Community](Community.md) to find the appropriate host for your needs, but also make sure to choose a host you trust. Read the rest of this document to better understand the pros and cons of using a third party host.

## How can one become a third-party host?
To become a third party host, you need to self-host a BTCPay Server and enable registration for other users. 
Go to Server Settings > Policies > Disable registration, unmark the checkbox. You may also want to configure the [SMTP settings](/FAQ/FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay) to allow them to reset their password if they forget it.

## Are there any limitations in features when using a third party host?
Yes. Here are some restrictions.
* No [Lightning Network](LightningNetwork.md)
* No [wallet re-scan](/FAQ/FAQ-Wallet.md#what-is-wallet-re-scan-in-btcpay)
* No [Server Settings](Walkthrough.md#server-settings) access

The limitations happen for technical reasons, mostly because these features require a user to run a full node to use them.

## Pros
* Easy and quicker setup
* Cheaper and in most cases free (depending if the host is premium or free)
* Receive payments directly to your wallet
* Private key never required (if it is, it's a scam!)

## Cons
* Security concerns
* Privacy concerns
* Limitation of features
* No control over a server
* Have to trust the owner of the server

### Security concerns
[Trusted third parties are security holes](https://nakamotoinstitute.org/trusted-third-parties/#selection-7.6-6.2). By relying on someone else to manage a server for you, you are potentially exposing yourself to a certain attack vector.

The most significant attack vector when using a third party host is that a malicious and technically skilled host can create a forked version of BTCPay Server and modify it so that it either spy on your transactions or replace your [xpubkey](https://en.bitcoin.it/wiki/Deterministic_wallet_tools#Risks_of_Sharing_an_Extended_Public_Key_.28xpub.29) with his. This means that future payments made to you may end up in a malicious party wallet. 

In BTCPay, a private key is never required. This means that funds are safe even if the server is hacked, but a malicious host can intercept future payments and steal those funds. If you follow your transactions via a watch-only wallet, you should be able to detect such attack quickly and notice that your orders are being marked as paid, whereas you don't see the transactions in your wallet. 

If a third-party host asks for your private key or pre-generates one for you, be sure it's a scam. Never share your private key with anyone. It's called private for a reason.

Xpubkey replacement attack applies to a self-hosted server as well. A malicious hacker can try to hack your server and try to replace an xpubkey.

### Privacy concerns
BTCPay does not allow server hosts to view the stores of other users nor have access to any personal data (except for registration email address). The xpubkey and even balances of other users can't be seen. However, as mentioned, a malicious third party could modify that by creating a fork that can look like BTCPay on the front but be something completely different in reality.

The biggest concern, which happens when using a third-party host (even if the owner of a self-hosted server is not malicious) comes from the nature of the Bitcoin itself. If a user is not running a full node but instead relies on someone else's node, his transactions can be listened to by the owner of that node. Running a full node is not just a convenience that gives you features and enables privacy, it gives you better security and the right to "vote" and validate all the transactions yourself. Don't trust, verify.

Here are some good resources where you learn more about the importance of full nodes

* [Why Your Business Should Use a Full Node to Accept Bitcoin](https://en.bitcoin.it/wiki/Why_Your_Business_Should_Use_a_Full_Node_to_Accept_Bitcoin)
* [Clearing Up Misconceptions About Full Nodes](https://en.bitcoin.it/wiki/Clearing_Up_Misconceptions_About_Full_Nodes)

## Summary
Third-party hosts play an important role in the ecosystem since they provide an easy and cost-effective way for users to try and use  BTCPay. The role of honest hosts who provide free service to others is essential in the early phase of BTCPay Server adoption. However, users should be familiar with the pros, cons and potential risks involved when using a trusted third-party. Find the optimal balance between your use-case, cost, and privacy/security trade-offs.

Some of the hosts are entirely free to use and maintain the server cost from donations of their users. If you've been using a reliable free host for a while, you should consider donating to them to support them.
