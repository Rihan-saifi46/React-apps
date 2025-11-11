// ✅ Fully Fixed + Clean + Ready-to-Run Anime Search App
// ✅ No JSX errors
// ✅ Dark Mode + Anime Style UI
// ✅ One-parent JSX structure guaranteed

import React, { useState, useEffect } from "react";

export default function AnimeSearchApp2() {
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
  } async function openAnime(anime) {
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
  } return (
    <div className={`${darkMode ? "dark" : ""}`}> 
      <div className="min-h-screen p-6 transition-all duration-300 bg-slate-50 dark:bg-slate-900"> 

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-5 right-5 bg-indigo-600 dark:bg-pink-600 text-white px-3 py-2 rounded-xl shadow-lg hover:scale-105 transition z-50"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="max-w-4xl mx-auto dark:text-white"> 
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-pink-400 drop-shadow">Anime Finder</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Search anime metadata using Jikan API.</p>
          </header>

          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              className="flex-1 p-3 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white shadow-sm"
              placeholder="Type anime name (e.g., Naruto)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="px-4 py-2 bg-indigo-600 dark:bg-pink-600 text-white rounded-lg shadow hover:scale-105 transition" type="submit">Search</button>
          </form>
          {loading && <div className="mb-4">Loading…</div>}
          {err && <div className="mb-4 text-red-600">Error: {err}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* ✅ Results */}
            <div className="md:col-span-2">
              <h2 className="font-semibold mb-2">Results</h2>
              {results.length === 0 && <div className="text-sm text-slate-500">Search something to begin.</div>}
              <ul className="space-y-3">
                {results.map((anime) => (
                  <li key={anime.mal_id} className="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <img src={anime.images.jpg.image_url} alt={anime.title} className="w-20 h-28 object-cover rounded" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold dark:text-white">{anime.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-300">{anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No synopsis"}</div>
                        </div> <button
                          onClick={() => openAnime(anime)}
                          className="px-3 py-1 bg-emerald-500 text-white rounded text-sm hover:scale-105 transition"
                        >
                          Open
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">Type: {anime.type} • Episodes: {anime.episodes || "N/A"}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
             {/* ✅ Details + Episodes */}
            <aside className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-2">Details</h2>
              {!selected && <div className="text-sm text-slate-500">Select an anime to see details.</div>}

              {selected && (
                <div>
                  <div className="flex gap-3 mb-3">
                    <img src={selected.images.jpg.image_url} alt={selected.title} className="w-24 h-32 object-cover rounded" />
                    <div>
                      <div className="font-bold dark:text-white">{selected.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-300">Score: {selected.score || "N/A"}</div>
                      <a className="text-xs text-indigo-600 block mt-1" href={selected.url} target="_blank">Open on MAL</a>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="font-medium mb-1">Synopsis</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{selected.synopsis || "No synopsis available."}</div>
                  </div>
                   {/* ✅ Watch Links */}
                  <div className="mb-4">
                    <div className="font-medium mb-1">Where to Watch</div>
                    <ul className="list-disc ml-5 text-sm text-indigo-600">
                      <li><a href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(selected.title)}`} target="_blank">Crunchyroll</a></li>
                      <li><a href={`https://www.netflix.com/search?q=${encodeURIComponent(selected.title)}`} target="_blank">Netflix</a></li>
                      <li><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selected.title + " trailer")}`} target="_blank">YouTube Trailers</a></li>
                    </ul>
                  </div>

                  {/* ✅ Trailer */}
                  <div className="mb-4">
                    <div className="font-medium mb-1">Trailer</div>
                    <div className="aspect-video rounded overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(selected.title + " trailer")}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                   {/* ✅ Episodes */}
                  <div>
                    <div className="font-medium mb-2">Episodes (first page)</div>
                    {episodes.length === 0 && <div className="text-sm text-slate-500">No episodes loaded.</div>}
                    <ol className="space-y-2 text-sm">
                      {episodes.map((ep) => (
                        <li key={ep.mal_id} className="p-2 border dark:border-slate-700 rounded">
                          <div className="flex justify-between">
                            <div>Ep {ep.mal_id}: {ep.title || "Untitled"}</div>
                            <div className="text-xs text-slate-400">Aired: {ep.aired ? new Date(ep.aired).toLocaleDateString() : "—"}</div>
                          </div>
                           {ep.url && (
                            <a className="text-xs text-indigo-600" href={ep.url} target="_blank">Episode page</a>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>
              )}
            </aside>
          </div>

          <footer className="mt-6 text-xs text-slate-400 dark:text-slate-500">This is a demo app (metadata only).</footer>
        </div>
      </div>
    </div>
  );
}