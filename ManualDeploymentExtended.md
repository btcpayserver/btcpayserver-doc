# Minimal manual setup

The process is basically the following:

1. Download and sync [Bitcoin Core](https://bitcoincore.org)
2. Clone and run [NBXplorer](https://github.com/dgarage/NBxplorer)
3. Clone and run [BTCPay Server](https://github.com/btcpayserver/btcpayserver)

Take a look at our video to learn more:

[![BTCPay - Setup](http://img.youtube.com/vi/Xo_vApXTZBU/mqdefault.jpg)](http://www.youtube.com/watch?v=Xo_vApXTZBU "BTCPay - Setup")


## Warning: Not recommended to use in production

Manual installation is NOT recommended in production. It should be only used for learning purpose.

Instead you should use the [docker deployment](https://github.com/btcpayserver/btcpayserver-docker).

The docker deployment will provide you easy update system and make sure that all moving parts are wired correctly without any technical knowledge. It will also setup HTTPS for you.

## Typical manual installation

This steps have been done on ubuntu 16.04, adapt for your own install.


### 1) Install Bitcoin Core 0.17.0

```bash
BITCOIN_VERSION="0.17.0"
BITCOIN_URL="https://bitcoincore.org/bin/bitcoin-core-0.17.0/bitcoin-0.17.0-x86_64-linux-gnu.tar.gz"
BITCOIN_SHA256="9d6b472dc2aceedb1a974b93a3003a81b7e0265963bd2aa0acdcb17598215a4f"

# install bitcoin binaries
cd /tmp
wget -O bitcoin.tar.gz "$BITCOIN_URL"
echo "$BITCOIN_SHA256 bitcoin.tar.gz" | sha256sum -c - && \
mkdir bin && \
sudo tar -xzvf bitcoin.tar.gz -C /usr/local/bin --strip-components=2 "bitcoin-$BITCOIN_VERSION/bin/bitcoin-cli" "bitcoin-$BITCOIN_VERSION/bin/bitcoind"
rm bitcoin.tar.gz
```

### 2) Install .NET Core SDK 2.1
On my ubuntu 16.04 (See [those instructions](https://dotnet.microsoft.com/download/linux-package-manager/ubuntu16-04/sdk-2.1.505) for different OS).

```bash
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install -y dotnet-sdk-2.1
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

## Additional links
* [BTCPay Server Manual Install](http://blog.sipsorcery.com/?p=1052) from blog.sipsorcery.com.
* [How to Setup BTC and Lightning Payment Gateway with BTCPayServer on Linux [Manual Install]](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install) from freedomnode.com.