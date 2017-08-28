# BTCPay Server Documentation

## Introduction

BTCPay Server is an open source server compatible with Bitpay API written in .NET Core 2.0.

Use BTCPay Server in the following case:

* You depends now on Bitpay and want to keep using Bitcoin payment after november for your payments
* You do not want to give custody of your funds to a third party
* You have been rejected by Bitpay for KYC/AML reasons
* You are a service provider who wants to offer Bitcoin payments to your customer with a different pricing model than Bitpay
* Want to propose services similar to Bitpay for an alt currency.
* Want features Bitpay are not proposing (Multi-sig +Segwit support soon)

## Dependencies

Here are the dependencies for this project:

* [A Bitcoin Full Node](bitcoin.org/en/download) (non-pruned mode)
* [.NET Core 2.0](https://microsoft.com/net/core/)
* [NBXplorer](https://github.com/dgarage/NBXplorer)

## How to develop

I recommaend using Visual Studio Code (cross plateform) or Visual Studio 2017 update 3 (Windows Only). You can of course use VIM if you are hardcore, .NET Core 2.0 is command-line environment friendly.

## Getting started

Here is a guide to get started on RegTest.
RegTest is a private blockchain on which you can mine on demands.
First be sure you do not have a Bitcoin Node running on Testnet.

After installing Bitcoin Core, and .NET Core 2.0:

Start Bitcoin Core in regtest:

In a terminal start bitcoind in testnet:
```
bitcoind -regtest -printtoconsole
```
Mine some blocks:
```
bitcoin-cli -regtest generate 101
```

Then start NBXplorer:
```
mkdir GettingStarted
cd GettingStarted
git clone https://github.com/dgarage/NBXplorer
cd NBXplorer/NBXplorer
dotnet restore
dotnet run -regtest
```

Go back to the `GettingStarted` folder

```
git clone https://github.com/btcpayserver/btcpayserver
cd btcpayserver/BTCPayServer
dotnet restore
dotnet run -regtest
```

Now you can browse to http://127.0.0.1:23002.


