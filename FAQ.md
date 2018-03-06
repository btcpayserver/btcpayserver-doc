# FAQ

See also [The Merchants Guide to accepting Bitcoin directly with no intermediates through BTCPay](https://www.reddit.com/r/Bitcoin/comments/81h1oy/the_merchants_guide_to_accepting_bitcoin_directly/).

## Why is my ledger not detected by BTCPay Server?

Ledger integration depends on U2F feature of your browser (supported by chrome) and on the [browser support](https://support.ledgerwallet.com/hc/en-us/articles/115005198565-What-is-the-Browser-support-option-made-for-) mode of your ledger.

If it still does not work after activating the browser support mode, the reverse proxy of the BTCPay server hosting BTCPay might not support Websocket.

To confirm this is the issue, create a new invoice and go on its checkout page, you can also go on your store's "Wallet" page.
You should then you will see this error in the javascript console.

```
WebSocket connection to ‘wss://pay.example.com/i/4yhCmpWxJcHfVG3rV4EmEu/status/ws’ failed: Error during WebSocket handshake: Unexpected response code: 404
```

To fix the situation, if your reverse proxy is nginx, make sure that the following is included at the top of `/etc/nginx/conf.d/default.conf`.

```
# If we receive Upgrade, set Connection to "upgrade"; otherwise, delete any
# Connection header that may have been passed to this server
map $http_upgrade $proxy_connection {
  default upgrade;
  '' close;
}
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $proxy_connection;
```

Then restart nginx.

```
/etc/init.d/nginx reload
```

## Does BTCPay Server support crypto to fiat conversion?

No

## Where can I get help/support?

BTCPay is an open-source project. The best way to ask questions is through the Slack group.

## How much does it cost?

If you are using the simplest way to deploy, it costs around 70$ per month.

You have to register with Microsoft Azure server. Upon registration, you'll get 200$ free credits which will be enough for the first few months of for running the server, so basically, there are no upfront costs. Be aware that BTCPay is free; it does not cost a dime, you're paying Microsoft here for the server which will keep your node online 24/7.

After you buy the server, there is a single one-click deploy button you have to click. It will take you to your Azure VM and configure everything for you. There are few things you have to change yourself. ([See this video](https://www.youtube.com/watch?v=Bxs95BdEMHY) for a demonstration)

## Can the cost of running BTCPay be cheaper?

Yes it can. Currently, the one-click deployment requires Azure Virtual Machine, but if you’re a programmer or understand VM’s you can deploy one on a different VM. Furthermore, the changes in the Bitcoin Core 0.16.0 (BIP159) make it possible to run the full node in pruned mode to save more disk space.

Also, once the full node is synchronized to the network, you can downgrade the machine on Azure to take a less expensive one.

Penny-pinching cost is a manual process which involves trial and error.
