import React,{useState} from 'react'
// api = "https://api.quotable.io/random"

const Quote = () => {
    const [quote, setQuote] = useState()

    const Generator = async () => {
     try {
        const res = await fetch('https://api.quotable.io/random')
        const data = await res.json()
        
        setQuote(data)
        console.log(data);      

     } catch (error) {
        console.log("quote not found");
        setQuote({content:"failed to load quote",authoe:"unknown"})
     }
    }
  return (
   <>
   {
    quote ? (
         <div>
   <p className='text-2xl'>rihan</p>
   </div>
    ): (  <div className='flex gap-[2vw] align-middle'>
    <p className='font-bold text-3xl'>author name</p>
   <button className='p-[1vw] rounded border-2' 
   onClick={Generator}>click to generate quote</button>
   </div>
   
   )}
  <button>New Quote</button>
 
   
   
   </>
  )
}

export default Quote
