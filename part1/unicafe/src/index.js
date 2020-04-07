import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h2>{text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>)

const Stat = ({text, value}) => <p>{text} {value}</p>
const Percent = ({text, value}) => <p>{text} {value} %</p>

const percent = function(v, total) {
  return total === 0 ? 0 : (100 * v / total)
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
    <Stat text="good" value={good} />
    <Stat text="neutral" value={neutral} />
    <Stat text="bad" value={bad} />
    <Stat text="all" value={good + neutral + bad} />
    <Stat text="average" value={(good - bad)/3} />
    <Percent text="positive" value={percent(good, good + neutral + bad)} />
  </div>)
}

ReactDOM.render(<App />, document.getElementById('root'))
