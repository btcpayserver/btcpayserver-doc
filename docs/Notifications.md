# Notifications

Notifications to monitor BTCPay Server events can be configured in several different ways. 

- [Notification Alerts](#notification-alerts)
- [Server level SMTP (Email)](https://docs.btcpayserver.org/FAQ/FAQ-ServerSettings/#how-to-configure-smtp-settings-in-btcpay)
- [Store level SMTP (Email)](https://docs.btcpayserver.org/FAQ/FAQ-ServerSettings/#how-to-configure-smtp-settings-in-btcpay)
- [Store level Webhooks](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/Webhooks)

## Notification Alerts

Click the notification icon in the main header to view the current notifications. The notification page appears with the status of all current notifications including invoice events and version updates (server admin only). Notifications can be marked as see in bulk from the notifications dropdown or the notifications page.

![BTCPay Notifications](./img/notifications/notification-page.png "BTCPay Notifications")

Each user registered on the server can manage the notifications they receive.

![BTCPay Manage Notifications](./img/notifications/notification-manage.png "BTCPay Manage Notifications")

# User Emails

There are various user emails built-in to your BTCPay Server to communicate with your users.

:::warning
User emails will only be sent if SMTP is enabled for the server.
:::

- [Forgot Password](#forgot-password-email)
- [User Verification](#user-verification-email)
- [New User Invitation](#new-user-invitation-email)
- [Custom Emails](#custom-emails)

## Forgot Password Email

This email can be sent to users who have lost their password. If SMTP is not enabled on the server, there is no way to reset any user passwords including the server admin's password. Be sure to save your password in a safe place or setup an email client on your server.

## User Verification Email

This email is used to verify newly registered users.

## New User Invitation Email

When adding a new user to the server, if a password is not provided and SMTP is enabled on the server, a welcome email will be sent to the user. The email will invite the user to create a new password during registration. This can be used to keep server registration closed to the public but still invite new users.

## Custom Emails
Custom emails can be created using the BTCPay Server Transmuter preset [Email Receipts](https://docs.btcpayserver.org/Transmuter/EmailReceiptsPreset/#transmuter-email-receipts-setup) 