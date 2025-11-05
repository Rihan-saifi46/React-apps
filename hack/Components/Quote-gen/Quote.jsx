import React,{useState} from 'react'
// api = "https://api.quotable.io/random"

const Quote = () => {
    const [quote, setQuote] = useState()

    const Generator = async () => {
     try {
        const fetch = await fetch('https://api.quotable.io/random')
        const data = fetch.json()
        
        setQuote(data)
        console.log(quote);      

     } catch (error) {
        console.log("quote not found");
        setQuote({content:"failed to load quote",authoe:"unknown"})
     }
    }
  return (
   <>
   <div>
   <p className='text-2xl'>rihan</p>
   </div>
   <div className='flex gap-[2vw] align-middle'>
    <p className='font-bold text-3xl'>author name</p>
   <button className='p-[1vw] rounded border-2' 
   onClick={Generator}>New Quote</button>
   </div>
   
   </>
  )
}

export default Quote
