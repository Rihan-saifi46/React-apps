import React, { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react';

const Pnav = () => {
    const [isDark1, setIsDark1] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)

    const menu = () => {
        setIsOpen1(!isOpen1)
    }

    const dark = () => {
        setIsDark1(!isDark1)
    }

  return (
   <>
   <div className={isDark1 ? "bg-gray-950 min-h-screen":"bg-amber-50 min-h-screen"}>
     <nav className='flex justify-between px-[2vw] py-[.5vw] '>
      <div className='flex justify-between w-full'>
        <div className={isDark1 ? "text-white text-[2vw] sm:text-2xl":"text-black text-[2vw] flex items-center sm:text-2xl"}>
        My Brand
      </div>
      <div className={`hidden md:flex ${isDark1 ? "text-white text-[1.7vw] flex gap-[2vw]":"text-black text-[1.7vw] flex gap-[3vw] "}`}>
       {/* button  */}
         <button onClick={dark} className={`p-2 rounded-lg ${isDark1 ? "bg-gray-700 text-yellow-400":"bg-amber-50 text-black"}  `}>
            {isDark1 ? <Sun size={20}/>:<Moon size={20}/>}
        </button>
        {/* button  */}

        <a href="#" className='no-underline'>Home</a>
        <a href="#" className='no-underline'>About</a>
        <a href="#" className='no-underline'>Contact</a>
        <a href="#" className='no-underline'>Service</a>

      </div>
      
      </div>
      <div className='md:hidden flex gap-[2vw]'>
        <button onClick={dark} className={`p-2 rounded-lg ${isDark1 ? "bg-gray-700 text-yellow-400":"bg-amber-50 text-black"}  `}>
            {isDark1 ? <Sun size={20}/>:<Moon size={20}/>}
        </button>

        <button onClick={menu} className={isDark1 ? "text-gray-200":"text-gray-950"}>
        {isOpen1 ? <X size={20}/>:<Menu size={20}/>}
        </button>
     </div>

     {
      isOpen1 && (
        <div className=''>
         <div className={`md:hidden bg-amber-50 relative ${isDark1 ? "text-white text-[1.7vw] flex gap-[2vw]":"text-black text-[1.7vw] flex gap-[2vw]"}`}>
       {/* button  */}
         {/* <button onClick={dark} className={`p-2 rounded-lg ${isDark1 ? "bg-gray-700 text-yellow-400":"bg-amber-50 text-black"}  `}>
            {isDark1 ? <Sun size={20}/>:<Moon size={20}/>}
        </button> */}
        {/* button  */}
       <div className=' pt-1.5 w-screen flex flex-col text-2xl gap-[2vw] absolute top-[5vw] right-[-2vw] px-4 transition '>
        <a href="#" className='no-underline'>Home</a>
        <a href="#" className='no-underline'>About</a>
        <a href="#" className='no-underline'>Contact</a>
        <a href="#" className='no-underline'>Service</a>
       </div>
      

      </div>
        </div>
      )
     }
     </nav>
   
       <div className='max-w-7xl mx-auto px-4 py-12'>
         <h1 className={`text-4xl font-bold mb-4 ${isDark1 ? 'text-white' : 'text-gray-900'}`}>
          Welcome to My Website
        </h1>
        <p className={`text-lg ${isDark1 ? 'text-gray-300' : 'text-gray-700'}`}>
          This is a responsive navbar with dark mode toggle. Try resizing your browser window to see the mobile menu, 
          and click the sun/moon icon to toggle between light and dark modes!
        </p>
       </div>

   </div>
   </>
  )
}

export default Pnav
