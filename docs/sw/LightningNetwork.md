# Lightning Network (LN) na BTCPay Server

**Jedwali la yaliyomo**:
[[toc]]

## Faharasa

- **Lightning Network (LN)**: Itifaki ya malipo ya safu ya pili inayowezesha miamala ya haraka na ya gharama ya chini ya Bitcoin kwa kuunda njia za malipo kati ya pande.
- **Kujitunza mwenyewe**: Kudumisha udhibiti kamili na umiliki wa funguo zako za faragha na fedha, bila kutegemea wahusika wengine.
- **Pochi ya Utunzaji**: Pochi ambapo mhusika wa tatu anadhibiti funguo zako za faragha na kusimamia fedha zako kwa niaba yako.
- **Ukwasi**: Salio linalopatikana katika njia ya malipo ambalo linaweza kutumika kutuma au kupokea malipo.
- **Njia ya Malipo**: Uhusiano wa malipo wa pande mbili kati ya pande mbili kwenye Lightning Network.
- **LSP (Mtoa Huduma wa Ukwasi)**: Huduma inayotoa ukwasi wa kuingia kwa kufungua njia za malipo kwenda kwenye nodi yako.
- **On-chain**: Miamala inayorekodiwa kwenye blockchain ya Bitcoin.
- **Off-chain**: Miamala inayotokea kwenye suluhisho za safu ya pili kama Lightning Network, sio moja kwa moja kwenye blockchain.
- **Sats (satoshis)**: Kipande kidogo zaidi cha Bitcoin, sawa na 0.00000001 BTC.
- **L-BTC**: Liquid Bitcoin, toleo la tokeni la Bitcoin kwenye Mtandao wa Liquid.

## Lightning Network (LN) na BTCPay Server

Kama mfanyabiashara, unataka kufanya malipo yawe nafuu iwezekanavyo kwa wateja wako na kwako mwenyewe. Kukiwa na ongezeko la matumizi ya Bitcoin, malipo ya jadi ya on-chain yatakuwa ghali zaidi. Lightning Network, inayojulikana pia kama malipo ya off-chain, inatoa suluhisho kwa kuwezesha miamala ya bei nafuu na ya papo hapo. Hii inafanya kuwa chaguo bora kwa malipo ya mtandaoni na mauzo ya ana kwa ana, yanayojulikana pia kama mauzo ya Point of Sale (PoS).

Kuna njia nyingi tofauti kwa wafanyabiashara kuweka usanidi wa Lightning Network kwenye BTCPay Server - kutegemea ujuzi wako wa kiufundi na hamu ya kudhibiti fedha zako. Tutaanza na chaguo rahisi zaidi lakini za utunzaji na kuendelea hatua kwa hatua kuelekea kujitunza kamili na udhibiti. Wazo nyuma ya hii ni: Kabla ya wewe kama mfanyabiashara hupokei malipo ya bitcoin kabisa, ni bora ufanye kwa suluhisho rahisi zaidi linalopatikana kwa mwanzo mzuri na uzoefu. Tunatumai utabadilisha usanidi wako kuelekea uhuru zaidi wa kujitawala na udhibiti wa fedha zako katika siku zijazo, unapojifunza zaidi kuhusu Bitcoin na uwezekano wake.

:::tip
Ikiwa unataka kuanza haraka na huna muda wa kusoma haya yote, angalia kutumia Itifaki ya SamRock [kuanzisha pochi kiotomatiki kimiujiza](SamRockProtocol.md) kwako.
:::

## Kutumia pochi/huduma ya utunzaji

**Faida:**
* rahisi kusanidi
* hakuna usimamizi wa ukwasi unaohitajika
* hakuna haja ya kuendesha nodi yako mwenyewe ya LN
* unaweza kuchagua kugeuza kiotomatiki kuwa stablecoin/fiat
* inafanya kazi hata kwenye mifano iliyoshirikiwa (mradi tu msimamizi awawezeshe programu-jalizi hiyo)

