# Kusambaza BTCPay - Mchawi wa Wavuti wa LunaNode

Makala hii inaeleza **usambazaji wa BTCPay Server kupitia Mchawi wa Wavuti wa LunaNode**. [LunaNode](https://www.lunanode.com/) ni mtoa huduma wa upangishaji mwenye makao Canada anayekubali malipo ya Bitcoin na hahitaji kitambulisho cha kibinafsi isipokuwa uthibitishaji wa nambari ya simu.

Mchawi wao wa wavuti ni moja ya njia rahisi zaidi za **kusambaza Seva za BTCPay kutoka kiolesura rafiki sana kwa mtumiaji**. Njia hii inapendekezwa sana ikiwa huna ujuzi mwingi wa kiufundi. LunaNode watakupa kikoa cha kawaida kwa seva yako ili kukuanzisha. Ikiwa unataka kusanidi kikoa maalum utahitaji kuwa na uzoefu fulani na kiolesura cha mstari wa amri.

Kwa bei ya karibu US$15.80 kwa mwezi, unaweza kuwa na **BTCPay Server inayojisimamia**, ambayo inajumuisha nodi kamili ya Bitcoin na nodi ya Lightning Network.

Video kutoka BTC Sessions hapo chini inaeleza hatua zote za kusambaza na kusanidi BTCPay Server na vilevile jinsi ya kusanidi Lightning Network kwa njia tofauti.

[![How To Accept Bitcoin Payments by deploying BTCpay Server via Web-Deployment](https://img.youtube.com/vi/-GJr4XjRCPo/mqdefault.jpg)](https://www.youtube.com/watch?v=-GJr4XjRCPo)

Vinginevyo, muhtasari mfupi wa hatua za usambazaji tu pia unafunikwa katika [makala hii](https://medium.com/@BtcpayServer/launch-btcpay-server-via-web-interface-and-deploy-full-bitcoin-node-lnd-in-less-than-a-minute-dc8bc6f06a3)

## 1. Unda akaunti na ongeza mikopo

Jiandikishe kwa LunaNode na ongeza mikopo kwenye akaunti yako.
Zingatia kuwa unahitaji kusubiri uthibitisho wa ankara.

## 2. Unda Funguo ya API

Mara akaunti yako imethibitishwa, na mikopo imeongezwa, nenda kwenye sehemu ya API na unda API mpya. Usifunge ukurasa huo na endelea kwenye hatua ya 3.

## 3. Usambazaji wa Mchawi wa Wavuti

1. Nenda kwa [launchbtcpay.lunanode.com](https://launchbtcpay.lunanode.com/)
2. Bandika Funguo ya API na Kitambulisho cha API kilichoundwa katika hatua ya 2. na endelea.
3. Tumia kikoa chako mwenyewe au kile kinachozalishwa kiotomatiki na LunaNode.
4. Geuza mipangilio ya mchawi wa wavuti kulingana na mahitaji yako.
5. Bofya Anzisha VM. Subiri dakika 6-7 kwa usambazaji wa Mashine ya Mtandao.

Ikiwa umetumia kikoa maalum,

6. SSH kwenye VM kwa kutumia nenosiri lililozalishwa na LunaNode au jozi yako ya ufunguo wa kibinafsi-umma.
7. Endesha amri zifuatazo.

```bash
$ sudo su -
$ export BTCPAY_HOST=your.cool.domain
$ export BTCPAY_PROTOCOL=https
$ export REVERSEPROXY_DEFAULT_HOST="$BTCPAY_HOST"
$ cd btcpayserver-docker
$ . btcpay-setup.sh -i
$ . btcpay-restart.sh -i
```

8. Tembelea kikoa, unda akaunti na uingie.

Sasa unahitaji kusubiri blockchain isawazishwe kikamilifu. Kutegemea mpango uliotumia na idadi ya sarafu ulizoongeza, hiyo inaweza kuchukua siku 1-7. Ikiwa utawezesha matumizi ya CPU, na Bitcoin na LND, itachukua siku 1-2. Kuna malipo ya mara moja ya US$3 kwa usawazishaji wa haraka ikiwa utawezesha matumizi ya CPU. Dirisha ibukizi la usawazishaji litatoweka wakati nodi yako inaposawazishwa kikamilifu.

## 4. Ugeuzaji wa ziada (si wa lazima)

Mara mfano wako wa BTCPay Server umesanidiwa, kama ilivyo na njia yoyote ya usambazaji, unaweza kuongeza vigeu vya mazingira kama vile kuwezesha keysend na autopilot kwa LND.
Kwa maelezo zaidi, tembelea [orodha ya vigeu vya mazingira](https://docs.btcpayserver.org/Docker/#generated-docker-compose) inayopatikana. Hii inahitaji ujuzi wa jinsi ya [SSH kwenye seva yako](/FAQ/ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps).
