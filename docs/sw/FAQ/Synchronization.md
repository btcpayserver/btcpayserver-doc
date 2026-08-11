# Maswali ya Usawazishaji

Hati hii inashughulikia maswali na masuala ya kawaida zaidi yanayoweza kutokea wakati wa usawazishaji wa BTCPay.

[[toc]]

## Kwa nini BTCPay inasawazisha?

Baada ya usambazaji, BTCPay Server yako inahitaji kusawazisha blockchain nzima na kuthibitisha sheria zote za makubaliano. Kulingana na vipimo vya mashine yako, kipimo data na idadi ya altcoins ulizoongeza, mchakato huu unaweza kuchukua kati ya siku 1-5.

Inaweza kuonekana kuwa ya kuchosha, lakini ni hatua muhimu ya kuendesha nodi yako mwenyewe kamili na kutolazimika kuamini au kutegemea mtu yeyote. Nodi yako haitapakua tu takriban 300GB ya data (chini kama unatumia nodi iliyopunguzwa) lakini pia kuthibitisha sheria zote za makubaliano. Unaweza kupata taarifa zaidi kuhusu umuhimu wa usawazishaji wa blockchain katika [video hii](https://www.youtube.com/watch?v=OrYDehC-8TU).

Ikiwa unavutiwa tu kujifunza kuhusu BTCPay Server, yaani [kuijaribu tu](../TryItOut.md) bila kusambaza mfano wako mwenyewe, unaweza kuepuka usawazishaji kwa kutumia [Seva ya Mtu wa Tatu](../Deployment/ThirdPartyHosting.md).

## Je, ninaweza kuruka usawazishaji?

Huwezi kuruka usawazishaji ikiwa unasambaza BTCPay Server, lakini unaweza kupunguza kwa kiasi kikubwa muda unaochukua. Ikiwa uko vizuri kutumia mstari wa amri, unaweza kutumia FastSync kusawazisha nodi yako kwa haraka. Hakikisha [umesoma hati hii ya FastSync](https://github.com/btcpayserver/btcpayserver-docker/tree/master/contrib/FastSync) kuelewa masuala ya uaminifu yanayoweza kuhusishwa na kipengele hiki.

Ili kutumia FastSync, hakikisha usambazaji wako una [chaguo la upunguzaji lililowashwa](#how-to-enable-bitcoin-node-pruning) kwa kutumia kigezo cha mazingira cha `opt-save-storage`, vinginevyo bitcoind haitaweza kusawazisha. Hatua ya kwanza ni [kuingia kwa SSH](./ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps) kwenye mfano wako wa BTCPayServer na kuendesha amri zifuatazo:

```bash
sudo su -
cd $BTCPAY_BASE_DIRECTORY/btcpayserver-docker/
btcpay-down.sh
cd contrib/FastSync
./load-utxo-set.sh
# Mara FastSync inapokamilika
btcpay-up.sh
```

Baada ya FastSync kukamilika na umerejesha mfano wako, onesha upya kikoa chako cha BTCPay na subiri usawazishaji uliobaki wa blockchain. Unaweza pia kufuata [video hii](https://youtube.com/watch?v=VNMnd-dX9Q8?t=1730).

Ikiwa FastSync yako inarudisha `Unahitaji kufuta pochi yako ya Bitcoin Core` baada ya kupakia seti ya uxto, au unapata hitilafu hii: `Usawazishaji wa mwisho wa pochi unaenda zaidi ya data iliyopunguzwa`, angalia sababu ya [BTCPay Server inaendelea kuonyesha kuwa nodi yangu inaanza kila wakati](#btcpay-server-keeps-showing-that-my-node-is-always-starting).

## Ninawezaje kujua kuwa BTCPay imesawazishwa kikamilifu?

Wakati huoni ujumbe ibukizi katika kona ya chini kulia, unaoonyesha maendeleo ya usawazishaji, hiyo inamaanisha kuwa seva yako imesawazishwa kikamilifu na unaweza [kuanza kuitumia](../RegisterAccount.md).

Ikiwa unataka kuangalia kuwa nodi yako ya Bitcoin ya BTCPay Server imesawazishwa na bloku ya hivi karibuni zaidi katika blockchain ya Bitcoin, [angalia urefu wa nodi yako](#how-can-i-check-the-block-height-of-my-bitcoin-node) unalingana na urefu wa sasa wa bloku kwa kutumia kichunguzi chochote cha blockchain.

## Ninawezaje kuangalia urefu wa bloku ya nodi yangu ya Bitcoin?

Ili kuthibitisha hali ya usawazishaji wa nodi yako ya Bitcoin, unaweza kutumia amri za bitcoin-cli ndani ya kontena la Bitcoin la seva yako. Ingia kwa SSH kwenye seva yako na nenda kwenye saraka ambapo [unaangalia kumbukumbu za Bitcoin](../Troubleshooting.md#23-bitcoin-node-logs), endesha amri: `bitcoin-cli.sh getblockcount` kuona bloku ya sasa ya nodi ya Bitcoin ya seva yako.

## BTCPay Server inachukua milele kusawazisha

Kusawazisha Nodi kamili ya Bitcoin kunapaswa kuchukua kati ya siku 1 na 5. Inapaswa kusawazisha haraka mwanzoni na polepole zaidi mwishoni.

Ikiwa nodi inaonekana haisawazishi, thibitisha:

- CPU haitoshi
- Inatumia kumbukumbu ya kubadilishana

### Sababu ya 1: CPU haitoshi

Tunapendekeza CPU 2 wakati wa kusawazisha; hata hivyo, baadhi ya watoa huduma wa upangishaji wanapunguza kasi ya CPU yako ikiwa unatumia sana.

Angalia kwa

```bash
sudo su -
docker stats
```

Ikiwa unaona matumizi ya CPU zaidi ya 100%, huku ikisawazisha polepole sana:

```
8e7ac41e6e2a        btcpayserver_bitcoind               100%               560.5MiB / 3.853GiB   14.20%              4.17
```

Basi unahitaji kuongeza vipimo vya mashine yako.

Ikiwa unaona matumizi ya chini sana ya CPU (chini ya 10%) wakati wa usawazishaji:

```
8e7ac41e6e2a        btcpayserver_bitcoind               10%               560.5MiB / 3.853GiB   14.20%              4.17
```

Mtoa huduma wako wa upangishaji anaweza kuwa anapunguza kasi ya CPU yako. Tafadhali hakikisha seva pangishi yako inasaidia matumizi ya juu ya CPU kwa muda mrefu.

Ikiwa hawaruhusu, zima seva yako hadi waache kukupunguzia kasi. Kisha unaweza kuweka kikomo cha CPU kupitia Docker, na kuanzisha upya seva:

```bash
docker update btcpayserver_bitcoind --cpus ".8"
```

### Sababu ya 2: Kutumia kumbukumbu ya kubadilishana

Ikiwa unasawazisha na huna kumbukumbu ya kutosha, seva yako inaweza kutumia kumbukumbu ya kubadilishana kuendelea kufanya kazi:

```bash
sudo su -
free -h
```

Ikiwa unaona matumizi ya kumbukumbu ya kubadilishana:

```bash
              total        used        free      shared  buff/cache   available
Mem:           2.0G        2.0G        0M         66M        0G        0M
Swap:          1.0G        200M      800M
```

Basi inamaanisha unahitaji kuongeza seva yako kwa kuongeza kumbukumbu zaidi.

## BTCPay Server inaendelea kuonyesha kuwa nodi yangu inaanza kila wakati

Sababu zinazowezekana:

- Huna RAM ya kutosha
- Huna hifadhi ya kutosha
- Umezima upunguzaji kwa bahati mbaya
- Saraka yako ya data ya Bitcoin imeharibika
- Usawazishaji wako wa mwisho wa pochi unaenda zaidi ya data iliyopunguzwa

### Sababu ya 1: Huna RAM ya kutosha

Angalia RAM yako:

```bash
sudo su -
free -h
```

Ikiwa unaona kuwa huna `free` au `available` kidogo sana ya kumbukumbu:

```bash
              total        used        free      shared  buff/cache   available
Mem:           2.0G        2.0G        0M         66M        0G        0M
Swap:            0B          0B          0B
```

Basi unahitaji kumbukumbu zaidi. Ikiwa tayari umesawazisha nodi yako, unaweza kuongeza kumbukumbu ya kubadilishana. Ikiwa bado, vipimo vya seva yako ni finyu sana.

Ikiwa tayari umesawazisha, unaweza kuongeza 2G ya kumbukumbu ya kubadilishana kwa:

```bash
fallocate -l 2G /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
echo "/mnt/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

### Sababu ya 2: Huna hifadhi ya kutosha

Angalia hifadhi ya mashine yako:

```bash
sudo su -
df -h
```

Ikiwa unaona huna hifadhi iliyobaki (/dev/sda1 katika kesi yangu)

```bash
Filesystem      Size  Used Avail Use% Mounted on
udev            2.0G     0  2.0G   0% /dev
tmpfs           395M   41M  354M  11% /run
/dev/sda1       125G  125G  0G   100% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/sdb1       7.8G   18M  7.4G   1% /mnt
```

[Chagua kipande cha Docker](https://docs.btcpayserver.org/Docker/#generated-docker-compose) kwa kiasi cha hifadhi unacholenga kuweka. Kisha [punguza nodi yako](https://docs.btcpayserver.org/Docker/#how-i-can-prune-my-nodes).

### Sababu ya 3: Umezima upunguzaji kwa bahati mbaya

Ikiwa umejaribu hivi karibuni kurekebisha vigezo vyako vya mazingira kwa kutumia amri ya `export BTCPAYGEN_ADDITIONAL_FRAGMENTS="xyz"` kuongeza kipande cha ziada, lakini ukasahau kujumuisha vile vilivyopo, unaweza kuwa umezima upunguzaji.

Ikiwa huna kumbukumbu ya kutosha kuhifadhi blockchain nzima ya Bitcoin na huna `opt-save-storage` iliyoorodheshwa unapo[chapisha orodha kamili ya chaguo](https://docs.btcpayserver.org/FAQ/Deployment/#how-can-i-modify-or-deactivate-environment-variables) unazoendesha, kuna uwezekano mkubwa umezima upunguzaji.

Unaweza kuthibitisha kwa kuangalia kumbukumbu zako za Bitcoind:

```bash
sudo su -
cd btcpayserver-docker
docker logs --tail 100 btcpayserver_bitcoind
```

Ikiwa unaona:

```bash
Block files have previously been pruned.
You need to rebuild the database using -reindex to go back to unpruned mode.
This will redownload the entire blockchain.
Please restart with -reindex or -reindex-chainstate to recover.
```

Unaweza tu [kuwasha upya upunguzaji](#how-to-enable-bitcoin-node-pruning) kutatua suala hilo.

### Sababu ya 4: Saraka yako ya data ya Bitcoin imeharibika

Angalia kumbukumbu za nodi yako:

```bash
sudo su -
docker logs --tail 10 btcpayserver_bitcoind
```

Ikiwa unaona:

```bash
Please restart with -reindex or -reindex-chainstate to recover.
```

Basi saraka yako ya data ya Bitcoin imeharibika. Inaweza kuwa uharibifu wa kimwili au kushindwa kwa diski kuu.
Ili kuweka faharasa upya nodi yako:

```bash
btcpay-down.sh
# Futa folda za 'blocks' na 'chainstate'
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/blocks
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/chainstate
btcpay-up.sh
```

### Sababu ya 5: Usawazishaji wako wa mwisho wa pochi unaenda zaidi ya data iliyopunguzwa

Hii inaweza kutokea ikiwa unatumia FastSync au kuingiza blockchain iliyosawazishwa tayari. Inamaanisha kuwa pochi ya Bitcoin Core inahitaji kuondolewa kwa sababu iliundwa kabla ya utxoset, pengine kwa sababu BTCPay Server ilianza bila utxoset kwenye buti ya kwanza. Ili kuthibitisha kesi hii, [angalia kumbukumbu ya bitcoind](../Troubleshooting.md#21-btcpay-logs) kwa hii:

```bash
Error: Prune: last wallet synchronisation goes beyond pruned data. You need to -reindex (download the whole blockchain again in case of pruned node)
```

Ikiwa unaona hitilafu hii na unakubali kuondoa pochi ili kumaliza usawazishaji, tumia `docker volume rm generated_bitcoin_wallet_datadir` baada ya kuendesha `btcpay-down.sh` na kabla ya kuendesha `btcpay-up.sh`
ONYO: Usifute pochi hii ikiwa una fedha zozote ndani yake.

## Ninaendesha nodi kamili na nina blockchain iliyosawazishwa, je, BTCPay inaweza kuitumia ili isilazimike kufanya usawazishaji kamili?

Ndiyo unaweza! Hata hivyo, kabla ya kufanya hivyo, utataka kusimamisha bitcoind isisasishie kiasi cha Docker kwa ajili yake, kwani kazi hiyo itachukuliwa na BTCPay Server.

Ikiwa unataka kuendesha BTCPay Server ndani ya docker-compose, na kwamba una saraka ya data (`.bitcoin`) ya nodi iliyosawazishwa kikamilifu kwenye seva pangishi yako ya Docker, basi unaweza kuitumia tena kwa urahisi kwa BTCPay Server.

Ili kufanya hivyo, fuata hatua zifuatazo:

- Fanya usanidi wa kawaida kulingana na [maagizo haya](https://docs.btcpayserver.org/Docker/). Kumbuka kigezo cha mazingira cha `opt-save-storage`, ambacho kinatumika kuwasha viwango mbalimbali vya upunguzaji. Ikiwa hutaki kupunguza saraka yako iliyopo ya data, basi acha mstari ufuatao katika usambazaji wako wa Docker wa BTCPay: `export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage-s"`.
- Mara `btcpay-setup.sh` inapokwisha, zima docker compose kwa `btcpay-down.sh`.
- Ingia kama mtumiaji mkuu kwa `sudo su -`.
- Fungua kiasi cha Docker kwa bitcoind: `cd /var/lib/docker/volumes/generated_bitcoin_datadir/`, na angalia yaliyomo kwa `ls -la`. Unapaswa kuona saraka moja tu inayoitwa `_data`.
- Sasa ondoa saraka ya `_data`: `rm -r _data`. Ikiwa kwa sababu yoyote unataka kuweka saraka hii na yaliyomo yake, unaweza pia kuibadilisha jina badala yake: `mv _data/ _data.old/`
- Sasa unda [kiungo cha mfano](https://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/) kati ya `/var/lib/docker/volumes/generated_bitcoin_datadir/_data` na saraka yako ya data (`.bitcoin`) kwenye seva pangishi yako: `ln -s path/to/.bitcoin /var/lib/docker/volumes/generated_bitcoin_datadir/_data`
- Angalia kuwa kiungo kimefanyika kwa `ls -la`
- Anzisha docker-compose yako tena kwa `btcpay-up.sh`

BTCPay Server yako sasa inapaswa kusawazishwa kikamilifu.

Ikiwa baada ya hii BTCPay Server inaendelea kuonyesha kuwa nodi yako inaanza kila wakati, angalia sababu ya [BTCPay Server inaendelea kuonyesha kuwa nodi yangu inaanza kila wakati](#btcpay-server-keeps-showing-that-my-node-is-always-starting).

## Jinsi ya kuwasha upunguzaji wa nodi ya Bitcoin?

Hii itapunguza nodi yako kamili ya Bitcoin hadi kiwango cha juu cha 100GB (ya bloku):

```bash
sudo su -
cd btcpayserver-docker
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="opt-save-storage"
. ./btcpay-setup.sh -i
```

Chaguo zingine za upunguzaji [zimeandikwa hapa](https://docs.btcpayserver.org/Docker/#generated-docker-compose). Tazama [mfano huu](./Deployment.md#how-can-i-modify-or-deactivate-environment-variables) kwa matumizi na vipande vingine vya ziada.

## Jinsi ya kuzima upunguzaji wa nodi ya Bitcoin?

Ili kuzima upunguzaji wa nodi yako ya Bitcoin katika BTCPay, kwanza hakikisha una kumbukumbu ya kutosha kuhifadhi blockchain nzima na BTCPayServer kwenye mfumo wako. Kisha zima kigezo cha mazingira cha `opt-save-storage`. Tazama [mfano huu](./Deployment.md#how-can-i-modify-or-deactivate-environment-variables) kuona orodha yako ya vipande na uchague moja tu kwa kuondolewa. Mfano ufuatao utaondoa vipande **vyote** vya ziada:

```bash
export BTCPAYGEN_ADDITIONAL_FRAGMENTS=""
. ./btcpay-setup.sh -i
```

Kisha endesha amri zifuatazo kuunda upya nodi ya Bitcoin isiyopunguzwa:

```bash
btcpay-down.sh
# Delete 'blocks' and 'chainstate' folders
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/blocks
rm -rf /var/lib/docker/volumes/generated_bitcoin_datadir/_data/chainstate
btcpay-up.sh
```
