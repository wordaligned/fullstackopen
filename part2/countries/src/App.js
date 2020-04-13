import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const getMatches = (countries, search) => (
  countries.filter((country) => 
    country.name.search(new RegExp(search, "i")) !== -1))

const Search = ({searchHandler}) => (
  <div>find countries: <input onChange={searchHandler} /></div>)

const Languages = ({languages}) => (
  <div>
    <h3>languages</h3>
    <ul>{languages.map(
      (lang) => <li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
  </div>
)

const Weather = ({country, weather}) => {
  if ('location' in weather && 
      country.capital === weather.location.name)
    return (<div>
      <h3>Weather in {country.capital}</h3>
      <p><em>temperature:</em> {weather.current.temperature}</p>
      <img src={weather.current.weather_icons[0]} alt='weather icon' />
      <p><em>wind:</em> {weather.current.wind_speed} {weather.current.wind_dir}</p>
      </div>)
  else
    return null
}

const Country = ({country, weather}) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <Languages languages={country.languages} />
    <img width={200} src={country.flag} alt={country.name + ' flag'} />
    <Weather country={country} weather={weather} />
  </div>
)

const SelectCountry = ({country, selectHandler}) => (
  <li>{country.name} <button onClick={() => selectHandler(country)}>show</button></li>
)

const Matches = ({countries, search, selectHandler}) => {
  const matches = getMatches(countries, search)
  return search.length === 0
    ? <span></span>
    : matches.length > 10
    ? <p>Too many matches</p>
    : <ul>{matches.map((country) =>
          <SelectCountry 
            key={country.alpha2Code} 
            country={country}
            selectHandler={selectHandler}/>)}
      </ul>
}

const Content = ({countries, search, selectHandler, weather}) => {
  const matches = getMatches(countries, search)
  if (matches.length === 1)
    return <Country country={matches[0]} weather={weather} />
  else
    return <Matches countries={countries} search={search} selectHandler={selectHandler} />
}

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState({})
  const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const matches = getMatches(countries, search)
    if (matches.length === 1)
    {
      const country = matches[0]
      axios
        .get('http://api.weatherstack.com/current?access_key='
             + `${api_key}&query=${country.capital}`)
        .then(response => setWeather(response.data))
    }
  }, [api_key, search, countries])

  const searchHandler = (event) => setSearch(event.target.value)
  const selectHandler = (country) => setSearch(country.name)

  return (
    <div>
      <h1>Countries</h1>
      <Search searchHandler={searchHandler} />
      <Content
        countries={countries}
        search={search}
        selectHandler={selectHandler}
        weather={weather} />
    </div>
  )
}

export default App;
