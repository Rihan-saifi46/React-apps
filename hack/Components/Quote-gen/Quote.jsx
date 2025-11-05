import React,{useState} from 'react'
// api = "https://api.quotable.io/random"

const Quote = () => {
    const [quote, setQuote] = useState()
  return (
   <>
   <div>
   <p className='text-2xl'>my name is rihan</p>
   </div>
   <div className='flex gap-[2vw] align-middle'>
    <p className='font-bold text-3xl'>author name</p>
   <button>New Quote</button>
   </div>
   
   </>
  )
}

export default Quote
