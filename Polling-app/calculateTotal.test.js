const { calculateTotal } = require('./calculateTotal');

describe('calculateTotal', () => {
  it('calculates total with tax and no discount', () => {
    expect(calculateTotal(100, 0.1)).toBe(110);
  });

  it('calculates total with tax and fixed discount', () => {
    expect(calculateTotal(100, 0.2, 10)).toBe(110);
  });

  it('calculates total with tax and percentage discount', () => {
    expect(calculateTotal(100, 0.1, 0, 10)).toBe(99);
  });

  it('calculates total with tax, fixed discount, and percentage discount', () => {
    expect(calculateTotal(200, 0.1, 20, 5)).toBe(198);
  });

  it('returns 0 if discounts exceed total', () => {
    expect(calculateTotal(50, 0.1, 100, 10)).toBe(0);
  });

  it('throws error for negative price', () => {
    expect(() => calculateTotal(-1, 0.1)).toThrow('Invalid price');
  });

  it('throws error for negative tax', () => {
    expect(() => calculateTotal(100, -0.1)).toThrow('Invalid tax');
  });

  it('throws error for negative discount', () => {
    expect(() => calculateTotal(100, 0.1, -5)).toThrow('Invalid discount');
  });

  it('throws error for invalid discount percent', () => {
    expect(() => calculateTotal(100, 0.1, 0, -5)).toThrow('Invalid discount percent');
    expect(() => calculateTotal(100, 0.1, 0, 101)).toThrow('Invalid discount percent');
  });
});
