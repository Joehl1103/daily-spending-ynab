import { test } from "node:test";
import assert from "node:assert";
import { addAmountByCategory } from "./index.js";

test("adds transactions by category", () => {
  const transactions = [
    {
      date: "2025-12-01",
      amount: 1,
      category_name: "category1",
    },
    {
      date: "2025-12-01",
      amount: 1,
      category_name: "category1",
    },
    {
      date: "2025-12-02",
      amount: 1,
      category_name: "category2",
    },
    {
      date: "2025-12-02",
      amount: 1,
      category_name: "category2",
    },
  ];

  const dateMap = new Map([
    ["2025-12-01", {}],
    ["2025-12-02", {}],
  ]);
  const newDateMap = addAmountByCategory(transactions, dateMap);
  assert.deepStrictEqual(Array.from(newDateMap), [
    ["2025-12-01", { category1: 2 }],
    ["2025-12-02", { category2: 2 }],
  ]);
});
