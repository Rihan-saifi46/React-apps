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
     <nav className='flex justify-between px-[1vw]'>
      <div className={isDark1 ? "text-white text-3xl":"text-black text-3xl"}>
        My Brand
      </div>
      <div className={isDark1 ? "text-white text-[2vw]":"text-black text-[2vw]"}>
        <a href="#" className=''>Home</a>
      </div>
     </nav>
   </div>
   </>
  )
}

export default Pnav
