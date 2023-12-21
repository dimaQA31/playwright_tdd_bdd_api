Feature: Buy a product

@demo
Scenario: Success flow

Given User logs in
When Find an item "Sauce Labs Backpack" by name, then add it to the cart
Then Go to cart
When Validate the Checkout Overview has a "Sauce Labs Backpack" item
Then Finish purchase and verify