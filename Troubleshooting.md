Facing a problem is never fun. This document explains the most common workflow and steps you should take to easier identify the issue you're having and hopefully solve it yourself or with community help.

Identifiying the problem is crutial.

## 1. Replicating the issue

## 2. Looking through the logs (optional)

Logs can usually provide an essential piece of information. They are sort of an advanced step. In the next few paragraphs, we will describe how to get the log information for various parts of BTCPay.

### 2.1 BTCPay Logs

### 2.2 Bitcoin Core Logs

### 2.3 Lightning Network Logs

### 2.3.1 - Lightning Network LND - Docker

There are a few ways to access your LND logs when using Docker.

`sudo su -`

`docker ps`

Find the LND container ID.

`docker logs 'add your container ID here'`

or use this

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

### 2.3.2 - Lightning Network c-lightning - Docker

`sudo su -`

`docker ps`

Find the c-lightning container ID.

docker logs 'add your container ID here'

or use this

`docker logs --tail 40 btcpayserver_clightning_bitcoin`

You can also get log information with c-lightning cli command 

`bitcoin-lightning-cli.sh getlog`

## 4. Finding a solution yourself (FAQ, Wiki, GitHub issues)

Even though the setups differ, the chances that someone else experienced the same issue as yours are pretty high.

### 4.1 BTCPay FAQ

We try to document the most common issues on the [Frequently Asked Questiions page](FAQ.md). Take a look there and see if your question has been documented.

### 4.2 BTCPay Wiki

[BTCPay Server Wiki page](https://nbitstack.com/c/btcpayserver) contains a list of questions and issues from users. Use the search bar in the upper right corner to see if your problem has been documented and if there's a solution to it.

### 4.3 GitHub

When there's an advanced technical issue, users ususally open an issue on GitHub. Take a look at the BTCPay GitHub repository and browse [search the the closed issues](https://github.com/btcpayserver/btcpayserver/issues?q=is%3Aissue+is%3Aclosed).

## 5. Asking for help

If you're unable to solve the problem yourself, do not worry. There's an engaging community here to help you. 

The better you desribe the problem, the higher are the chances of getting a proper solution. Be concise and provide as much relevant information as possible. Be sure to include the [version you're using](https://nbitstack.com/t/what-is-my-btcpay-server-version/94/2) and describe your BTCPay Setup. Try to describe what you're trying to do and what's the issue. If you can provide the logs.

Here's a good example of how to ask a question.

> I'm having a problem with XYZ. I am able to replicate the problem. My BTCPay version is 0.100.31 and I deployed my server on Digital Ocean by following Docker deployment guide. I've searched though the FAQ, Wiki and closed GitHub issues, but there's no solution to my problem. My BTCPay Setup is XYZ and the issue is occuring when I do XYZ. Here are the logs I was able to get from my BTCPay instance.

### 5.1 Asking the community (general problems)

For quick asnwers to basic problems, it's best to post a question in #help or #general channel on [BTCPay Slack](http://slack.btcpayserver.org/).

### 5.2 Opening an Issue on GitHub (advanced problems)

If you have a custom build setup and are facing a complex problem, [open an issue on GitHub](https://github.com/btcpayserver/btcpayserver/issues) so that developers can help you out.

### 5.3 Premium Support

Some community members provide a paid support. If you want a quicker help, check out the list of [members providing premium support](Support.md).
