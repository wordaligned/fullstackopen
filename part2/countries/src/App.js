import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const Search = ({setSearch}) => (
  <div>find countries:
    <input onChange={
      (event) => setSearch(event.target.value)} />
  </div>)

const Languages = ({languages}) => (
  <div>
  <h3>languages</h3>
  <ul>{languages.map(
    (lang) => <li key={lang.iso639_1}>{lang.name}</li>)}
  </ul>
  </div>
)

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <Languages languages={country.languages} />
    <img width={200} src={country.flag} alt={country.name + ' flag'} />
  </div>
)

const Matches = ({countries, search}) => {
  const matches = countries.filter(
    (country) => (
      country.name.search(new RegExp(search, "i")) !== -1))
  return search.length === 0
    ? <span></span>
    : matches.length > 10
    ? <p>Too many matches</p>
    : matches.length === 1 
    ? <Country country={matches[0]} />
    : <ul>
      {matches.map((country) => <li key={country.alpha2Code}>{country.name}</li>)}
      </ul>
}

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <h1>Countries</h1>
      <Search setSearch={setSearch} />
      <Matches countries={countries} search={search} />
    </div>
  )
}

export default App;
