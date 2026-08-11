# Maendeleo ya Ndani

## Mahitaji ya Awali

Kwa **mazingira ya maendeleo** unahitaji kusakinisha zana hizi:

- [.NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)
- Docker: [Windows](https://docs.docker.com/docker-for-windows/install/) | [Mac OS](https://docs.docker.com/docker-for-mac/install/) | [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## Vitegemezi

Ili kutekeleza majaribio na kuendesha mradi kwa utatuzi, unahitaji kuendesha **vitegemezi** kadhaa.

Tumefunga vitegemezi vyetu vyote katika faili ya docker-compose ambayo unaweza kuitumia kuanzisha mazingira ya maendeleo:
Faili [BTCPayServer.Tests/docker-compose.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.yml) inaweza kutumika kuzindua kila kitu:

```bash
git clone https://github.com/btcpayserver/btcpayserver.git
cd btcpayserver/BTCPayServer.Tests
docker-compose up dev
```

## IDE Gani?

Tunapendekeza kutumia Visual Studio 2022 (Windows Pekee) au Rider (jukwaa mseto). Visual Studio Code (jukwaa mseto) pia inawezekana, lakini si rahisi kuisanidi kwa mazingira mazuri ya maendeleo.
Bila shaka unaweza kutumia VIM ikiwa wewe ni mtaalamu ngumu, .NET Core ni rahisi kutumia kupitia mstari wa amri.

Visual Studio Code, Visual Studio na Rider wataendesha wasifu wa uzinduzi `Bitcoin`.
Hii itaendesha **mfano wa BTCPay Server ukiunganishwa na huduma katika huduma yako ya Docker**, ili uweze kutafuta na kuchunguza msimbo kwa urahisi.

## Usanidi wa Ujenzi

Usanidi wa ujenzi unafafanua jinsi ya **kujenga BTCPay Server**. Kwa mfano, iwapo utajumuisha faili fulani za chanzo, iwapo utaboresha kwa utatuzi au utendaji.

Kuna usanidi kadhaa wa ujenzi:

- `Debug`
- `Release`
- `Altcoins-Debug`
- `Altcoins-Release`

Jinsi ya kutumia usanidi tofauti wakati wa maendeleo yako ya ndani inategemea IDE yako.
Kwa chaguo-msingi `Debug` inatumika, huu ni ujenzi wa Bitcoin pekee ukiondoa vitegemezi vyovyote vya altcoin. Jinsi ya kutumia usanidi tofauti wakati wa maendeleo yako ya ndani inategemea IDE yako.

Unaweza kuchagua ujenzi gani utumie kupitia kibadilishi `-c` katika mstari wa amri wa `dotnet`. Ikiwa unatumia mstari wa amri na unataka kuendesha ujenzi wa Release:

```bash
dotnet run -c Release
```

## Wasifu wa Uzinduzi

Unapo**anzisha BTCPay Server kwa ndani kwa maendeleo ya ndani**, inahitaji kigezo sahihi ili iweze kuunganishwa na vitegemezi vya wakati wa maendeleo katika faili ya docker-compose.

Vigezo hivyo vimefungwa katika dhana ya dotnet ya `launch profile`.

Wasifu wa uzinduzi umebainishwa katika [launchSettings.json](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/Properties/launchSettings.json).

Kwa sasa kuna wasifu watatu wa uzinduzi:

- `Bitcoin`
- `Bitcoin-HTTPS`
- `Altcoins-HTTPS`

Kwa chaguo-msingi, `Bitcoin` inatumika. Jinsi ya kutumia wasifu tofauti wakati wa maendeleo yako ya ndani inategemea IDE yako.

Ikiwa unatumia mstari wa amri, `dotnet run` inakuruhusu kuchagua wasifu wa uzinduzi unaotaka:

```bash
dotnet run --launch-profile Bitcoin
```

## Kuendesha Majaribio

Kuendesha majaribio kunafanya kazi kwa njia ile ile kama kuendesha BTCPay Server ya wakati wa maendeleo.

```bash
cd BTCPayServer.Tests
dotnet test
```

Dhana ya `launch profile` haitumiki kwa majaribio, lakini dhana ya usanidi wa ujenzi inatumika. Kwa mfano, ikiwa ninataka kuendesha majaribio kwenye ujenzi wa Release:

```bash
dotnet test -c Release
```

Majaribio tayari yamesanidiwa kutumia vitegemezi vya wakati wa maendeleo katika docker-compose iliyowasilishwa awali.

Unaweza kutumia kibadilishi `--f` (filter) kuendesha jaribio maalum.

Ikiwa unatumia IDE, rejea nyaraka za IDE yako kuendesha majaribio au kubadilisha usanidi tofauti.

## Maendeleo ya Usaidizi wa Altcoin

Kwa chaguo-msingi, IDE yako au `dotnet run` rahisi itatumia wasifu wa uzinduzi `Bitcoin` kwenye ujenzi wa `Debug`.

- Hii inamaanisha kuwa BTCPay Server itapangishwa kwenye mlango wa ndani wa HTTP, ikijengwa bila usaidizi wa altcoin,
- Endesha BTCPay Server kuunganisha kwenye vitegemezi vya Bitcoin pekee vilivyobainishwa katika [BTCPayServer.Tests/docker-compose.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.yml).

Ikiwa unataka **kuendeleza na usaidizi wa altcoins** unahitaji kutumia wasifu wa uzinduzi `Altcoins-HTTPS`, kwenye ujenzi wa `Altcoins-Debug`, na kuendesha [BTCPayServer.Tests/docker-compose.altcoins.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.altcoins.yml).

Ikiwa unatumia mstari wa amri:

```bash
cd BTCPayServer.Tests
docker-compose -f docker-compose.altcoins.yml up dev
cd ../BTCPayServer
dotnet run -c Altcoins-Debug --launch-profile Altcoins-HTTPS
```

Kwa majaribio

```bash
cd BTCPayServer.Tests
dotnet test -c Altcoins-Debug
```

## Usaidizi wa HTTPS kwa Maendeleo ya Ndani

Baadhi ya vipengele vya usalama vya kivinjari vinaweza kuhitaji utumie **HTTPS** ili kujaribiwa vizuri.

Katika hali hii, tumia wasifu wa uzinduzi `Bitcoin-HTTPS` (au `Altcoin-HTTPS`). Hii itaunda cheti cha kujisaini kwa madhumuni yako ya maendeleo.

Hata hivyo, kivinjari chako hakitakiamini, na kufanya utatuzi kuwa mgumu.

Unaweza kuamuru OS yako kuamini cheti hiki cha wakati wa maendeleo kwa kuendesha:

```bash
dotnet dev-certs https --trust
```

## Video

Kwa maelezo zaidi angalia video hizi:

- [How to contribute to BTCPay Server Development (Windows)](https://youtube.com/watch?v=ZePbMPSIvHM) na Nicolas Dorier
- [Setting up BTCPayServer development environment on Linux (Ubuntu)](https://youtube.com/watch?v=j486T_Rk-yw) na RockStarDev
- [BTCPay Server Development - Testing pull request, payments (MacOS)](https://youtube.com/watch?v=GWR_CcMsEV0) na Pavlenex

na maelezo haya:

- [How to get started with development](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/README.md) na Nicolas Dorier (inayoshughulikia amri muhimu za docker, kulipa ankara za regtest)
