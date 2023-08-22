import { useState } from "react";
import Input from "./Input";
import Results from "./Results";

export default function AgeCalculator() {
  const [difference, setDifference] = useState("- -");
  const [error, setError] = useState({});

  return (
    <>
      <Input items={{ setError, setDifference, error }} />
      <Results items={{ difference, error }} />
    </>
  );
}
