# Pokea Bitcoin katika Shopify na BTCPay Server

Tunawasilisha BTCPay Server kwa Shopify – lango la malipo la chanzo huru linalokuwezesha kupokea malipo ya bitcoin moja kwa moja kwenye tovuti au maduka yako kutoka kwa wateja bila ada yoyote.

Ujumuishaji wetu na Shopify unakuruhusu kuunganisha BTCPay Server yako unayojiendesha na [duka lako la Shopify](https://www.shopify.com/), kukuwezesha kupokea malipo ya Bitcoin kwa haraka na kwa usalama.

:::warning

⚠️ Ujumuishaji wa Shopify V1 Umeacha Kutumika

Watumiaji wapya hawawezi tena kutumia ujumuishaji wa Shopify V1 na BTCPay Server. Tafadhali rejea [mwongozo wa ujumuishaji wa Shopify V2](/ShopifyV2/) kwa maagizo ya kusanidi BTCPay Server na Shopify.
Watumiaji waliopo wanaokumbana na matatizo na ujumuishaji wa V1 wanahimizwa kufungua suala kwenye [hazina yetu ya Github](https://github.com/btcpayserver/btcpayserver) au kuripoti kupitia [Mattermost](http://chat.btcpayserver.org/) au [Telegram](https://t.me/btcpayserver), na kupanga uhamiaji hadi V2.
:::


## Kile BTCPay inachotoa:

- **Ada sifuri**: Furahia lango la malipo bila ada. Ndiyo, Umesoma sawa. Ada sifuri!
- **Malipo ya moja kwa moja, Hakuna wapatanishi au KYC**: Waage wapatanishi na makaratasi yenye kuchosha, na pata pesa zako moja kwa moja kwenye wallet yako
- **Mfumo wa kiotomatiki kikamilifu**: BTCPay inashughulikia malipo, usimamizi wa ankara na marejesho kiotomatiki.
- **Onyesha msimbo wa QR wa Bitcoin wakati wa malipo**: Boresha uzoefu wa mteja kwa chaguo rahisi na salama la malipo.
- **Miundombinu inayojiendesha**: Dumisha udhibiti kamili juu ya lango lako la malipo.
- **Lightning Network iliyounganishwa**: Malipo na malipo ya papo hapo, haraka na ya gharama nafuu
- **Uhamishaji rahisi wa CSV**
- **Mfumo wa programu-jalizi unaobadilika**: Panua utendaji kulingana na mahitaji yako
- **Ujumuishaji wa point-of-sale** – Pokea malipo katika maduka yako halisi
- **Tayari kwa lugha nyingi**: Hudumia hadhira ya kimataifa moja kwa moja.
- **Usaidizi unaoendeshwa na jamii**: Pata msaada wa haraka kutoka kwa jamii yetu iliyojitolea ([Mattermost](http://chat.btcpayserver.org/) au [Telegram](https://t.me/btcpayserver)).


## Mahitaji:

Kabla ya kuzama katika mchakato wa usanidi, hakikisha una yafuatayo:

- Akaunti ya Shopify
- BTCPay Server - [inayojiendesha](Deployment.md) au inayoendeshwa na [mtoa huduma wa tatu](/Deployment/ThirdPartyHosting.md) v1.4.8 au mpya zaidi.
- [Duka la BTCPay Server lililoundwa](CreateStore.md) lenye [wallet iliyosanidiwa](WalletSetup.md)

[![BTCPay Server - Shopify Video](https://img.youtube.com/vi/jJjAyvgWVfk/mqdefault.jpg)](https://www.youtube.com/watch?v=jJjAyvgWVfk)


## Kusanidi BTCPay Server na Shopify

1. Katika Shopify, bonyeza `Apps >` kwenye utepe wa kushoto
2. Kwenye dirisha ibukizi linalojitokeza, bonyeza `App and sales channel settings`
3. Kutoka kwenye ukurasa ulioonyeshwa, bonyeza kitufe cha `Develop apps`
4. Ukiulizwa, bonyeza `Allow custom app development`
5. `Create an app` na uipe jina, k.m. BTCPay Server
6. Kwenye ukurasa wa programu, katika kichupo cha `Overview`, bonyeza `Configure Admin API scopes`
7. Katika chuja ya admin access scopes andika `Orders`
8. Katika `Orders` washa `read_orders` na `write_orders` kisha bonyeza `Save`
9. Bonyeza `Install App` kwenye kona ya juu kulia na wakati dirisha ibukizi linapojitokeza bonyeza `Install`
10. Fichua `Admin API access token` na `inakili`
11. Katika BTCPay Server yako, nenda kwenye duka lako na kwenye utepe wa kushoto bonyeza `Shopify`
12. Katika sehemu ya kwanza, `Shop name` ingiza subdomain ya duka lako la Shopify k.m. SOME_ID.myshopify.com kisha ingiza SOME_ID
13. Katika sehemu ya tatu, `Admin API access token` bandika `Admin API access token` uliyoinakili hivi punde kutoka Shopify
14. Katika sehemu ya pili, `API key` bandika `API key` kutoka Shopify - ambayo unaweza kuipata chini ya ukurasa uleule ambapo ulinakili Admin API access token
15. Bonyeza `Save` kwenye ukurasa wa mipangilio ya BTCPay Shopify
16. Rudi kwenye Shopify: Kwenye menyu ya kushoto chagua `Checkout` songa chini hadi "Order status page" na bandika msimbo wa HTML wa `<script>` unaouona katika mipangilio ya BTCPay Shopify kwenye sehemu ya maandiko ya "Additional scripts".
17. Bonyeza `Save` na songa kurudi juu
18. Sasa bonyeza `Payments` kwenye utepe wa kushoto, songa chini hadi "Manual payment methods", bonyeza `(+) Manual payment method` na uchague `Create custom payment method` kwenye orodha kunjuzi.
19. Katika `Custom payment method name` jaza `Bitcoin with BTCPay Server`, kwa hiari unaweza kujaza sehemu nyingine, lakini haihitajiki.
20. Bonyeza `Activate` na umesanidi Shopify na BTCPay Server kwa mafanikio.

:::tip
"Custom Payment method name" **lazima** iwe na angalau moja ya maneno yafuatayo (bila kuzingatia ukubwa wa herufi): `bitcoin`, `btcpayserver`, `btcpay server` au `btc` ili ifanye kazi.
:::

Hapa chini kuna vielelezo vya hatua kwa hatua vinavyoelezea mchakato ulioainishwa hapo juu.

![BTCPay Server shopify step 1](../img/shopify/btcpayshopify1.png)

![BTCPay Server shopify step 2](../img/shopify/btcpayshopify2.png)

![BTCPay Server shopify step 3](../img/shopify/btcpayshopify3.png)

![BTCPay Server shopify step 4](../img/shopify/btcpayshopify4.png)

![BTCPay Server shopify step 5](../img/shopify/btcpayshopify5.png)

![BTCPay Server shopify step 6](../img/shopify/btcpayshopify6.png)

![BTCPay Server shopify step 7](../img/shopify/btcpayshopify7.png)

![BTCPay Server shopify step 8](../img/shopify/btcpayshopify8.png)

![BTCPay Server shopify step 9](../img/shopify/btcpayshopify9.png)

![BTCPay Server shopify step 10](../img/shopify/btcpayshopify10.png)

![BTCPay Server shopify step 11](../img/shopify/btcpayshopify11.png)

![BTCPay Server shopify step 12](../img/shopify/btcpayshopify12.png)

![BTCPay Server shopify step 13](../img/shopify/btcpayshopify13.png)

![BTCPay Server shopify step 14](../img/shopify/btcpayshopify14.png)

![BTCPay Server shopify step 14-2](../img/shopify/btcpayshopify14-2.png)

Mtiririko wa Malipo ya Onyesho baada ya kila kitu kusanidiwa:

![BTCPay Server shopify step 15](../img/shopify/btcpayshopify15.png)

![BTCPay Server shopify step 16](../img/shopify/btcpayshopify16.png)

![BTCPay Server shopify step 17](../img/shopify/btcpayshopify17.png)

![BTCPay Server shopify step 18](../img/shopify/btcpayshopify18.png)
