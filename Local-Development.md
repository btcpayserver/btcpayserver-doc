# Local development

## Dependencies

Here are the dependencies for this project:

* [A Bitcoin Full Node](bitcoin.org/en/download) (non-pruned mode)
* [.NET Core 2.0 SDK](https://microsoft.com/net/core/)
* Optional: Docker (recommended)

## Which IDE?

I recommend using Visual Studio Code (cross platform) or Visual Studio 2017 update 3 (Windows Only).  
You can of course use VIM if you are hardcore, .NET Core 2.0 is command-line environment friendly.

## During development...

While you can run easily NBXplorer and Bitcoind in local for your local development. 
We recommend you use docker, as it can get everything running with one command line.

### With docker

You can run NBxplorer, Postgres and Bitcoin Core in one documented command in the [test project](https://github.com/btcpayserver/btcpayserver/tree/master/BTCPayServer.Tests).
Then select the launch profile Docker-Regtest with your IDE. You can then debug by running the project with F5.

### Manually (not recommended)

Here is a guide to get started on RegTest.
RegTest is a private blockchain on which you can mine on demand.
First be sure you *do not* have a Bitcoin Node running on Testnet.

After installing Bitcoin Core, and .NET Core 2.0, 

Start Bitcoin Core in regtest:

In a terminal start bitcoind in testnet:
```
bitcoind -regtest -printtoconsole
```
Mine some blocks:
```
bitcoin-cli -regtest generate 101
```

Fetch the block explorer and BTCPayServer:

```
mkdir GettingStarted
cd GettingStarted
git clone https://github.com/dgarage/NBXplorer
git clone https://github.com/btcpayserver/btcpayserver
```

Run NBXplorer:
```
cd NBXplorer/NBXplorer
dotnet restore
dotnet run -regtest
```

Check that it successfully connects to your regtest instance.

Go back to the `GettingStarted` folder, and start BTCPayServer:
```
cd btcpayserver/BTCPayServer
dotnet restore
dotnet run -regtest
```

Now you can browse to http://127.0.0.1:23002.

You can easily start debugging BTCPayServer with F5 in Visual Studio or Visual Studio Code.  
Do not forget to configure the IDE to start the program with `-regtest` parameter.
