// Don't change this sales tax rate!
const SALES_TAX_RATE = 0.065;

/////////////////////
//  Bill Calculator
/////////////////////

//https://github.com/heapwolf/prompt-sync
const promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });

let prices;
console.log('Enter a list of item prices as integers, separated by commas');
prices = prompt('(Example: 99, 35, 34): ');
prices = prices.split(','); // prices becomes an array of strings!

const numItems = prices.length;
let total = 0.0;
for (let price of prices) {
  price = parseFloat(price);
  const salesTax = price * SALES_TAX_RATE;
  const subTotal = price + salesTax;
  total += subTotal;
}
total = total.toFixed(2); // Round it to 2 decimal places here

console.log('The total bill for all ' + numItems + ' items (including tax) is: $' + total);

let payment;
payment = prompt('How much did the customer pay? ');
payment = parseFloat(payment);

let change = (payment - total).toFixed(2);

if (change > 0) {
  // By default the change cannot be kept
  // Only a 'y' or 'Y' input will allow us to keep the change
  // Any other input, and we cannot keep the change
  let keepAsTip;
  keepAsTip = prompt('Can we keep the change as a tip? (y/N): ').toUpperCase();
  keepAsTip = keepAsTip === 'Y';

  change = keepAsTip ? 0 : change
  console.log(`Return $${change} to the customer`);
}
else if (change < 0) {
  change = Math.abs(change);
  console.log(`The customer needs to pay $${change} more`);
}
else {
  console.log('Exact payment! Nice!');
}
