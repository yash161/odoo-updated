"use client";

import React, { useState } from 'react';

interface Preferences {
  authors: string[];
  genre: string;
}

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    authors: [''],
    genre: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'genre') {
      setPreferences({
        ...preferences,
        [name]: value,
      });
    } else if (name === 'author' && index !== undefined) {
      const updatedAuthors = [...preferences.authors];
      updatedAuthors[index] = value;
      setPreferences({
        ...preferences,
        authors: updatedAuthors,
      });
    }
  };

  const addAuthor = () => {
    setPreferences({
      ...preferences,
      authors: [...preferences.authors, ''],
    });
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = preferences.authors.filter((_, i) => i !== index);
    setPreferences({
      ...preferences,
      authors: updatedAuthors,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User Preferences:', preferences);
    // Send data to the API
    const response = await fetch('/api/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Enter Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        {preferences.authors.map((author, index) => (
          <div key={index}>
            <label htmlFor={`author-${index}`}>Author {index + 1}:</label>
            <input
              type="text"
              id={`author-${index}`}
              name="author"
              value={author}
              onChange={(e) => handleChange(e, index)}
              required
            />
            {preferences.authors.length > 1 && (
              <button type="button" onClick={() => removeAuthor(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addAuthor}>Add Author</button>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={preferences.genre}
            onChange={handleChange}
            required
          > 
            <option value="">Select a genre</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="biography">Biography</option>
            <option value="romance">Romance</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PreferencesForm;
