import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim()) {
        const apiKey = '2f9f632a';
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
        
        try {
          const response = await axios.get(url);
          if (response.data.Search) {
            setSuggestions(response.data.Search);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Öneriler alınırken hata oluştu:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSuggestionClick = (imdbID) => {
    navigate(`/film/${imdbID}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Film Ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
      />
      <button onClick={handleSearch}>Ara</button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.imdbID} onClick={() => handleSuggestionClick(suggestion.imdbID)}>
              <img src={suggestion.Poster !== 'N/A' ? suggestion.Poster : 'https://via.placeholder.com/50'} alt={suggestion.Title} />
              <span>{suggestion.Title}</span>
            </li>
          ))}
        </ul>
      )}
      {suggestions.length === 0 && query && (
        <div className="no-suggestions">Öneri bulunamadı.</div>
      )}
    </div>
  );
};

export default SearchBar;
