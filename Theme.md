# Theming

BTCPay Server is built on Bootstrap and offers the flexibility to adjust its look to your needs.

There are two approaches to customizing the theme of your BTCPay Server.

1. [Developing a custom theme](#1-custom-themes) (requires technical skills)
2. [Using a pre-made Bootstrap theme](#2-bootstrap-themes) (does not require technical skills)

## 1. Custom themes

This is the way we are building our own themes, like the [Classic](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/classic.css) or [Casa](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/casa.css) theme.

With this approach you provide a CSS file containing the variable definitions ([CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)) to adjust colors, fonts, etc.

You should copy one of our [preexisting themes](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/) and change the variables to fit your needs.
To test and play around with the adjustments, you can also use the developer tools of the browser:
Inspect the `<html>` element and modify the variables in the `:root` section of the styles inspector:

![Theme customizations](img/ThemeCustomization.gif)

Once you are done with your modifications, you can upload and reference it in the "Custom theme CSS file" field.

![Theme settings](img/ThemeSettings.png)

### Developing and extending a custom theme

The BTCPay Server user interface is built on a customized version of Bootstrap that supports [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
This allows us to change theme related settings like fonts and colors without affecting the [`bootstrap.css`](#Notes-on-bootstrapcss).
Also we can provide just the relevant customized parts instead of shipping a whole `bootstrap.css` file for each theme.

Take a look at the [predefined themes](../BTCPayServer/wwwroot/main/themes) to get an overview of this approach.

#### Modifying existing themes

The custom property definitions in the `:root` selector are divided into several sections, that can be seen as a cascade:

- The first section contains general definitions (i.e. for custom brand and neutral colors).
- The second section defines variables for specific purposes.
  Here you can map the general definitions or create additional ones.
- The third section contains definitions for specific parts of the page, sections or components.
  Here you should try to reuse definitions from above as much as possible to provide a consistent look and feel.

The variables defined in a theme file get used in the [`site.css`](../BTCPayServer/wwwroot/main/site.css) and [`creative.css`](../BTCPayServer/wwwroot/main/bootstrap4-creativestart/creative.css) files.

##### Overriding Bootstrap selectors

In addition to the variables you can also provide styles by directly adding CSS selectors to this file.
This can be seen as a last resort in case there is no variable for something you want to change or some minor tweaking.

##### Adding theme variables

In general it is a good idea to introduce specific variables for special purposes (like setting the link colors of a specific section).
This allows us to address individual portions of the styles without affecting other parts which might be tight to a general variable.

For cases in which you want to introduce new variables that are used across all themes, add them to the `site.css` file.
This file contains our modifications of the Bootstrap styles.
Refrain from modifying `bootstrap.css` directly – see the [additional notes](#Notes-on-bootstrapcss) for the reasoning behind this.

#### Adding a new theme

You should copy one of our predefined themes and change the variables to fit your needs.

To test and play around with the adjustments, you can also use the developer tools of the browser:
Inspect the `<html>` element and modify the variables in the `:root` section of the styles inspector.

#### Notes on bootstrap.css

The `bootstrap.css` file itself is generated based on what the original vendor `bootstrap.css` provides.

Right now [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/theming/) does not use custom properties, but in the future it is likely that they might switch to this approach as well.
Until then we created a build script [in this repo](https://github.com/dennisreimann/btcpayserver-ui-prototype) which generates the `bootstrap.css` file we are using here.

The general approach should be to not modify the `bootstrap.css`, so that we can keep it easily updatable.
The initial modifications of this file were made in order to allow for this themeing approach.
Because bootstrap has colors spread all over the place we'd otherwise have to override mostly everything, that's why these general modifications are in the main `bootstrap.css` file.

The Bootstrap theme options are another approach of providing customizations, let's look at this next.

## 2. Bootstrap themes

[Bootswatch](https://bootswatch.com/) offers lots of custom theme maintained by the Bootstrap community.

![Bootswatch](img/Bootswatch.png)

Please note that this approach works best when used with the Classic theme described above.

If you want to change this theme, find a theme on [Bootswatch](https://bootswatch.com/) which interest you, for example, [Darkly](https://bootswatch.com/darkly/).

Copy the link of the theme:

![CopyBootswatch](img/CopyBootswatch.png)

Now, go into the settings of your store and paste the link to customize the bootstrap theme:

![ModifyBootstrap](img/ModifyBootstrap.png)

And enjoy a new theme!

![CustomTheme](img/CustomTheme.png)

## Checkout page themes

BTCPay Server checkout page can be customized to fit your branding.

Go to your Store Settings > Checkout Experience, and link to a custom CSS stylesheet. 

Server admins can upload their .css file to [File Storage](FAQ/FAQ-ServerSettings.md#how-to-upload-files-to-btcpay) to create a CSS stylesheet link.

Below are examples of businesses that use custom-made checkout themes.

### [Andreas M. Antonopolous](https://aantonop.com/)

![Aantonop checkout](img/Theme-AantonopShop.png)\
_**Made by:** [@artdesignbySF](https://twitter.com/artdesignbySF) / <artdesignbySF@protonmail.com>_

<a href="Custom-CSS/Aantonop-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Bitcoin Fortune Cookie](https://bitcoinfortunecookie.com/)

![Bitcoin Fortune Cookie checkout](img/Theme-BitcoinFortuneCookie.png)\
_**Made by:** [@artdesignbySF](https://twitter.com/artdesignbySF) / <artdesignbySF@protonmail.com>_

<a href="Custom-CSS/BitcoinFortuneCookie-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Bitma.tk](https://bitma.tk/)

![Bitma.tk checkout](img/Theme-Bitmatk.png)\
_**Made by:** [@artdesignbySF](https://twitter.com/artdesignbySF) / <artdesignbySF@protonmail.com>_

<a href="Custom-CSS/Bitmatk-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Blockstream](https://blockstream.com/)

![Blockstream checkout](img/Theme-Blockstream.png)

<a href="Custom-CSS/Blockstream-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Coincards](https://coincards.com/)

![CoinCards checkout](img/Theme-Coincards.png)

<a href="Custom-CSS/Coincards-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [CryptoCloaks](https://www.cryptocloaks.com/)

![CryptoCloak checkout](img/Theme-CryptoCloaks.png)\
_**Made by:** [@artdesignbySF](https://twitter.com/artdesignbySF) / <artdesignbySF@protonmail.com>_

<a href="Custom-CSS/CryptoCloaks-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Human Rights Foundation](https://hrf.org/)

![Human Rights Foundation checkout](img/Theme-HumanRightsFoundation.png)

<a href="Custom-CSS/HumanRightsFoundation-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Shiftcrypto](https://shiftcrypto.ch/)

![Shiftcrypto checkout](img/Theme-cryptosecurity.png)

<a href="Custom-CSS/ShiftCryptosecurity-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>

---

### [Wears My Liberty](https://wearsmyliberty.com)

![WearMyLiberty](img/Theme-WearMyLiberty.png)

<a href="Custom-CSS/WearsMyLiberty-css.md" target="_blank" rel="noopener noreferrer">Click here to view the CSS</a>