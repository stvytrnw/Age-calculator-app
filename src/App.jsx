import { useState, useEffect } from "react";

function App() {
  const [days, setDays] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState(null);

  function handleSubmit(e) {
    e.preventDefault()
  }

  const date = new Date()

  useEffect(() => {
    setDaysInMonth(new Date(year, month, 0).getDate())
    console.log(daysInMonth)
  }, [year, month])


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          DAY
          <input
            onChange={(e) => setDays(e.target.value)}
            type="number"
            name="day"
            placeholder="DD"
            value={days}
            min={0}
            max={daysInMonth}
            required
          />
        </label>
        <label>
          MONTH
          <input
          onChange={(e) => setMonth(e.target.value)}
            type="number"
            name="day"
            placeholder="MM"
            value={month}
            min={0}
            max={12}
            required
          />
        </label>
        <label>
          YEAR
          <input
          onChange={(e) => setYear(e.target.value)}
            type="number"
            name="day"
            placeholder="YYYY"
            value={year}
            min={0}
            max={date.getFullYear()}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="results-cnt">
        <p></p>
        <p></p>
        <p></p>
      </div>
    </main>
  );
}

export default App;
