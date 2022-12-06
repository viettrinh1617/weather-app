import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';

const api = {
  key: "1c1ba71c0e1f46937d7d86cd908da032",
  base: "https://api.openweathermap.org/data/2.5/"
};


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState ("");
  const [weatherInfo, setWeatherInfo] = useState ("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      
      setLoading(true);
        //Process:
        try {
          const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
          const response = await fetch(url);
          const data = await response.json();
          if(response.ok)
          {setWeatherInfo(JSON.stringify(`${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp} degree Celcius`));
          setErrorMessage("");
          } else {setErrorMessage(data.message)}
        }
        catch(error) {
          setErrorMessage(error.message);
        }

      setLoading(false);
      
    }
    fetchWeatherData();
  }, [searchCity])
  

  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <input style={{height: "25px", marginLeft: "10px", width: "400px", borderRadius: "10px"}} type="text" placeholder="City" value={searchInput} onChange = {(e)=> setSearchInput(e.target.value)}></input>
        <button style={{borderRadius: "5px", color: "white", background: "darkcyan", fontWeight: "bold", padding: "5px", margin: "5px"}}>Search</button>
      </form>
      <br />
      {loading ? (<div>Loading...</div>) : (
        <>
          {errorMessage ? (<div style={{color: "red", margin: "10px"}}>{errorMessage}</div>) : (<div style={{margin: "10px"}}>{weatherInfo}</div>)}
        </>
      )}
      
    </>
  );
}

export default App;
