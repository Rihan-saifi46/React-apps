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
}
