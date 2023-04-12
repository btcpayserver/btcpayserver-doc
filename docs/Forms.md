# Forms

BTCPay Server's Forms feature enables you to request that your customer complete a form before proceeding with a payment.

These forms are fully customizable to suit your requirements.

Example of form definition:

```json
{
  "fields": [
    {
      "name": "buyerEmail",
      "constant": false,
      "type": "email",
      "value": null,
      "required": true,
      "label": "Enter your email",
      "helpText": "This is help text",
      "fields": []
    },
    {
      "name": "buyerName",
      "constant": false,
      "type": "text",
      "value": null,
      "required": true,
      "label": "Name",
      "helpText": null,
      "fields": []
    },
    {
      "name": "buyerAddress1",
      "constant": false,
      "type": "text",
      "value": null,
      "required": true,
      "label": "Address Line 1",
      "helpText": null,
      "validationErrors": [],
      "fields": []
    },
    {
      "name": "buyerAddress2",
      "constant": false,
      "type": "text",
      "value": null,
      "required": false,
      "label": "Address Line 2",
      "helpText": null,
      "fields": []
    },
    {
      "name": "buyerCity",
      "constant": false,
      "type": "text",
      "value": null,
      "required": true,
      "label": "City",
      "helpText": null,
      "fields": []
    },
    {
      "name": "buyerZip",
      "constant": false,
      "type": "text",
      "value": null,
      "required": false,
      "label": "Postcode",
      "helpText": null,
      "fields": []
    },
    {
      "name": "buyerState",
      "constant": false,
      "type": "text",
      "value": null,
      "required": false,
      "label": "State",
      "helpText": null,
      "fields": []
    },
    {
      "name": "buyerCountry",
      "constant": false,
      "type": "text",
      "value": null,
      "required": true,
      "label": "Country",
      "helpText": null,
      "fields": []
    }
  ]
}
```

Output:

![Form](./img/Forms-1.png 'Form')

In a field definition, only the following fields can be set:

| Field                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.fields.constant`      | If `true`, the `.value` must be set in the form definition, and the user will not be able to change the field's value. ( example: the form definition's version)                                                                                                                                                                                                                                                                                                   |
| `.fields.type`          | The HTML input type `text`, `radio`, `checkbox`, `password`, `hidden`, `button`, `color`, `date`, `datetime-local`, `month`, `week`, `time`, `email`, `number`, `range`, `search`, `url`, `select`, `tel`                                                                                                                                                                                                                                                          |
| `.fields.options`       | If `.fields.type` is `select`, the list of selectable values                                                                                                                                                                                                                                                                                                                                                                                                       |
| `.fields.options.text`  | The text displayed for this option                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `.fields.options.value` | The value of the field if this option is selected                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `.fields.type=fieldset` | Create a HTML `fieldset` around the children `.fields.fields` (see below)                                                                                                                                                                                                                                                                                                                                                                                          |
| `.fields.name`          | The JSON property name of the field as it will appear in the invoice's metadata                                                                                                                                                                                                                                                                                                                                                                                    |
| `.fields.value`         | The default value of the field                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `.fields.required`      | if `true`, the field will be required                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `.fields.label`         | The label of the field                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `.fields.helpText`      | Additional text to provide an explanation for the field.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `.fields.fields`        | You can organize your fields in a hierarchy, allowing child fields to be nested within the invoice's metadata. This structure can help you better organize and manage the collected information, making it easier to access and interpret. For example, if you have a form that collects customer information, you can group the fields under a parent field called customer. Within this parent field, you might have child fields like name, email, and address. |

The values of the fields are stored in the [metadata of the invoice](/Development/InvoiceMetadata/).

## Well-known field names

The field name represents the JSON property name that stores the user-provided value in the invoice's metadata.

Some well-known names can be interpreted and modify the invoice's settings.

| Field name         | Description            |
| ------------------ | ---------------------- |
| `invoice_amount`   | The invoice's amount   |
| `invoice_currency` | The invoice's currency |

## Pre-filling form values

You can pre-fill the fields of an invoice automatically by adding query strings to the form's URL, such as `?your_field=value`.

Here are some use cases for this feature:

- `Assisting user input`: Pre-fill fields with known customer information to make it easier for them to complete the form. For example, if you already know a customer's email address, you can pre-fill the email field to save them time.
- `Personalization`: Customize the form based on customer preferences or segmentation. For instance, if you have different customer tiers, you can pre-fill the form with relevant data, such as their membership level or specific offers.
- `Tracking`: Track the source of customer visits by using hidden fields and pre-filled values. For example, you can create different links with pre-filled `utm_media` values for each marketing channel (e.g., Twitter, Facebook, email). This helps you analyze the effectiveness of your marketing efforts.

- `A/B testing`: Pre-fill fields with different values to test different versions of a form, enabling you to optimize the user experience and conversion rates.
