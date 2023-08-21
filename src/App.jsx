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
  const [error, setError] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setError({});

    if (days.length <= 0) {
      setError((prevState) => ({
        ...prevState,
        day: "This field is required.",
      }));
    } else if (days < 1 || days > daysInMonth) {
      setError((prevState) => ({ ...prevState, day: "Must be a valid day" }));
    }

    if (month.length <= 0) {
      setError((prevState) => ({
        ...prevState,
        month: "This field is required.",
      }));
    } else if (month < 1 || month > 12) {
      setError((prevState) => ({
        ...prevState,
        month: "Must be a valid month",
      }));
    }

    if (year.length <= 0) {
      setError((prevState) => ({
        ...prevState,
        year: "This field is required.",
      }));
    } else if (year > new Date().getFullYear()) {
      setError((prevState) => ({ ...prevState, year: "Must be in the past" }));
    }

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
              {error?.day !== "" && <p className="error-mssg">{error.day}</p>}
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
              {error?.month !== "" && (
                <p className="error-mssg">{error.month}</p>
              )}
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
              {error?.year !== "" && <p className="error-mssg">{error.year}</p>}
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
            <span>{Object.keys(error).length === 0 ? yearDiff : "- -"}</span>{" "}
            years
          </p>
          <p>
            <span>{Object.keys(error).length === 0 ? monthDiff : "- -"}</span>{" "}
            months
          </p>
          <p>
            <span>{Object.keys(error).length === 0 ? daysDiff : "- -"}</span>{" "}
            days
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
