# Translate BTCPay Server

## Want to contribute to BTCPay by translating it to another language? 

BTCPay uses a translation platform called Transifex to allow users to add a new language translation or modify an existing one. We are currently working on translating the BTCPay checkout page. After a translation has been made on Transifex, the submittal process is automated and merged periodically into the BTCPay git repository.

If you have any questions about translating, join the [#Translations channel](https://chat.btcpayserver.org/btcpayserver/channels/translations) on Mattermost.

 ## To make a translation contribution, follow these steps:

  * Visit: [BTCPay's Transifex page](https://www.transifex.com/btcpayserver/btcpayserver/)
  * Step 1: View Completed Translations
  * Step 2: Find Your Language-Country Code
  * Step 3: New Language Translation
  * Translation Tips
  * View:  [Checkout Page](https://store.demo.btcpayserver.org/) For Reference

----

## Step 1: View Completed Translations

First verify if the language translation you would like to complete has been started already. If it has already been started, you can complete the remaining strings. If you don't see the language you are looking for, make a request to add it to the project and to be a translator for it.

## Step 2: Find Your Language-Country Code

You will need to know your language-country code. You can look them up [here](https://wiki.openstreetmap.org/wiki/Nominatim/Country_Codes). It is also displayed on Transifex in the title of your language that you have chosen to translate, like this:

    Examples for Portuguese:
     Portuguese (Brazil)(pt_BR)
     Portuguese (Portugal)(pt_PT)
     
## Step 3: New Language Translation

Line 1: Translate your Country-Code.

    Example for Brazilian Portuguese
     'en' translates to 'pt-BR'

Line 2: The name of your language, in your language.
    
    Example for French
     'English' translates to 'Français'

----

## Translation Tips

### **Variables**
    {{Words}} like this will be replaced by a variable depending on user choices.
    {{btcDue}} Example: 10
    {{cryptoCode}} Example: BTC

They should not be translated, but they need to remain in the correct place in your translated string because their placement will vary by language.

    French Example:
     "Return to StoreName" translates to "Retourner sur {{storeName}}"

    Japanese Example:
     "Return to StoreName" translates to "{{storeName}} に戻る"

----

## View Checkout Page For Reference

Need context for a string?

Visit the BTCPay Server demo store [checkout page](https://store.demo.btcpayserver.org/). 

