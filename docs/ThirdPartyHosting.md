# Third-party hosting

A **third-party host** is an individual or a business which **self-hosts a BTCPay Server instance and enables other users to register and use the server**. On a self-hosted server, the owner can add an unlimited amount of users and stores and allow those users to manage their stores independently and receive payments to their own wallets.

While this feature in BTCPay Server exists for complex multi-store business management, community enthusiasts use it to help other users (mostly beginners), sometimes skip an overwhelming step of **deploying a self-hosted BTCPay server**. Users who want to test or develop applications on top of BTCPay Server also use **instances hosted by third-parties**. Some hosts try to spread the adoption of cryptocurrencies by allowing their local merchants to receive payments for free or for a small sign-up fee.

In layman words, think of this feature as a payment processor factory which allows anyone to deploy a server and help others receive payments which are validated via the server owners' [full Bitcoin node](https://en.bitcoin.it/wiki/Full_node).

**Third-party hosts** play an important role in the ecosystem since they provide an easy and cost-effective **way for users to try and use BTCPay Server**. The role of honest hosts who provide free service to others is essential in the early phase of BTCPay Server adoption. However, users should be familiar with the pros, cons and potential risks involved when using a trusted third-party. Find the optimal balance between your use-case, cost, and privacy/security trade-offs.

Some of the hosts are entirely free to use and maintain the server cost from donations of their users. If you've been using a reliable free host for a while, you should consider donating to them to support them.

