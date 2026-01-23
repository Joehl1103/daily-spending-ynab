import * as ynab from "ynab";
const ynabAPI = new ynab.API(import.meta.env.VITE_ACCESS_TOKEN);
import ynabApiFunctions from "./ynabApi.js";
import { getConfig } from "./config.js";

const YNAB_START_DATE = "2025-12-01";

export function addAmountByCategory(transactions, dateMap) {
  transactions.forEach((t) => {
    const { date, amount, category_name } = t;
    if (amount > 0) {
      return;
    }
    let entry = dateMap.get(date);
    if (!entry[category_name]) {
      entry[category_name] = amount * -1;
    } else {
      entry[category_name] += amount * -1;
    }
    dateMap.set(date, entry);
  });
  return dateMap;
}

export async function main(startDate, endDate) {
  const ynabTransactions = await ynabApiFunctions.getAndTransformTransactions(
    ynabAPI,
    getConfig().budgetId,
    getConfig().accountId,
    startDate,
    endDate,
  );
  const dates = new Set([...ynabTransactions.map((t) => t.date)]);
  const dateMap = new Map([...Array.from(dates)].map((d) => [d, {}]));
  return addAmountByCategory(ynabTransactions, dateMap);
}
