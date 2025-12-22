import * as ynab from 'ynab'

async function getBudgets(api) {
  try {

    const budgetsResponse = await api
      .budgets
      .getBudgets()

    console.log('budgetsResponse', budgetsResponse)

    return budgetsResponse
      .data
      .budgets
  } catch (e) {
    throw new Error(e)
  }
}

async function getAccounts(api, budgetId) {
  try {
    const transactionResponse = await api
      .accounts
      .getAccounts(budgetId)

    return transactionResponse
      .data
      .accounts
  } catch (e) {
    throw new Error(e)
  }
}

function checkForDueDatesAndRemove(category) {
  if (category.includes("-")) {
    return category.split("-")[0].trim()
  }
  return category
}

function cleanCategory(category) {
  const sansEmoji = category.replaceAll(/\p{Emoji}/gu, '')
  return checkForDueDatesAndRemove(sansEmoji)
}

function simplifyTransactions(transactions) {
  return transactions.map(t => {
    const { id, date, amount, account_name, payee_name, category_name } = t
    const amountConverted = ynab.utils.convertMilliUnitsToCurrencyAmount(amount, 2)
    return {
      id,
      date,
      amount: amountConverted,
      account_name,
      payee_name,
      category_name: cleanCategory(category_name)
    }
  })
}

async function getTransactionsByAccount(api, budgetId, accountId) {
  try {
    const transactionResponse = await api
      .transactions
      .getTransactionsByAccount(budgetId, accountId)

    return transactionResponse
      .data
      .transactions
  } catch (e) {
    throw new Error(e)
  }
}

export function filterTransactionsByRange(transactions, startDate, endDate) {
  return transactions.filter(t => t.date >= startDate && t.date <= endDate)
}

async function getAndTransformTransactions(api, budgetId, accountId, startDate, endDate) {
  try {
    const transactions = await getTransactionsByAccount(api, budgetId, accountId)
    const filteredTransactions = filterTransactionsByRange(transactions, startDate, endDate)
    return simplifyTransactions(filteredTransactions)
  } catch (e) {
    throw new Error(e)
  }
}


export default {
  getAndTransformTransactions
}