- [Third-party hosting](#third-party-hosting)
  - [Advantages and disadvantages](#advantages-and-disadvantages)
    - [Pros](#pros)
    - [Cons](#cons)
  - [Concerns For Use](#concerns-for-use)
    - [Security Concerns](#security-concerns)
    - [Privacy Concerns](#privacy-concerns)
    - [Trust Concerns](#trust-concerns)
  - [Third Party Hosting FAQ](#third-party-hosting-faq)
  - [Where is the list of BTCPay third-party hosts?](#where-is-the-list-of-btcpay-third-party-hosts)
  - [How can one become a third-party host?](#how-can-one-become-a-third-party-host)
  - [Are there any limitations in features when using a third-party host?](#are-there-any-limitations-in-features-when-using-a-third-party-host)
  - [Can I enable the use of my Lightning Network node to others?](#can-i-enable-the-use-of-my-lightning-network-node-to-others)
  - [What does the trusted third-party host know about their users?](#what-does-the-trusted-third-party-host-know-about-their-users)

## Advantages and disadvantages

### Pros
* Easy and quicker setup
* Cheaper and in most cases free (depending if the host is premium or free)
* Receive payments directly to your wallet
* Private key never required (if it is, it's a scam!)

### Cons
* Security concerns
* Privacy concerns
* Limitation of features
* No control over a server
* Have to trust the owner of the server

## Concerns For Use

### Security Concerns
[Trusted third parties are security holes](https://nakamotoinstitute.org/trusted-third-parties/#selection-7.6-6.2). By relying on someone else to manage a server for you, you are potentially exposing yourself to a certain attack vector.

The most significant attack vector when using a third-party host is the chance that this host will gain access to the management of your funds. This can occur in two ways.

First, a host may allow you to create [hot wallets](https://en.bitcoin.it/wiki/Hot_wallet) on their server. This gives the host complete access to your funds. They will act as a custodian of your private keys and thus your funds. This means you must trust they will not spend your funds. This type of wallet is NOT recommended for use with third-party hosts.

Secondly, a malicious and technically skilled host can create a forked version of BTCPay Server and modify it to be able to either spy on your transactions or replace your [extended public key](https://en.bitcoin.it/wiki/Deterministic_wallet_tools#Risks_of_Sharing_an_Extended_Public_Key_.28xpub.29) with their own. This means that future payments made to you may end up in this malicious party's wallet. 

While a wallet connected with an extended public key IS recommended for use with third-party hosts, It's impossible to know for certain, if the third party host is using a malicious fork. If you don't trust the third party host it is best to do the following:

- Do not use hot wallet on the third party server, use an extended public key
- Use it mainly for testing, learning and getting started with BTCPay
- Do not use it with high volume payments or extremely valuable transactions 

In BTCPay Server, a private key is never *required*. This means that funds are safe even if the server is hacked, but a malicious host can intercept future payments and steal those funds. If you follow your transactions via a watch-only wallet, you should be able to detect such attack quickly and notice that your orders are being marked as paid, whereas you don't see the transactions in your wallet.

:::danger
If a third-party host asks for your private key or pre-generates one for you, be sure it's a scam. Never share your private key with anyone. It's called private for a reason.
:::

An extended public key replacement attack applies to a self-hosted server as well. A malicious hacker can try to hack your server and try to replace an extended public key.

### Privacy Concerns
BTCPay Server does not allow server hosts to view the stores of other users nor have access to any personal data (except for registration email address). The extended public key and even balances of other users can't be seen. However, as mentioned, a malicious third-party could modify that by creating a fork that can look like BTCPay Server on the front but be something completely different in reality.

The biggest concern, which happens when using a third-party host (even if the owner of a self-hosted server is not malicious) comes from the nature of the Bitcoin itself. If a user is not running a full node but instead relies on someone else's node, his transactions can be listened to by the owner of that node. Running a full node is not just a convenience that gives you features and enables privacy, it gives you better security and the right to "vote" and validate all the transactions yourself. Don't trust, verify.

Here are some good resources where you learn more about the importance of full nodes

* [Why Your Business Should Use a Full Node to Accept Bitcoin](https://en.bitcoin.it/wiki/Why_Your_Business_Should_Use_a_Full_Node_to_Accept_Bitcoin)
* [Clearing Up Misconceptions About Full Nodes](https://en.bitcoin.it/wiki/Clearing_Up_Misconceptions_About_Full_Nodes)

### Trust Concerns
Third-party hosts have the ability to enable specific features for their non-admin users which require users to place some level of trust in the third-party host, if such features are used.

Specifically, third-party hosts should not enable the following policies without understanding that users will be using hot wallets on the server. These features are disabled by default for non-admins to reduce the risk considerations for both third-party hosts and their users:

- Allow non-admins to create hot wallets for their stores
- Allow non-admins to import their hot wallets to the node wallet
- Allow non-admins to use the internal lightning node in their stores

Third-party users who are granted access to an internal lightning node or hot wallet functionality to enable features such as Payjoin, should understand the risk and trust associated with [using hot wallets](./CreateWallet.md#hot-wallet) before choosing to use it. Use one of the [recommended wallets](./WalletSetup.md) which provide an extended public key to use in your store, if you are unsure which wallet type to use.

## Third Party Hosting FAQ

## Where is the list of BTCPay third-party hosts?

Feel free to chat with the [Community](./Community.md) to find the appropriate host for your needs, but also make sure to choose one that is trustworthy. Read the rest of this document to better understand the pros and cons of using a third-party host.

:::tip
The BTCPay Server [Directory](https://directory.btcpayserver.org/filter/hosts) lists multiple free or paid third-party hosts that you can register to, to start exploring BTCPay Server.
:::

## How can one become a third-party host?
To become a third-party host, you need to self-host a BTCPay Server and enable registration for other users.
Go to Server Settings > Policies > Disable registration, unmark the checkbox. You may also want to configure the [SMTP settings](./FAQ/FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay) to allow them to reset their password if they forget it.

Alternatively you may keep public registration disabled on your homepage and only invite specific users to create a new account by [invitation link](./FAQ/FAQ-ServerSettings.md#how-to-add-a-new-user-by-invite).

## Are there any limitations in features when using a third-party host?
Yes. Here are some restrictions.
* No [Lightning Network](./LightningNetwork.md) by default. Can be enabled by the third-party host but at the cost of a security risk for registrants using that third-party. [More information](#can-i-enable-the-use-of-my-lightning-network-node-to-others)
* No [wallet re-scan](./FAQ/FAQ-Wallet.md#what-is-wallet-re-scan-in-btcpay)
* No [Server Settings](./Walkthrough.md#server-settings) access

The limitations happen for technical reasons, mostly because these features require a user to run a full node to use them.

## Can I enable the use of my Lightning Network node to others?

Yes, you can enable users that have registered on your BTCPay Server instance to use your Lightning Network node.
[See how](./FAQ/FAQ-LightningNetwork.md#how-many-users-can-use-lightning-network-in-btcpay)

## What does the trusted third-party host know about their users?
Third party hosts (non-malicious) can see the following:

- Total number of users
- The email and username of those users

Note: If additional features are enabled such as non-admin lightning wallet, hot wallets or transmuter, the server admin can see additional information related to those features. Since it's impossible to know if the third party host is using a malicious fork, it's best to assume they may know all details about your BTCPay Server usage.

If you are worried about the information a third party host knows about you, please consider [deploying your own](./Deployment.md) self-hosted server.
