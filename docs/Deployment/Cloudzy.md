# Deploying BTCPay Server on Cloudzy

This article explains how to deploy **BTCPay Server through the Cloudzy Marketplace**. [Cloudzy](https://cloudzy.com/marketplace/btcpay-server/?utm_source=btcpayserver&utm_medium=deployment-guide) offers a one-click BTCPay Server deployment, allowing you to launch BTCPay Server on a VPS without manually configuring the server from scratch.

This deployment method is recommended if you want a straightforward setup process through a hosting provider marketplace. Before you begin, make sure you have:

* A Cloudzy account
* A domain or subdomain
* Access to your domain’s DNS settings
* An SSH client, such as Terminal, Windows PowerShell, PuTTY, or another preferred tool

Cloudzy recommends using a VPS plan with at least **4 GB of RAM** for BTCPay Server.

The video below walks through the process of deploying BTCPay Server on Cloudzy.

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

## 1. Create or log in to your Cloudzy account

Go to the BTCPay Server page on Cloudzy:

[https://cloudzy.com/marketplace/btcpay-server/](https://cloudzy.com/marketplace/btcpay-server/?utm_source=btcpayserver&utm_medium=deployment-guide)

Create a new account, or log in if you already have one.

## 2. Deploy BTCPay Server

1. Click **Deploy**.
2. Choose your preferred VPS plan.
3. In the **Application** tab, select **BTCPay Server**.
4. Give your server a name.
5. Click **Deploy**.

## 3. Enter your domain or subdomain

Enter the domain or subdomain you want to use for your BTCPay Server instance.

For example, you can use:

```text
example.com
```

Or a subdomain such as:

```text
pay.example.com
```

Using a subdomain is often recommended if your main website is already hosted somewhere else.

The server should be ready within a minute or two.

## 4. Configure your domain DNS

After deployment, save your server IP address and password somewhere safe.

Next, go to your domain’s DNS settings and create or update an **A record** that points your domain or subdomain to the IP address provided by Cloudzy.

For example, if you want to use `pay.example.com`, create an A record like this:

```text
Type: A
Name: pay
Value: <your Cloudzy server IP>
```

If you want to use your root domain, such as `example.com`, create or update the root A record:

```text
Type: A
Name: @
Value: <your Cloudzy server IP>
```

DNS changes may take some time to propagate, depending on your domain provider.

## 5. Optional: Configure a CDN or proxy

If you use a CDN or DNS proxy service, you can point your domain or subdomain to the Cloudzy VPS from your CDN provider’s DNS panel.

For example, if you want BTCPay Server to be available at:

```text
pay.example.com
```

Your CDN or DNS provider should have an A record pointing that subdomain to your Cloudzy server IP:

```text
Type: A
Name: pay
Value: <your Cloudzy server IP>
```

If your CDN provides proxying, SSL, caching, or security features, keep the following in mind:

* Make sure the CDN points to the same domain or subdomain you entered during deployment.
* Use HTTPS for your BTCPay Server domain.
* Avoid aggressive caching for BTCPay Server pages, checkout pages, admin pages, APIs, and webhook endpoints.
* If SSL certificate generation fails during setup, temporarily disable CDN proxying and use DNS-only mode until the certificate is issued. You can re-enable proxying afterward if your CDN configuration supports it properly.
* If your CDN has SSL/TLS modes, use a mode that supports secure HTTPS between the CDN and your Cloudzy VPS.

The CDN layer is optional. BTCPay Server can also run directly on your Cloudzy VPS with standard DNS records.

## 6. Complete the setup

SSH into your VPS using the credentials provided by Cloudzy.

On your VPS, run the restart command from the Cloudzy guide:

```bash
systemctl restart btcpayserver.service
```

This restarts the BTCPay Server service and applies the domain configuration.

## 7. Access your BTCPay Server

Once the service restarts and your DNS records are pointing correctly, open your domain or subdomain in a browser:

```text
https://<your-domain-or-subdomain>
```

For example:

```text
https://pay.example.com
```

Create an account on your BTCPay Server instance and log in.

Make sure to read the full Cloudzy instructions for more deployment details and troubleshooting steps.
