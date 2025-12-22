import * as ynab from 'ynab';
const ynabAPI = new ynab.API(import.meta.env.VITE_ACCESS_TOKEN);
import ynabApiFunctions from './ynabApi.js';
const YNAB_START_DATE = "2025-12-01";


export function addAmountByCategory(transactions, dateMap) {
  transactions.forEach(t => {
    const { date, amount, category_name } = t;
    if (amount > 0) {
      return
    }
    let entry = dateMap.get(date)
    if (!entry[category_name]) {
      entry[category_name] = amount * -1
    } else {
      entry[category_name] += amount * -1
    }
    dateMap.set(date, entry)
  })
  return dateMap
}

export async function main() {
  const ynabTransactions = await ynabApiFunctions.getAndTransformTransactions(ynabAPI, import.meta.env.VITE_BUDGET_2025_ID, import.meta.env.VITE_CHECKING_ID, YNAB_START_DATE)
  const dates = new Set([...ynabTransactions.map(t => t.date)])
  const dateMap = new Map([...Array.from(dates)].map(d => [d, {}]))
  return addAmountByCategory(ynabTransactions, dateMap)
}
