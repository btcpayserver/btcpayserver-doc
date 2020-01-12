# Theming

BTCPay Server is built on Bootstrap and offers the flexibility to adjust its look to your needs.

You can either provide a CSS file yourself or use an existing one from Bootswatch.
Let's take a closer look at both approaches …

## Custom themes

This is the way we are building our own themes, like the [Classic](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/classic.css) or [Casa](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/casa.css) theme.

With this approach you provide a CSS file containing the variable definitions ([CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)) to adjust colors, fonts, etc.

You should copy one of our [preexisting themes](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/wwwroot/main/themes/) and change the variables to fit your needs.
To test and play around with the adjustments, you can also use the developer tools of the browser:
Inspect the `<html>` element and modify the variables in the `:root` section of the styles inspector:

![Theme customizations](img/ThemeCustomization.gif)

Once you are done with your modifications, you can upload and reference it in the "Custom theme CSS file" field.

![Theme settings](img/ThemeSettings.png)

The Bootstrap theme options are another approach of providing customizations, let's look at this next …

## Bootstrap themes

[Bootswatch](https://bootswatch.com/) offers lots of custom theme maintained by the Bootstrap community.

![Bootswatch](img/Bootswatch.png)

Please note that this approach works best when used with the Classic theme described above!

Let's see how we can take advantage of it.

1. Create a new store
2. Setup a derivation scheme for BTC for this store
3. Create a new Point of Sale app attached to this store (in the Apps menu)

You will see that the default design for such point of sale is:

![DefaultPoS](img/DefaultPoS.png)

If you want to change this theme, find a theme on [Bootswatch](https://bootswatch.com/) which interest you, for example, [Darkly](https://bootswatch.com/darkly/).

You can copy the link to the theme:

![CopyBootswatch](img/CopyBootswatch.png)

Now, go into the settings of your store and paste the link to customize the bootstrap theme:

![ModifyBootstrap](img/ModifyBootstrap.png)

And enjoy a new theme!

![CustomTheme](img/CustomTheme.png)

## Checkout page theme

It is possible to entirely customize the checkout experience of your customer with your brand.

Go to your Store Settings, Checkout Experience, Link to a custom CSS stylesheet. Create your custom theme using these examples below:

Server admins can upload their .css file to [File Storage](FAQ/FAQ-ServerSettings.md#how-to-upload-files-to-btcpay) to create a CSS stylesheet link.

### Wear my liberty

Design:

![WearMyLiberty](img/Theme-WearMyLiberty.png)

CSS file:
```css
.modal.page {background-color: #efefef;}
.top-header .header {height: 80px;}
.header__icon__img {height:60px;}
.top-header .timer-row {padding: 4px 14px; position: relative; transition: background 1s ease;}
.top-header {max-height: 120px; transition: all .2s ease-out;}
.top-header {background-color: #000;}
.top-header .timer-row__progress-bar {background:#ce0000;}
.top-header .timer-row {background: #a0a0a0;}
.payment-tabs__slider {background: #aa0303;	}
.separatorGem {background: #aa0303;}
.action-button {color: #fff; background-color: #aa0303;border-color: #700000;}
.action-button:hover {background-color: #ef8022;}
.action-button:focus, .action-button.focus {color: #fff;background-color: #aa0303;
    border-color: #aa0303;}
.action-button:active, .action-button.active, .open>.action-button.dropdown-toggle {    color: #fff;    background-color: #3aa821;    border-color: #aa0303;}
.action-button:active:hover, .action-button:active:focus, .action-button:active.focus, .action-button.active:hover, .action-button.active:focus, .action-button.active.focus, .open>.action-button.dropdown-toggle:hover, .open>.action-button.dropdown-toggle:focus, .open>.action-button.dropdown-toggle.focus {    color: #fff;    background-color: #3aa821;    border-color: #aa0303;}
```

Logo:

![WearMyLiberty](img/Theme-WearMyLiberty-Logo.png)

### Coincards

![CoinCards Logo](img/Theme-Coincards.png)

CSS file:
```css
.top-header {background-color: #fff;}
.top-header .timer-row__progress-bar {background:#ef8022;}
.top-header .timer-row {background: #ffc313;}
.close-icon {color:#000;}
.payment-tabs__slider {background: #ef8022;     }
.separatorGem {background: #ef8022;}
.action-button {color: #fff; background-color: #ef8022;border-color: #ef8022;}
.action-button:hover {background-color: #ffc313;}
.action-button:focus, .action-button.focus {color: #fff;background-color: #ef8022;
    border-color: #ef8022;}
.action-button:active, .action-button.active, .open>.action-button.dropdown-toggle {    color: #fff;    background-color: #ef8022;    border-color: #ef8022;}
.action-button:active:hover, .action-button:active:focus, .action-button:active.focus, .action-button.active:hover, .action-button.active:focus, .action-button.active.focus, .open>.action-button.dropdown-toggle:hover, .open>.action-button.dropdown-toggle:focus, .open>.action-button.dropdown-toggle.focus {    color: #fff;    background-color: #ef8022;    border-color: #ef8022;}
.btnGroupLnd button {border: solid 1px #ef8022;}
.btnGroupLnd button.active {background-color: #ef8022; border-color: #ef8022;}
.btnGroupLnd button:hover {background-color:#ffc313;}
.btnGroupLnd button.active:hover {background-color:#ef8022;}
```
Logo:

![CoinCards Logo](img/Theme-Coincards-Logo.png)

### Blockstream

![Blockstream](img/Theme-Blockstream.png)

CSS file:
```css
html {
  background-color: #111316 !important;
}

.modal.page {
  background-color: #111316;
}

.top-header {
  background-color: #15181c;
}

.top-header .timer-row__progress-bar {
  background: #00c3ff;
}

.top-header .timer-row {
  background: #1187c1;
}

.payment-tabs__slider {
  background: #00c3ff;
}

.action-button {
  color: #fff !important;
  background-image: linear-gradient(to right, #00c3ff, #1187c1);
}

.action-button:active {
  background-image: linear-gradient(to right, #00c3ff, #1187c1);
}

.invoice {
  background-color: #343f4c;
}

.expired__body {
  color: #fff;
}

.currency-selection {
  background-color: #15181c;
  border-bottom: 1px solid #565d6e;
  color: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
}

.line-items {
  background-color: #111316;
  color: #565d6e !important;
  border-top: 1px solid #565d6e !important;
}

.buyerTotalLine {
  border-top: 1px solid #202224;
  background-color: #15181c;
  color: #fff;
}

.payment-tabs {
  background-color: #15181c;
  color: #fff;
  border-top: 1px solid #565d6e;
  border-bottom: 1px solid #565d6e;
}

.payment-tabs__tab .active {
  color: #00c3ff;
}

.payment-tabs__tab.active {
  color: #00c3ff;
}

a {
  color: #00c3ff !important;
}

canvas {
  border: 5px solid #fff;
}

#prettydropdown-DefaultLang ul {
  color: #565d6e !important;
  background-color: #111316 !important;
}

.manual__step-one__header {
    color: #ffffff;
}
.manual__step-one__instructions {
    color: #ffffff;
}
```
Logo:

![Blockstream logo](img/Theme-Blockstream-Logo.png)

### Shiftcrypto

![Shiftcrypto](img/Theme-cryptosecurity.png)

CSS file:
```css

.top-header {background-color: #fff;}
.top-header .timer-row__progress-bar {background:#5E94BF;}
.top-header .timer-row {background: #AAAAAA;}
.close-icon {color:#000;}
.payment-tabs__slider {background: #5E94BF;     }
.separatorGem {background: #5E94BF;}
.action-button {color: #fff; background-color: #5E94BF;border-color: #5E94BF;}
.action-button:hover {background-color: #7faacc;}
.action-button:focus, .action-button.focus {color: #fff;background-color: #5E94BF;
    border-color: #5E94BF;}
.action-button:active, .action-button.active, .open>.action-button.dropdown-toggle {    color: #fff;    background-color: #5E94BF;    border-color: #5E94BF;}
.action-button:active:hover, .action-button:active:focus, .action-button:active.focus, .action-button.active:hover, .action-button.active:focus, .action-button.active.focus, .open>.action-button.dropdown-toggle:hover, .open>.action-button.dropdown-toggle:focus, .open>.action-button.dropdown-toggle.focus {    color: #fff;    background-color: #5E94BF;    border-color: #5E94BF;}
.btnGroupLnd button {border: solid 1px #5E94BF;}
.btnGroupLnd button.active {background-color: #5E94BF; border-color: #5E94BF;}
.btnGroupLnd button:hover {background-color:#7faacc;}
.btnGroupLnd button.active:hover {background-color:#5E94BF;}
```
Logo:

![Shiftcrypto logo](img/Theme-cryptosecurity-logo.png)

### The CryptoCloaks

Website: https://thecryptocloak.com/

Design:

![Shiftcrypto logo](img/Theme-CryptoCloaks.png)

CSS file:
```css
/*======BACKGROUND COLOR======*/
html {
    background-color: #790099 !important; 	/*===BACKGROUND COLOR===*/
}

.modal.page {
    background-color: #790099; 	/*===BACKGROUND COLOR===*/
}
/*=============================*/

/*=======HEADER SETTINGS=======*/
.top-header {
    background-image: linear-gradient(to right, #790099, #cd00b9);	/*===HEADER BACKGROUND GRADIENT, CAN BE CHANGED TO SINGLE COLOR. UPLOAD (TRANSPARANT) PNG WITH HEADER LOGO WITH FOLLOWING DIMENTSIONS 720X120PX ===*/
	border-radius:0px;	/*===ROUNDED CORNER SETTINGS===*/
}

.top-header .timer-row__progress-bar {
	border-top: 1px solid #790099;
    border-bottom: 1px solid #790099;
    background: #790099;  	/*===PROGRESS BAR COLOR===*/
}

.top-header .timer-row {
    border-top: 1px solid #fff; 	/*===COLORED LINE ABOVE PROGRESS BAR===*/
	border-bottom: 1px solid #fff;	/*===COLORED LINE ABOVE PROGRESS BAR===*/
    background: #481b5c;	/*===PROGRESS BAR BACKGROUND COLOR===*/
}

.header__icon__img {
	display: block;
	width:360px; 	/*===HEADER DIMENSIONS===*/
	height:60px;	/*===HEADER DIMENSIONS===*/
	margin-left:-10px; 	/*===HEADER POSITION CORRECTION===*/
	margin-top:-10px; 	/*===HEADER POSITION CORRECTION===*/
}
/*============================*/

/*=====PAY WITH / AMOUNTS=====*/
.line-items {
    background-color: #09182e;	/*===BACKGROUND COLOR===*/
    color: #fff !important;		/*===TEXT COLOR===*/
	padding-top: 15px;
    padding-bottom: 10px;
    border-top: 1px solid #fff !important;
	border-bottom: 0px solid #fff;
}

.buyerTotalLine {
    border-top: 1px solid #fff;
    background-color: #481b5c;
    color: #fff;
	padding-top: 15px;
    padding-bottom: 12px;
}
/*==========================*/

/*=======PAYMENT TABS=======*/
.payment-tabs__slider {
	background: #790099; 	/*===SLIDER COLOR===*/
}

.payment-tabs {
    background-color: #481b5c;	/*===BACKGROUND COLOR===*/
    border-top: 1px solid #fff;	/*===COLORED LINE ABOVE PAYMENT TABS===*/
	border-bottom: 1px solid #09182e;	/*===COLORED LINE BELOW PAYMENT TABS===*/
}
/*===========================*/

/*===OPEN IN WALLET BUTTON===*/
.action-button {
    color: #fff !important;
    background-image: linear-gradient(to bottom, #790099, #cd00b9);		/*===BUTTON BACKGROUND COLOR GRADIENT===*/
	border-color:#fff; 	/*===BUTTON BORDER COLOR===*/
	box-shadow: 0px 0px 15px -3px #000000; 	/*===DROP SHADOW SETTINGS===*/
	border-radius: 0px; 	/*===ROUNDED CORNER SETTINGS===*/
}

.action-button:hover {
    background-image: linear-gradient(to top, #790099, #cd00b9);	/*===HOVER BUTTON BACKGROUND COLOR GRADIENT===*/
	border-color:#fff; /*===BUTTON BORDER COLOR===*/
}
/*============================*/

/*===BOLT/NODE INFO BUTTONS===*/
.btnGroupLnd {
    box-shadow: 0px 0px 15px -3px #000000;	/*===DROP SHADOW SETTINGS===*/
	background-image: linear-gradient(to right, #790099, #cd00b9);	/*===BUTTON BACKGROUND COLOR GRADIENT===*/
	background-color:#790099;	/*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
	border-color:#fff;	/*===BUTTON BORDER COLOR===*/
	border-radius: 0px;	/*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button {
	background-image:  linear-gradient(to right, #790099, #cd00b9); /*===BUTTON BACKGROUND COLOR GRADIENT===*/
	background-color:#790099;	/*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
	border-color: #fff; /*===BUTTON BORDER COLOR===*/
	border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button.active {
	background-image:  linear-gradient(to left, #790099, #cd00b9);	/*===ACTIVE BUTTON BACKGROUND COLOR GRADIENT===*/
	background-color:#790099;	/*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
	border-color: #fff;		/*===BUTTON BORDER COLOR===*/
	border-radius: 0px;		/*===ROUNDED CORNER SETTINGS===*/
}
/*===========================*/

/*=====CURRENCY DROPDOWN=====*/
.payment__currencies {
	border-radius:0px;	/*===ROUNDED CORNER SETTINGS===*/
}

.currency-selection {
    background-color: #481b5c;	/*===BACKGROUND COLOR===*/
    border-bottom: 0px solid #fff;
    color: #fff;	/*===TEXT COLOR===*/
    padding-top: 15px;
    padding-bottom: 10px;
    height: auto;
}

.vex.vex-theme-btcpay .vex-content  {
	padding: 1px;
	border-radius:0px; /*===ROUNDED CORNER SETTINGS===*/
	box-shadow: 0px 0px 15px -3px #000000; /*===DROP SHADOW SETTINGS===*/
}

.vexmenu  {
	background-color:#15171c;	/*===BACKGROUND COLOR===*/
}

.vexmenuitem:hover {
	background: #481b5c;	/*===MENU BACKGROUND COLOR===*/
}

.payment__currencies:hover {
	background: #15171c; /*===MENU HOVER HIGHLIGHT COLOR===*/
}
/*===========================*/

/*===QR AND QR BACKGROUND===*/
.invoice {
    background-color: #cd00b9;	/*===MENU BACKGROUND COLOR===*/
	border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
} 

.payment-box {
	height:425px; /*===SIZE IMPORTANT BECAUSE HEIGHT LIGHTNING QR CODE + OUTLINE===*/
}

.payment__scan {
	width:276px;
	height:276px;
	margin-left:auto;	
	margin-right:auto;
	margin-bottom:5px;
	margin-top:0px;
	border: 10px solid #f5f5f7; /*===QR CODE BORDER SIZE/COLOR (LEAVE AS IS FOR QUICK SCANNING)===*/
}

.recommended-fee {
	margin-top:15px;
}

.expired__body {
    color: #000000;
}
/*==========================*/

/*======COLOR OF LINKS======*/
a {
	color: #fff !important; 	/*===LINK COLOR===*/
}
/*==========================*/

/*==="COLOR OF SOME TEXTS===*/
span {
	color:#fff; /*===TEXT COLOR===*/
}
/*=========================*/

/*=====LANGUAGE SELECT=====*/
#prettydropdown-DefaultLang ul {
	color: #FFF !important; /*	===TEXT COLOR=== */
	background-color: #15171c !important; 	/*===BACKGROUND COLOR===*/
}
/*===========================*/

/*====INSTRUCTIONAL TEXTS====*/
.manual__step-one__header {
    color: #fff;	/*===TEXT COLOR===*/
	opacity: 1;
}
.content-faded, .manual__step-one__instructions, .manual__step-two__instructions {
    color: #fff;	/*===TEXT COLOR===*/
	opacity: 1;
}
/*===========================*/

/*====COPY INFO BOX/TEXTS====*/
.copyBox {
	background-color:#481b5c; 
	border-color:#481b5c;
}

.copyAmountText {
	color: #fff;	/*===TEXT COLOR===*/
}

.copySectionBox label {
	color: #fff;	/*===TEXT COLOR===*/
	opacity: 1;
}

.separatorGem {
	background:#790099;	/*===GEM ICON COLOR===*/
}
/*===========================*/

/*====PAYMENT SUCCES PAGE====*/
/*
.success-block {
	background-image: linear-gradient(to bottom, #fbff0000, #fff700f2); /*===GRADIENT BACKGROUND===*//*
}
*/
.success-message {
	color: #fff; /*	===TEXT COLOR=== */
}
/*===========================*/

/*==============================CREDITS=============================	*/
/*	Custom BTCpay Server CSS template for 				*/
/*	https://thecryptocloak.com/ made by @artdesignbySF and		*/
/*	published with permission of CryptoCloaks			*/
/*	PLEASE CONSIDER DONATING BITCOIN IF YOU FIND 			*/
/*	THIS FILE USEFULL: 3L2K9wypgs3xage6fZk6LXJSKxUsUKFDNM		*/
/*	Follow @artdesignbySF on Twitter				*/
/*============================END CREDITS===========================	*/

/*============================DISCLAIMER============================	*/
/*	Might not be the most efficient or correct way of implementing	*/
/*	CSS. I am not responsable for breaking your website if things	*/
/*	go wrong. PEACE / LOVE / BITCOIN				*/
/*==========================END DISCLAIMER==========================	*/
```

Logo:
![CryptoCloaks](img/Theme-CryptoCloaks-logo.png)