# Kutatua Tatizo katika BTCPay Server

Kukumbana na tatizo sio jambo la kufurahisha kamwe. Hati hii inaelezea mtiririko wa kazi na hatua za kawaida unazopaswa kuchukua ili **kutambua tatizo** unalokumbana nalo kwa urahisi zaidi na kwa matumaini kulitatua mwenyewe au kwa msaada wa jamii.

Kutambua tatizo ni muhimu.

## 1. Kuiga tatizo

Kwanza kabisa, jaribu kubaini wakati ambapo tatizo linatokea.
Jaribu kuiga tatizo.
Jaribu kusasisha na kuanzisha upya seva yako ili kuthibitisha kama unaweza kurudia tatizo lako.
Ikiwa unafikiri itaelezea tatizo lako vizuri zaidi, piga picha ya skrini.

### 1.1 Kusasisha seva

Angalia [toleo lako la BTCPay](./FAQ/ServerSettings.md#how-can-i-see-my-btcpay-version).
Ikiwa ni la zamani zaidi kuliko [toleo la hivi punde](https://github.com/btcpayserver/btcpayserver/releases) la BTCPay, [kusasisha seva yako](./FAQ/ServerSettings.md#how-to-update-btcpay-server) kunaweza kutatua tatizo.

### 1.2 Kuanzisha upya seva

Kuanzisha upya seva yako ni njia rahisi ya kutatua matatizo mengi ya kawaida ya BTCPay Server.
Huenda ukahitaji [kuunganisha kwa SSH kwenye seva yako](./FAQ/ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps) ili kuianzisha upya.

### 1.3 Kuanzisha upya huduma

Kwa baadhi ya matatizo huenda ukahitaji tu kuanzisha upya huduma fulani katika usambazaji wako wa BTCPay Server.
Kama vile kuanzisha upya kontena la letsencrypt ili kusasisha cheti cha SSL.

```bash
sudo su -
cd btcpayserver-docker
docker restart letsencrypt-nginx-proxy-companion
```

Tumia `docker ps` kupata jina la huduma tofauti unayotaka kuanzisha upya.

## 2. Kuchunguza kumbukumbu (logs)

Kumbukumbu zinaweza kutoa taarifa muhimu.
Katika aya chache zinazofuata, tutaelezea jinsi ya kupata **taarifa za kumbukumbu kwa sehemu mbalimbali za BTCPay**.

### 2.1 Kumbukumbu za BTCPay

Tangu toleo la v1.0.3.8, unaweza kufikia kumbukumbu za BTCPay Server kwa urahisi kutoka kiolesura cha mbele.
Ikiwa wewe ni msimamizi wa seva, nenda kwenye **Mipangilio ya Seva > Kumbukumbu** ("Server Settings > Logs") na ufungue faili ya kumbukumbu.
Ikiwa hujui maana ya hitilafu fulani katika kumbukumbu, hakikisha unaitaja wakati wa kutatua tatizo.

Ikiwa ungependa kumbukumbu za kina zaidi na unatumia usambazaji wa Docker, unaweza kutazama kumbukumbu za kontena maalum za Docker kwa kutumia mstari wa amri.
Tazama [maelekezo haya ya ssh](./FAQ/ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps) ili kuunganisha kwenye mfano wa BTCPay unaoendesha kwenye VPS.

Hapa chini kuna orodha ya jumla ya majina ya kontena yanayotumiwa kwa BTCPay.

| KUMBUKUMBU ZA |          JINA LA KONTENA           |
| ------------ | :-------------------------------: |
| BTCPayServer |     generated_btcpayserver_1      |
| NBXplorer    |       generated_nbxplorer_1       |
| Bitcoind     |       btcpayserver_bitcoind       |
| Postgres     |       generated_postgres_1        |
| proxy        | letsencrypt-nginx-proxy-companion |
| Nginx        |             nginx-gen             |
| Nginx        |               nginx               |
| Core Lightning (CLN)  |  btcpayserver_clightning_bitcoin  |
| LND          |     btcpayserver_lnd_bitcoin      |
| RTL          |    generated_lnd_bitcoin_rtl_1    |
| Thunderhub   |     generated_bitcoin_thub_1      |
| LibrePatron  |            librepatron            |
| Tor          |              tor-gen              |
| Tor          |                tor                |

Tekeleza amri zilizo hapa chini ili kuchapisha kumbukumbu kwa jina la kontena.
Badilisha jina la kontena ili kutazama kumbukumbu za kontena nyingine.

```bash
sudo su -
cd btcpayserver-docker
docker ps
docker logs --tail 100 generated_btcpayserver_1
```

### 2.2 Kumbukumbu za Mtandao wa Lightning

Tumia zifuatazo ikiwa una tatizo na Mtandao wa Lightning.

### 2.2.1 - Mtandao wa Lightning LND - Docker

Kuna njia kadhaa za kufikia kumbukumbu zako za LND unapotumia Docker.
Kwanza ingia kama mtumiaji mkuu (root):

`sudo su -`

Nenda kwenye saraka sahihi:

`cd btcpayserver-docker`

Tafuta jina la kontena:

`docker ps`

Chapisha kumbukumbu kwa jina la kontena:

`docker logs --tail 100 btcpayserver_lnd_bitcoin`

Vinginevyo, unaweza kuchapisha kumbukumbu kwa haraka kwa kutumia kitambulisho cha kontena (herufi za kwanza za kitambulisho cha kipekee zinahitajika tu, kama vile herufi mbili za kushoto kabisa):

`docker logs 'weka kitambulisho cha kontena yako'`

Ikiwa kwa sababu yoyote unahitaji kumbukumbu zaidi

`sudo su -`

`cd /var/lib/docker/volumes/generated_lnd_bitcoin_datadir/_data/logs/bitcoin/mainnet/`

ndani ya saraka hiyo fanya `ls`

Utaona kitu kama `lnd.log  lnd.log.13  lnd.log.15  lnd.log.16.gz  lnd.log.17.gz`

Ili kufikia kumbukumbu ambazo hazijabanwa za kumbukumbu hizo fanya `cat lnd.log` au ikiwa unataka nyingine, tumia `cat lnd.log.15`

Ili kufikia kumbukumbu zilizobanwa katika .gzip tumia `gzip -d lnd.log.16.gz` (katika hali hii tunafikia lnd.log.16.gz)

Hii inapaswa kukupa faili mpya, ambapo unaweza kufanya `cat lnd.log.16`

Iwapo haya hapo juu hayafanyi kazi, huenda ukahitaji kusakinisha gzip kwanza `sudo apt-get install gzip`

### 2.2.2 - Mtandao wa Lightning Core Lightning (CLN) - Docker

`sudo su -`

`docker ps`

Tafuta kitambulisho cha kontena la Core Lightning (CLN).

docker logs 'weka kitambulisho cha kontena yako hapa'

vinginevyo, tumia hii

`docker logs --tail 100 btcpayserver_clightning_bitcoin`

Unaweza pia kupata taarifa za kumbukumbu kwa amri ya cli ya Core Lightning (CLN).

`bitcoin-lightning-cli.sh getlog`

## 2.3 - Kumbukumbu za Nodi ya Bitcoin

Mbali na [kuangalia kumbukumbu](#2-kuchunguza-kumbukumbu-logs) za kontena lako la Bitcoind, unaweza pia kutumia amri zozote za [bitcoin-cli](https://developer.bitcoin.org/reference/rpc/index.html) kupata taarifa kutoka kwa nodi yako ya bitcoin.
BTCPay inajumuisha hati (script) kukuwezesha kuwasiliana na nodi yako ya Bitcoin kwa urahisi.

Ndani ya folda ya `btcpayserver-docker`, pata taarifa za blockchain kwa kutumia nodi yako:

`bitcoin-cli.sh getblockchaininfo`

## 3. Kutafuta suluhisho mwenyewe (Google, FAQ, matatizo ya GitHub)

Ingawa usanidi hutofautiana, uwezekano kwamba mtu mwingine alikumbana na tatizo kama lako ni mkubwa sana.
Chukua muda mchache, tafuta kwenye Google na uone kama unaweza kulitatua mwenyewe.

### 3.1 Maswali Yanayoulizwa Mara kwa Mara ya BTCPay

Tunajaribu kuandika matatizo ya kawaida kwenye [ukurasa wa Maswali Yanayoulizwa Mara kwa Mara](./FAQ/README.md).
Angalia huko na uone kama swali lako limerekodiwa.

### 3.2 GitHub

Kunapokuwa na tatizo la juu la kiufundi, watumiaji kwa kawaida hufungua suala (issue) kwenye GitHub.
Angalia hifadhi ya BTCPay kwenye GitHub na vinjari [tafuta masuala yaliyofungwa](https://github.com/btcpayserver/btcpayserver/issues?q=is%3Aissue+is%3Aclosed).

### 3.3 Mattermost

Jukwaa la mazungumzo la Mattermost ni zuri kwa matatizo yanayofanana, ambayo watumiaji wengine walikumbana nayo kabla yako.
Kwenye kona ya juu kulia, bofya kwenye utafutaji na weka hoja yako.

## 4. Kuomba msaada

Ikiwa huwezi kulitatua tatizo mwenyewe, usijali.
Kuna jamii iliyo tayari kukusaidia.

Kadiri unavyoelezea tatizo vizuri, ndivyo uwezekano wa kupata suluhisho kwa wakati unavyoongezeka.
Kuwa mfupi na toa taarifa nyingi muhimu iwezekanavyo.
Hakikisha umejumuisha [toleo unalotumia](./FAQ/ServerSettings.md#how-can-i-see-my-btcpay-version) na ueleze Usanidi wako wa Usambazaji wa BTCPay.
Jaribu kuelezea unachojaribu kufanya na tatizo ni nini.
Ikiwa unaweza, toa kumbukumbu (logs).
Ikiwa unafikiri ni muhimu, jisikie huru kujumuisha picha ya skrini.

Huu hapa ni mfano mzuri wa jinsi ya kuuliza swali.

> Nina tatizo na XYZ. Ninaweza kurudia tatizo. Toleo langu la BTCPay ni 0.100.31, na nilisambaza seva yangu kwenye Digital Ocean kwa kufuata mwongozo wa usambazaji wa Docker. Nimetafuta kupitia Maswali Yanayoulizwa Mara kwa Mara na masuala yaliyofungwa ya GitHub, lakini hakuna suluhisho la tatizo langu. Usanidi wangu wa BTCPay ni XYZ, na tatizo linatokea ninapofanya XYZ. Hizi hapa ni kumbukumbu nilizoweza kupata kutoka kwa mfano wangu wa BTCPay. Unaweza kuona hitilafu katika picha niliyoiambatanisha.

:::warning Tafadhali kumbuka:
Jamii haitatoa msaada wa kina kwa usambazaji maalum.
Yaani, tofauti za [Usambazaji wa Mwongozo](/Deployment/ManualDeployment.md) zinatarajiwa kutumiwa kwa madhumuni ya maendeleo pekee na na watumiaji wenye ujuzi wa kiufundi wenye uwezo wa **kutatua matatizo ya usambazaji na matengenezo wenyewe**. Hii inajumuisha bidhaa za [Vifaa-Kama-Huduma](/Deployment/HardwareAsAService.md) (Nodl, RaspiBlitz, Umbrel, n.k.)
:::

### 4.1 Kuuliza jamii (matatizo ya jumla)

Kwa majibu ya haraka kwa matatizo ya kimsingi, ni bora kuchapisha swali katika chaneli ya #support kwenye [BTCPay Mattermost](https://chat.btcpayserver.org/btcpayserver/channels/support).

### 4.2 Kufungua Suala kwenye GitHub (matatizo ya juu)

Ikiwa una usanidi maalum wa ujenzi na unakumbana na tatizo gumu, [fungua suala kwenye GitHub](https://github.com/btcpayserver/btcpayserver/issues) ili watengenezaji waweze kukusaidia.

### 4.3 Msaada wa Kulipiwa

Baadhi ya wanajamii hutoa msaada wa kulipiwa.
Ikiwa unataka msaada wa haraka zaidi, angalia orodha ya [wanachama wanaotoa msaada wa kulipiwa](./Support.md).

### 4.4 Msaada wa Mtandao wa Lightning

Ikiwa unakumbana na tatizo la kiufundi na utekelezaji wako wa Mtandao wa Lightning, huenda ukataka kuuliza maswali katika jamii zao husika.

#### 4.4.1 Msaada wa LND

- [LND GitHub](https://github.com/lightningnetwork/lnd/issues)
- [Jumuiya ya Lightning kwenye Slack](https://lightningcommunity.slack.com)

#### 4.4.2 Msaada wa Core Lightning (CLN)

- [CLN GitHub](https://github.com/ElementsProject/lightning/issues)
- [Kikundi cha CLN cha Telegram](https://t.me/lightningd)
- [Nyaraka za CLN](https://lightning.readthedocs.io/)
