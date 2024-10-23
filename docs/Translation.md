---
description: BTCPay Translation features.
---

# Using BTCPay Translation Feature to Localize Your BTCPay Server instance


BTCPay Server now includes a powerful translation feature that allows merchant administrators manage their instance in their preferred language. 

This guide will help you create and manage translations, making the BTCPay platform more user-friendly for you.

With this feature, you can replace the default English text across the entire application with your chosen language. 

Whether you want to customize texts on your checkout page, settings configuration, dashboard, or even error and success messages, BTCPay's translation feature makes it easy to tailor your experience to your linguistic needs.

Note: You must be a server admin to access this feature. If you're not an administrator, please introduce this functionality to your admin.


## Step-by-Step Guide to Translating Text in BTCPay Server

1. Log in to your BTCPay Server instance.
2. Navigate to Translation on **Server Settings** >> **Translations**.

![Translation 1](./img/Translations/01_Translation.png)

3. Click **Create** button to generate a new language dictionary.

4. Enter the name you want to use to save the translation dictionary and then click **Create** button to create the dictionary. 

![Translation 2](./img/Translations/02_Translation.png)

![Translation 3](./img/Translations/03_Translation_creation.png)

![Translation 4](./img/Translations/04_Translation_dictionary.png)


As seen in the image above, we have a dictionary of words that are translatable on BTCPay Server instance.

Your dictionary is structured as (key: value), where:

**Key:** The original English text or phrase found in your BTCPay instance.

**Value:** The translated text you wish to display instead.

For each English term, enter its equivalent in your chosen language in the corresponding text. Make sure to review the translations for accuracy and clarity.

As an example lets start by translating "Add Role" into Yoruba. Since I created a dictionary for Yoruba language I would translate to Yoruba language.

![Translation 5](./img/Translations/05_Translation_Add_Role_To_Yoruba.png)

Replace the text and click the **Save** button. A confirmation message will appear indicating that your translations have been successfully saved. Now click on the **Select** button for the newly created dictionary to update the default dictionary on the system. 

![Translation 6](./img/Translations/06_Translation_Saved_Dictionary.png)

Now to test out our translation. You can navigate to **Roles** under **Server Settings**, and if we look at the button on the top right of the Roles view, we can see that the text has been successfully translated from "Add Roles" to "Fi ipa kun".

![Translation 7](./img/Translations/07_Translation_Validation.png)

We can search other part of the BTCPay application that has "Add Role" text, and we can also confirm that it has successfully been translated to our chosen language text. 

Now that you have successfully translated one, go ahead and translate other texts in the dictionary. All instances of English text will be replaced with your translated text, and now you can enjoy your new localized experience.

## Tips for Effective Translations

- **Consistency is Key:** Ensure that similar terms are translated consistently throughout.
- **Context Matters:** Keep context in mind when translating phrases to maintain meaning.
- **Review Regularly:** Regularly update translations as new features are added.