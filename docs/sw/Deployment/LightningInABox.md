# Usambazaji kwa Vifaa

Ili uzoefu wako wa Bitcoin uwe wa kujitawala kikamilifu na bila uaminifu, unapaswa kuzingatia **kuendesha nodi kwenye vifaa vyako mwenyewe** na muunganisho wako wa mtandao.
**BTCPay Server ni njia bora ya kuendesha nodi zote mbili za Bitcoin na Lightning**.
Sio tu unathibitisha miamala, pia unapata uwezo wa kupokea malipo ya Bitcoin ya safu ya msingi na malipo ya Lightning ya safu ya pili.
Ifuatayo ni maelekezo ya kusakinisha na kupangisha seva yako mwenyewe ya BTCPay Server.

Mchakato kimsingi ni ufuatao:

1. Nunua na kusanya vifaa.
2. Sakinisha Mfumo wa Uendeshaji wa msingi na sanidi mtandao.
3. Sakinisha BTCPayServer-Docker.

**BTCPay Server inaweza kusakinishwa kwenye vifaa vifuatavyo**. Matokeo ya mwisho ni nodi ndogo, tulivu ambayo ina kasi ya kutosha kusawazisha kutoka block sifuri. Gharama ya jumla ni takriban $300.

1. [BeeLink S12 - Mini PC - $169.00](https://www.amazon.com/dp/B0C89TQ1YF?ref=nb_sb_ss_w_as-reorder-t1_k0_1_4&amp=&crid=SHKYOXZIRAO0&amp=&sprefix=beel)
3. [WD Blue 2TB SSD - $129.00](https://www.amazon.com/Western-Digital-SA510-Internal-Solid/dp/B0C14TF467/ref=sr_1_3?crid=2WDY52E7ESSEB&dib=eyJ2IjoiMSJ9.MBxkb5ZIvwjKXOzscB0GUvsbhX1rVhilXNFzID6n0xHORsDBPkIxQhIixVuiLY9I16rlFs5COExAAD8761Do-tzuAnZiutbqN-KM9rAL4zCw94kA_ArCJeR_RTDynZbiXf2Phnahw1Gw2dqXVek3p0dpe6_a_fbJrqx4BRaieoYo0zj1mX6YPGaYZAmF2Vf_Quk1TrkARk6s1_wZ0vFUw7EWdjKJ9hmNLxPWMfADML90A1rXk8gSCcRnwV2jdzN7jCfg2_urfJZ3IWOW5X3iwnP7s-vSec88PGmQ3RhS-Rc.sEURveFhiTAHYwZQdwyJX72hpWL5UgD_3tEPet747oE&dib_tag=se&keywords=2tb+ssd+wd+blue&qid=1710685725&s=electronics&sprefix=2tb+ssd+wd+blue%2Celectronics%2C90&sr=1-3)

Mahitaji mengine ni kama ifuatavyo:

1. Muunganisho wa mtandao wa kasi ya juu.
2. IP ya Kudumu
3. Jina la Kikoa
4. Uwezo wa kufungua bandari kwenye kipanga njia chako (si lazima, BTCPayServer inaweza kufikiwa kupitia TOR au kwa Dynamic DNS).
5. Bisibisi Ndogo
6. USB Thumb Drive
7. Kibodi ya USB, Kipanya na Kifuatilizi (kwa usakinishaji wa awali tu). Inaweza kuwa bila kichwa inapokamilika.

Kwa kudhani umenunua vifaa vilivyotajwa hapo juu, haya ni maelekezo ya ujenzi.

### Sanidi jina lako la kikoa.
Inaweza kuchukua saa kadhaa kwa mabadiliko ya DNS kuenea kwa hivyo unapaswa kufanya hatua hii kwanza.
Ingia kwenye msajili wako wa kikoa na elekeza rekodi ya A kutoka kikoa chako hadi anwani ya IP ya nje ya muunganisho wako wa mtandao.
Ninashauri utumie kikoa kidogo (mfano. btcpay.yourdomain.com).
Ili kupata anwani yako ya IP ya nje, tafuta Google "whats my ip".

### Kusanya Lightning in a Box yako (LIAB).
- Ondoa kifuniko cha nyuma kwa bisibisi.
- Ingiza SSD
- Sakinisha diski kuu kwa kutumia kizimba kilichojumuishwa.

### Pakua [Ubuntu 22.04 LTS Server](https://releases.ubuntu.com/jammy/ubuntu-22.04.4-live-server-amd64.iso)

### Pakua na usakinishe [Balena Etcher](https://etcher.balena.io/).
Etcher ni programu inayotumika kuandika picha za OS kwenye kadi za SD na Viendeshi vya USB.
Katika kesi hii tutakuwa tunatumia Etcher kuandika USB Thumb Drive yetu na OS ya Ubuntu.

### Unganisha kibodi yako ya USB, kipanya, kifuatilizi na thumb drive.
Bonyeza kitufe cha nguvu ili kuwasha LIAB yako. Bonyeza kitufe cha "DEL" ili kufikia bios na ubadilishe utaratibu wa kuwasha ili kutumia thumb drive kwanza.
Mchakato wa usakinishaji wa Ubuntu ni rahisi sana na ni rahisi kufuata. Hapa kuna mafunzo kutoka kwenye tovuti ya Ubuntu. [Install Ubuntu Server](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview). BeeLink S12 inakuja na Windows iliyosakinishwa awali kwa hivyo utahitaji kufuta vigae vya NVME na kusakinisha Ubuntu kwenye diski hiyo.

*Wakati wa mchakato wa usakinishaji hakikisha unaweka jina la mwenyeji kuwa "btcpay" na kuwezesha SSH.

### Ipe LIAB yako anwani ya IP ya kudumu kwenye mtandao wako wa ndani.
Kuna njia chache tofauti za kufanya hivi na utapata makala nyingi mtandaoni. Hapa kuna moja rahisi kufuata [How to configure a static IP address on Ubuntu 22.04](https://www.linuxtechi.com/static-ip-address-on-ubuntu-server/). Ili kuepuka migongano na vifaa vingine kwenye mtandao wako, unapaswa pia kuweka "uhifadhi" kwa LIAB yako.

### Ingia kwenye kipanga njia chako na elekeza bandari 80, 443 na 9735 hadi anwani ya IP ya ndani ya LIAB yako. (si lazima, ikiwa unatumia .local, au Tor pekee)
Kila kipanga njia ni tofauti na unapaswa kuwa na uwezo wa kupata maelekezo ya kipanga njia chako kwa kutafuta "Port Forward + aina na mfano wa kipanga njia chako".

### Sakinisha Fail2ban, GIT na Avahi-Daemon.
- [Fail2ban](https://github.com/fail2ban/fail2ban/wiki/How-to-install-fail2ban-packages) inapiga marufuku IP zinazojaribu kuunganisha kwenye seva yako na kuonyesha ishara za kuharibu. GIT inakuruhusu kunakili na kusimamia hazina kwenye github.com.
- [Avahi](https://avahi.org/) ni mfumo unaowezesha ugunduzi wa huduma kwenye mtandao wa ndani kupitia mfumo wa itifaki za mDNS/DNS-SD.
Fungua dirisha jipya la terminal na andika amri zifuatazo:

```bash
sudo apt update
sudo apt install -y fail2ban git avahi-daemon
```

### Kusanidi firewall

Sakinisha firewall na ruhusu SSH, HTTP, HTTPS, Bitcoin, na Lightning:

```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
```

Amri hii inaruhusu miunganisho ya SSH kutoka kwenye mitandao ya ndani pekee:

```bash
ufw allow from 10.0.0.0/8 to any port 22 proto tcp
ufw allow from 172.16.0.0/12 to any port 22 proto tcp
ufw allow from 192.168.0.0/16 to any port 22 proto tcp
ufw allow from 169.254.0.0/16 to any port 22 proto tcp
ufw allow from fc00::/7 to any port 22 proto tcp
ufw allow from fe80::/10 to any port 22 proto tcp
ufw allow from ff00::/8 to any port 22 proto tcp
```

Bandari hizi zinahitaji kufikiwa kutoka popote (Subnet ya msingi ni 'any' isipokuwa utabainisha moja):

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8333/tcp
ufw allow 9735/tcp

# Wezesha firewall
ufw enable

# Thibitisha usanidi
ufw status
```

### Sakinisha Docker
```Bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

### Kusanidi hifadhi
```bash
fdisk /dev/sda
# andika 'p' kuorodhesha vigae vilivyopo
# andika 'd' kufuta vigae vilivyochaguliwa kwa sasa
# andika 'n' kuunda kigae kipya
# andika 'w' kuandika jedwali jipya la kigae na kutoka fdisk
mkfs.ext4 /dev/sda1
mkdir /mnt/usb
UUID="$(sudo blkid -s UUID -o value /dev/sda1)"
echo "UUID=$UUID /mnt/usb ext4 defaults,noatime,nofail 0 0" | sudo tee -a /etc/fstab
mount -a
```

### Unda mahali pa kupachika kwa viwango vya Docker

```bash
rm -rf /var/lib/docker
mkdir -p /var/lib/docker
mount --bind /mnt/usb /var/lib/docker
echo "/mnt/docker /var/lib/docker none bind,nobootwait 0 2" >> /etc/fstab
systemctl restart docker
```

### Sanidi BTCPay Server

Pakua BTCPay Server kutoka GitHub:

```bash
cd # hakikisha tuko kwenye nyumba ya mizizi
apt install -y fail2ban git
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

Sanidi BTCPay kwa kuweka baadhi ya [vigezo vya mazingira](https://github.com/btcpayserver/btcpayserver-docker#environment-variables):

```bash
export BTCPAY_HOST="btcpay.local"
export REVERSEPROXY_DEFAULT_HOST="$BTCPAY_HOST"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_LIGHTNING="clightning"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAY_ENABLE_SSH=true
```

Ikiwa unataka kutumia majina ya mwenyeji mengi, yaongeze kupitia kigezo cha hiari cha `BTCPAY_ADDITIONAL_HOSTS`:

```bash
export BTCPAY_ADDITIONAL_HOSTS="btcpay.YourDomain.com"
```

Iwapo unataka kuzuia ufikiaji kwenye mtandao wako wa ndani pekee, tafadhali kumbuka kuwa unahitaji kutumia kikoa cha `.local`.

Endesha usakinishaji wa BTCPay:

```bash
. ./btcpay-setup.sh -i
```

Inapaswa kuwa tayari na kufanya kazi ndani ya dakika chache. Jaribu kufungua http://btcpay.local kwenye kivinjari chako cha wavuti. Ikiwa kila kitu ni sahihi, utaona ukurasa wa mbele wa BTCPay Server.

Sasa, unahitaji tu kusubiri siku moja au zaidi kwa blockchain ya Bitcoin [kusawazisha na kuthibitisha kikamilifu](../FAQ/Synchronization.md). Chini ya kiolesura cha mtumiaji cha wavuti cha BTCPay Server kitaonyesha kisanduku cha mazungumzo ibukizi kufuatilia maendeleo.

### FastSync (hiari)

Tafadhali soma kwa uangalifu sana kuelewa [FastSync](/Docker/fastsync.md) ni nini na kwa nini ni muhimu kuthibitisha seti ya UTXO mwenyewe.

Kwa kutumia FastSync, unajiweka wazi kwa mashambulizi ikiwa [picha mbovu ya seti ya UTXO](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#what-are-the-downsides-of-fast-sync) itatumwa kwako.
Ikiwa una nodi nyingine inayoaminika mahali pengine, unaweza kuangalia uhalali wa seti ya UTXO iliyokusanywa na FastSync kwa kufuata [maelekezo haya](https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/README.md#dont-trust-verify).

```bash
# Simamisha BTCPay Server
cd /root/btcpayserver/btcpayserver-docker
./btcpay-down.sh

# Ingiza seti ya UTXO ya FastSync
cd contrib/FastSync
./load-utxo-set.sh
```

FastSync kwa sasa inachukua takriban dakika 30 kwenye muunganisho wa mtandao wa kasi ya juu.
Baada ya FastSync kumaliza, endesha amri ifuatayo kuanzisha upya BTCPay Server:

```bash
cd ../..
./btcpay-up.sh
```
