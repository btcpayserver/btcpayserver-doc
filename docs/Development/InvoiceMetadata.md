# Invoice metadata

Each invoice contains metadata, which is a customizable JSON object that can be tailored through the API during the creation of an invoice. Although it lacks a fixed schema, certain properties within the metadata can be interpreted by the UI.

This page provides an overview of these properties and explains how they are utilized within the BTCPay Server.

## Well-known properties

| Property path       | Description                                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.orderId`          | Refers to the order ID from an external system, such as an e-commerce platform like WooCommerce. This property is indexed, allowing for efficient invoice searches using the `orderId`.                                                                         |
| `.orderUrl`         | Refers to a URL linking back to the order page of the external system. This link is displayed in the invoice details view.                                                                                                                                      |
| `.paymentRequestId` | In the invoice details view, a link is provided for navigating to the payment request page associated with the invoice.                                                                                                                                         |
| `.posData`          | A custom JSON object that represents information displayed in the invoice details view.                                                                                                                                                                         |
| `.receiptData`      | A custom JSON object that represents information displayed on the receipt page of an invoice.                                                                                                                                                                   |
| `.buyerName`        | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerEmail`       | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerAddress1`    | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerAddress2`    | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerCity`        | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerState`       | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerZip`         | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerCountry`     | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.buyerPhone`       | Visible in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                                                                                 |
| `.itemDesc`         | When using the Point of Sale (except in keypad or cart view), this field is set to the item description of the purchased item. This information is included in the CSV invoice export feature and appears in the invoice details view.                          |
| `.itemCode`         | When using the Point of Sale (except in keypad or cart view), this field is set to the item code of the purchased item. This information is included in the CSV invoice export feature and appears in the invoice details view.                                 |
| `.physical`         | Boolean value indicating whether this is a physical good; displayed in the invoice details view and in the BitPay API-compatible endpoints.                                                                                                                     |
| `.taxIncluded`      | Number representing the tax amount in the invoice currency. This information will appear in the invoice details view. During invoice creation, the value is automatically rounded to significant digits and ensured not to be greater than the invoice's price. |

## Examples

Point of sale invoice (Product list view):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "itemCode": "green tea",
  "itemDesc": "Green Tea",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {
    "Title": "Green Tea",
    "Description": "Lovely, fresh and tender, Meng Ding Gan Lu ('sweet dew') is grown in the lush Meng Ding Mountains of the southwestern province of Sichuan where it has been cultivated for over a thousand years."
  }
}
```

Point of sale invoice (Cart view):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "posData": {
    "tip": 0.48,
    "cart": [
      {
        "id": "pu erh",
        "count": 1,
        "image": "~/img/pos-sample/pu-erh.jpg",
        "price": {
          "type": 2,
          "value": 2,
          "formatted": "$2.00"
        },
        "title": "Pu Erh",
        "inventory": null
      },
      {
        "id": "rooibos",
        "count": 1,
        "image": "~/img/pos-sample/rooibos.jpg",
        "price": {
          "type": 2,
          "value": 1.2,
          "formatted": "$1.20"
        },
        "title": "Rooibos",
        "inventory": null
      }
    ],
    "total": 3.68,
    "subTotal": 3.2,
    "customAmount": 0,
    "discountAmount": 0,
    "discountPercentage": 0
  },
  "itemDesc": "Tea shop",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {
    "Tip": "$0.48",
    "Cart": {
      "Pu Erh": "$2.00 x 1 = $2.00",
      "Rooibos": "$1.20 x 1 = $1.20"
    }
  }
}
```

Point of sale invoice (Keypad view):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "posData": {
    "total": "12.00",
    "subTotal": "12.00"
  },
  "itemDesc": "Tea shop",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {}
}
```
