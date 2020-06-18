const slugify = require('./slugify')

describe('slugify', () => {
  describe('generates slugs equal to those on GitHub', () => {
    test.each([
      [`How I can prune my node(s)?`, 'how-i-can-prune-my-nodes'],
      [`Connecting Wasabi to BTCPay Server Full Node (If you're self-hosting BTCPay)`, 'connecting-wasabi-to-btcpay-server-full-node-if-youre-self-hosting-btcpay'],
      [`I deployed before btcpay-setup.sh existed (before May 17, 2018), can I migrate to this new system?`, 'i-deployed-before-btcpay-setupsh-existed-before-may-17-2018-can-i-migrate-to-this-new-system'],
      [`Start accepting Bitcoin today with BTCPay Server! This guide will walk you through the installation.`, 'start-accepting-bitcoin-today-with-btcpay-server-this-guide-will-walk-you-through-the-installation'],
      [`Cause 2: btcpayserver or letsencrypt-nginx-proxy is not running`, 'cause-2-btcpayserver-or-letsencrypt-nginx-proxy-is-not-running'],
      [`Cause 4: Getting 500 nginx error on a local server https and for http BTCPay is expecting you to access this website from`, 'cause-4-getting-500-nginx-error-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from'],
      [`How to manually install BTCPay on Ubuntu 18.04?`, 'how-to-manually-install-btcpay-on-ubuntu-1804'],
      [`2.1 Self-hosted BTCPay`, '21-self-hosted-btcpay'],
      [`(3) Wallet Setup`, '3-wallet-setup'],
      [`1. Custom themes`, '1-custom-themes'],
      [`👍 Check Tor and LND`, '-check-tor-and-lnd'],
      [`That's it! Enjoy your BTCPi! 🎉`, 'thats-it-enjoy-your-btcpi-'],
      [`1. Download the latest binaries from a trusted source such as https://bitcoincore.org/en/download/`, '1-download-the-latest-binaries-from-a-trusted-source-such-as-httpsbitcoincoreorgendownload']
    ])('%s -> %s', (string, result) => expect(slugify(string)).toEqual(result))
  })
})
