# Forward ports with a reverse SSH tunnel

## Advantages

* no port forwarding needed on the LAN of the host
* encrypted connection
* hides the IP of the host

## Requirements

* a Virtual Private Server (VPS) - eg. a minimal package on Lunanode for ~3.5$/month
* root access on the VPS - only root can forward ports under no. 1000
* ssh access to the host computer (where the ports will be forwarded from)

## Setup

### On the host computer

Check for an ssh public key:

```bash
cat ~/.ssh/*.pub
```

If there is none generate one (keep pressing ENTER):

```bash
ssh-keygen -t rsa -b 4096
```

Copy the ssh public key over to the VPS (fill in the `VPS_IP_ADDRESS`).
You will be prompted for the root password of the VPS.

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@VPS_IP_ADDRESS
```

### Working on the VPS

Login as root or run:

```bash
sudo su -
```

Edit the sshd config:

```bash
sudo nano /etc/ssh/sshd_config
```

Make sure these entries are active (meaning there is no `#` at the beggining of the line).
Alternatively, you can just paste these on the end of the file:

```
RSAAuthentication yes
PubkeyAuthentication yes
GatewayPorts yes
AllowTcpForwarding yes
ClientAliveInterval 60
```

CTRL+O, ENTER to save, CTRL+X to exit.

<br>

:::warning
You can lose access at this point if the sshd config is wrong. Please double-check!
:::

Restart the sshd service:

```bash
sudo systemctl restart sshd
```

### Back to the host computer

#### Set up a systemd service

Create the service file:

```bash
sudo nano /etc/systemd/system/autossh-tunnel.service
```

Paste the following and fill in the `VPS_IP_ADDRESS`.
Add or remove ports as required.

```ini
[Unit]
Description=AutoSSH tunnel service
After=network.target

[Service]
User=root
Group=root
Environment="AUTOSSH_GATETIME=0"
ExecStart=/usr/bin/autossh -C -M 0 -v -N -o "ServerAliveInterval=60" -R 9735:localhost:9735 -R 443:localhost:443 -R 80:localhost:80 -R root@VPS_IP_ADDRESS
StandardOutput=journal

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable autossh-tunnel
sudo systemctl start autossh-tunnel
```

The port forwarding with a reverse ssh-tunnel is now complete.
You should be able access the ports/services of the host computer through the IP of the VPS.

## Monitoring

Check if there are any errors on the host computer:

```bash
sudo journalctl -f -n 20  -u autossh-tunnel
```

To check if tunnel is active on the VPS:

```bash
netstat -tulpn
```

## Resources

* Raspiblitz FAQ: [How to setup port-forwarding with a SSH tunnel?](https://github.com/rootzoll/raspiblitz/blob/master/FAQ.md#how-to-setup-port-forwarding-with-a-ssh-tunnel)
* RaspiBolt Docs: [Login with SSH keys](https://stadicus.github.io/RaspiBolt/raspibolt_21_security.html#login-with-ssh-keys)
