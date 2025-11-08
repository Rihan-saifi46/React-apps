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
     <nav className='flex justify-between px-[2vw] py-[.5vw] shadow-lg shadow-black-500/50'>
      <div className='flex justify-between w-full'>
        <div className={isDark1 ? "text-white text-3xl sm:text-2xl":"text-black text-[2vw] flex items-center sm:text-2xl"}>
        My Brand
      </div>
      <div className={`hidden md:flex ${isDark1 ? "text-white text-[2vw] flex gap-[2vw]":"text-black text-[1.7vw] flex gap-[3vw] "}`}>
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
        <div >
         <div className={`md:hidden  ${isDark1 ? "text-white text-[2vw] flex gap-[2vw]":"text-black text-[1.7vw] flex gap-[3vw] "}`}>
       {/* button  */}
         {/* <button onClick={dark} className={`p-2 rounded-lg ${isDark1 ? "bg-gray-700 text-yellow-400":"bg-amber-50 text-black"}  `}>
            {isDark1 ? <Sun size={20}/>:<Moon size={20}/>}
        </button> */}
        {/* button  */}

        <a href="#" className='no-underline'>Home</a>
        <a href="#" className='no-underline'>About</a>
        <a href="#" className='no-underline'>Contact</a>
        <a href="#" className='no-underline'>Service</a>

      </div>
        </div>
      )
     }
     </nav>

     
   </div>
   </>
  )
}

export default Pnav
