import { useEffect, useState } from 'react';

import axios from 'axios'

const Filter = ({ country, handleCountryChange }) => {
  return (
    <div>
      <h2>Search for a country</h2>
      <input
        value={country}
        onChange={handleCountryChange}
      />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}.</p>
      <p>Population: {country.population}.</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(x => <li key={x}>{x}</li>)}
      </ul>
      <h3>Flag</h3>
      <img src={country.flag} alt={"Flag of " + country.name} width="150" />
    </div>
  )
}

const CountryLine = ({ country, index, handleSelectCountry }) => {
  return (
    <>
      <p >{country.name} <button onClick={() => handleSelectCountry(index)}>show</button></p>
    </>
  )
}

const Weather = ({ country }) => {
  const API_KEY = process.env.REACT_APP_KEY
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}&units=metric`
  //const iconUrl = `http://openweathermap.org/img/wn/10d@2x.png`
  const iconUrl = "http://openweathermap.org/img/wn/"

  const [wdata, setWdata] = useState(null)

  useEffect(() => {
    console.log('Using key: ', API_KEY)
    axios
      .get(weatherUrl)
      .then(response => {
       // console.log("Got:", response.data)
        setWdata(
          {
            description: response.data.weather[0].description,
            temperature: response.data.main.temp,
            windSpeed: response.data.wind.speed,
            icon: response.data.weather[0].icon
          })
      })
      .catch(error => { 
        console.log('No weather: ', error.message)
        setWdata(null)
      })
  }, [country, weatherUrl, API_KEY])

  if(wdata) {
    return (
      <div>
        <h3>Weather in {country.name}, in capital {country.capital}</h3>
        <p>General description: {wdata.description}.</p>
        {wdata.icon && <img src={iconUrl + wdata.icon + "@2x.png"} alt="weather icon" />}
        <p>Temperature in {country.capital}: {wdata.temperature} C.</p>
        <p>Wind speed: {wdata.windSpeed} m/s.</p>
      </div>
    )
  } else {
    return(
      <div>
        <h3>No weather data available</h3>
      </div>
    )
  }
}


const App = () => {

  const [countryName, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selected, setSelected] = useState([])


  const handleCountryChange = (event) => {
    let newCountry = event.target.value
    setCountry(newCountry)
    //console.log(newCountry)
    if (allCountries.length === 0) {
      return
    }

    let suitableCountries = []
    allCountries.forEach((x, index) => {

      const countryName = x.name.toLowerCase()
      const newCountryName = newCountry.toLowerCase()

      if (countryName.includes(newCountryName)) {
        suitableCountries = suitableCountries.concat(index)
      }
    })

    //console.log("found count ", suitableCountries.length)
    //console.log("SU", suitableCountries)
    if (suitableCountries.length === 0) {
      setSelected([])
    } else {
      setSelected(suitableCountries)
    }
  }

  const handleSelectCountry = (index) => {
    setSelected([index])
    setCountry(allCountries[index].name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data.map(x => {
          return (
            {
              name: x.name,
              capital: x.capital,
              population: x.population,
              languages: x.languages.map(y => y.name),
              flag: x.flag
            }
          )
        })
        console.log(`Got ${countries.length} countries.`)
        setAllCountries(countries)
      })
  }, [])

  const renderSelectedCountries = () => {

    if (selected.length === 0) {
      return (<p>Please write another search criteria.</p>)
    }
    if (selected.length === 1) {
      let country = allCountries[selected]
      return (
        <div>
          <Country country={country} />
          <Weather country={country} />
        </div>)
    }

    if (selected.length < 10) {
      return (
        <div>{
          selected.map(x =>
            <CountryLine key={x}
              country={allCountries[x]}
              index={x}
              handleSelectCountry={handleSelectCountry} />
          )}
        </div>
      )
    }

    return(
      <div>
        <p>Too many countries to show. Specify another filter.</p>
      </div>
    )
  }

  return (
    <div >
      <Filter country={countryName} handleCountryChange={handleCountryChange} />
      <p>Found countries {selected.length}.</p>
      {renderSelectedCountries()}
    </div>
  )
}

export default App;