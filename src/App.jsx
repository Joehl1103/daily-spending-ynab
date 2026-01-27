import { useState, useEffect, useRef } from "react";
import { main as getDailySpending } from "./modules/ynab/index.js";
import { BarChart } from "@mui/x-charts/BarChart";
import HomeIcon from "@mui/icons-material/Home";

function DailyChart({ day, dailyTransactions }) {
  const total = Object.values(dailyTransactions)
    .reduce((acc, current) => {
      return (acc += current);
    }, 0)
    .toFixed(2);
  return (
    <div>
      <h2>Daily spending for {day}</h2>
      <div>Total spending: ${total}</div>
      <BarChart
        xAxis={[{ data: Object.keys(dailyTransactions) }]}
        series={[
          {
            data: Object.values(dailyTransactions)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((i) => i.toFixed(2)),
            barLabel: "value",
          },
        ]}
        height={500}
        layout="vertical"
      />
    </div>
  );
}

function HomeButton({ setIsHome }) {
  return (
    <div>
      <button
        style={{
          padding: 5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
        onClick={() => setIsHome(true)}
      >
        <HomeIcon sx={{ fontSize: 14 }} /> return home
      </button>
    </div>
  );
}

function SelectAndDisplay({ range, setRange, setIsHome }) {
  const [dailySpendingMap, setDailySpendingMap] = useState(null);
  const [dates, setDates] = useState([]);
  const [day, setDay] = useState(null);
  const [dailyTransactions, setDailyTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const selectRef = useRef(null);
  const { start, end } = range;

  function getDailyTotal(dailyTransaction) {
    const [date, values] = Array.from(dailyTransaction);
    const total = Object.values(values).reduce(
      (acc, current) => (acc += current),
      0,
    );
    return `${date} - ${total.toFixed(2)}`;
  }
  useEffect(() => {
    getDailySpending(range.start, range.end)
      .then((res) => {
        setDailySpendingMap(res);
        const datesWithTotals = Array.from(res.entries()).map((i) =>
          getDailyTotal(i),
        );
        setDates(datesWithTotals);
      })
      .catch((e) => {
        cansole.log(`Error: ${e.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [range]);

  function handleDaySelection(event) {
    event.preventDefault();
    const arr = event.target.value.split("-").map((i) => i.trim());
    const year = arr[0];
    const month = arr[1];
    const day = arr[2];
    const date = `${year}-${month}-${day}`;
    setDay(date);
    setDailyTransactions(dailySpendingMap.get(date));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dailySpendingMap || dates.length === 0) {
    return (
      <div>
        <p>Nothing to display</p>
        <HomeButton setIsHome={setIsHome} />
      </div>
    );
  }

  function resetSelect() {
    if (selectRef.current) {
      selectRef.current.value = "no date selected";
      setDay(null);
      setDailyTransactions(null);
    }
  }

  return (
    <div>
      <HomeButton setIsHome={setIsHome} />
      <p>
        You have selected to see the date range between {start} and {end}:
      </p>
      <p>Select which day you would like to see:</p>
      <div>
        <select ref={selectRef} onChange={handleDaySelection}>
          <option>no date selected</option>
          {dates.map((d) => (
            <option key={d}> {d}</option>
          ))}
        </select>
        {day ? (
          <button style={{ leftPadding: 2 }} onClick={resetSelect}>
            clear
          </button>
        ) : null}
      </div>
      {day && dailyTransactions ? (
        <DailyChart day={day} dailyTransactions={dailyTransactions} />
      ) : null}
    </div>
  );
}

function SelectRange({ setRange, setIsHome }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setRange({ start: start, end: end });
    setIsHome(false);
  }
  return (
    <div>
      <p>
        Welcome to my utility application to see how you much you have been
        spending on daily basis.
      </p>
      <p>Select the start and end date of the range:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start </label>
          <input
            type="date"
            onChange={({ target }) => setStart(target.value)}
          />
        </div>
        <div>
          <label>End </label>
          <input type="date" onChange={({ target }) => setEnd(target.value)} />
        </div>
        <button>select</button>
      </form>
    </div>
  );
}
function App() {
  const [isHome, setIsHome] = useState(true);
  const [range, setRange] = useState({
    start: "",
    end: "",
  });

  return (
    <>
      <h1>Daily Spending Report</h1>

      {isHome ? (
        <SelectRange setRange={setRange} setIsHome={setIsHome} />
      ) : (
        <SelectAndDisplay
          range={range}
          setRange={setRange}
          setIsHome={setIsHome}
        />
      )}
    </>
  );
}

export default App;
