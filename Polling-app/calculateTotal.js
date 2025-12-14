// Utility function to calculate total price with tax and optional discount
function calculateTotal(price, tax, discount = 0, discountPercent = 0) {
  if (typeof price !== 'number' || price < 0) throw new Error('Invalid price');
  if (typeof tax !== 'number' || tax < 0) throw new Error('Invalid tax');
  if (typeof discount !== 'number' || discount < 0) throw new Error('Invalid discount');
  if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) throw new Error('Invalid discount percent');
  const taxedPrice = price + price * tax;
  const percentDiscount = taxedPrice * (discountPercent / 100);
  const finalPrice = taxedPrice - discount - percentDiscount;
  return finalPrice >= 0 ? finalPrice : 0;
}

// Example usage:
// console.log(calculateTotal(100, 0.07, 10, 5)); // 92.65

module.exports = { calculateTotal };
