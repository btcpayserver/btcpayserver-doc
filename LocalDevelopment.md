# Local development

## Dependencies

* [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download)
* Docker
* NBXplorer
* PostgreSQL
* Bitcoin Core (optionally other full nodes)

## Which IDE?

I recommend using Visual Studio Code (cross platform) or Visual Studio 2017 update 3 (Windows Only) or Rider (cross platform).  
You can of course use VIM if you are hardcore, .NET Core 2.0 is command-line environment friendly.

## During development...

You need an instance of NBXplorer, Postgres, and Bitcoin Core running and configured on the right ports to execute tests and run the project for debugging.

To simplify the development process we created a docker-compose file which setup everything for your dev environment, you can find all the information in [the README of the test project](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/README.md).

Visual Studio Code, Visual Studio 2017 and Rider will run the debug profile Docker-Regtest, which will run a BTCPayServer instance connecting to the services in your Docker service, so you can easily debug and step through the code. For more info check out this [developer video](https://youtu.be/ZePbMPSIvHM). 
