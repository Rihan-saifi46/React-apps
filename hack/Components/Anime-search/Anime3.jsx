// ✅ Anime Style UI + Dark Mode + Complete Redesign
// 🎌 Bold colors, emojis, gradients, shadows, and anime aesthetics

import React, { useState } from "react";

export default function AnimeSearchApp3() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  async function handleSearch(e) {
    e && e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setErr(null);
    setSelected(null);
    setEpisodes([]);
    try {
      const resp = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`);
      if (!resp.ok) throw new Error(`API error: ${resp.status}`);
      const data = await resp.json();
      setResults(data.data || []);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }
   async function openAnime(anime) {
    setSelected(anime);
    setEpisodes([]);
    setLoading(true);
    setErr(null);
    try {
      const epRes = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes`);
      if (!epRes.ok) throw new Error(`Episodes API error: ${epRes.status}`);
      const epData = await epRes.json();
      setEpisodes(epData.data || []);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }
   return (
    <div className={`${darkMode ? "dark" : ""}`}> 
      <div className="min-h-screen p-6 transition-all duration-300 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900"> 

        {/* 🌙 Dark Mode Toggle - Anime Style */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-5 right-5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-pink-600 dark:to-orange-500 text-white px-5 py-3 rounded-full shadow-2xl hover:scale-110 transition-all z-50 font-bold"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
 <div className="max-w-6xl mx-auto dark:text-white"> 
          {/* 🎌 Anime-Style Header */}
          <header className="mb-8 text-center">
            <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl mb-3 animate-pulse">
              ⚡ Anime Finder ⚡
            </h1>
            <p className="text-base text-slate-700 dark:text-slate-300 font-bold tracking-wide">
              🎌 Discover Your Next Favorite Anime 🎌
            </p>
          </header>
           {/* 🔍 Search Bar - Anime Style */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              className="flex-1 p-5 rounded-2xl border-4 border-purple-400 dark:border-pink-500 dark:bg-slate-800 dark:text-white shadow-2xl focus:ring-4 focus:ring-purple-400 dark:focus:ring-pink-400 transition-all font-bold text-lg placeholder-purple-400 dark:placeholder-pink-400"
              placeholder="🔍 Search anime... (e.g., Naruto, One Piece)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              className="px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl shadow-2xl hover:scale-110 hover:shadow-pink-500/50 transition-all font-black text-lg" 
              type="submit"
            >
                  Search 🚀
            </button>
          </form>

          {/* Loading & Error States */}
          {loading && (
            <div className="mb-6 text-center text-2xl font-black text-purple-600 dark:text-pink-400 animate-bounce">
              ⏳ Loading your anime...
            </div>
          )}
           {err && (
            <div className="mb-6 text-red-600 font-bold text-center bg-red-100 dark:bg-red-900/50 p-4 rounded-2xl shadow-lg border-2 border-red-400">
              ❌ Error: {err}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 📺 Results Panel - Anime Style */}
            <div className="lg:col-span-2">
              <h2 className="font-black text-2xl mb-4 text-purple-700 dark:text-pink-400 flex items-center gap-2">
                📺 Search Results
              </h2>
               {results.length === 0 && (
                <div className="text-center bg-white/50 dark:bg-slate-800/50 p-8 rounded-2xl shadow-xl border-4 border-dashed border-purple-300 dark:border-pink-500">
                  <div className="text-6xl mb-3">🔍</div>
                  <div className="font-bold text-lg text-slate-600 dark:text-slate-300">
                    Search to begin your anime journey!
                  </div>
                </div>
              )}
               <div className="space-y-5">
                {results.map((anime) => (
                  <div 
                    key={anime.mal_id} 
                    className="flex gap-5 p-5 bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-slate-800 dark:via-purple-900/30 dark:to-slate-700 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-4 border-purple-300 dark:border-pink-600 group"
                  >
                    <img 
                      src={anime.images.jpg.image_url} 
                      alt={anime.title} 
                      className="w-28 h-40 object-cover rounded-xl shadow-lg border-4 border-purple-400 dark:border-pink-500 group-hover:scale-110 transition-all" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-3">
                          <div className="font-black text-xl dark:text-white mb-2 text-purple-800 dark:text-pink-300">
                            {anime.title}
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {anime.synopsis ? anime.synopsis.slice(0, 150) + "..." : "No synopsis available"}
                          </div>
                        </div>
                         <button
                          onClick={() => openAnime(anime)}
                          className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-black hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/50 transition-all whitespace-nowrap"
                        >
                          ▶️ OPEN
                        </button>
                      </div>
                        <div className="flex gap-4 mt-3 text-sm font-bold">
                        <span className="px-3 py-1 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full">
                          🎬 {anime.type || "N/A"}
                        </span>
                        <span className="px-3 py-1 bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-200 rounded-full">
                          📺 {anime.episodes || "?"} episodes
                        </span>
                         <span className="px-3 py-1 bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 rounded-full">
                          ⭐ {anime.score || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             {/* 📋 Details Panel - Anime Style */}
            <aside className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/30 p-6 rounded-2xl shadow-2xl border-4 border-purple-300 dark:border-pink-600 sticky top-6 h-fit">
              <h2 className="font-black text-2xl mb-4 text-purple-700 dark:text-pink-400">
                📋 Details
              </h2>
              
              {!selected && (
                <div className="text-center p-8">
                  <div className="text-6xl mb-3">👆</div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Select an anime to see details!
                  </div>
                </div>
              )}
               {selected && (
                <div className="space-y-5">
                  {/* Anime Card */}
                  <div className="flex gap-4 mb-4">
                    <img 
                      src={selected.images.jpg.image_url} 
                      alt={selected.title} 
                      className="w-32 h-44 object-cover rounded-xl shadow-lg border-4 border-purple-400 dark:border-pink-500" 
                    />
                    <div>
                      <div className="font-black text-lg dark:text-white mb-2 text-purple-800 dark:text-pink-300">
                        {selected.title}
                      </div>
                      <div className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2">
                        ⭐ Score: {selected.score || "N/A"}
                      </div>
                      <a 
                        className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline block" 
                        href={selected.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔗 Open on MAL →
                      </a>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="bg-purple-100 dark:bg-slate-700 p-4 rounded-xl">
                    <div className="font-black mb-2 text-purple-700 dark:text-pink-400">📖 Synopsis</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selected.synopsis || "No synopsis available."}
                    </div>
                  </div>
                    {/* Where to Watch */}
                  <div className="bg-pink-100 dark:bg-slate-700 p-4 rounded-xl">
                    <div className="font-black mb-3 text-pink-700 dark:text-pink-400">🎥 Where to Watch</div>
                    <div className="space-y-2">
                      <a 
                        href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(selected.title)}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:scale-105 transition-all text-center"
                      >
                        Crunchyroll 🍥
                      </a>
                      <a 
                        href={`https://www.netflix.com/search?q=${encodeURIComponent(selected.title)}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:scale-105 transition-all text-center"
                      >
                         Netflix 🎬
                      </a>
                      <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selected.title + " trailer")}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:scale-105 transition-all text-center"
                      >
                        YouTube Trailers 📺
                      </a>
                    </div>
                  </div>

                  {/* Trailer */}
                  <div className="bg-indigo-100 dark:bg-slate-700 p-4 rounded-xl">
                    <div className="font-black mb-3 text-indigo-700 dark:text-indigo-400">🎞️ Trailer</div>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-indigo-300 dark:border-indigo-600">
                      <iframe
                        src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(selected.title + " trailer")}`}
                        className="w-full h-full"
                        allowFullScreen
                        title="Anime Trailer"
                      />
                    </div>
                  </div>
                   {/* Episodes */}
                  <div className="bg-emerald-100 dark:bg-slate-700 p-4 rounded-xl">
                    <div className="font-black mb-3 text-emerald-700 dark:text-emerald-400">
                      📺 Episodes (first page)
                    </div>
                    {episodes.length === 0 && (
                      <div className="text-sm text-slate-600 dark:text-slate-400 text-center py-4">
                        No episodes loaded yet.
                      </div>
                    )}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {episodes.map((ep) => (
                        <div 
                          key={ep.mal_id} 
                          className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow border-2 border-emerald-300 dark:border-emerald-700 hover:scale-105 transition-all"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                              Ep {ep.mal_id}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {ep.aired ? new Date(ep.aired).toLocaleDateString() : "TBA"}
                            </div>
                          </div>
                          <div className="text-sm dark:text-white mb-1">
                            {ep.title || "Untitled Episode"}
                          </div>
                          {ep.url && (
                            <a 
                              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline" 
                              href={ep.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View episode page →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </aside>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-sm font-bold text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl">
            🎌 Anime metadata powered by Jikan API • For demo purposes only 🎌
          </footer>
        </div>
      </div>
    </div>
  );
}