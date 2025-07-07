export function getBalance(transactions) {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
}
export function getIncome(transactions) {
  return transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
}
export function getExpense(transactions) {
  return transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1;
}
