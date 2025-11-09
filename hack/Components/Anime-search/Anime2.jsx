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
  }