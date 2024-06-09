# Setting up BTCPay Server for Conference / Event / Local Community

We will be going through the setup we used at Bitcoin Atlantis, Bitcoin Hong Kong and other conferences for a great user experience for attendees and merchants.

For Point of Sale (PoS) device we use the [Bitcoinize](https://bitcoinize.com/) devices with receipt printer (but you can use any other Android based PoS device).

The Lightning Network part will be done by [Blink.sv](https://blink.sv) with the Blink plugin (but you can swap it for any other LN service like Alby, Breez, use our internal LN node or connect to your own LN node).

To allow an even smoother UX for attendees without internet connection or no prior Bitcoin knowledge we show how to setup and issue Bolt Cards and allow users to top-up.

##  Initial setup
- Setup BTCPay Server v1.13.2 or later on a VPS (with public IP)
- Setup a subdomain or use one provided by VPS hosting (e.g. Lunanode)
- Register the admin account and create a first test store
- Do [FastSync](https://docs.btcpayserver.org/Docker/fastsync/) (optional)


**Once the server is up, install these plugins:**
- Blink plugin
- Boldcards plugin

Then restart BTCPay Server (via UI or `docker restart generated_btcpayserver_1` via SSH)

## Setup merchant stores and initialize Bitcoinize devices

### Preparation of Bitcoinize devices
- Make sure Bitcoinize devices battery level is 90%+ (if less, then charge)
- Extension cords / high powered USB hubs are critical when setting up 10+ devices
- Enter the paper roll in the device

## Setup merchant stores

Log into your BTCPay Server instance with your admin account.

***Repeat the following steps for each merchant:***

### 1. Create store
- Top left dropdown -> "**Create store**" button
  - **Name**: e.g. Nakamoto's Pineapple Pizza
  - **Default Currency**: USD, HKD, ... depending on location
  - **Preferred Price Source**: For USD, EUR Kraken is recommended, HKD Coingecko, for more exotic currencies you can try Coingecko or check if there is a local exchange listed in the dropdown
- Click "**Create store**" button
### 2. Setup Lightning Network wallet
Setup the Lightning wallet to be connected to the merchants Blink account, follow the [instructions on Blink docs](https://dev.blink.sv/examples/btcpayserver-plugin#how-to-connect).
(Alternatively in case your merchants want to get paid in local currency you can setup your conference Blink account and distribute funds later on fiat ramps)

### 3. Configure spread and enable sounds
- Click "**Settings**" -> "**Rates**"
- **Add Exchange Rate Spread**: enter `1`, so we have extra room (Blink charges 0.2% for hedging in StableSats USD
- Click "**Save**" button
- Click "**Settings**" -> "**Checkout Appearance**"
- On dropdown "**Select a preset**", select "**In-store**"
- Click "**Save**" button

### 4. Setup Point of Sale (PoS)
- Left sidebar under "Plugins", click on "**Point of Sale**"
- "**App Name**": enter same merchant name as for the store
- Click "**Create**" button
- Now on PoS settings, make sure "**App Name**" and "**Display Title**" are filled out
- "**Choos Point of Sale Style**": select "**Keypad**"
- "**Currency**", select the same currency as your store
- Click on "**Save**" button
- On top right click on "**View**" button and make sure the keypad is shown

### 5. Put PoS link and labels on Bitcoinize device

- Go back to PoS settings in your browser and click on the "**QR-code icon**"
- On your Bitcoinize (or other) device, open the "**Camera**" app
- Scroll to the right until you find "**more**" category -> select "**QR-Code**" // todo: needs clarification/testing
- Now scan the QR-Code shown in your browser (on PoS settings page)
- After scanning open the URL in Chrome browser
- Check that you see the keypad and correct merchant name
- Tap on the 3 dots "**...**" on the top right and select "**Add to home**"
- Place the icon on the main home screen for easy access
- Label the device and box with stickers bearing the merchant name

***Testing the PoS device payments and give permissions:***
- Start the PoS page from the home screen
- Ensure that the sound on the device is turned up so that there is audio feedback on payment, especially if Bolt Cards are used
- Enter 0.01 USD (or other currency equivalent) and tap on "**Charge**" button
- Click on "**Pay by NFC**" button and then give it the requested permission // todo: click on button still needed?
- Pay the invoice either with a Bolt Card or Lightning wallet
- Ensure you hear the sound after the payment
- Tap on "**View receipt**" button, test printing the receipt by selecting the **POSPrinter** from the dropdown, tap on the "**Print**" button

### 6. Give merchants access to the payment history (optional)

Optionally you can also create a login for each store/merchant on the PoS device so they can access the payment history. This is helpful to double check what was the last payment or if a payment was already done. You  can do so by adding a "Merchant" role with the following permissions:
- btcpay.store.canmodifyinvoices
- btcpay.store.canviewstoresettings
- btcpay.store.canviewpaymentrequestes
- btcpay.store.canarchivepullpayments
- btcpay.store.cancreatenonapprovedpullpayments

After that create a user for each store and assign them to the right store.

// todo: write and add link on how to add roles and assign users to a store, should be link to docs.btcpayserver.org

## Setup a Bolt Cards provider

We will create a separate store that is serving as a Bolt Cards provider. To find it easier in the list of stores you can append the store name with a "z", e.g. "z - Bolt Cards Provider".

For this special store we will connect a Blink account with the important differences compared to merchant Blink accounts:
- the API key has to have also "write" permission, otherwise Bolt Cards won't be able to pull the funds
- make sure you connect the **Bitcoin wallet** (and *not* StableSats USD)

### 1. Create a store
- Create a store with the name "**z - Bolt Cards Provider**" (same steps as shown for merchant stores above)

### 2. Setup Lightning Network wallet

Setup the Lightning wallet to be connected to your Blink account as per [instructions on Blink docs](https://dev.blink.sv/examples/btcpayserver-plugin#how-to-connect) but make sure:
- the API key has "Read", "Receive" and "Write" permissions, otherwise Bolt Cards won't be able to pull the funds
- make sure you connect to the **Bitcoin wallet** (and *not* StableSats USD)

### 3. Setup automated payouts

To allow no-interaction top ups of Bolt Cards we need to make sure payouts are processing automatically.

- Go "**Settings**" -> "**Payout Processors**"
- Below "**Automated Lightning Sender**", click on "**Configure**"
- Enable "**Process approved payouts instantly"
- Click on "**Save**" button

### 4. Setup Bolt Cards Factory

#### Setup a Boldcard factory

- On the left sidebar go to "**Boldcard Factories**"
- "**App Name**": Enter a name like "Your conference" (it will be displayed when the card is read) // todo: clarify see below the same?
- Click on "**Create**" button, you will see the following settings, e.g. if you want to preload the card with 210 Sats
  - "**Name**": Name of the conference/event that is displayed when a Bolt Card is read
  - "**Amount**": 210
  - "**Currency**": SATS
  - "**Automatically approve claims**": checked (true)
  - "**Payment Methods**": "BTC (Off-Chain)" checked (true)
  -  Click on "**Save**" button

#### Program Bolt Cards

Still on that Boldcards Factory settings page, you now click on "**View**" button on the top right, the page that opens will be needed to be opened on a mobile device with NFC writing support (e.g. a Bitcoinize device).

- Ensure that you have the [Bolt Card NFC Card Creator](https://play.google.com/store/apps/details?id=com.lightningnfcapp&hl=en&gl=US) installed on the mobile device
- If there is a Bolt Card NFC Card Creator app already installed - ***make sure it's the latest version***, optionally uninstall and install the newest version from the app store
- When you click on the "**Setup**" button on the Boltcard Factory it should open the Bolt Card NFC Card Creator app
- Make sure you hold the Bolt Card ***until ALL green checkmarks are done**
- You can now batch initialize cards. Just click on the "**Write again**" button

### 5. Checking the balance of cards and topping them up

In the same store that serves as the Bolt Card provider you will have a "**Boldcard Balance**" menu item on the left sidebar. The url will look like this https://btcpay.yourdomain.tld/boltcards/balance

When you open that link on a mobile device with NFC support (such as Bitcoinize), you can use it to allow users to check their balance and also for topping their cards up with Sats, to do that, tap on the "**QR-Code icon**" after reading the balance of the card.

### 6. Resetting Bolt Cards after the conference/event

Like the balance page, you can find the link on the left sidebar. The URL will look like this https://btcpay.yourdomain.tld/boltcards/balance=?view=Reset

You should consider publishing this link during or even prior the event and allow attendees to sweep and reset their cards after the event, so they can reuse the Bolt Cards and reprogram them. This is only possible after the reset was done successfully.

To reset Bolt Cards, like for setting them up, you need the Bolt Card NFC Card Creator app.

See [this tweet by Uncle Rockstar Dev](https://x.com/r0ckstardev/status/1767618114139639817) how the instructions could look like.

Congratulations, you have now set up a BTCPay Server for a conference or event with a smooth user experience for attendees and merchants. Enjoy the event!
