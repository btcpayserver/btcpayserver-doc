# Forward ports with a reverse SSH tunnel

## Advantages: 
* no port forwarding needed on the LAN of the host
* encrypted connection
* hides the IP of the host

## Requirements:
* a Virtual Private Server (VPS) - eg. a minimal package on Lunanode for ~3.5$/month
* root access on the VPS - only root can forward ports under no. 1000
* ssh access to the host computer (where the ports will be forwarded from)

## On the host computer 

* Check for an ssh public key:  
`$ cat ./.ssh/*.pub`

* if there is none generate one (keep pressing ENTER):  
`$ ssh-keygen -t rsa -b 4096`

* copy the ssh public key over to the VPS (fill in the VPS_IP_ADDRESS).  
Will be prompted for the root password of the VPS.  
`$ cat ~/.ssh/id_rsa.pub | ssh root@VPS_IP_ADDRESS 'cat >> ~/.ssh/authorized_keys && chmod -R 700 ~/.ssh/'`

## Working on the VPS

* login as root or run:  
`sudo su -`

* edit the sshd config:  
`sudo nano /etc/ssh/sshd_config`

* make sure these entries are active (uncommented, meaning there is no `#` at the beggining of the line).  
Can just paste these on the end of the file:
    ```
    RSAAuthentication yes
    PubkeyAuthentication yes
    GatewayPorts yes
    AllowTcpForwarding yes
    ClientAliveInterval 60
    ```
    CTRL+O, ENTER to save, CTRL+X to exit.
 
* restart the sshd service (WARNING: you can lose access at this point if the config is wrong):  
`sudo systemctl restart sshd`

## Back to the host computer

### Set up a systemd service

* create the service file:   
`sudo nano /etc/systemd/system/autossh-tunnel.service`

* Paste the following and fill in the VPS_IP_ADDRESS.  
Add or remove ports as required.

    ```
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
* Enable and start the service:  
`$ sudo systemctl enable autossh-tunnel`  
`$ sudo systemctl start autossh-tunnel`

* The port forwarding with a reverse ssh-tunnel is now complete. 
You should be able access the ports/services of the host computer through the IP of the VPS.

## Monitoring

* Check if there are any errors on the host computer:  
`$ sudo journalctl -f -n 20  -u autossh-tunnel`

* To check if tunnel is active on the VPS:  
`$ netstat -tulpn`

## Resources

https://github.com/rootzoll/raspiblitz/blob/master/FAQ.md#how-to-setup-port-forwarding-with-a-ssh-tunnel

https://stadicus.github.io/RaspiBolt/raspibolt_21_security.html#login-with-ssh-keys
