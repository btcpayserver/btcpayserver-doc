### [Andreas M. Antonopolous](https://aantonop.com/)

![Aantonop checkout](../img/Theme-AantonopShop.png)\
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
    background-color: #fff !important;  /*===BACKGROUND COLOR===*/
}

.modal.page {
    background-color: #fff;   /*===BACKGROUND COLOR===*/
}
/*=============================*/

/*=======OUTLINE SETTINGS=======*/
.modal-content{
  box-shadow: none; /*===OUTSIDE SHADOW===*/
  outline: 1px solid #000000; /*===OUTLINE===*/
  border-radius: 0px;   /*===ROUNDED CORNERS===*/
}
/*=============================*/

/*=======HEADER SETTINGS=======*/
.top-header {
    background-image: linear-gradient(to right, #fff, #fff);  /*===HEADER BACKGROUND GRADIENT, CAN BE CHANGED TO SINGLE COLOR. UPLOAD (TRANSPARANT) PNG WITH HEADER LOGO WITH FOLLOWING DIMENTSIONS 720X120PX ===*/
  color: #e1e1e1;
  border-radius:0px;  /*===ROUNDED CORNER SETTINGS===*/
}

.top-header .timer-row__progress-bar {
  border-top: 1px solid #000000;
    background: #000000;    /*===PROGRESS BAR COLOR===*/
}

.top-header .timer-row {
    border-top: 1px solid #000000;  /*===COLORED LINE ABOVE PROGRESS BAR===*/
  border-bottom: 1px solid #e1e1e1; /*===COLORED LINE ABOVE PROGRESS BAR===*/
  background-image: linear-gradient(to right, #7a7a7a, #7a7a7a);  /*===PROGRESS BAR BACKGROUND COLOR===*/
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
    background-color: #000000;  /*===BACKGROUND COLOR===*/
    color: #e1e1e1 !important;    /*===TEXT COLOR===*/
  padding-top: 15px;
    padding-bottom: 10px;
}

.buyerTotalLine {
    border-top: 1px solid #e1e1e1;
    background-color: #252525;
    color: #e1e1e1;
  padding-top: 15px;
    padding-bottom: 12px;
}
/*==========================*/

/*=======PAYMENT TABS=======*/
.payment-tabs__slider {
  background: #ec912f;  /*===SLIDER COLOR===*/
}

.payment-tabs {
    background-color: #252525;  /*===BACKGROUND COLOR===*/
    border-top: 1px solid #ec912f;  /*===COLORED LINE ABOVE PAYMENT TABS===*/
}
/*===========================*/

/*===OPEN IN WALLET BUTTON===*/
.action-button {
    color: #e1e1e1 !important;
    background-image: linear-gradient(to top, #3f3f3f, #7a7a7a);    /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  border-color:#e1e1e1;   /*===BUTTON BORDER COLOR===*/
  box-shadow: 0px 0px 0px -3px #000000;   /*===DROP SHADOW SETTINGS===*/
  border-radius: 0px;   /*===ROUNDED CORNER SETTINGS===*/
}

.action-button:hover {
    background-image: linear-gradient(to bottom, #3f3f3f, #000000); /*===HOVER BUTTON BACKGROUND COLOR GRADIENT===*/
  border-color:#e1e1e1; /*===BUTTON BORDER COLOR===*/
}
/*============================*/

/*===BOLT/NODE INFO BUTTONS===*/
.btnGroupLnd {
    box-shadow: 0px 0px 0px 0px #000000;  /*===DROP SHADOW SETTINGS===*/
  background-image: linear-gradient(to top, #7a7a7a, #7a7a7a);  /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#000000; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color:#000000; /*===BUTTON BORDER COLOR===*/
  border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button {
  background-image:  linear-gradient(to top, #3f3f3f, #7a7a7a); /*===BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#000000; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color: #000000; /*===BUTTON BORDER COLOR===*/
  border-radius: 0px; /*===ROUNDED CORNER SETTINGS===*/
}

.btnGroupLnd button.active {
  background-image:  linear-gradient(to bottom, #3f3f3f, #7a7a7a);  /*===ACTIVE BUTTON BACKGROUND COLOR GRADIENT===*/
  background-color:#000000; /*===BUTTON BACKGROUND COLOR (IF NO GRADIENT IS WANTED DELETE LINE ABOVE THIS)===*/
  border-color: #000000;    /*===BUTTON BORDER COLOR===*/
  border-radius: 0px;   /*===ROUNDED CORNER SETTINGS===*/
}
/*===========================*/

/*=====CURRENCY DROPDOWN=====*/
.payment__currencies {
  border-radius:0px;  /*===ROUNDED CORNER SETTINGS===*/
}

.currency-selection {
    background-color: #252525;  /*===BACKGROUND COLOR===*/
    border-bottom: 0px solid #e1e1e1;
    color: #e1e1e1; /*===TEXT COLOR===*/
    padding-top: 15px;
    padding-bottom: 10px;
    height: auto;
}

.vex.vex-theme-btcpay .vex-content  {
  padding: 1px;
  border-radius:0px; /*===ROUNDED CORNER SETTINGS===*/
  box-shadow: 0px 0px 0px 0px #000000; /*===DROP SHADOW SETTINGS===*/
}

.vexmenu  {
  background-color:#252525; /*===BACKGROUND COLOR===*/
}

.vexmenuitem:hover {
  background: #7a7a7a;  /*===MENU BACKGROUND COLOR===*/
}

.vexmenuitem > a span {
  color: #e1e1e1; /*===MENU BACKGROUND COLOR===*/
}

.payment__currencies {
  background: #7a7a7a; /*===MENU HOVER HIGHLIGHT COLOR===*/
}

.payment__currencies:hover {
  background: #252525; /*===MENU HOVER HIGHLIGHT COLOR===*/
  border-color: #e1e1e1;
}
/*===========================*/

/*===QR AND QR BACKGROUND===*/
.invoice {
    background-color: #000000;  /*===MENU BACKGROUND COLOR===*/
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
  margin-top:10px;
  padding-top:3px;
  height:25px;
  background: #000000;
  color:#e1e1e1;
}

.expired__body {
    color: #000000;
}
/*==========================*/

/*======COLOR OF LINKS======*/
a {
  color: #e1e1e1 !important;  /*===LINK COLOR===*/
}
/*==========================*/

/*==="COLOR OF SOME TEXTS===*/
span {
  color:#e1e1e1; /*===TEXT COLOR===*/
}
/*=========================*/

/*=====LANGUAGE SELECT=====*/
#prettydropdown-DefaultLang ul {
  color: #e1e1e1 !important; /* ===TEXT COLOR=== */
  background-color: #252525 !important;   /*===BACKGROUND COLOR===*/
  border-color: #000000; 
  border-radius: 0px;
}

.checked: {
  color:#000000;
}
/*===========================*/

/*====INSTRUCTIONAL TEXTS====*/
.manual__step-one__header {
    color: #e1e1e1; /*===TEXT COLOR===*/
  opacity: 1;
}
.content-faded, .manual__step-one__instructions, .manual__step-two__instructions {
    color: #e1e1e1; /*===TEXT COLOR===*/
  opacity: 1;
}
/*===========================*/

/*====COPY INFO BOX/TEXTS====*/
.copyBox {
  background-color:#252525; 
  border-color:#252525;
}

.copyAmountText {
  color: #e1e1e1; /*===TEXT COLOR===*/
}

.copySectionBox label {
  color: #e1e1e1; /*===TEXT COLOR===*/
  opacity: 1;
}

.separatorGem {
  background:#ec912f; /*===GEM ICON COLOR===*/
}
/*===========================*/

/*====PAYMENT SUCCES PAGE====*/
/*
.success-block {
  background-image: linear-gradient(to top, #252525, #f5f5f7); /*===GRADIENT BACKGROUND===*//*
  height:275px;
}
*/
.success-message {
  color: #e1e1e1; /*  ===TEXT COLOR=== */
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
````