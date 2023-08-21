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
  const [errorDay, setErrorDay] = useState("")
  const [errorMonth, setErrorMonth] = useState("")
  const [errorYear, setErrorYear] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    
    console.log(days.length)

    if(days.length <= 0) {
      setErrorDay("This field is required.")
    } else if (days < 1 || days > daysInMonth){
      setErrorDay("Must be a valid day")
    } else if (days.length >= 0){
      setErrorDay("")
    }

    if(month.length <= 0) {
      setErrorMonth("This field is required.")
    } else if (month < 1 || month > 12){
      setErrorMonth("Must be a valid month")
    } else if (month.length >= 0){
      setErrorMonth("")
    }

    if(year.length <= 0) {
      setErrorYear("This field is required.")
    } else if (year > new Date().getFullYear()){
      setErrorYear("Must be in the past")
    } else if (year.length >= 0){
      setErrorYear("")
    }

    if(errorDay === "") {
      getDaysDiff();
      getMonthsDiff();
      getYearsDiff();
    }


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
              DAY
              <input
                onChange={(e) => setDays(e.target.value)}
                type="number"
                name="day"
                placeholder="DD"
                value={days}
              />
              {errorDay && <p>{errorDay}</p>}
            </label>
            
            <label>
              MONTH
              <input
                onChange={(e) => setMonth(e.target.value)}
                type="number"
                name="day"
                placeholder="MM"
                value={month}
              />
              {errorMonth && <p>{errorMonth}</p>}
            </label>
            <label>
              YEAR
              <input
                onChange={(e) => setYear(e.target.value)}
                type="number"
                name="day"
                placeholder="YYYY"
                value={year}
              />
              {errorYear && <p>{errorYear}</p>}
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
            <span>{yearDiff != null ? yearDiff : "- -"}</span> years
          </p>
          <p>
            <span>{monthDiff != null ? monthDiff : "- -"}</span> months
          </p>
          <p>
            <span>{daysDiff != null ? daysDiff : "- -"}</span> days
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
