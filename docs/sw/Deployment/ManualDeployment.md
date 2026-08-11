# Usanidi wa chini wa mwongozo

:::danger

#### Haipendekezwi kwa matumizi ya uzalishaji

Usakinishaji wa mwongozo HAUPENDEKEZWI kwa matumizi ya uzalishaji isipokuwa una uhakika sana na Mfumo wako wa Uendeshaji na utaalamu wa usalama wa Bitcoin. Ikiwa huna uhakika, tumia usambazaji wa docker au mojawapo ya [chaguzi nyingine za usambazaji](./README.md).

#### Lazima uwe na ujuzi wa kiufundi na uweze kutatua masuala yoyote mwenyewe. Jamii haitatoa msaada mkubwa kwa usambazaji huu.

:::

Mchakato kimsingi ni ufuatao:

1. Pakua na usawazishe [Bitcoin Core](https://bitcoincore.org)
2. Nakili na endesha [NBXplorer](https://github.com/dgarage/NBxplorer)
3. Nakili na endesha [BTCPay Server](https://github.com/btcpayserver/btcpayserver)

Tazama video yetu ili kujifunza zaidi:

[![BTCPay Server - Setup](https://img.youtube.com/vi/Xo_vApXTZBU/mqdefault.jpg)](https://www.youtube.com/watch?v=Xo_vApXTZBU)

## Onyo: Haipendekezwi kutumika katika uzalishaji

**Usakinishaji wa mwongozo** HAUPENDEKEZWI katika uzalishaji. Unapaswa kutumika kwa madhumuni ya kujifunza pekee.

Badala yake unapaswa kutumia [usambazaji wa docker](https://github.com/btcpayserver/btcpayserver-docker).

Usambazaji wa docker utakupa mfumo rahisi wa kusasisha na kuhakikisha kuwa sehemu zote zinazosonga zimeunganishwa kwa usahihi bila ujuzi wowote wa kiufundi. Pia utasanidi HTTPS kwako.

## Usakinishaji wa kawaida wa mwongozo

Hatua hizi zimefanywa kwenye Ubuntu 18.04, zirekebishe kwa usakinishaji wako mwenyewe.

Kwa usambazaji maalum wa Testnet, baada ya kusakinisha Bitcoin, .NET Core, NBXplorer na BTCPayServer, angalia [Amri za Kuendesha katika Hali ya Testnet](#usambazaji-maalum-wa-testnet)

### 1) Sakinisha Bitcoin Core

Pakua na usakinishe Bitcoin Core kwa kufuata [maelekezo](https://bitcoin.org/en/download).

### 2) Sakinisha vitegemezi vya .NET

Pakua na usakinishe .NET 10.0 SDK na ASP.NET Core Runtime kwa kufuata [maelekezo](https://dotnet.microsoft.com/en-us/download).

### 3) Sakinisha NBXplorer

```bash
cd ~
git clone https://github.com/dgarage/NBXplorer
cd NBXplorer
git checkout latest
./build.sh
```

### 4) Sakinisha BTCPayServer

```bash
cd ~
git clone https://github.com/btcpayserver/btcpayserver
cd btcpayserver
git checkout latest
./build.sh
```

### 5) Endesha bitcoind

```bash
bitcoind
```

### 6) Endesha NBXplorer

```bash
cd ~/NBXplorer
./run.sh --dbtrie
```

Kumbuka kuwa kutumia backend ya `--dbtrie` kwa NBXplorer, ingawa ni rahisi, imeachwa.
Ni bora utumie backend ya postgresql kama ilivyoelezwa kwenye [Usambazaji wa Mwongozo uliopanuliwa](./ManualDeploymentExtended.md).

### 7) Endesha BTCPay Server

```bash
cd ~/btcpayserver
./run.sh --port 8080 --bind 0.0.0.0
```

Sasa unaweza kuvinjari seva yako kwenye bandari 8080.

Kumbuka kuwa kwa chaguo-msingi, BTCPay Server itatumia SQLite kama backend, ingawa ni rahisi, hii imeachwa.
Ni bora utumie backend ya postgresql kama ilivyoelezwa kwenye [Usambazaji wa Mwongozo uliopanuliwa](./ManualDeploymentExtended.md).

## Usambazaji Maalum wa Testnet

Fuata maelekezo ya kusakinisha Bitcoin, .NET Core, NBXplorer na BTCPayServer hapo juu.

Kisha unapoziendesha tumia:

### Endesha bitcoind katika hali ya testnet

```bash
bitcoind -testnet
```

### Endesha NBXplorer katika hali ya testnet

```bash
cd ~/NBXplorer
./run.sh --network=testnet
```

### Endesha BTCPayServer katika hali ya testnet

```bash
cd ~/btcpayserver
./run.sh --port 8080 --bind 0.0.0.0 --network testnet
```

## Viungo vya ziada

- [Usambazaji wa Mwongozo uliopanuliwa](./ManualDeploymentExtended.md)
- [How to Setup BTC and Lightning Payment Gateway with BTCPayServer on Linux [Manual Install]](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install) kutoka freedomnode.com.
