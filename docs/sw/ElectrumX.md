# ElectrumX

Hati hii inaelezea jinsi ya **kuunganisha Electrum Wallet kwenye Seva ya ElectrumX**.

**Kumbuka:** [toleo la docker la BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker) (tangu Nov 7 2019, toleo la 1.0.3.137) linaunga mkono ujumuishaji kamili na [ElectrumX](https://electrumx.readthedocs.io/en/latest/features.html) ambayo ndiyo programu inayotumika zaidi kwa seva za umma za Electrum ambazo Electrum Wallet yako ya ndani inategemea ili kupata maelezo yote ya, au kutangaza miamala kwenye blockchain ya bitcoin. Ruka hadi Sehemu ya 2 hapa chini, ili kusoma zaidi kuhusu hii inamaanisha nini, na jinsi ya kuiweka kwenye stack yako ya BTCPay.

## Jinsi ya kuunganisha ElectrumX kwenye BTCPay Server yako na kuunganisha Electrum Wallet yako kwake kwa faragha kamili

### (inapatikana tu katika toleo la docker la BTCPay)

Kabla ya kuendelea, ni muhimu kuelewa jinsi Electrum Wallet yako kwenye PC/Mac yako inavyofanya kazi vizuri/haraka, bila kuwa na nodi kamili yake ya bitcoin. Kwa kweli, Electrum Wallet inategemea juhudi za jamii kudumisha mkusanyiko wa seva kote duniani zenye nodi kamili ya bitcoin zinazofanya kazi hii kwa ajili yako! Zinaitwa Seva za Electrum, na unaweza kuwa sehemu ya jamii hiyo ili kuifanya mtandao huo kuwa na nguvu zaidi, tuone jinsi.

Unapobofya taa ndogo ya trafiki chini ya Electrum Wallet yako hapa:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

Utaona skrini hii yenye orodha ya seva zote za Electrum zinazopatikana ambazo wallet yako inaweza kuungana nazo, kwa kawaida ikiwa na "Select Server Automatically" tayari imewekwa tiki:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png)

Ingawa kutumia Electrum Wallet ikiwa na "Select Server Automatically" imewashwa ndiyo njia rahisi zaidi, kila muamala unaofanya/kuvinjari/kutangaza katika Electrum Wallet yako utafanywa kupitia seva ya mtu mwingine - hii ni hatari kwa faragha, ambayo itapunguzwa kwa kusanidi na kutumia Seva yako mwenyewe ya ElectrumX.

## Sehemu ya 2.1 Washa Seva Yako Mwenyewe ya ElectrumX (iliyounganishwa kikamilifu na nodi kamili ya bitcoin ya BTCPay Server yako)

### Mahitaji ya lazima:

