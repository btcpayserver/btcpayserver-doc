### [CryptoCloaks](https://www.cryptocloaks.com/)

![CryptoCloak checkout](../img/Theme-CryptoCloaks.png)\
_**Made by:** [@artdesignbySF](https://twitter.com/artdesignbySF) / <artdesignbySF@protonmail.com>_

CSS file:
```css
/*  ===========================CREDITS=========================== */
/*  Custom BTCpay Server CSS template made by @artdesignbySF.   */
/*  PLEASE CONSIDER DONATING BITCOIN IF YOU FIND          */
/*  THIS FILE USEFULL: 3LBQbv72rdSrLmFF66p9gMPDuPMcKL7UL1     */
/*  Follow @artdesignbySF on Twitter                */
/*  Contact via: artdesignbySF@protonmail.com           */
/*  =========================END CREDITS========================= */

/*  =========================DISCLAIMER========================== */
/*  Might not be the most efficient or correct way of implementing  */
/*  CSS. I am not responsable for breaking your website if things */
/*  go wrong. PEACE / LOVE / BITCOIN                */
/*  =======================END DISCLAIMER======================== */

/*======BACKGROUND COLOR======*/
html {
  background-color: #790099 !important;   /*===BACKGROUND COLOR===*/
}

.modal.page {
    background-color: #790099;  /*===BACKGROUND COLOR===*/
}
/*=============================*/

/*=======HEADER SETTINGS=======*/
.top-header {
    background-image: linear-gradient(to right, #790099, #cd00b9);  /*===HEADER BACKGROUND GRADIENT, CAN BE CHANGED TO SINGLE COLOR. UPLOAD (TRANSPARANT) PNG WITH HEADER LOGO WITH FOLLOWING DIMENTSIONS 720X120PX ===*/
  border-radius:0px;  /*===ROUNDED CORNER SETTINGS===*/
}

.top-header .timer-row__progress-bar {
  border-top: 1px solid #790099;
    border-bottom: 1px solid #790099;
    background: #790099;    /*===PROGRESS BAR COLOR===*/
}

.top-header .timer-row {
    border-top: 1px solid #fff;   /*===COLORED LINE ABOVE PROGRESS BAR===*/
  border-bottom: 1px solid #fff;  /*===COLORED LINE ABOVE PROGRESS BAR===*/
    background: #481b5c;  /*===PROGRESS BAR BACKGROUND COLOR===*/
}

.header__icon__img {
  display: block;
  width:360px;  /*===HEADER DIMENSIONS===*/
  height:60px;  /*===HEADER DIMENSIONS===*/
  margin-left:-10px;  /*===HEADER POSITION CORRECTION===*/
  margin-top:-10px;   /*===HEADER POSITION CORRECTION===*/
}
/*============================*/

/*=====PAY WITH / AMOUNTS=====*/
.line-items {
    background-color: #09182e;  /*===BACKGROUND COLOR===*/
    color: #fff !important;   /*===TEXT COLOR===*/
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
  background: #790099;  /*===SLIDER COLOR===*/
}

.payment-tabs {
    background-color: #481b5c;  /*===BACKGROUND COLOR===*/
    border-top: 1px solid #fff; /*===COLORED LINE ABOVE PAYMENT TABS===*/
  border-bottom: 1px solid #09182e; /*===COLORED LINE BELOW PAYMENT TABS===*/
}
/*===========================*/

/*===OPEN IN WALLET BUTTON===*/
.action-button {
    color: #fff !important;
    background-image: linear-gradient(to bottom, #790099, #cd00b9);   /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  border-color:#fff;  /*===BUTTON BORDER COLOR===*/
  box-shadow: 0px 0px 15px -3px #000000;  /*===DROP SHADOW SETTINGS===*/
  border-radius: 0px;   /*===ROUNDED CORNER SETTINGS===*/
}

.action-button:hover {
    background-image: linear-gradient(to top, #790099, #cd00b9);  /*===HOVER BUTTON BACKGROUND COLOR GRADIENT===*/
  border-color:#fff; /*===BUTTON BORDER COLOR===*/
}
/*============================*/

/*===BOLT/NODE INFO BUTTONS===*/
.btnGroupLnd {
    box-shadow: 0px 0px 15px -3px #000000;  /*===DROP SHADOW SETTINGS===*/
  background-image: linear-gradient(to right, #790099, #cd00b9);  /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#790099; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color:#fff;  /*===BUTTON BORDER COLOR===*/
  border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button {
  background-image:  linear-gradient(to right, #790099, #cd00b9); /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#790099; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color: #fff; /*===BUTTON BORDER COLOR===*/
  border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button.active {
  background-image:  linear-gradient(to left, #790099, #cd00b9);  /*===ACTIVE BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#790099; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color: #fff;   /*===BUTTON BORDER COLOR===*/
  border-radius: 0px;   /*===ROUNDED CORNER SETTINGS===*/
}
/*===========================*/

/*=====CURRENCY DROPDOWN=====*/
.payment__currencies {
  border-radius:0px;  /*===ROUNDED CORNER SETTINGS===*/
}

.currency-selection {
    background-color: #481b5c;  /*===BACKGROUND COLOR===*/
    border-bottom: 0px solid #fff;
    color: #fff;  /*===TEXT COLOR===*/
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
  background-color:#15171c; /*===BACKGROUND COLOR===*/
}

.vexmenuitem:hover {
  background: #481b5c;  /*===MENU BACKGROUND COLOR===*/
}

.payment__currencies:hover {
  background: #15171c; /*===MENU HOVER HIGHLIGHT COLOR===*/
}
/*===========================*/

/*===QR AND QR BACKGROUND===*/
.invoice {
    background-color: #cd00b9;  /*===MENU BACKGROUND COLOR===*/
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
  color: #fff !important;   /*===LINK COLOR===*/
}
/*==========================*/

/*==="COLOR OF SOME TEXTS===*/
span {
  color:#fff; /*===TEXT COLOR===*/
}
/*=========================*/

/*=====LANGUAGE SELECT=====*/
#prettydropdown-DefaultLang ul {
  color: #FFF !important; /*  ===TEXT COLOR=== */
  background-color: #15171c !important;   /*===BACKGROUND COLOR===*/
}
/*===========================*/

/*====INSTRUCTIONAL TEXTS====*/
.manual__step-one__header {
    color: #fff;  /*===TEXT COLOR===*/
  opacity: 1;
}
.content-faded, .manual__step-one__instructions, .manual__step-two__instructions {
    color: #fff;  /*===TEXT COLOR===*/
  opacity: 1;
}
/*===========================*/

/*====COPY INFO BOX/TEXTS====*/
.copyBox {
  background-color:#481b5c; 
  border-color:#481b5c;
}

.copyAmountText {
  color: #fff;  /*===TEXT COLOR===*/
}

.copySectionBox label {
  color: #fff;  /*===TEXT COLOR===*/
  opacity: 1;
}

.separatorGem {
  background:#790099; /*===GEM ICON COLOR===*/
}
/*===========================*/

/*====PAYMENT SUCCES PAGE====*/
/*
.success-block {
  background-image: linear-gradient(to bottom, #fbff0000, #fff700f2); /*===GRADIENT BACKGROUND===*//*
}
*/
.success-message {
  color: #fff; /* ===TEXT COLOR=== */
}
/*===========================*/

/*  ===========================CREDITS=========================== */
/*  Custom BTCpay Server CSS template made by @artdesignbySF.   */
/*  PLEASE CONSIDER DONATING BITCOIN IF YOU FIND          */
/*  THIS FILE USEFULL: 3LBQbv72rdSrLmFF66p9gMPDuPMcKL7UL1     */
/*  Follow @artdesignbySF on Twitter                */
/*  Contact via: artdesignbySF@protonmail.com           */
/*  =========================END CREDITS========================= */

/*  =========================DISCLAIMER========================== */
/*  Might not be the most efficient or correct way of implementing  */
/*  CSS. I am not responsable for breaking your website if things */
/*  go wrong. PEACE / LOVE / BITCOIN                */
/*  =======================END DISCLAIMER======================== */
```