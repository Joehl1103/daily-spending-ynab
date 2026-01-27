const configs = {
  budgetId: import.meta.env.VITE_MAIN_BUDGET_ID,
  accountId: import.meta.env.VITE_MAIN_CHECKING_ID,
};

export const getConfig = () => configs;
