import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [showIndex, setShowIndex] = useState(null);

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
              <button onClick={() => handleShow(index)}>
                {showIndex === index ? 'Hide' : 'Show'}
              </button>
            </p>
            {showIndex === index && (
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
              </>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default App;
