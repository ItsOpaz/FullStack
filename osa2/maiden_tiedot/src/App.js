import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Filter from './components/Filter';
import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCountry] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  const xCountries = countries.filter(function(item) {
    const check = item.name.toLowerCase();
    if(check.includes(filter)){
      return item.name
        }return null
      })

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  return (
    <div>
      <Filter
        handleFilterChange = {handleFilterChange}
      />
      <CountryList
        xCountries = {xCountries}
        filter = {filter}
        setFilter = {setFilter}
      />
    </div>
  );
}

export default App;