**Hasara:**
* uaminifu kwa mhusika wa tatu unahitajika
* aina fulani ya KYC inahitajika
* fedha ziko hatarini ikiwa huduma itafilisika au kufanya rug-pull
* mara nyingi vikomo kwa kiasi kwa kila malipo
* mara nyingi vikomo kwa jumla ya kiasi kilichochakatwa kwa mwezi


Kwa chaguo hili unatumia huduma ya kuaminika kufanya kazi yote nzito ya kuendesha nodi ya LN kwako. Pia wanatoza ada fulani moja kwa moja au kupitia tofauti ya kiwango cha ubadilishaji na wana udhibiti kamili wa fedha zako.

Ikiwa una wasiwasi kuhusu mabadiliko ya bei ya Bitcoin, chaguo zote mbili zilizoorodheshwa hapa chini zinakuwezesha kugeuza kiotomatiki BTC yako kuwa stablecoins au sarafu za fiat (USD, EUR).

Yote hayo yakisemwa, ni njia ya haraka na rahisi zaidi ya kupokea malipo ya LN na kuanza.

:::tip
Unapotumia huduma yoyote ya utunzaji, unapaswa kuweka salio lako kwenye huduma kuwa dogo na kutoa fedha kwenda kwenye pochi yako ya LN ya kujitunza au kuzibadilisha kuwa bitcoin ya on-chain kupitia huduma ya kubadilishana kama [Boltz](https://boltz.exchange). Unaweza pia kubadilisha fedha kuwa sarafu ya fiat kupitia [programu-jalizi ya Bringin](https://plugin-builder.btcpayserver.org/public/plugins/bringin) au Strike moja kwa moja.
:::

Angalia [Kuunganisha pochi ya utunzaji ya Lightning Network](/sw/LightningNetwork-Setup/#connecting-a-custodial-lightning-network-wallet) kwa maelezo zaidi juu ya jinsi ya kusanidi pochi/huduma ya utunzaji.


## Kutumia huduma ya kubadilisha ya Boltz

**Faida:**
* rahisi kusanidi
* nafuu sana ikilinganishwa na suluhisho zingine
* inafanya kazi hata kwenye mifano iliyoshirikiwa (mradi tu msimamizi awawezeshe programu-jalizi hiyo)
* **faragha iliyoimarishwa**: Boltz inatumia ubadilishaji wa atomiki, ikimaanisha huduma haichukui kamwe utunzaji wa fedha zako na haiwezi kuunganisha malipo yako ya Lightning na anwani yako ya pochi ya Liquid

**Hasara:**
* ankara za kiasi cha 0 haziwezekani (angalia [hii](https://docs.boltz.exchange/boltz-btcpay-plugin/limitations))
* ubadilishaji kwenda L-BTC (unahitaji ubadilishaji wa L-BTC kwenda BTC ili uwe wa kujitunza kikamilifu)

Chaguo hili linatumia huduma ya [boltz.exchange](https://boltz.exchange) kwa kubadilisha malipo ya LN kuwa Liquid BTC (L-BTC, zaidi kuhusu Liquid Network [hapa](https://liquid.net)) kupitia **ubadilishaji wa atomiki**. Ubadilishaji wa atomiki hauhitaji uaminifu: ubadilishaji unakamilika kabisa au unashindwa kabisa, bila uwezekano wa fedha kupotea katikati. Hii pia inamaanisha Boltz haichukui kamwe utunzaji wa fedha zako na haiwezi kuunganisha malipo yako ya Lightning na utambulisho wako wa on-chain, ikitoa faragha bora ikilinganishwa na suluhisho za utunzaji.

Liquid inahitaji uaminifu katika shirikisho la makampuni, kwa hivyo si ya kujitunza kikamilifu, ingawa vyombo vingi vingehitaji kula njama kukufanyia rug-pull.

Kama ilivyo na huduma za utunzaji, unapaswa kubadilisha fedha mara kwa mara kuwa BTC halisi ya on-chain ya kujitunza mara kwa mara ili uwe na udhibiti kamili. Kwa pochi moto programu-jalizi ya boltz inakuwezesha kubadilisha kiotomatiki kuwa BTC.

Angalia [programu-jalizi ya Boltz](/sw/LightningNetwork-Setup/#boltz) kwa maelezo zaidi juu ya jinsi ya kusanidi programu-jalizi.

## Kutumia Watoa Huduma ya Ukwasi (LSPs)

**Faida:**
* rahisi kiasi kusanidi
* inajitunza mwenyewe
* hakuna haja ya kutenga mtaji

**Hasara:**
* unahitaji kununua ukwasi (na kulipia gharama zao za mtaji)
* inahitaji kusawazisha upya (kubadilisha LN kuwa BTC ya on-chain) kutumia tena uwezo wa njia
* usanidi wa awali wa gharama kubwa wakati wa mazingira ya ada ya juu
* haifanyi kazi kwa mifano iliyoshirikiwa

Kuna njia tofauti za jinsi unavyoweza kuingiliana na LSPs kwenye BTCPay Server. Wazo ni kwamba unamlipa LSP ili wafungue njia ya LN kwenda kwenye nodi yako na uweze kupokea malipo bila kuweka akiba ya fedha zako mwenyewe. Kwa huduma hii LSP inatoza ada ndogo; kwa kuongeza unahitaji kulipia gharama ya kufungua njia kwenda kwenye nodi yako. Faida moja kubwa ni kwamba unaweza kutumia tena njia kwa kusawazisha upya fedha. Hii inamaanisha kivitendo unaweza kumruhusu LSP afungue mfano njia ya sats milioni 10 kwako. Wakati salio la njia linapokuwa karibu kabisa upande wako unaweza kutuma fedha nje kupitia LN au kufanya ubadilishaji kwenda BTC ya on-chain kupitia [Boltz](https://boltz.exchange) au huduma zingine za kubadilisha.

Unaweza kupata maelekezo katika [Mwongozo wa Kusanidi Lightning Network](/sw/LightningNetwork-Setup/#manage-liquidity-via-a-lightning-service-provider-lsp).

## Kufanya yote mwenyewe (kujitawala kikamilifu)

**Faida:**
* uko kwenye udhibiti kamili
* hakuna mhusika wa tatu anayehusika
* hakuna anayeweza kukuzuia

**Hasara:**
* unahitaji kusimamia njia za malipo
* unahitaji kusimamia ukwasi
* unahitaji kutenga fedha
* haifanyi kazi kwa mifano iliyoshirikiwa

Kwa kuendesha nodi yako mwenyewe na pia kusimamia njia zako mwenyewe, uko kwenye udhibiti kamili, na hakuna mhusika wa tatu anayeweza kukunyima uwezo wa kupokea malipo ya Bitcoin. Hii inakuja na mkondo mdogo wa kujifunza na gharama za usimamizi endelevu kwa kusimamia njia na ukwasi.

Unaweza kuendesha CLN (Core Lightning) au LND pamoja na BTCPay Server yako moja kwa moja kwenye mfano wako, au unaweza kuunganisha kwenye nodi yako ya LN iliyowekwa nje kupitia miunganisho ya REST, Socket au LNDHub.

**Njia za kuendesha na/au kuunganisha nodi yako ya LN:**
* Tumia nodi ya ndani ya LN (CLN, LND au Eclair)
* Unganisha nodi yako ya nje ya LN kupitia REST, TCP au LNDHub (mf. unaweza kuunganisha nodi yako ya Alby Hub)
* Unganisha pochi yako ya LN kupitia [Nostr Wallet Connect](https://nwc.dev/) (NWC), unahitaji kuwa na [programu-jalizi ya Nostr](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.NIP05) imesakinishwa (pia inafanya kazi kwa Alby Hub)

Kwa maelekezo ya kina ya usanidi, angalia [Mwongozo wa Kusanidi Lightning Network](/sw/LightningNetwork-Setup/#manage-liquidity-on-your-own-channel-management).
