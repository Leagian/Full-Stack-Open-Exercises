import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

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

  return (
    <>
      <label>
        find countries <input onChange={handleCountryChange} value={search} />
      </label>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countriesToShow.map((country) =>
          countriesToShow.length === 1 ? (
            <div key={country.cca3}>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital}</p>
              <p>Area {country.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={country.cca3}>{language}</li>
                ))}
              </ul>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
          ) : (
            <p key={country.cca3}>{country.name.common}</p>
          )
        )
      )}
    </>
  );
};
export default App;
