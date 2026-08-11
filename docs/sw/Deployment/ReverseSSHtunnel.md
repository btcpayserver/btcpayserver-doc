# Elekeza bandari kwa njia ya siri ya SSH ya nyuma

## Faida

- hakuna haja ya kuelekeza bandari kwenye LAN ya mwenyeji
- muunganisho uliosimbwa kwa njia fiche
- huficha IP ya mwenyeji

## Mahitaji

- Seva ya Kibinafsi ya Mtandaoni (VPS) - mfano. kifurushi cha msingi kwenye Lunanode kwa ~$3.5/mwezi
- ufikiaji wa mizizi kwenye VPS - mizizi pekee inayoweza kuelekeza bandari chini ya nambari 1000
- ufikiaji wa ssh kwenye kompyuta mwenyeji (ambapo bandari zitaelekezwa kutoka)

## Usanidi

### Kwenye mwenyeji (mfano wako wa BTCPay Server)

```bash
# badilisha hadi mtumiaji wa mizizi (ikiwa haujaingia kama mizizi)
sudo su -

# angalia ufunguo uliopo wa umma wa ssh
cat ~/.ssh/*.pub
```

Ikiwa hakuna, zalisha moja (endelea kubonyeza ENTER):

```bash
ssh-keygen -t rsa -b 4096
```

Hii itazalisha jozi ya funguo za SSH `id_rsa` (ufunguo wa siri) na `id_rsa.pub` ndani ya `~/.ssh`.

Ufunguo wa siri unahitaji kuongezwa kwenye ssh-agent:

```bash
# anzisha ssh-agent chinichini
eval $(ssh-agent -s)

# ongeza ufunguo wa siri kwenye ssh-agent
ssh-add ~/.ssh/id_rsa
```

Nakili ufunguo wa umma kwenda kwenye VPS (weka `VPS_IP_ADDRESS`).
Utaulizwa nenosiri la mizizi la VPS.

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@VPS_IP_ADDRESS
```

Ili kuthibitisha kuwa inafanya kazi, SSH kwenye VPS – hii haipaswi kuuliza nenosiri tena:

```bash
ssh root@VPS_IP_ADDRESS
```

### Kwenye VPS

Unaweza kutumia tena muunganisho wa awali au ingia kama mizizi.

Hariri usanidi wa sshd:

```bash
sudo nano /etc/ssh/sshd_config
```

Hakikisha maingizo haya yanafanya kazi (kumaanisha hakuna `#` mwanzoni mwa mstari).
Vinginevyo, unaweza kubandika haya mwishoni mwa faili:

```
RSAAuthentication yes     # haihitajiki kwenye matoleo ya hivi karibuni ya OpenSSH
PubkeyAuthentication yes
GatewayPorts yes
AllowTcpForwarding yes
ClientAliveInterval 60
```

CTRL+O, ENTER kuhifadhi, CTRL+X kutoka.

:::warning
Unaweza kupoteza ufikiaji katika hatua hii ikiwa usanidi wa sshd ni mbaya. Tafadhali angalia mara mbili!
:::

Anzisha upya huduma ya sshd:

```bash
sudo systemctl restart sshd
```

### Rudi kwenye mwenyeji (mfano wako wa BTCPay Server)

#### Sakinisha na sanidi autossh

Sakinisha kitegemezi cha `autossh`:

```bash
sudo apt-get install autossh
```

Unda faili ya huduma:

```bash
sudo nano /etc/systemd/system/autossh-tunnel.service
```

Bandika yafuatayo na weka `VPS_IP_ADDRESS`.
Ongeza au ondoa bandari kama inavyohitajika.

```ini
[Unit]
Description=AutoSSH tunnel service
After=network.target

[Service]
User=root
Group=root
Environment="AUTOSSH_GATETIME=0"
ExecStart=/usr/bin/autossh -C -M 0 -v -N -o "ServerAliveInterval=60" -R 9735:localhost:9735 -R 443:localhost:443 -R 80:localhost:80 root@VPS_IP_ADDRESS
StandardOutput=journal

[Install]
WantedBy=multi-user.target
```

Wezesha na anzisha huduma:

```bash
sudo systemctl enable autossh-tunnel
sudo systemctl start autossh-tunnel
```

Uelekezaji wa bandari kwa njia ya siri ya ssh ya nyuma sasa umekamilika.
Unapaswa kuwa na uwezo wa kufikia bandari/huduma za kompyuta mwenyeji kupitia IP ya VPS.

## Ufuatiliaji

Angalia ikiwa kuna makosa yoyote kwenye kompyuta mwenyeji:

```bash
sudo journalctl -f -n 20 -u autossh-tunnel
```

Ili kuangalia ikiwa njia ya siri inafanya kazi kwenye VPS:

```bash
netstat -tulpn
```

## Rasilimali

- Raspiblitz FAQ: [How to setup port-forwarding with a SSH tunnel?](https://github.com/rootzoll/raspiblitz/blob/master/FAQ.md#how-to-setup-port-forwarding-with-a-ssh-tunnel)
- RaspiBolt Docs: [Login with SSH keys](https://raspibolt.org/guide/raspberry-pi/security.html#login-with-ssh-keys)
