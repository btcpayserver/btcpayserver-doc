# Huduma ya Dynamic DNS

## Motisha

**Dynamic DNS** inahitajika ikiwa:

- Unaendesha BTCPay Server na mtoa huduma wa upangishaji ambaye haitoi kikoa chaguo-msingi kwa seva yako
- Hutaki kununua jina lako la kikoa (k.m. `mybusiness.com`)
- Unahitaji kufikia BTCPay Server yako kupitia mtandao kwa HTTPS. (BTCPayServer yako inafikiwa na watumiaji wengine wa mtandao)

Kisha unataka kutumia **huduma ya Dynamic DNS ya BTCPayServer**.

**Huhitaji** Huduma ya Dynamic DNS ikiwa:

- Unapangisha BTCPay Server nyumbani na unafikia tu kupitia mtandao wa ndani (kutumia HTTP kwa ndani au kutumia Tor inatosha)
- BTCPay Server yako inapaswa kufikiwa na wewe pekee (tumia tu kivinjari cha Tor na anwani ya Tor ya mfano wako)
- Mtoa huduma wako wa upangishaji anatoa jina la kikoa kwa seva yako kwa chaguo-msingi (k.m. Lunanode kwa mfano inatoa kikoa kidogo cha `.lndyn.com` bure, na Azure inatoa `.azurewebsites.net`)

**Watoa huduma wa Dynamic DNS** wanakuruhusu kuwa na kikoa cha bure kama `example.ddns.net` kwa seva yako.
Zaidi ya hayo, Watoa huduma wa Dynamic DNS wanatoa API rahisi ya kusasisha rekodi ya DNS moja kwa moja wakati mfano wako wa BTCPay Server unapobadilisha anwani yake ya nje ya IP.

BTCPay Server, ikisanidiwa kutumia Dynamic DNS, itaangalia mara kwa mara na kusasisha rekodi ya DNS ikiwa mabadiliko ya IP ya nje yatagunduliwa.

## Jinsi ya kutumia

### Hatua ya 1: Unda kikoa

Kwanza, unda akaunti kwenye mtoa huduma wa Dynamic DNS, watoa huduma maarufu zaidi ni:

- [noip](https://www.noip.com/) (bure)
- [duckdns](https://www.duckdns.org/) (bure)
- [zoneedit](https://www.zoneedit.com/) (bure)
- [dyndns](https://dyn.com/) (sio bure)
- [google](https://domains.google.com/) (sio bure)
- [easydns](https://www.easydns.com/) (sio bure)

Ukishamaliza kuunda akaunti, unaweza kuunda jina la kikoa cha bure kupitia tovuti yao.

### Hatua ya 2: Sanidi Dynamic DNS kwenye BTCPay Server

Unahitaji kuwa msimamizi wa mfano wako.
Nenda kwenye Mipangilio ya Seva (Server Settings) > Huduma (Services) > Dynamic DNS.

- Ongeza Dynamic DNS
- Chagua mtoa huduma wako wa Dynamic DNS
- Ingiza kikoa ulichounda katika hatua ya 1
- Ongeza jina la mtumiaji na nenosiri ulilounda katika hatua ya 1
- Chagua kisanduku cha `imewezeshwa` (enabled) na uhifadhi

### Hatua ya 3: Sanidi usakinishaji wako wa docker wa BTCPay kutoa vyeti vya HTTPS

Ikiwa unatumia usambazaji wa docker, unahitaji pia kusasisha usakinishaji wako wa BTCPayServer.
Unganisha kupitia SSH kwenye mfano wako na uendeshe:

```bash
BTCPAY_ADDITIONAL_HOSTS="example.ddns.net"
. btcpay-setup.sh -i
```

Ikiwa una wapangishaji wengine wowote katika `BTCPAY_ADDITIONAL_HOSTS`, watenganishe tu kwa `,`.
