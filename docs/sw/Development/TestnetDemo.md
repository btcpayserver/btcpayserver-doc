# Onyesho la Testnet

Kwanza tuunde duka jipya:

1. Nenda kwenye [tovuti ya Testnet](https://testnet.demo.btcpayserver.org/)
2. Upande wa kulia bonyeza **Create an account** ili [kuunda akaunti](https://testnet.demo.btcpayserver.org/register) au **Sign In** ikiwa tayari una akaunti.
3. Baada ya kuingia, unda duka jipya.

Tutumie Electrum kuunda pochi ya testnet kwa duka lako:

1. Pakua [Electrum](https://electrum.org)
2. Endesha Electrum na kigezo `--testnet` (k.m. kwenye Mac OS kwa kutumia `open -a Electrum.app --args --testnet`)
3. Bonyeza kupitia mchawi na unda pochi ya majaribio, ukitumia mipangilio ya chaguo-msingi inayopendekezwa na Electrum
4. Baada ya pochi kusanidiwa, nenda kwa "Wallet" > "Information" kwenye menyu ya Electrum.
5. Nakili mfuatano wa "Master Public Key" (unaoanza kwa `*pub...`)

Tusanidi duka ili litumie pochi yako ya Electrum:

1. Nenda kwenye ukurasa wa Mipangilio wa duka lako katika BTCPay
2. Kwenye ukurasa wa "General Settings" utapata sehemu ya "Wallet" - bonyeza kitufe cha "Setup" kusanidi pochi ya mtandaoni.
3. Bandika "Master Public Key" uliyonakili kutoka Electrum kwenye uga wa maandishi wa "Derivation Scheme" na ubonyeze "Continue"
4. Thibitisha anwani kwa kubonyeza "Receive" kwenye Electrum: "Receiving address" inapaswa kulingana na anwani ya kwanza iliyoonyeshwa kwenye BTCPay
5. Baada ya hapo pochi yako ya majaribio inapaswa kuonekana kwenye [ukurasa wa Wallets](https://testnet.demo.btcpayserver.org/wallets) wa akaunti yako ya BTCPay

Kisha unaweza kuunda ankara, ama kupitia

- Menyu ya "Invoice" kwenye tovuti au
- Mchakato uliowekwa kwenye kumbukumbu katika [Unganisho Maalum](../CustomIntegration.md)

## Maswali

Ikiwa una maswali kuhusu BTCPay Server kwenye Testnet, unaweza kujiunga na [mazungumzo ya jamii](https://chat.btcpayserver.org/).
Ikiwa una maswali kuhusu zana au amri nyingine, n.k. kuna uwezekano mkubwa unaweza kupata majibu kwa maswali yako kwa kutafuta kwenye mtandao au kwenye [StackOverflow](https://stackoverflow.com/).