1. Docker pekee: [Toleo la Docker la BTCPay Server](https://docs.btcpayserver.org/Docker/) pekee ndilo linaloungwa mkono.
2. Nodi ya BTCPay isiyokatwa: Hakikisha utekelezaji wako wa BTCPay HAUJAKATWA ([pruned](./FAQ/Synchronization.md#can-i-skip-the-synchronization)) (yaani umesawazisha na kuhifadhi kutoka block ya mwanzo. Angalia kwamba HUTUMII opt-save-storage [Environment Variable](https://docs.btcpayserver.org/Docker/#generated-docker-compose))
3. Nafasi ya diski: Angalau GB 400 za nafasi ya diski kwenye kifaa ambapo volumes zako za docker zimehifadhiwa zinahitajika (wakati wa uandishi wa hati hii tarehe 9 Nov 2019, jumla ya nafasi ya diski iliyotumika ni GB 333 - ikiwa na nodi kamili na ElectrumX imewashwa - na bila shaka hii itaongezeka zaidi kadri muda unavyopita).
4. Vipande vya Ziada: Unafahamu jinsi ya kutumia kipengele cha [Additional Fragment](https://docs.btcpayserver.org/Docker/#environment-variables) cha BTCPay kama sehemu ya usanidi wako wa vigezo vya mazingira.
5. Usanifu wa seva: [Docker ya ElectrumX](https://github.com/lukechilds/docker-electrumx) (rasmi) inayotumika hapa imejaribiwa tu kwenye BTCPay Server inayofanya kazi kwenye usanifu wa x86_64. Hadi sasa imejaribiwa kwa kina kwenye Ubuntu 18.04 na Debian Buster. Isipokuwa ikarekebishwa na kujaribiwa vizuri kwenye Raspberry Pi (na usanifu mwingine) kuna uwezekano haitafanya kazi.
6. Ujuzi wa msingi wa mstari wa amri wa Linux: unadhaniwa.

### Kuwasha Seva ya ElectrumX kutaathirije utekelezaji uliopo wa BTCPay?:

Kimsingi, kusanidi ElectrumX katika seva ya BTCPay ni rahisi, na hakutaathiri sehemu nyingine ya utekelezaji wako. Mahitaji pekee ni kama hapo juu. [Toleo rasmi la docker la ElectrumX](https://github.com/lukechilds/docker-electrumx) linawashwa katika BTCPay kwa kuwasha [kipande cha ziada](https://docs.btcpayserver.org/Docker/#generated-docker-compose) kinachoitwa [`opt-add-electumx`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/opt-add-electrumx.yml). Kipande hiki hakitawasha na kuanzisha seva ya ElectrumX tu, pia kitawasha `txindex=1` katika nodi yako kamili ya bitcoin. `txindex=1` (Transaction Index=ON) ni kipengele cha msingi cha bitcoin kinachohitajika ili ElectrumX iweze kuipa Electrum Wallet yako data ya kina ya muamala kwa muamala wowote, moja kwa moja kutoka kwa blockchain, bila kuipata kutoka kwa seva yoyote ya mtu wa tatu.

Kama umekuwa ukiendesha BTCPay Server yako kwa muda lakini hujawahi kuweka `txindex=1` hadi sasa, basi inaweza kuchukua masaa machache kujenga faharasa, hii sio shida na haipaswi kusababisha muda wa kupungua wa zaidi ya masaa machache - ni bora kuweka hii ifanyike usiku wakati hakuna mtu atakayekuwa anatumia nodi yako. Kumbuka: Kama unataka kujenga upya faharasa kutoka mwanzo, anzisha bitcoind mara moja na chaguo la `reindex=1` (onyo: chaguo hili la kujenga upya faharasa linaweza kuchukua muda MREFU sana, na halijawashwa kwa chaguo msingi kwani kuna uwezekano huhitaji, na kwa hivyo halimo katika wigo wa hati hii).

### Hatua za kuwasha Seva ya ElectrumX katika BTCPay:

Hizi hapa ni hatua zote za **kuwasha Seva ya ElectrumX katika nodi yako ya BTCPay** (soma kwa makini kwani unaweza kuhitaji kurekebisha kulingana na usanidi wako mahususi, hasa kama unatumia "vipande" vingine maalum au vinavyokinzana (kukata, kumbukumbu kidogo n.k. Kukariri, HUPASWI kuendelea zaidi hapa kama unaendesha nodi ya BTCPay iliyokatwa.

1. Seva ya ElectrumX inapatikana kwa Electrum Wallets kupitia mlango wa TCP 50002. Unahitaji kufungua mlango huu kikamilifu angalau upatikane ndani ya mtandao wako mwenyewe kwa PC yoyote au kifaa cha Android kinachoendesha Electrum Wallet, na kuwasha usambazaji wa mlango (unaweza pia kusambaza mlango 50002 kutoka kwa Internet/WAN yako, ili kuwezesha watumiaji wengine wa Electrum Wallet kutoka kwa Internet kuuliza seva yako).

2. Washa Kipande cha Ziada cha Docker kwenye nodi yako ya BTCPay kwa kuendesha amri zifuatazo (hii inadhani usakinishaji mpya wa BTCPay ukiwa na LND na ElectrumX, tafadhali rekebisha ipasavyo kwa kutumia [nyaraka husika](https://docs.btcpayserver.org/Docker/#generated-docker-compose):

3. Fuata [usanidi wa kawaida na usakinishaji wa BTCPay Server](https://github.com/btcpayserver/btcpayserver-docker#full-installation-for-technical-users), kisha baada ya amri hii `cd btcpayserver-docker`, fuata maagizo hapa chini badala ya yale yaliyo kwenye kiungo. Kama tayari una BTCPay Server inayofanya kazi, basi fuata tu kutoka hatua inayofuata.

4. Weka vigezo vyako vya mazingira:

```bash
export BTCPAY_HOST="YOURHOST.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="lnd"
export LIGHTNING_ALIAS="MY_LN"
export LETSENCRYPT_EMAIL="you@example.com"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx;opt-more-memory"
```

Unaweza kuendesha yote hayo kama amri moja baada ya kuirekebisha kulingana na mahitaji yako. Sehemu kuu kwa madhumuni yetu katika mwongozo huu bila shaka ni `BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-add-electrumx"`. Kumbuka: `opt-more-memory` inaweza kuondolewa kama unapenda, lakini nakupendekeza sana kama mfumo wako una zaidi ya GB 1 ya RAM/kumbukumbu ambayo unaweza kuigawa kwa seva ya BTCPay, itaharakisha usawazishaji wa nodi yako na utendaji wa jumla wa ElectrumX kwa kiasi kikubwa.

5. Sanidi au sanidi upya BTCPay Server na ElectrumX:

   `cd ~/BTCPayServer/btcpayserver-docker && . ./btcpay-setup.sh -i`

   Hii itasanidi (au kusanidi upya) seva yako na kila kitu kinachohitajika ikiwa ni pamoja na ElectrumX, na yote inapaswa "kufanya kazi tu". Lakini, itasababisha angalau masaa kadhaa ya kusawazisha `txindex`, na kama ni seva mpya, inaweza kuwa siku kadhaa kutegemea vifaa vyako.

6. SUBIRI nodi yako isawazishe kikamilifu:
   Unaweza kuangalia hali ya usawazishaji wa msingi wa bitcoin kwa kwenda kwenye domain yako ya seva ya BTCPay, na itakuonyesha kwenye ukurasa wa mbele. Au, unaweza kuangalia kutoka mstari wa amri pia, kwa kutumia amri hizi:

   `docker logs btcpayserver_bitcoind` - hii itakuonyesha hali ya usawazishaji wa blockchain ya msingi wa bitcoin (na maelezo MENGINE YOTE kuhusu nodi yako, ikiwa ni pamoja na makosa yoyote)

   `docker logs generated_electrumx_1` - hii itakuonyesha hali ya usawazishaji wa ElectrumX. Kumbuka: ElectrumX HAITAANZA kusawazisha hadi nodi kamili ya bitcoin imalize kusawazisha, utaona makosa hadi hiyo imekamilika na haya yanaweza kupuuzwa.

Mara usawazishaji wote wa bitcoin na ElectrumX utakapokamilika unaweza kuendelea hadi hatua inayofuata. (Kumbuka: Electrum wallets hazitaungana na seva ya Electrum ambayo haijamaliza kusawazisha)

## Sehemu ya 2.2 Unganisha Electrum Wallet yako (Desktop au Android) kwenye Seva yako ya ElectrumX

### Unganisha kwenye ElectrumX kutoka Electrum Wallet kwenye Mashine yako ya Mac/PC/Linux:

Soma haya yote kwanza kabla ya kuendelea. Unaweza kutaka kufanya "Protip" hapa chini badala ya hatua za mwongozo katika GUI ya Electrum Wallet.

Fungua Electrum Wallet. Unapobofya taa ya trafiki chini ya Electrum Wallet yako:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

Utaona skrini hii yenye orodha ya seva zote za Electrum zinazopatikana ambazo wallet yako inaweza kuungana nazo, kwa kawaida ikiwa na `Select Server Automatically` tayari imewekwa tiki:

![ElectrumWalletServerList](https://user-images.githubusercontent.com/1388507/68437521-8a5eb580-01c1-11ea-9ece-0666353a6742.png)

Sasa ni wakati wa KUONDOA TIKI kwenye mpangilio wa `Select Server Automatically`, ambao utakuwezesha kuingiza anwani ya IP au domain au jina la host la Seva yako ya ElectrumX. Katika mfano hapa chini, seva ya ElectrumX iko kwenye mtandao wa ndani kwa `192.168.1.3` kwa hivyo tunaingiza hiyo kwa mkono (acha mlango kama 50002) na bonyeza `close`.

![EnterElectrumXServerIP](https://user-images.githubusercontent.com/1388507/68496320-4e276580-0252-11ea-8caf-facc8a246d70.png)

Kama yote hapo juu yalifanya kazi vizuri, na nodi yako iko katika hali nzuri, utapata taa ya kijani ya trafiki chini kulia kwa kiolesura cha wallet kama inavyoonyeshwa hapa - hiyo inamaanisha mafanikio!:

![ElectrumWalletMainScreenLight](https://user-images.githubusercontent.com/1388507/68437133-5636c500-01c0-11ea-822c-6e72bd6d60ea.png)

#### Protip - kwa hiari fanya hatua zilizo hapo juu moja kwa moja katika faili ya usanidi ya Electrum Wallet kabla hata ya kufungua GUI ya wallet:

Kama unapendelea kuepuka kuungana na seva nyingine tangu mwanzo unapofungua Electrum Wallet, fanya yafuatayo kabla ya kufungua GUI ya Electrum Wallet.

Katika folda ya Electrum Wallet ([tazama hapa](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) kama hujui iko wapi), fungua na hariri faili ya `config` kama hivi:

1. Tafuta mstari: `"auto_connect": true,` na ubadilishe kuwa: `"auto_connect": false,` - hii itazuia Electrum Wallet yako kujiunganisha kiotomatiki na Seva nyingine za Electrum za watu wa tatu wakati wa kuanzisha (kupata vichwa vya block na taarifa za muamala).

2. Tafuta mstari: `"oneserver": false,` na ubadilishe kuwa: `"oneserver": true,` - inahakikisha kwamba data zote zinapatikana kutoka seva moja tu.

3. Tafuta au ongeza mstari: `"server": "SOMEIPADDRESS:50002:s",` na ubadilishe kuwa anwani ya IP ya Seva yako ya ElectrumX, katika mfano hapo juu hii itakuwa: `"server": "192.168.1.3:50002:s",` - weka kwa nguvu anwani yako ya IP kama chaguo msingi unapofungua Wallet.

Hatua hizi 3 ni za hiari lakini zinapendekezwa kwa faragha kamili kwa kufunga Electrum Wallet kwa muunganisho mmoja na seva yako ya kibinafsi ([Rejea](https://github.com/chris-belcher/electrum-personal-server#how-to)).

### Tafakari juu ya kile kilichofanikiwa:

Sasa unaendesha **Seva yako mwenyewe ya kibinafsi ya ElectrumX**. Uhamisho wote wa data unaohusiana na Electrum Wallet unafanyika moja kwa moja kati ya Seva yako ya ElectrumX na blockchain ya bitcoin, bila kupitia seva nyingine zozote za watu wa tatu. Umepata faragha kamili ya muamala wa bitcoin (angalau kutoka kwa mtazamo wa maswali yako ya blockchain na miamala, anwani za malipo/zinazopokea n.k - hakuna mtu isipokuwa wewe na blockchain anayeweza kuona unachofanya).

### Utatuzi wa matatizo:

Kwa hivyo kuna jambo moja unaweza kukumbana nalo, ambapo hata baada ya kufanya kila kitu kwa usahihi, bado unapata taa nyekundu ya trafiki (ambayo inamaanisha haujaunganishwa na seva yoyote) katika hatua zilizo hapo juu. Vidokezo vingine vya utatuzi ambavyo watu hukumbana navyo vinaweza kuongezwa, ningependekeza kufanya PR kwenye hati hii moja kwa moja.

- Kama unapata taa nyekundu ya trafiki, zima Electrum Wallet kabisa, kisha nenda kwenye folda yako ya Electrum Wallet ([tazama hapa](https://electrum.readthedocs.io/en/latest/faq.html#where-is-my-wallet-file-located) kama hujui iko wapi).

Ndani ya folda ya Electrum Wallet (katika mfano huu hapa chini, ndivyo inavyoonekana kwenye Mac) tafuta saraka ya `certs` na ufute cheti cha seva unayojaribu kuungana nayo, katika mfano huu `192.168.1.3`, kwa kukivuta hadi kwenye Taka.

![Certs](https://user-images.githubusercontent.com/1388507/68497330-9a73a500-0254-11ea-9349-71bdb3bd9511.png)

Anzisha Electrum Wallet tena, na unganisha kwenye seva yako ya ElectrumX. Kama imesawazishwa kikamilifu, sasa kuna uwezekano itaonyesha taa ya kijani ya trafiki, na uko tayari kuendelea.
