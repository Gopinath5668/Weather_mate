import React from 'react';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState('');
  // const [result, setResult] = useState('');
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const changeHandler = e => {
    setCity(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).then(
      response => response.json()
    ).then(data => {
      const kelvin = data.main.temp;
      const celsius = kelvin - 273.15;
      const fahrenheit = (celsius * 9/5) + 32;
      setCelsius("Tempature at" + " " + city + " " + "is" + " " + Math.round(celsius) + " " + "°C" + " " + "or" + " " + Math.round(fahrenheit) + " " + "°F");
      setFahrenheit(fahrenheit);
    })
  }

  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700">🌤️ Weather App</h1>
          <p className="text-gray-600 mt-2">Enter a city to see its current temperature.</p>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <input type="text" value={city} onChange={changeHandler} placeholder="e.g., Tirupati" className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"/>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 rounded-lg transition duration-300">
            🌡️ Get Temperature 
          </button>
        </form>
        {celsius && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{celsius}</h2>
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default App