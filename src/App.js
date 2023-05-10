import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b1541d1787875dbc35c0f3609b6cc7bb`;
  
  // function to connect with the api
  const searchLocation = (event) => {
    //condition to acces api only when enter key is pressed
    if(event.key === 'Enter') {
      //call to api to receive the data
      axios.get(url).then((response) => {
        setData(response.data)
      })
      //reset the input to empty string
      setLocation('');
    }
    
  }

  return (
    <div className="app">
      {/* input to acces the location */}
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {/* display the name from api json */}
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* display the temperature from api json */}
            {/* we need to check first if data.main is available and if it is we display the temp, which is a child of main; so if main does not exist temp does not exist and for that reason we use null in the condition */}
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            {/* I used toFixed() function to not display decimals  */}
          </div>
          <div className="description">
            {/* we use same condition for the same reason like we used on temp */}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {/* we use same condition for the same reason like we used on temp */}
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* we use same condition for the same reason like we used on temp */}
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {/* we use same condition for the same reason like we used on temp */}
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
