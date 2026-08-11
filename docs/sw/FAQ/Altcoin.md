# Maswali ya Altcoins

Ukurasa huu unajibu baadhi ya maswali ya kawaida kuhusu sarafu mbadala za kidijitali - altcoins.

[[toc]]

## BTCPay Server inasaidia sarafu zipi?

Bitcoin ndiyo lengo pekee la mradi na watengenezaji wake wakuu. Hata hivyo, ujumuishaji wa hiari upo kwa altcoins kadhaa:

- BGold (BTG) (pia inajulikana kama Bitcoin Gold)
- Bitcore (BTX)
- Dash (DASH)
- Dogecoin (DOGE)
- Feathercoin (FTC)
- Groestlcoin (GRS)
- Liquid Bitcoin (LBTC) (inakuja na usaidizi wa Liquid Tether USDt) [(maelezo kuhusu usambazaji na matumizi)](https://github.com/btcpayserver/btcpayserver/issues/1282)
- Litecoin (LTC)
- Monacoin (MONA)
- Monero (XMR) [kupitia Programu-jalizi](https://plugin-builder.btcpayserver.org/public/plugins/monero-plugin) [(mwongozo wa usambazaji na matumizi)](https://sethforprivacy.com/guides/accepting-monero-via-btcpay-server/)
- USDt (Tether) kwenye Tron [kupitia programu-jalizi](https://plugin-builder.btcpayserver.org/public/plugins/tether-usdt).
- Viacoin (VIA)
- Z-Cash (ZEC) [kupitia programu-jalizi](https://plugin-builder.btcpayserver.org/public/plugins/zcash-plugin)

Altcoins zinatunzwa na jamii zao husika na zimeorodheshwa hapa kwa urahisi tu. Kwa usaidizi kuhusu usambazaji wa Altcoin, utendaji au masuala, tafadhali wasiliana na mtunzaji wa Altcoin au jamii moja kwa moja.

## Kukubali Altcoin kupitia programu-jalizi za ubadilishanaji

Programu-jalizi zifuatazo zinakuruhusu kukubali aina mbalimbali za Altcoins kwa kuzibadilisha kuwa Bitcoin kupitia pochi ya duka lako.

- [Exolix](https://plugin-builder.btcpayserver.org/public/plugins/exolix-plugin)
- [Fixed Float](https://plugin-builder.btcpayserver.org/public/plugins/fixed-float)
- [SideShift](https://plugin-builder.btcpayserver.org/public/plugins/sideshift)
- [Trocador](https://plugin-builder.btcpayserver.org/public/plugins/trocador-app)

Kumbuka kuwa watoa huduma hawa wa nje wa ubadilishanaji wanawatoza watumiaji wako ada na wanaweza kuwa na viwango vya chini vya miamala.

## Je, sarafu ya XYZ inaweza kuongezwa katika BTCPay?

Hapana. Watengenezaji wa BTCPay hawaongezi sarafu mbadala kwa ombi. Kuongeza sarafu mpya kunategemea wazi jamii na watengenezaji wa sarafu hizo. Zaidi ya hayo, watengenezaji wa BTCPay hawatumii muda mwingi kupima wala kutunza altcoins. Ikiwa unawasilisha PR kwa sarafu mpya, hakikisha inafanya kazi. Ikiwa ujumuishaji wa altcoin hautatunzwa kikamilifu, utaondolewa kutoka BTCPay.

## Jinsi ya kuongeza altcoin katika BTCPay?

Ili kuongeza sarafu mpya kwenye BTCPay, tafadhali [fuata maagizo hapa](../Development/Altcoins.md).

## Jinsi ya kuongeza altcoin kwenye usambazaji uliopo wa BTCPay?

Ikiwa unataka kupanua idadi ya sarafu katika usakinishaji wako uliopo wa BTCPay Server, hakikisha una nafasi ya kutosha ya hifadhi kwenye mashine yako.

Katika mfano huu, tuna Bitcoin tu, na tunaongeza Litecoin kwenye usambazaji wetu wa Docker.

Muundo wa sarafu:

```
BTCPAYGEN_CRYPTO1: Sarafu ya kwanza ya kidijitali inayosaidiwa (kwa mfano, BTC, LTC. Chaguomsingi: btc)
BTCPAYGEN_CRYPTO2: Sarafu ya pili ya kidijitali inayosaidiwa (kwa mfano, btc, ltc. Chaguomsingi: (tupu))
BTCPAYGEN_CRYPTON: Sarafu ya N'th ya kidijitali inayosaidiwa ambapo N ni 9 kwa kiwango cha juu. (kwa mfano, btc, ltc. Chaguomsingi: (tupu))
```

Kuongeza Litecoin, kama sarafu yako ya pili (CRYPTO2), fanya hivi:

```bash
sudo su -
export BTCPAYGEN_CRYPTO2="ltc"
. ./btcpay-setup.sh -i
```

## Jinsi ya kuondoa sarafu kutoka BTCPay?

Katika [mfano hapo juu](#how-to-add-an-altcoin-to-an-existing-btcpay-deployment) tumeongeza Litecoin kama sarafu ya pili. Ili kuondoa sarafu fulani, tumia amri ifuatayo:

```bash
sudo su -
export BTCPAYGEN_CRYPTO2=""
. ./btcpay-setup.sh -i
```

Ambapo CRYPTO**2** inapaswa kubadilishwa na nambari ya sarafu unayotaka kuondoa. Ikiwa una sarafu ya XYZ kama `BTCPAYGEN_CRYPTO3`, na unataka kuiondoa, unapaswa kutumia CRYPTO**3**.
