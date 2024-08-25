# Don't change this sales tax rate!
SALES_TAX_RATE = 0.065

####################
#  Bill Calculator
####################

print('Enter a list of item prices as integers, separated by commas')
prices = input('(Example: 99, 35, 34): ')
prices = prices.split(',') # prices becomes a list of strings!

num_items = len(prices)
total = 0.0
for price in prices:
  price = float(price)
  sales_tax = price * SALES_TAX_RATE
  sub_total = price + sales_tax
  total += sub_total

total = round(total, 2) # Round it to 2 decimal places here

print('The total bill for all ' + str(num_items) + ' items (including tax) is: $' + str(total))

payment = input('How much did the customer pay? ')
payment = float(payment)

change = round(payment - total, 2)

if change > 0:
  # By default the change cannot be kept
  # Only a 'y' or 'Y' input will allow us to keep the change
  # Any other input, and we cannot keep the change
  keep_as_tip = input('Can we keep the change as a tip? (y/N): ').upper()
  keep_as_tip = keep_as_tip == 'Y'

  change = 0 if keep_as_tip else change
  print(f'Return ${change} to the customer')

elif change < 0:
  change = abs(change)
  print(f'The customer needs to pay ${change} more')

else:
  print('Exact payment! Nice!')
