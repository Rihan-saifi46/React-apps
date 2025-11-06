import React from 'react'
// import Todo from '../Components/Todo-app/Todo'
// import Temp from '../Components/Weather-app/Temp'
// import Quote from '../Components/Quote-gen/Quote'
import Nav from '../Components/Navbar+dark node/Nav'


function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <Navbar />
      <div className="pt-20 text-center text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold">Welcome to My Website</h1>
        <p className="mt-2">Responsive Navbar with Dark Mode 🌙</p>
      </div>
    </div>
  );
}




export default App
