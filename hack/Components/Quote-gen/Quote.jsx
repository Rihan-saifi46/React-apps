// import React, { useState } from "react";

// const Quote = () => {
//   const [quote, setQuote] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const Generator = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://zenquotes.io/api/random");
//       if (!response.ok) throw new Error("Network response was not ok");
//       const data = await response.json();
//       setQuote(data);
//     } catch (error) {
//       console.error("Error fetching quote:", error);
//       setQuote({ content: "Failed to load quote", author: "Unknown" });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[70vw] max-w-xl">
//         {loading ? (
//           <p className="text-gray-400 mb-6">Loading...</p>
//         ) : quote ? (
//           <>
//             <p className="text-xl italic mb-4">“{quote.content}”</p>
//             <p className="font-bold text-lg mb-6">- {quote.author}</p>
//           </>
//         ) : (
//           <p className="text-gray-400 mb-6">
//             Click below to generate your first quote!
//           </p>
//         )}

//         <button
//           onClick={Generator}
//           className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition"
//         >
//           New Quote
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Quote;

import React, { useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const Generator = async () => {
    setLoading(true);
    try {
      // ✅ Using zenquotes.io (works globally)
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();

      // API returns an array, so we take first element [0]
      setQuote({
        content: data[0].q,
        author: data[0].a,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Failed to load quote", author: "Unknown" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[70vw] max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Random Quote Generator</h1>

        {loading ? (
          <p className="text-gray-400 mb-6">Loading...</p>
        ) : quote ? (
          <>
            <p className="text-xl italic mb-4">“{quote.content}”</p>
            <p className="font-bold text-lg mb-6">- {quote.author}</p>
          </>
        ) : (
          <p className="text-gray-400 mb-6">
            Click below to generate your first quote!
          </p>
        )}

        <button
          onClick={Generator}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition"
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default Quote;
