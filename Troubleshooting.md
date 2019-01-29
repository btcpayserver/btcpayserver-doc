# Troubleshooting an issue in BTCPay Server

Facing a problem is never fun. This document explains the most common workflow and steps you should take to easier identify the issue you're having and hopefully solve it yourself or with community help.

Identifying the problem is crucial.

## 1. Replicating the issue

First and foremost, try to determine when the issue happens. Try to replicate the problem. If you think it will describe your issue better, take a screenshot.

## 2. Looking through the logs

Logs can provide an essential piece of information. In the next few paragraphs, we will describe how to get the log information for various parts of BTCPay.

### 2.1 BTCPay Logs

Since the v1.0.3.8, you can easily access BTCPay Server logs from the front-end. If you are a server admin, go to Server Settings > Logs and open the logs file. If you don't know what a particular error in the logs means, make sure to mention it when troubleshooting.

### 2.2 Lightning Network Logs

Use the following if you're having a problem with the Lightning Network.

### 2.2.1 - Lightning Network LND - Docker

There are a few ways to access your LND logs when using Docker.

`sudo su -`

`docker ps`

Find the LND container ID.

`docker logs 'add your container ID here'`

alternatively, use this

`docker logs --tail 40 btcpayserver_lnd_bitcoin`

If for any reason you need more logs

`sudo su -`

`cd /var/lib/docker/volumes/generated_lnd_bitcoin_datadir/_data/logs/bitcoin/mainnet/`

inside that directory do `ls`

You will see something like `lnd.log  lnd.log.13  lnd.log.15  lnd.log.16.gz  lnd.log.17.gz`

To access uncompressed logs of those logs do `cat lnd.log` or if you want another one, use `cat lnd.log.15`

To access compressed logs in .gzip  use `gzip -d lnd.log.16.gz` (in this case we're accessing lnd.log.16.gz)

This should give you a new file, where you can do `cat lnd.log.16`

In case the above does not work, you may need to use install gzip first `sudo apt-get install gzip`

### 2.2.2 - Lightning Network c-lightning - Docker

`sudo su -`

`docker ps`

Find the c-lightning container ID.

docker logs 'add your container ID here'

alternatively, use this

`docker logs --tail 40 btcpayserver_clightning_bitcoin`

You can also get log information with c-lightning cli command. 

`bitcoin-lightning-cli.sh getlog`

## 3. Finding a solution yourself (Google, FAQ, GitHub issues)

Even though setups differ, the chances that someone else experienced the same issue as yours are pretty high. Take a few moments, Google around and see if you can solve it yourself. 

### 3.1 BTCPay FAQ

We try to document the most common issues on the [Frequently Asked Questions page](FAQ.md). Take a look there and see if your question is recorded.

### 3.2 GitHub

When there's an advanced technical issue, users usually open an issue on GitHub. Take a look at the BTCPay GitHub repository and browse [search the closed issues](https://github.com/btcpayserver/btcpayserver/issues?q=is%3Aissue+is%3Aclosed).

### 3.3 Mattermost
Mattermost chat platform is great for similar issues, other users experienced before you. On the top right-hand corner, click on the search and enter your query.

## 4. Asking for help

If you're unable to solve the problem yourself, do not worry. There's an amid community ready to help you. 

The better you describe the problem, the higher are the chances of getting a timely fix. Be concise and provide as much relevant information as possible. Be sure to include the [version you're using](FAQ/FAQ-ServerSettings.md#how-can-i-see-my-btcpay-version) and describe your BTCPay Deployment Setup. Try to explain what you're trying to do and what's the issue. If you can provide the logs. If you think it's relevant, feel free to include a screenshot.

Here's a good example of how to ask a question.

> I'm having a problem with XYZ. I can replicate the problem. My BTCPay version is 0.100.31, and I deployed my server on Digital Ocean by following Docker deployment guide. I've searched through the FAQ and closed GitHub issues, but there's no solution to my problem. My BTCPay Setup is XYZ, and the issue is occurring when I do XYZ. Here are the logs I was able to get from my BTCPay instance. You can see the error in the image I attached.

### 4.1 Asking the community (general problems)

For quick answers to fundamental problems, it's best to post a question in #support channel on [BTCPay Mattermost](https://chat.btcpayserver.org/btcpayserver/channels/support).

### 4.2 Opening an Issue on GitHub (advanced problems)

If you have a custom build setup and are facing a complex problem, [open an issue on GitHub](https://github.com/btcpayserver/btcpayserver/issues) so that developers can help you out.

### 4.3 Premium Support

Some community members provide paid support. If you want a quicker help, check out the list of [members providing premium support](Support.md).

### 4.4 Lightning Network Support

If you're facing a technical problem with your Lightning Network implementation, you may want to ask questions in their respective communities.

#### 4.4.1 LND Support

* [LND GitHub](https://github.com/lightningnetwork/lnd/issues)
* [Lightning Community on Slack](lightningcommunity.slack.com)
* [#lightning-dev](https://webchat.freenode.net/?channels=lightning-dev&uio=d4) on IRC

#### 4.4.2 c-lightning Support

* [c-lightning GitHub](https://github.com/ElementsProject/lightning/issues)
* [#lightning-dev](https://webchat.freenode.net/?channels=lightning-dev&uio=d4) on IRC
