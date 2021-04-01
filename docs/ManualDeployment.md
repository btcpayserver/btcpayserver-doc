# Minimal manual setup

:::danger
#### Not recommended for production use

Manual installation is NOT recommended for production use unless you are very confident with your Operating System and Bitcoin security expertise. If you are unsure use the docker deployment or one of the other [deployment options](./Deployment.md).

#### You must have technical literacy and be able to resolve any issues on your own. The community will not provide extensive support for this deployment.
:::

The process is basically the following:

1. Download and sync [Bitcoin Core](https://bitcoincore.org)
2. Clone and run [NBXplorer](https://github.com/dgarage/NBxplorer)
3. Clone and run [BTCPay Server](https://github.com/btcpayserver/btcpayserver)

Take a look at our video to learn more:

[![BTCPay Server - Setup](https://img.youtube.com/vi/Xo_vApXTZBU/mqdefault.jpg "BTCPay Server - Setup")](https://www.youtube.com/watch?v=Xo_vApXTZBU "BTCPay - Setup")

## Warning: Not recommended to use in production

**Manual installation** is NOT recommended in production. It should be only used for learning purpose.

Instead you should use the [docker deployment](https://github.com/btcpayserver/btcpayserver-docker).

The docker deployment will provide you easy update system and make sure that all moving parts are wired correctly without any technical knowledge. It will also setup HTTPS for you.

## Typical manual installation

This steps have been done on Ubuntu 18.04, adapt for your own install.

For Testnet specific deployment, after installing Bitcoin, .NET Core, NBXplorer and BTCPayServer, see [Commands for Running in Testnet Mode](#testnet-specific-deployments)

### 1) Install Bitcoin Core 0.19.1

```bash
BITCOIN_VERSION="0.19.1"
BITCOIN_URL="https://bitcoin.org/bin/bitcoin-core-0.19.1/bitcoin-0.19.1-x86_64-linux-gnu.tar.gz"
BITCOIN_SHA256="5fcac9416e486d4960e1a946145566350ca670f9aaba99de6542080851122e4c"

# install bitcoin binaries
cd /tmp
wget -O bitcoin.tar.gz "$BITCOIN_URL"
echo "$BITCOIN_SHA256 bitcoin.tar.gz" | sha256sum -c - && \
mkdir bin && \
sudo tar -xzvf bitcoin.tar.gz -C /usr/local/bin --strip-components=2 "bitcoin-$BITCOIN_VERSION/bin/bitcoin-cli" "bitcoin-$BITCOIN_VERSION/bin/bitcoind"
rm bitcoin.tar.gz
```

### 2) Install .NET Core SDK 3.1
On my ubuntu 18.04 (See [these instructions](https://docs.microsoft.com/en-us/dotnet/core/install/linux-package-manager-ubuntu-1804) or [here](https://dotnet.microsoft.com/download) for different OS).

```bash
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install -y dotnet-sdk-3.1
```

### 3) Install NBXplorer

```bash
cd ~
git clone https://github.com/dgarage/NBXplorer
cd NBXplorer
git checkout latest
./build.sh
```

### 4) Install BTCPayServer

```bash
cd ~
git clone https://github.com/btcpayserver/btcpayserver
cd btcpayserver
git checkout latest
./build.sh
```

### 5) Run bitcoind

```bash
bitcoind
```

### 6) Run NBXplorer

```bash
cd ~/NBXplorer
./run.sh
```

### 7) Run BTCPayServer

```bash
cd ~/btcpayserver
./run.sh --port 8080 --bind 0.0.0.0
```


Now you can browse your server on port 8080.

## Testnet Specific Deployments
Follow the instructions for installing Bitcoin, .NET Core, NBXplorer and BTCPayServer above.

Then when running them use:

### Run bitcoind in testnet mode

```bash
bitcoind -testnet 
```

### Run NBXplorer in testnet mode

```bash
cd ~/NBXplorer
./run.sh --network=testnet
```

### Run BTCPayServer in testnet mode

```bash
cd ~/btcpayserver
./run.sh --port 8080 --bind 0.0.0.0 --network testnet
```

## Additional links

* [Extended Manual Deployment](./ManualDeploymentExtended.md)
* [How to Setup BTC and Lightning Payment Gateway with BTCPayServer on Linux [Manual Install]](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install) from freedomnode.com.
