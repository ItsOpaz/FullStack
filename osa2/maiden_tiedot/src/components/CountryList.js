import React from 'react';
import ShowInfo from './ShowInfo'

const CountryList = ({xCountries, filter, setFilter}) => {

    if (xCountries.length > 10){
      return (
        'Too many matches, specify another filter'
      )
    }
    if(xCountries.length === 1){
      return (
        <ShowInfo country = {xCountries[0]}/>
      )
    }
    return (
        <ul>
        {xCountries.map(item => 
          <li key={item.name}>
            {item.name}
            <button onClick={() => setFilter(item.name.toLowerCase())}>show</button>
            </li>
        )}
        </ul>
      )   
}
export default CountryList