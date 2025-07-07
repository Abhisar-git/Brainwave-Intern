import { getBalance, getIncome, getExpense } from './utils.js';

let transactions = [];

export function init() {
  const form = document.getElementById('form');
  form.addEventListener('submit', addTransaction);
  updateValues();
  renderTransactions();
}

function addTransaction(e) {
  e.preventDefault();
  const text = document.getElementById('text');
  const amount = document.getElementById('amount');
  if (text.value.trim() === '' || amount.value.trim() === '') return;
  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };
  transactions.push(transaction);
  text.value = '';
  amount.value = '';
  renderTransactions();
  updateValues();
}

function renderTransactions() {
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';
  transactions.forEach(({ id, text, amount }) => {
    const sign = amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.className = amount < 0 ? 'minus' : 'plus';
    item.innerHTML = `
      ${text} <span>${sign}₹${Math.abs(amount)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${id})">x</button>
    `;
    list.appendChild(item);
  });
}

window.deleteTransaction = function(id) {
  transactions = transactions.filter(t => t.id !== id);
  renderTransactions();
  updateValues();
};

function updateValues() {
  const balance = getBalance(transactions);
  const income = getIncome(transactions);
  const expense = getExpense(transactions);
  document.getElementById('balance').textContent = balance.toFixed(2);
  document.getElementById('income').textContent = income.toFixed(2);
  document.getElementById('expense').textContent = expense.toFixed(2);
}
