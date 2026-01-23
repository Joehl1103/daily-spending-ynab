const configs = {
  personal: {
    budgetId: import.meta.env.VITE_BUDGET_2025_ID,
    accountId: import.meta.env.VITE_BUDGET_2025_CHECKING_ID,
  },
  test: {
    budgetId: import.meta.env.VITE_TEST_BUDGET_ID,
    accountId: import.meta.env.VITE_TEST_BUDGET_CHECKING_ID,
  },
};

const mode = import.meta.env.VITE_MODE || "test";

export const getConfig = () => configs[mode];
export const currentMode = mode;
