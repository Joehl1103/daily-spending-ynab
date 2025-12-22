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
  console.log(transactions.map(t => t.category_name))
  return transactions.map(t => {
    const { id, date, amount, account_name, payee_name, category_name } = t
    console.log('category_name', category_name)
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

export function filterTransactionsByStartDate(transactions, startDate) {
  return transactions.filter(t => t.date >= startDate)
}

async function getAndTransformTransactions(api, budgetId, accountId, startDate) {
  try {
    const transactions = await getTransactionsByAccount(api, budgetId, accountId)
    const filteredTransactions = filterTransactionsByStartDate(transactions, startDate)
    return simplifyTransactions(filteredTransactions)
  } catch (e) {
    throw new Error(e)
  }
}


export default {
  getAndTransformTransactions
}
