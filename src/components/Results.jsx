import React from "react";

export default function Results(props) {
  return (
    <div className="results-cnt">
      <p>
        <span>
          {Object.keys(props.items.error).length === 0 &&
          Object.keys(props.items.difference).length !== 0
            ? props.items.difference.year
            : "- -"}
        </span>{" "}
        years
      </p>
      <p>
        <span>
          {Object.keys(props.items.error).length === 0 &&
          Object.keys(props.items.difference).length !== 0
            ? props.items.difference.month
            : "- -"}
        </span>{" "}
        months
      </p>
      <p>
        <span>
          {Object.keys(props.items.error).length === 0 &&
          Object.keys(props.items.difference).length !== 0
            ? props.items.difference.day
            : "- -"}
        </span>{" "}
        days
      </p>
    </div>
  );
}
