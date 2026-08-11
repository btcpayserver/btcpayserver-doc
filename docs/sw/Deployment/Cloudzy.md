# Kusambaza BTCPay Server kwenye Cloudzy

Makala hii inaeleza jinsi ya kusambaza **BTCPay Server kupitia Soko la Cloudzy**. [Cloudzy](https://cloudzy.com/marketplace/btcpay-server/) inatoa usambazaji wa BTCPay Server wa kubofya moja, unaokuruhusu kuzindua BTCPay Server kwenye VPS bila kusanidi seva mwenyewe kutoka mwanzo.

Njia hii ya usambazaji inapendekezwa ikiwa unataka mchakato wa usanidi wa moja kwa moja kupitia soko la mtoa upangishaji. Kabla ya kuanza, hakikisha una:

* Akaunti ya Cloudzy
* Kikoa au kikoa kidogo
* Ufikiaji wa mipangilio ya DNS ya kikoa chako
* Kiteja cha SSH, kama vile Terminal, Windows PowerShell, PuTTY, au zana nyingine unayopendelea

Cloudzy inapendekeza kutumia mpango wa VPS wenye angalau **GB 4 za RAM** kwa BTCPay Server.

Video hapa chini inapitia mchakato wa kusambaza BTCPay Server kwenye Cloudzy.

<div align="center">
  <a href="https://www.youtube.com/watch?v=nmAaTy_Use4" target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.youtube.com/vi/nmAaTy_Use4/mqdefault.jpg"
      alt="Deploying BTCPay Server on Cloudzy"
      width="640"
    />
  </a>
  <p>
    <a href="https://www.youtube.com/watch?v=nmAaTy_Use4" target="_blank" rel="noopener noreferrer">
      Watch the deployment video on YouTube
    </a>
  </p>
</div>

## 1. Unda au ingia kwenye akaunti yako ya Cloudzy

Nenda kwenye ukurasa wa BTCPay Server kwenye Cloudzy:

[https://cloudzy.com/marketplace/btcpay-server/](https://cloudzy.com/marketplace/btcpay-server/?utm_source=btcpayserver&utm_medium=deployment-guide)

Unda akaunti mpya, au ingia ikiwa tayari unayo.

## 2. Sambaza BTCPay Server

1. Bofya **Deploy**.
2. Chagua mpango wako wa VPS unaoupendelea.
3. Katika kichupo cha **Application**, chagua **BTCPay Server**.
4. Ipe seva yako jina.
5. Bofya **Deploy**.

## 3. Weka kikoa chako au kikoa kidogo

Weka kikoa au kikoa kidogo unachotaka kutumia kwa mfano wako wa BTCPay Server.

Kwa mfano, unaweza kutumia:

```text
example.com
```

Au kikoa kidogo kama vile:

```text
pay.example.com
```

Kutumia kikoa kidogo mara nyingi kunapendekezwa ikiwa tovuti yako kuu tayari imepangishwa mahali pengine.

Seva inapaswa kuwa tayari ndani ya dakika moja au mbili.

## 4. Sanidi DNS ya kikoa chako

Baada ya usambazaji, hifadhi anwani yako ya IP ya seva na nenosiri mahali salama.

Kisha, nenda kwenye mipangilio ya DNS ya kikoa chako na unda au sasisha **rekodi ya A** inayoelekeza kikoa chako au kikoa kidogo kwenye anwani ya IP iliyotolewa na Cloudzy.

Kwa mfano, ikiwa unataka kutumia `pay.example.com`, unda rekodi ya A kama hii:

```text
Type: A
Name: pay
Value: <your Cloudzy server IP>
```

Ikiwa unataka kutumia kikoa chako kikuu, kama vile `example.com`, unda au sasisha rekodi ya A ya mizizi:

```text
Type: A
Name: @
Value: <your Cloudzy server IP>
```

Mabadiliko ya DNS yanaweza kuchukua muda kuenea, kutegemea mtoa kikoa chako.

## 5. Si wa lazima: Sanidi CDN au proksi

Ikiwa unatumia CDN au huduma ya proksi ya DNS, unaweza kuelekeza kikoa chako au kikoa kidogo kwenye VPS ya Cloudzy kutoka kwenye paneli ya DNS ya mtoa CDN wako.

Kwa mfano, ikiwa unataka BTCPay Server ipatikane kwenye:

```text
pay.example.com
```

Mtoa CDN au DNS wako anapaswa kuwa na rekodi ya A inayoelekeza kikoa kidogo hicho kwenye anwani ya IP ya seva yako ya Cloudzy:

```text
Type: A
Name: pay
Value: <your Cloudzy server IP>
```

Ikiwa CDN yako inatoa huduma za proksi, SSL, akiba, au usalama, zingatia yafuatayo:

* Hakikisha CDN inaelekeza kwenye kikoa au kikoa kidogo kilekile ulichokiingiza wakati wa usambazaji.
* Tumia HTTPS kwa kikoa chako cha BTCPay Server.
* Epuka akiba kali kwa kurasa za BTCPay Server, kurasa za malipo, kurasa za msimamizi, API, na ncha za webhook.
* Ikiwa utoaji wa cheti cha SSL unashindwa wakati wa usanidi, zima kwa muda proksi ya CDN na tumia hali ya DNS-pekee hadi cheti kitakapotolewa. Unaweza kuwezesha proksi tena baadaye ikiwa usanidi wa CDN yako unaunga mkono ipasavyo.
* Ikiwa CDN yako ina hali za SSL/TLS, tumia hali inayounga mkono HTTPS salama kati ya CDN na VPS yako ya Cloudzy.

Safu ya CDN sio ya lazima. BTCPay Server inaweza pia kuendeshwa moja kwa moja kwenye VPS yako ya Cloudzy kwa rekodi za kawaida za DNS.

## 6. Kamilisha usanidi

SSH kwenye VPS yako kwa kutumia vitambulisho vilivyotolewa na Cloudzy.

Kwenye VPS yako, endesha amri ya kuwasha upya kutoka kwa mwongozo wa Cloudzy:

```bash
systemctl restart btcpayserver.service
```

Hii inawasha upya huduma ya BTCPay Server na kutumia usanidi wa kikoa.

## 7. Fikia BTCPay Server yako

Mara huduma inapowashwa upya na rekodi zako za DNS zinaelekeza kwa usahihi, fungua kikoa chako au kikoa kidogo kwenye kivinjari:

```text
https://<your-domain-or-subdomain>
```

Kwa mfano:

```text
https://pay.example.com
```

Unda akaunti kwenye mfano wako wa BTCPay Server na uingie.

Hakikisha unasoma maelekezo kamili ya Cloudzy kwa maelezo zaidi ya usambazaji na hatua za utatuzi.
