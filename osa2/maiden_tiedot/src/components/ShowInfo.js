import React  from 'react';
import Weather from './Weather'

const ShowInfo = ({country}) => {

    return (
        <div>
          <h1>{country.name}</h1>
          capital {country.capital}<br/>
          population {country.population}
          <h2>languages</h2>
          <ul>
            {country.languages.map(item => {
              return <li key={item.name}>{item.name}</li>
            })}
          </ul>
          <img src = {country.flag} width = {100} alt = ''/>
          <Weather country = {country}/>
        </div>
      )
}
export default ShowInfo