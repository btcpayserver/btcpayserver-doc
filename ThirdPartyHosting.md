# Third-party hosting

A third-party host is an individual or an organization which self-hosts a BTCPay Server instance and enables other users to register and use their server. On a self-hosted server, the owner of the server add an unlimited amount of users and stores and allow those users to manage their stores independently and receive payments to their own wallets. 

While this function in BTCPay Server is primarily developed for complex business management, community enthusiasts use it to help other users, mostly beginners, skip the sometimes challenging step of deploying a BTCPay server. Users who want to test or develop also use instances hosted by third parties. The best illustration is that you think of BTCPay as a payment processor factory which allows anyone to deploy a server and help others with receiving payments through their Bitcoin full node.

## The list of BTCPay third-party hosts

* [btcpayjungle.com](https://btcpayjungle.com)
* [btcpaynow.net](https://btcpaynow.net)
* [lightbo.lt](https://lightbo.lt)
* [lightninginabox.co](https://lightninginabox.co)
* [ltcpay.com](https://ltcpay.com/)
* [nodl.it](https://nodl.it)
* [register.btcpal.online](https://register.btcpal.online)

Feel free to chat with the [Community](Community.md) to find the appropriate host for your needs, but also make sure to choose a host you trust. Read the rest of this document to understand better the pros and cons of using a third party host.

## How can one become a third-party host?

To become a third party host, you need to self-host a BTCPay Server and enable registration for other users. Go to Server Settings > Policies > Enable registration. You may also want to set up the [SMTP setings](/FAQ/FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay) to allow other users to retrieve their password if they forget it.

## Are there a limitation in features when using a third party host?

* No [Lightning Network](LightningNetwork.md)
* No [wallet re-scan](/FAQ/FAQ-Wallet.md#what-is-wallet-re-scan-in-btcpay)
* No [Server Settings] access

## Pros
* Easy setup and quicker setup
* Cheaper and in most cases free (depending if a host is premium or free)
* Receive payments directly to your wallet
* Private key never required (if it is, it's a scam!)

## Cons
Relying on a third-party host is no different than using a third-party.
* Security concerns
* Privacy concerns
* Limitation of features
* No control over a server
* Have to trust the owner of the server

### Security concerns
[Trusted third parties are security holes](https://nakamotoinstitute.org/trusted-third-parties/#selection-7.6-6.2). By relying on someone else to manage a server for you, you are potentially exposed to certain attack vectors.

The most significant attack vector when using a third party host is that a malicious and technically skilled host can create a forked version of BTCPay Server and modify it so that it either spy on completely replaces your [xpubkey](https://en.bitcoin.it/wiki/Deterministic_wallet_tools#Risks_of_Sharing_an_Extended_Public_Key_.28xpub.29) with his own. This means that the newly coming payments made to you may end up in a malicious party wallet. In BTCPay, a private key is never required. This means that funds are safe, but a malicious host can intercept future payments and steal those funds. If you follow your transactions via a watch-only wallet you should be able to detect such attack quickly and notice that your orders are If a third-party host asks for your private key, be e certain it's a scam. Never share your private key with anyone. 

### Privacy concerns
BTCPay does not allow server hosts to view the stores of other users nor have access to any personal data (except for registration email address). The xpubkey and even balances of other users can't be seen. However, as mentioned the malicious third party could modify that by creating a fork that can look like BTCPay on the front, but be something completely different in reality.

The biggest concern, which happens with a third party host (even if a user is not malicious) comes from the nature of the Bitcoin itself. If a user is not running a full node but instead relies on someone else's node, 

## Summary
To summarize, third-party hosts play an important role in the ecosystem since they provide an easy and cost-effective way for users to use BTCPay. The role of honest hosts who provide free service to others is essential in the early phase of BTCPay Server adoption. However, users should be familiar with the pros, cons and potential risks involved when using a trusted third-party.
