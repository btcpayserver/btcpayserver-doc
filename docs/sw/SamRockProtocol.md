# Kutumia Itifaki ya SamRock kusanidi wallet ya duka lako

[Itifaki ya SamRock](https://github.com/rockstardev/SamRockProtocol) inawezesha usanidi wa haraka na rahisi wa kupokea malipo kutoka kwa duka lako la BTCPay Server moja kwa moja kwenye wallet yako ya mkononi inayojitunza. Hii inaondoa hitaji la usanidi wa wallet kwa mkono na inafanya iwe rahisi kuanza kupokea malipo ya Bitcoin.

## Muhtasari

Programu-jalizi ya Itifaki ya SamRock inakuruhusu kusanidi duka lako la BTCPay Server kufanya kazi na wallet za mkononi zinazoendana kwa kuchanganua tu msimbo wa QR. Itifaki inasanidi kiotomatiki njia za malipo zinazohitajika kwenye kifaa chako cha mkononi, ikijumuisha Bitcoin on-chain, Lightning Network, na Liquid.

**Wallet zinazoendana:**
- [Aqua Wallet](https://aquawallet.io/)

## Mahitaji

- BTCPay Server v2.1.6 au mpya zaidi
- [Programu-jalizi ya Boltz](https://plugin-builder.btcpayserver.org/public/plugins/boltz) imesakinishwa na kuwashwa (inahitajika kwa usaidizi wa Lightning)
- [Programu-jalizi ya Itifaki ya SamRock](https://plugin-builder.btcpayserver.org/public/plugins/samrock-protocol) imesakinishwa

## Maagizo ya Usanidi

[![SamRockProtocol showcase](https://img.youtube.com/vi/d9T94kx92yY/mqdefault.jpg)](https://www.youtube.com/watch?v=d9T94kx92yY)

### 1. Sakinisha Programu-jalizi

1. Nenda kwenye **Server Settings > Plugins** katika BTCPay Server yako
2. Tafuta "SamRock Protocol" katika orodha ya **Available Plugins**
3. Bonyeza **Install** na uanze upya seva yako utakapoulizwa

:::tip
Hakikisha programu-jalizi ya Boltz pia imesakinishwa na kuwashwa kabla ya kutumia Itifaki ya SamRock.
:::

### 2. Sanidi Duka Lako

1. Nenda kwenye **Store > Plugins > SamRock Protocol**
2. Chagua njia zipi za malipo unazotaka kuwasha:
   - **Bitcoin (On-chain)**: Pokea malipo moja kwa moja kwenye wallet yako kupitia blockchain ya Bitcoin
   - **Lightning (via Boltz API)**: Pokea malipo ya papo hapo ya Lightning Network
   - **Liquid (On-chain)**: Pokea malipo kupitia Mtandao wa Liquid (kama umewashwa kwenye seva yako)
3. Bonyeza **Generate QR Code**

### 3. Unganisha Wallet Yako ya Mkononi

1. Fungua wallet yako ya mkononi inayoendana (k.m., Aqua Wallet)
2. Changanua msimbo wa QR ulioonyeshwa kwenye BTCPay Server
3. Wallet yako itasanidi kiotomatiki njia za malipo zilizochaguliwa na kuziunganisha kwenye duka lako

Ndiyo tu! Duka lako la BTCPay Server sasa liko tayari kupokea malipo moja kwa moja kwenye wallet yako ya mkononi inayojitunza.

## Faida

- **Usanidi wa haraka**: Hakuna usanidi wa wallet kwa mkono unaohitajika
- **Kujitunza**: Unadumisha udhibiti kamili wa funguo zako za siri na fedha
- **Njia nyingi za malipo**: Usaidizi wa Bitcoin, Lightning, na Liquid katika usanidi mmoja
- **Rafiki kwa simu ya mkononi**: Simamia malipo ya duka lako moja kwa moja kutoka kwenye simu yako
- **Faragha iliyoimarishwa**: Malipo ya Lightning yanabadilishwa kupitia Boltz kwa kutumia atomic swaps, ambayo inamaanisha Boltz haichukui kamwe ulinzi wa fedha zako na haiwezi kuunganisha malipo yako ya Lightning na anwani ya wallet yako

## Rasilimali

- [Hazina ya GitHub ya Itifaki ya SamRock](https://github.com/rockstardev/SamRockProtocol)
- [Ukurasa wa Programu-jalizi ya Itifaki ya SamRock](https://plugin-builder.btcpayserver.org/public/plugins/samrock-protocol)
- [Programu-jalizi ya Boltz](https://plugin-builder.btcpayserver.org/public/plugins/boltz)
