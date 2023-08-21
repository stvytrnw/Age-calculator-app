import { useState, useEffect } from "react";
import ArrowIcon from "./assets/icon-arrow.svg";

function App() {
  const [days, setDays] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState("");
  const [daysDiff, setDaysDiff] = useState("");
  const [monthDiff, setMonthDiff] = useState("");
  const [yearDiff, setYearDiff] = useState("");
  const [errorDay, setErrorDay] = useState("");
  const [errorMonth, setErrorMonth] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [errorStatusDays, setErrorStatusDays] = useState(true);
  const [errorStatusMonth, setErrorStatusMonth] = useState(true);
  const [errorStatusYear, setErrorStatusYear] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (days.length <= 0) {
      setErrorDay("This field is required.");
      setDaysDiff("")
      setErrorStatusDays(true)
    } else if (days < 1 || days > daysInMonth) {
      setErrorDay("Must be a valid day");
      setDaysDiff("")
      setErrorStatusDays(true)
    } else if (days.length >= 0) {
      setErrorDay("");
      setErrorStatusDays(false)
    }

    if (month.length <= 0) {
      setErrorMonth("This field is required.");
      setMonthDiff("")
      setErrorStatusMonth(true)
    } else if (month < 1 || month > 12) {
      setErrorMonth("Must be a valid month");
      setMonthDiff("")
      setErrorStatusMonth(true)
    } else if (month.length >= 0) {
      setErrorMonth("");
      setErrorStatusMonth(false)
    }

    if (year.length <= 0) {
      setErrorYear("This field is required.");
      setYearDiff("")
      setErrorStatusYear(true)
    } else if (year > new Date().getFullYear()) {
      setErrorYear("Must be in the past");
      setYearDiff("")
      setErrorStatusYear(true)
    } else if (year.length >= 0) {
      setErrorYear("");
      setErrorStatusYear(false)
    }
  }

  useEffect(() => {
    if(!errorStatusDays && !errorStatusMonth && !errorStatusYear) {
        getDaysDiff();
        getMonthsDiff();
        getYearsDiff();
    }

  }, [errorStatusDays, errorStatusMonth, errorStatusYear])

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
      <div className="main-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-cnt">
            <label>
              <p className="description">DAY</p>
              <input
                onChange={(e) => setDays(e.target.value)}
                type="number"
                name="day"
                placeholder="DD"
                value={days}
              />
              {errorDay && <p className="error-mssg">{errorDay}</p>}
            </label>

            <label>
            <p className="description">MONTH</p>
              <input
                onChange={(e) => setMonth(e.target.value)}
                type="number"
                name="day"
                placeholder="MM"
                value={month}
              />
              {errorMonth && <p className="error-mssg">{errorMonth}</p>}
            </label>
            <label>
            <p className="description">YEAR</p>
              <input
                onChange={(e) => setYear(e.target.value)}
                type="number"
                name="day"
                placeholder="YYYY"
                value={year}
              />
              {errorYear && <p className="error-mssg">{errorYear}</p>}
            </label>
          </div>
          <div className="button-cnt">
            <div className="line"></div>
            <button>
              <img src={ArrowIcon} alt="Arrow" />
            </button>
          </div>
        </form>
        <div className="results-cnt">
          <p>
            <span>{yearDiff != "" ? yearDiff : "- -"}</span> years
          </p>
          <p>
            <span>{monthDiff != "" ? monthDiff : "- -"}</span> months
          </p>
          <p>
            <span>{daysDiff != "" ? daysDiff : "- -"}</span> days
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
