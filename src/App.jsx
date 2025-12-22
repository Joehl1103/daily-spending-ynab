import { useState, useEffect } from 'react';
import { main as getDailySpending } from './modules/ynab/index.js';
import { BarChart } from '@mui/x-charts/BarChart'

function DailyChart({ day, dailyTransactions }) {
  console.log(Object.keys(dailyTransactions))
  console.log('Object values', Object.values(dailyTransactions))
  const total = Object.values(dailyTransactions)
    .reduce((acc, current) => {
      return acc += current
    }, 0)
    .toFixed(2)
  return (
    <div>
      <h2>Daily spending for {day}</h2>
      <div>Total spending: ${total}</div>
      <div>categories: {Object.keys(dailyTransactions).map(i => `${i}, `)}</div>
      <BarChart
        xAxis={[{ data: Object.keys(dailyTransactions) }]}
        series={[{
          data:
            Object.values(dailyTransactions)
              .sort((a, b) => b > a)
              .map(i => i.toFixed(2)),
          barLabel: "value"
        }]}
        height={500}
        layout="vertical"
      />
    </div>
  )
}
function App() {
  const [dailySpendingMap, setDailySpendingMap] = useState(null)
  const [dates, setDates] = useState([])
  const [day, setDay] = useState()
  const [dailyTransactions, setDailyTransactions] = useState(null)
  useEffect(() => {
    getDailySpending()
      .then(res => {
        setDailySpendingMap(res)
        const datesArray = Array.from(res.keys()).sort((a, b) => a < b)
        const datesSet = new Set([...datesArray])
        setDates(Array.from(datesSet))
      })
      .catch(e => {
        console.log(`Error: ${e.message}`)
      })
  }, [day, dailyTransactions])
  if (!dailySpendingMap || dates.length === 0) {
    return <div>Nothing to display</div>
  }
  function handleDaySelection(event) {
    event.preventDefault()
    setDay(event.target.value)
    setDailyTransactions(dailySpendingMap.get(event.target.value))
  }
  return (
    <>
      <p>See which day ::</p>
      <select
        onChange={handleDaySelection}
      >
        <option>no date selected</option>
        {dates.map(d =>
          <option key={d}> {d}</option>
        )}
      </select >
      {day && dailyTransactions ? <DailyChart
        day={day}
        dailyTransactions={dailyTransactions}
      /> : null}
    </>
  )
}

export default App;
