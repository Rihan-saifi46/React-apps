 import React,{useState} from 'react'

 const Temp = () => {
//   return (
//     <>
//     <div className="box max-w-[250px] flex flex-col gap-[2vw] p-[2vw] border-2">
//         <div className="input">
//             <input className='border-2 rounded' type="text" />
//         </div>
//         <div className="location text-3xl">
//             <h1>London</h1>
//         </div>
//         <div className="info flex gap-[1vw]">
//             <p>48 deg</p>
//             <p>27%</p>
//         </div>
//     </div>
//     </>
//   )
// }



  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city.trim()) return;

    const apiKey = "YOUR_API_KEY"; // 👈 yahan apni key daalni hai
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      setWeather(null);
      alert("City not found!");
      return;
    }

    setWeather({
      name: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
      wind: data.wind.speed,
      humidity: data.main.humidity,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-blue-700 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🌤️ Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          className="p-2 rounded-lg text-black w-60"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="bg-white text-black p-6 rounded-2xl shadow-xl text-center w-64">
          <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
          <p className="text-lg capitalize mb-1">
            🌥️ {weather.desc}
          </p>
          <p className="text-lg">🌡️ {weather.temp}°C</p>
          <p className="text-lg">💨 Wind: {weather.wind} km/h</p>
          <p className="text-lg">💧 Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  )
}


 export default Temp

