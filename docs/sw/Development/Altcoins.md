# Jinsi ya Kuongeza Altcoin

Bitcoin ndio lengo pekee la mradi wa BTCPay Server na watengenezaji wake wakuu. Hata hivyo, miunganisho ya hiari inapatikana kwa altcoins kadhaa. Kwa maelezo zaidi angalia [ukurasa wa Maswali Yanayoulizwa Mara kwa Mara kuhusu Altcoin](../FAQ/Altcoin.md).

## Muhtasari

Uunganishaji wa Altcoin unahitaji mambo mawili:

1. **Programu-jalizi ya BTCPay Server** - inashughulikia mantiki ya malipo, usimamizi wa pochi, na UI
2. **Kipande cha Docker Compose** - inaruhusu wengine kuendesha miundombinu ya nodi ya sarafu yako pamoja na BTCPay Server

**Usi**badilishe kiini cha BTCPay Server. Sarafu zote mpya lazima ziunganishwe kama programu-jalizi.

## Unda Programu-jalizi ya BTCPay Server

Jenga programu-jalizi inayopanua `BaseBTCPayServerPlugin`. Programu-jalizi yako inasajili mtandao wa sarafu, kishughulikiaji malipo, na viendelezi vya UI na BTCPay Server.

Tumia [programu-jalizi ya Monero](https://github.com/btcpay-monero/btcpayserver-monero-plugin) kama rejeleo lako. Faili muhimu za kusoma:

* [MoneroPlugin.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/blob/master/Plugins/Monero/MoneroPlugin.cs) - sehemu ya kuingilia programu-jalizi na usajili wa huduma
* [MoneroLikePaymentMethodHandler.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Payments) - ushughulikiaji wa malipo
* [MoneroListener.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Services) - ufuatiliaji wa muamala na bloku
* [MoneroLoadUpService.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Services) - uundaji na upakiaji wa pochi kupitia RPC

Angalia [nyaraka za Ukuzaji wa Programu-jalizi](./Plugins.md) kwa mwongozo wa jumla wa programu-jalizi - usanidi wa mradi, viendelezi vya UI, hifadhidata, na uchapishaji.

## Unda Kipande cha Docker Compose

Ili kuruhusu watumiaji kusambaza nodi ya sarafu yako pamoja na BTCPay Server, wasilisha PR kwenye hazina ya [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) yenye vipengele vifuatavyo. Angalia [Beldex PR #1042](https://github.com/btcpayserver/btcpayserver-docker/pull/1042) kwa mfano kamili.

### Picha ya Docker

Jenga na uchapise picha ya Docker kwa daemon ya sarafu yako na RPC ya pochi. Ipangishe katika Docker Hub yako mwenyewe au rejesta ya kifaa - usiongeze jengo lako kwenye mstari wa ujenzi wa picha wa BTCPay.

### Kipande cha Docker Compose

Ongeza faili ya YAML kwenye `docker-compose-generator/docker-fragments/` inayofafanua huduma za daemon ya sarafu yako na RPC ya pochi. Kipande lazima kipitishe URI za RPC kwa BTCPay Server kupitia vigezo vya mazingira ili programu-jalizi iweze kuunganisha.

Mfano: [monero.yml](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/monero.yml)

### crypto-definitions.json

Ongeza ingizo la sarafu yako katika [`docker-compose-generator/crypto-definitions.json`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/crypto-definitions.json) ili jenereta ya docker-compose ijumuishe.

### Nyongeza za hiari

Unaweza pia kujumuisha:

* **Kipande cha kufunua** (km. `opt-yourcoin-expose.yml`) - inafunua bandari za RPC kwenye localhost kwa utatuzi wa makosa
* **Hati za CLI ya pochi** (km. `yourcoin-wallet-cli.sh`) - vifuniko vya urahisi vya kufikia CLI ya pochi ndani ya kifaa
* **Mabadiliko ya hati ya hifadhi rudufu** - ongeza ujazo wa sarafu yako kwenye `btcpay-backup.sh`

## Uchapishaji na Uorodheshaji

Mara tu uunganishaji wako utakapokuwa tayari:

1. **Chapisha programu-jalizi yako** kwenye [BTCPay Plugin Builder](https://plugin-builder.btcpayserver.org/) ili watumiaji wa majaribio waweze kuisakinisha kutoka kwenye UI ya BTCPay Server (watahitaji kuendesha tawi lolote la hazina ya BTCPay Server ambalo umetengeneza programu-jalizi yako juu yake).
2. **Pata PR yako ya Docker iunganishwe** kwenye [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) ili watumiaji waweze kusambaza nodi ya sarafu yako.
3. **Omba uorodheshaji** kwenye BTCPay Plugin Builder **tu** mara tu PR ya Docker kutoka hatua iliyotangulia itakapounganishwa.

## Maswali Yanayoulizwa Mara kwa Mara

### Je, ninajaribu vipi programu-jalizi yangu kienyeji?

Hazina ya programu-jalizi yako inapaswa kujumuisha `docker-compose.yml` yake mwenyewe inayoanzisha daemon ya sarafu yako (katika hali ya regtest), RPC ya pochi, na tegemezi za msingi za BTCPay (bitcoind, nbxplorer, postgres). Kisha unaendesha BTCPay Server kutoka kwenye IDE yako na programu-jalizi ikipakiwa kupitia `DEBUG_PLUGINS`.

Angalia [docker-compose.yml ya programu-jalizi ya Monero](https://github.com/btcpay-monero/btcpayserver-monero-plugin/blob/master/BTCPayServer.Plugins.IntegrationTests/docker-compose.yml) na [Usanidi wake wa Ukuzaji wa Kienyeji](https://github.com/btcpay-monero/btcpayserver-monero-plugin#local-development-setup) kwa mtiririko kamili wa kazi.

### Je, ninajaribu vipi kipande cha Docker kwa uzalishaji?

Sakinisha [.NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) na uendeshe:

```bash
BTCPAYGEN_CRYPTO1='YOUR-COIN'
BTCPAYGEN_SUBNAME='test'
cd docker-compose-generator/src
dotnet run
```

Hii inazalisha docker-compose yako katika folda ya `Generated`. Ikague ili kuthibitisha kipande chako kilijumuishwa kwa usahihi.

## Utunzaji

Watengenezaji wa BTCPay hawatekelezi sarafu mbadala kwa ombi. Kuongeza sarafu mpya kunategemea kabisa jamii na watengenezaji wa sarafu hizo. Watengenezaji wa BTCPay hawatumii muda mwingi kupima au kutunza altcoins. Ukiwasilisha PR, hakikisha uunganishaji wako unafanya kazi. Ikiwa hautunzwi kikamilifu, utaondolewa.