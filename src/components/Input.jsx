import { useState, useEffect } from "react";
import ArrowIcon from "../icon-arrow.svg";

export default function Input(props) {
  const [days, setDays] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.items.setError({});

    if (days.length <= 0) {
      props.items.setError((prevState) => ({
        ...prevState,
        day: "This field is required.",
      }));
    } else if (days < 1 || days > daysInMonth) {
      props.items.setError((prevState) => ({
        ...prevState,
        day: "Must be a valid day",
      }));
    } else if (
      new Date().getMonth() + 1 <= month &&
      new Date().getFullYear() == year &&
      new Date().getDate() < days
    ) {
      props.items.setError((prevState) => ({
        ...prevState,
        day: "Must be in the past",
      }));
    }

    if (month.length <= 0) {
      props.items.setError((prevState) => ({
        ...prevState,
        month: "This field is required.",
      }));
    } else if (month < 1 || month > 12) {
      props.items.setError((prevState) => ({
        ...prevState,
        month: "Must be a valid month",
      }));
    } else if (
      new Date().getMonth() + 1 < month &&
      new Date().getFullYear() == year
    ) {
      props.items.setError((prevState) => ({
        ...prevState,
        month: "Must be in the past",
      }));
    }

    if (year.length <= 0) {
      props.items.setError((prevState) => ({
        ...prevState,
        year: "This field is required.",
      }));
    } else if (year > new Date().getFullYear()) {
      props.items.setError((prevState) => ({
        ...prevState,
        year: "Must be in the past",
      }));
    }

    getDifference();
  }

  useEffect(() => {
    setDaysInMonth(new Date(year, month, 0).getDate());
  }, [year, month]);

  function getDifference() {
    props.items.setDifference({});

    if (new Date().getDate() < days) {
      props.items.setDifference((prevState) => {
        return {
          ...prevState,
          day:
            new Date(year, month, 0).getDate() - (days - new Date().getDate()),
        };
      });
    } else {
      props.items.setDifference((prevState) => {
        return { ...prevState, day: new Date().getDate() - days };
      });
    }

    if (new Date().getDate() < days) {
      if (new Date().getMonth() + 1 < month) {
        props.items.setDifference((prevState) => {
          return { ...prevState, month: 12 - (month - new Date().getMonth()) };
        });
      } else if (new Date().getMonth() + 1 == month) {
        props.items.setDifference((prevState) => {
          return { ...prevState, month: 12 + new Date().getMonth() - month };
        });
      } else {
        props.items.setDifference((prevState) => {
          return { ...prevState, month: new Date().getMonth() - month };
        });
      }
    } else {
      if (new Date().getMonth() + 1 < month) {
        props.items.setDifference((prevState) => {
          return {
            ...prevState,
            month: 12 - (month - new Date().getMonth() - 1),
          };
        });
      } else {
        props.items.setDifference((prevState) => {
          return { ...prevState, month: new Date().getMonth() - month + 1 };
        });
      }
    }

    if (new Date().getMonth() + 1 == month) {
      if (new Date().getDate() >= days) {
        props.items.setDifference((prevState) => {
          return { ...prevState, year: new Date().getFullYear() - year };
        });
      } else {
        props.items.setDifference((prevState) => {
          return { ...prevState, year: new Date().getFullYear() - year - 1 };
        });
      }
    } else if (new Date().getMonth() + 1 < month) {
      props.items.setDifference((prevState) => {
        return { ...prevState, year: new Date().getFullYear() - year - 1 };
      });
    } else {
      props.items.setDifference((prevState) => {
        return { ...prevState, year: new Date().getFullYear() - year };
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-cnt">
        <label>
          <p
            className="description"
            style={
              Object.keys(props.items.error).length !== 0
                ? { color: "var(--light-red)" }
                : {}
            }
          >
            DAY
          </p>
          <input
            onChange={(e) => setDays(e.target.value)}
            type="number"
            name="day"
            placeholder="DD"
            value={days}
            style={
              Object.keys(props.items.error).length !== 0
                ? { borderColor: "var(--light-red)" }
                : {}
            }
          />
          {props.items.error?.day !== "" && (
            <p className="error-mssg">{props.items.error.day}</p>
          )}
        </label>

        <label>
          <p
            className="description"
            style={
              Object.keys(props.items.error).length !== 0
                ? { color: "var(--light-red)" }
                : {}
            }
          >
            MONTH
          </p>
          <input
            onChange={(e) => setMonth(e.target.value)}
            type="number"
            name="day"
            placeholder="MM"
            value={month}
            style={
              Object.keys(props.items.error).length !== 0
                ? { borderColor: "var(--light-red)" }
                : {}
            }
          />
          {props.items.error?.month !== "" && (
            <p className="error-mssg">{props.items.error.month}</p>
          )}
        </label>
        <label>
          <p
            className="description"
            style={
              Object.keys(props.items.error).length !== 0
                ? { color: "var(--light-red)" }
                : {}
            }
          >
            YEAR
          </p>
          <input
            onChange={(e) => setYear(e.target.value)}
            type="number"
            name="day"
            placeholder="YYYY"
            value={year}
            style={
              Object.keys(props.items.error).length !== 0
                ? { borderColor: "var(--light-red)" }
                : {}
            }
          />
          {props.items.error?.year !== "" && (
            <p className="error-mssg">{props.items.error.year}</p>
          )}
        </label>
      </div>
      <div className="button-cnt">
        <div className="line"></div>
        <button>
          <img src={ArrowIcon} alt="Arrow" />
        </button>
      </div>
    </form>
  );
}
