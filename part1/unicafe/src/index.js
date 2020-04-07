import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const percent = function(v, total) {
  return total === 0 ? 0 : (100 * v / total)
}

const Header = ({text}) => <h2>{text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>)
  
const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  if (total === 0)
  {
    return <p>No feedback given</p>
  }
  else
  {
    return (
      <table>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={(good - bad)/total} />
        <Statistic text="positive" value={percent(good, total)+"%"} />
      </table>)
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
  <div>
    <Header text="give feedback" />
    <Button text="good" onClick={() => setGood(good + 1)} />
    <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
    <Button text="bad" onClick={() => setBad(bad + 1)} />
    <Header text="statistics" />
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>)
}

ReactDOM.render(<App />, document.getElementById('root'))
