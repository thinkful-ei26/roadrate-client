import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export const SearchReviews = (props) => {
  const [searchInput, setSearchInput] = useState("");

  // const search = async () => {
  //   const res = await fetch(
  //     `${API_BASE_URL}/users/?search=${localStorage.user}`
  //   );

  //   console.log(`${API_BASE_URL}/users/?search=${localStorage.user}`)
  //   // Pull out the data as usual
  //   const [ user ] = await res.json();

  //   console.log('JSON: ', user)
    
  //   localStorage.setItem("userId", user.id)
  //   setUserId(user.id)
  //   localStorage.setItem("name", user.name)
  //   setName(user.name)
    
  //   return user;
  // }

  // useEffect(() => {
  //   setUsername(localStorage.user)
  //   search();
  // }, []);

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!searchInput ) return;
    console.log('clicked search btn', searchInput)
  }

  return (
    <div className="search-section">
      <form 
        id="search-form"
        className="search-form"
        onSubmit={handleSubmit}
      >
        <div className="input-wrapper">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            type="search"
            id="search"
            name="search"
            className="search-input"
            placeholder="Search..."
          />
          <label 
            htmlFor="search"
            className="search-label"
            aria-label="search-form"
          >
            <button
              className="search-btn" 
              aria-label="search-btn"
            >
              search
            </button>
          </label>
        </div>
      </form>
    </div>

  )
}

export default SearchReviews;
