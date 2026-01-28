import { test, describe } from "node:test";
import assert from "node:assert";
import { addAmountByCategory } from "./index.js";

const dateMap = new Map([
  ["2026-01-15", new Map()],
  ["2026-01-16", new Map()],
  ["2026-01-17", new Map()],
]);

const transactions = [
  {
    id: "f8e2a1b4-3c7d-4e9f-b6a2-1d8c5e7f9a0b",
    account_name: "Test Checking",
    amount: -24.99,
    category_name: "Groceries",
    date: "2026-01-15",
    payee_name: "Whole Foods",
  },
  {
    id: "c3b7e9d1-5a2f-4c8e-9d6b-2e4f7a1c3d5e",
    account_name: "Test Checking",
    amount: -12.5,
    category_name: "Dining Out",
    date: "2026-01-15",
    payee_name: "Chipotle",
  },
  {
    id: "a1d4f7c2-8b3e-4a6d-c9f1-5e2b8d4a7c0f",
    account_name: "Test Checking",
    amount: -89.0,
    category_name: "Utilities",
    date: "2026-01-16",
    payee_name: "Electric Company",
  },
  {
    id: "e6c9b2a5-1d4f-4e7a-b3c8-9f2e5a1d7b4c",
    account_name: "Test Checking",
    amount: 500.0,
    category_name: "Income",
    date: "2026-01-16",
    payee_name: "Freelance Client",
  },
  {
    id: "b4a8d1e7-2c5f-4b9a-e6d3-7c1f4a8b2e5d",
    account_name: "Test Checking",
    amount: -45.67,
    category_name: "Entertainment",
    date: "2026-01-17",
    payee_name: "Netflix",
  },
];

describe("addAmount", () => {
  test("does not return positive amounts", () => {
    const newDateMap = addAmountByCategory(transactions, dateMap);
    assert.equal(Array.from(newDateMap).length, 3);
  });

  test("groups same date in date map key", () => {
    const newDateMap = addAmountByCategory(transactions, dateMap);
    const oneFifteen = Array.from(newDateMap).filter(
      (i) => i[0] === "2026-01-15",
    );
    assert.equal(Object.keys(oneFifteen[0][1]).length, 2);
  });
});
