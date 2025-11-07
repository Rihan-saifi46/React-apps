import React, { useState } from 'react'

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
      <div className={isDark1 ? "text-white text-3xl":"text-black text-3xl flex items-center"}>
        My Brand
      </div>
      <div className={isDark1 ? "text-white text-[2vw] flex gap-[2vw]":"text-black text-[1.7vw] flex gap-[3vw] "}>
        <a href="#" className='no-underline'>Home</a>
        <a href="#" className='no-underline'>About</a>
        <a href="#" className='no-underline'>Contact</a>
        <a href="#" className='no-underline'>Service</a>
      </div>
     </nav>
   </div>
   </>
  )
}

export default Pnav
