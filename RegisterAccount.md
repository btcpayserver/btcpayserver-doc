## Account Registration

The first step in setting up your BTCPay Server is creating a user account. The <strong>first created account</strong> on a newly-deployed BTCPay Server is automatically - <strong>admin</strong>.

To register, visit your BTCPay Server URL and fill in the account registration form on the right. Input your password, password confirmation, e-mail and click "Register". You will automatically be logged in. If you're using a [third-party host](ThirdPartyHosting.md), you may be asked to verify your e-mail address to confirm the registration.

![BTCPayRegister1](img/btcpay-registration-page.jpg)

### Configuring e-mail
It's recommended that server admins [configure SMTP settings](FAQ/FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay). E-mail setup enables easier password reset for the instance users in case of forgotten credentials.

To allow other users to access your server, you need to enable registration in Server Settings > Policies. 

### Two-factor authentication

For further enhancing security and protecting your account, it's recommended to enable two-factor authentication (both 2FA and U2F are supported). To enable 2FA or U2F, click on the user setting icon in the header menu.

***Proceed to the next step - [Creating a store](CreateStore.md).***
