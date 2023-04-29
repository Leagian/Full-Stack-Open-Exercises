import { useState } from "react";

const Buttons = ({ handleClick, text }) => {
  return (
    <div className="buttons">
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div className="stats">
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />
          <StatisticLine text="Neutral:" value={neutral} />
          <StatisticLine text="Bad:" value={bad} />
          <StatisticLine text="All:" value={total} />
          <StatisticLine text="Average:" value={average.toFixed(2)} />
          <StatisticLine text="Positive:" value={`${positive.toFixed(2)}%`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feeback</h1>
      <Buttons handleClick={addGood} text="Good" />
      <Buttons handleClick={addNeutral} text="Neutral" />
      <Buttons handleClick={addBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
