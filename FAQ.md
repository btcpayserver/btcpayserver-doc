# FAQ

## Why is my ledger not detected by BTCPay Server?

Ledger integration depends on U2F feature of your browser (supported by chrome) and on the [browser support](https://support.ledgerwallet.com/hc/en-us/articles/115005198565-What-is-the-Browser-support-option-made-for-) mode of your ledger.

If it still does not work after activating the browser support mode, the reverse proxy of the server hosting BTCPay might not support Websocket.
You can see it looking javascript console error of the wallet page.

If you have nginx, make sure that the following is included at the top of `/etc/nginx/conf.d/default.conf`.

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