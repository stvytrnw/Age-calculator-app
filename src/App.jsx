import { useState, useEffect } from "react";
import ArrowIcon from "./assets/icon-arrow.svg";

function App() {
  const [days, setDays] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState(null);
  const [daysDiff, setDaysDiff] = useState(null);
  const [monthDiff, setMonthDiff] = useState(null);
  const [yearDiff, setYearDiff] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    getDaysDiff();
    getMonthsDiff();
    getYearsDiff();
  }

  useEffect(() => {
    setDaysInMonth(new Date(year, month, 0).getDate());
  }, [year, month]);

  function getDaysDiff() {
    if (new Date().getDate() < days) {
      setDaysDiff(
        new Date(year, month, 0).getDate() - (days - new Date().getDate())
      );
    } else {
      setDaysDiff(new Date().getDate() - days);
    }
  }

  function getMonthsDiff() {
    if (new Date().getDate() < days) {
      if (new Date().getMonth() + 1 < month) {
        setMonthDiff(12 - (month - new Date().getMonth()));
      } else if (new Date().getMonth() + 1 == month) {
        setMonthDiff(12 + new Date().getMonth() - month);
      } else {
        setMonthDiff(new Date().getMonth() - month);
      }
    } else {
      if (new Date().getMonth() + 1 < month) {
        setMonthDiff(12 - (month - new Date().getMonth() - 1));
      } else {
        setMonthDiff(new Date().getMonth() - month + 1);
      }
    }
  }

  function getYearsDiff() {
    if (new Date().getMonth() + 1 == month) {
      if (new Date().getDate() >= days) {
        setYearDiff(new Date().getFullYear() - year);
      } else {
        setYearDiff(new Date().getFullYear() - year - 1);
      }
    } else if (new Date().getMonth() + 1 < month) {
      setYearDiff(new Date().getFullYear() - year - 1);
    } else {
      setYearDiff(new Date().getFullYear() - year);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="input-cnt">
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
              min={1400}
              max={new Date().getFullYear()}
              required
            />
          </label>
        </div>
        <button>
          <img src={ArrowIcon} alt="Arrow" />
        </button>
      </form>
      <div className="results-cnt">
        <p>
          <span>{yearDiff != null ? yearDiff : "- -"}</span> years
        </p>
        <p>
          <span>{monthDiff != null ? monthDiff : "- -"}</span> months
        </p>
        <p>
          <span>{daysDiff != null ? daysDiff : "- -"}</span> days
        </p>
      </div>
    </main>
  );
}

export default App;
