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

function SelectAndDisplay({ range, setRange }) {
  const [dailySpendingMap, setDailySpendingMap] = useState(null)
  const [dates, setDates] = useState([])
  const [day, setDay] = useState()
  const [dailyTransactions, setDailyTransactions] = useState(null)
  const { start, end } = range
  function getDailyTotal(dailyTransaction) {
    const [date, values] = Array.from(dailyTransaction)
    const total = Object.values(values).reduce((acc, current) => acc += current, 0)
    return `${date} - ${total.toFixed(2)}`
  }
  useEffect(() => {
    getDailySpending(range.start, range.end)
      .then(res => {
        setDailySpendingMap(res)
        const datesWithTotals = Array.from(res.entries()).map(i => getDailyTotal(i))
        setDates(datesWithTotals)
      })
      .catch(e => {
        console.log(`Error: ${e.message}`)
      })
  }, [])
  function handleDaySelection(event) {
    event.preventDefault()
    const arr = event.target.value.split("-").map(i => i.trim())
    const year = arr[0]
    const month = arr[1]
    const day = arr[2]
    const date = `${year}-${month}-${day}`
    setDay(date)
    setDailyTransactions(dailySpendingMap.get(date))
  }

  if (!dailySpendingMap || dates.length === 0) {
    return <div>Nothing to display</div>
  }

  return (
    <div>
      <p>You have selected to see the date range between {start} and {end} to see which days :.</p>
      <p>Select which day you would like to see:</p>
      <div>
        <select
          onChange={handleDaySelection}
        >
          <option>no date selected</option>
          {dates.map(d =>
            <option key={d}> {d}</option>
          )}
        </select >
        <button onClick={() => setRange({ start: '', end: '' })} >clear</button>
      </div>
      {
        day && dailyTransactions ? <DailyChart
          day={day}
          dailyTransactions={dailyTransactions}
        /> : null
      }
    </div >
  )
}

function SelectRange({ setRange }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    setRange({ start: start, end: end })
  }
  return (
    <div>
      <p>Select the start and end date of the range:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start </label>
          <input
            type='date'
            onChange={({ target }) => setStart(target.value)}
          />
        </div>
        <div>
          <label>End </label>
          <input
            type="date"
            onChange={({ target }) => setEnd(target.value)}
          />
        </div>
        <button>select</button>
      </form>
    </div>
  )
}
function App() {
  const [range, setRange] = useState({
    start: '',
    end: ''
  })

  return (
    <>
      {range.start.length === 0 && range.end.length === 0 ?
        <SelectRange setRange={setRange} /> :
        <SelectAndDisplay
          range={range}
          setRange={setRange}
        />
      }
    </>
  )
}

export default App;
