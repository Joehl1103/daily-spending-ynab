import * as ynab from "ynab";
import ynabApiFunctions from "./ynabApi.js";
import { getConfig } from "./config.js";

let ynabAPI;

function getYnabAPI() {
  if (!ynabAPI) {
    const token = import.meta.env?.VITE_ACCESS_TOKEN;
    if (!token) {
      throw new Error("Missing required environment variable: VITE_ACCESS_TOKEN");
    }
    ynabAPI = new ynab.API(token);
  }
  return ynabAPI;
}

export function addAmountByCategory(transactions, dateMap) {
  console.log("transactions", transactions);
  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      const { date, amount, category_name } = t;
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
    getYnabAPI(),
    getConfig().budgetId,
    getConfig().accountId,
    startDate,
    endDate,
  );
  const dates = new Set([...ynabTransactions.map((t) => t.date)]);
  const dateMap = new Map([...Array.from(dates)].map((d) => [d, {}]));
  return addAmountByCategory(ynabTransactions, dateMap);
}
