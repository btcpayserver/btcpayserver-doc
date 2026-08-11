# Kuunganisha Coldcard Wallet kwenye BTCPay Server

Hati hii inaonyesha jinsi ya kutumia **Coldcard Wallet** na BTCPay Server yako.

## Usanidi wa Coldcard Wallet

Mwongozo huu unadhani una Coldcard wallet iliyosanidiwa. Ili kusanidi **Coldcard**, tafadhali tazama [mwongozo wa usanidi wa haraka kwenye tovuti ya mtengenezaji](https://coldcardwallet.com/docs/quick).

### Usanidi wa Haraka

1. Ingiza kadi ya MicroSD kwenye Coldcard wallet.
2. Nenda kwenye Advanced > MicroSD Card > Electrum Wallet > Native-Segwit
3. Ingiza kadi ya MicroSD tena kwenye PC yako
4. Katika BTCPay Server, Stores > Settings > Setup > Connect an existing wallet > `Import wallet file`
5. Choose File > chagua faili ya wallet uliyoisafirisha awali kutoka kwa Coldcard.
6. Bonyeza `Continue`
7. Thibitisha kwamba anwani zinalingana na zile zilizoonyeshwa kwenye BTCPay Server yako.

**Coldcard sasa imeunganishwa kwenye BTCPay Server yako**. Malipo yanaenda moja kwa moja kwa Coldcard. Video hapa chini inaonyesha jinsi ya kuunganisha duka lako la BTCPay kwenye Coldcard yako.

[![BTCPay and Coldcard](https://img.youtube.com/vi/N0eVwdP_7EQ/mqdefault.jpg)](https://www.youtube.com/watch?v=N0eVwdP_7EQ)

### Kutuma kutoka kwa wallet ya BTCPay Server ukitumia Coldcard (PSBT)

Mara tu kunapokuwa na fedha zilizopokelewa kwenye **Wallet yako ya BTCPay iliyounganishwa na Coldcard**, unaweza kuzitumia kwa kutumia [PSBT](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md#psbt-in-general) (Miamala ya Bitcoin Iliyosainiwa Kwa Sehemu). Hii inaruhusu usainishaji wa miamala yako nje ya mtandao kabisa, bila kuhitaji kamwe kuunganisha hardware wallet yako kwenye intaneti.

1. Wallets > Manage > Send
2. Jaza anwani ya mpokeaji na kiasi
3. Bonyeza kitufe cha Sign with `a wallet supporting PSBT`.
4. Utaelekezwa kwenye kichupo cha PSBT, chenye taarifa zilizojazwa tayari, bonyeza `Sign with a wallet supporting PSBT (save as file)`
5. Hifadhi faili kwenye kadi ya MicroSD
6. Ingiza MicroSD kwenye Coldcard yako.
7. Katika Coldcard, bonyeza `Ready To Sign`
8. Kagua taarifa za muamala, na bonyeza kitufe cha OK kusaini.
9. Muamala utahifadhiwa kwenye MicroSD.
10. Katika BTCPay, nenda kwenye kichupo cha PSBT cha wallet na upakie faili ya PSBT iliyosainiwa.
11. Bonyeza `Decode`
12. Bonyeza `Other Actions` na uchague `Review`
13. Kagua miamala yako na bonyeza `Broadcast` kuitangaza kwenye mtandao.

Video hapa chini inaonyesha **jinsi ya kuunganisha duka lako la BTCPay kwenye Coldcard yako**.

[![BTCPay Server and Coldcard](https://img.youtube.com/vi/XyqvYaXMfNU/mqdefault.jpg)](https://youtu.be/XyqvYaXMfNU)
