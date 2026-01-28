export const getConfig = () => {
  const budgetId = import.meta.env?.VITE_MAIN_BUDGET_ID;
  const accountId = import.meta.env?.VITE_MAIN_CHECKING_ID;

  if (!budgetId || !accountId) {
    throw new Error(
      "Missing required environment variables: VITE_MAIN_BUDGET_ID and/or VITE_MAIN_CHECKING_ID"
    );
  }

  return { budgetId, accountId };
};
