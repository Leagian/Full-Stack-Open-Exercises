import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [showIndex, setShowIndex] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountryChange = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow =
    search === ''
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    if (countriesToShow.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${countriesToShow[0].capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [countriesToShow, api_key]);

  const handleShow = (index) => {
    setShowIndex(showIndex === index ? null : index);
  };

  return (
    <>
      <label>
        find countries <input onChange={handleCountryChange} value={search} />
      </label>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countriesToShow.map((country, index) => (
          <div key={country.cca3}>
            <p>
              {country.name.common}{' '}
              {countriesToShow.length > 1 && (
                <button onClick={() => handleShow(index)}>
                  {showIndex === index ? 'Hide' : 'Show'}
                </button>
              )}
            </p>
            {(showIndex === index || countriesToShow.length === 1) && (
              <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h3>Languages</h3>
                <ul>
                  {Object.values(country.languages).map(
                    (language, languageIndex) => (
                      <li key={languageIndex}>{language}</li>
                    )
                  )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
                {countriesToShow.length === 1 && weather && (
                  <>
                    <h1>Weather in {weather.name}</h1>
                    <p>Temperature {weather.main.temp}</p>
                    <img
                      src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                    />
                    <p>Wind {weather.wind.speed} m/s</p>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default App;
