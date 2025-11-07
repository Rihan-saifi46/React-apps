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
    
   </div>
   </>
  )
}

export default Pnav
