import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({country}) => {
    const [weatherData, setWeather] = useState({current:[{temperature: 0,
        wind_speed:0 , wind_dir: "", weather_icons: ""
      }
      ]})
    
      useEffect(() => {
        axios
          .get('http://api.weatherstack.com/current', {
          params: {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
            }})
          .then(response => {
            setWeather(response.data.current)
          })
        },[])
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
                <p><b>temperature:</b> {weatherData.temperature} celsius</p>
                <img src={weatherData.weather_icons} alt="" width={100}/>
                <p><b>wind:</b> {weatherData.wind_speed}km/h direction {weatherData.wind_dir}</p>
        </div>
    )
}
export default Weather