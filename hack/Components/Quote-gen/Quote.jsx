import React, { useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState(null);

  const Generator = async () => {
    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote(data);
      console.log(data);
    } catch (error) {
      console.log("quote not found");
      setQuote({ content: "Failed to load quote", author: "Unknown" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[70vw] max-w-xl">
        {quote ? (
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
