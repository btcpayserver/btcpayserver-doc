# Notifications

Notifications to monitor BTCPay Server events can be configured in several different ways. 

- [Notification Alerts](#notification-alerts)
- [Server level SMTP (Email)](#server-emails)
- [Store level SMTP (Email)](#store-emails)
- [Store level Webhooks](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/Webhooks)

## Notification Alerts

Click the notification icon in the main header to view the current notifications. The notification page shows the status of all current notifications such as invoice events, payouts, version updates, etc. Notifications can be marked as seen from the notifications dropdown or the notifications page.

![BTCPay Notifications](./img/notifications/notification-page.png "BTCPay Notifications")

Each user registered on the server can manage the notifications they receive.

![BTCPay Manage Notifications](./img/notifications/notification-manage.png "BTCPay Manage Notifications")

## Server Emails

Emails can be sent from the server-level of BTCPay. These are [user emails](#user-emails). Admins can setup server SMTP in:

Server Settings > Email server > [Setup](#smtp-email-setup)

## Store Emails

Emails can be sent from the store-level of BTCPay. These emails are for store related events such as invoices. Users can setup store SMTP in:

Store Settings > General Settings > Services > Email > [Setup](#smtp-email-setup)

### SMTP Email Setup

Use the Quick fill settings dropdown for commonly used email client setup parameters. Send yourself a test email from the same page to verify your setup parameters work properly.

![BTCPay Email SMTP](./img/smtp/smtp-setup.png "BTCPay Email SMTP")

Each email client may have different requirements for setting up SMTP. For more information see this [SMTP FAQ](./FAQ/FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay) or refer to your email provider's documentation.

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

This email can be sent to users who have lost their password. If SMTP is not enabled on the server, there is no way to reset any user passwords including the server admin's password. Be sure to save your password in a safe place or setup email for your server.

## User Verification Email

This email is used to verify newly registered users.

## New User Invitation Email

When adding a new user to the server, if a password is not provided and SMTP is enabled on the server, a welcome email will be sent to the user. The email will invite the user to create a new password during registration. This can be used to keep server registration closed to the public but still invite new users.

## Custom Emails
Custom emails can be created using the BTCPay Server Transmuter preset [Email Receipts](https://docs.btcpayserver.org/Transmuter/EmailReceiptsPreset/#transmuter-email-receipts-setup) 