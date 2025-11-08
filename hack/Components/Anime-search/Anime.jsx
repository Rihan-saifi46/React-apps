/*
AnimeSearchApp.jsx
Single-file React + Tailwind demo that searches anime using Jikan API (metadata only) and shows episode lists.

How to use:
1) Create a new React app (Vite recommended) and install Tailwind.
   - npm create vite@latest my-anime-app --template react
   - cd my-anime-app
   - follow Tailwind install steps from https://tailwindcss.com/docs/guides/vite
2) Replace src/App.jsx with this file's contents and run `npm run dev`.

Notes / limitations:
- This app uses the public Jikan API (https://api.jikan.moe). It's metadata-only (titles, synopsis, images, episode list) and DOES NOT host or stream episodes.
- Respect rate-limits; add caching or a backend proxy for production.
- For production "where to watch" links, integrate official partner APIs or provide links to official streaming pages (Crunchyroll, Netflix, etc.) after verifying permissions.

*/

import React, { useState, useEffect } from "react";

export default function AnimeSearchApp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null); // selected anime object
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Basic search using Jikan v4
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

  // Fetch details + first page of episodes for a selected anime id
  async function openAnime(anime) {
    setSelected(anime);
    setEpisodes([]);
    setLoading(true);
    setErr(null);
    try {
      // Fetch episodes (first page)
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
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Anime Finder — Metadata Demo</h1>
          <p className="text-sm text-slate-600 mt-1">Search anime (metadata only). This demo uses the free Jikan API.</p>
        </header>

        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            className="flex-1 p-3 rounded-lg border border-slate-200 shadow-sm"
            placeholder="Type anime name (eg. Naruto)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" type="submit">Search</button>
        </form>

        {loading && <div className="mb-4">Loading…</div>}
        {err && <div className="mb-4 text-red-600">Error: {err}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Results list */}
          <div className="md:col-span-2">
            <h2 className="font-semibold mb-2">Results</h2>
            {results.length === 0 && <div className="text-sm text-slate-500">No results yet — search to begin.</div>}
            <ul className="space-y-3">
              {results.map((anime) => (
                <li key={anime.mal_id} className="flex gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <img src={anime.images.jpg.image_url} alt={anime.title} className="w-20 h-28 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{anime.title}</div>
                        <div className="text-xs text-slate-500">{anime.synopsis ? anime.synopsis.slice(0, 120) + '...' : 'No synopsis'}</div>
                      </div>
                      <div>
                        <button
                          onClick={() => openAnime(anime)}
                          className="px-3 py-1 bg-emerald-500 text-white rounded text-sm"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">Type: {anime.type} • Episodes: {anime.episodes || 'N/A'}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Detail / Episodes pane */}
          <aside className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Details</h2>
            {!selected && <div className="text-sm text-slate-500">Select an anime to see details and episodes.</div>}

            {selected && (
              <div>
                <div className="flex gap-3 mb-3">
                  <img src={selected.images.jpg.image_url} alt={selected.title} className="w-24 h-32 object-cover rounded" />
                  <div>
                    <div className="font-bold">{selected.title}</div>
                    <div className="text-xs text-slate-500">Score: {selected.score || 'N/A'}</div>
                    <a className="text-xs text-indigo-600 block mt-1" href={selected.url} target="_blank" rel="noreferrer">Open on MyAnimeList</a>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="font-medium mb-1">Synopsis</div>
                  <div className="text-sm text-slate-600">{selected.synopsis || 'No synopsis available.'}</div>
                </div>

                <div>
                  <div className="font-medium mb-2">Episodes (first page)</div>
                  {episodes.length === 0 && <div className="text-sm text-slate-500">No episodes loaded.</div>}
                  <ol className="space-y-2 text-sm">
                    {episodes.map((ep) => (
                      <li key={ep.mal_id} className="p-2 border rounded">
                        <div className="flex justify-between">
                          <div>Ep {ep.mal_id}: {ep.title || 'Untitled'}</div>
                          <div className="text-xs text-slate-400">Aired: {ep.aired ? new Date(ep.aired).toLocaleDateString() : '—'}</div>
                        </div>
                        {/* Note: Jikan episode objects don't include streaming URL — provide the episode URL if available */}
                        {ep.url && (
                          <a className="text-xs text-indigo-600" href={ep.url} target="_blank" rel="noreferrer">Episode page</a>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-4 text-xs text-slate-500">Tip: For "where to watch" links, aggregate official provider pages manually or via partner APIs.</div>
              </div>
            )}
          </aside>
        </div>

        <footer className="mt-6 text-xs text-slate-400">This is a demo app (metadata only). Do not host copyrighted video without a license.</footer>
      </div>
    </div>
  );
}
