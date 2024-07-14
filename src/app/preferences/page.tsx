"use client";

import React, { useState } from 'react';

interface Preferences {
  authors: string[];
  genre: string;
}

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    authors: [],
    genre: '',
  });

  const availableAuthors = [
    'J.K. Rowling',
    'George R.R. Martin',
    'J.R.R. Tolkien',
    'Oscar Wilde',
    'Stephen King',
    'Jane Austen',
    'Mark Twain',
    'Emily Brontë',
    'Charles Dickens',
    'F. Scott Fitzgerald',
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPreferences((prevPreferences) => {
      const updatedAuthors = checked
        ? [...prevPreferences.authors, value]
        : prevPreferences.authors.filter((author) => author !== value);

      return {
        ...prevPreferences,
        authors: updatedAuthors,
      };
    });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences({
      ...preferences,
      genre: e.target.value,
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Enter Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold">Select Authors:</h3>
          {availableAuthors.map((author) => (
            <div key={author} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`author-${author}`}
                value={author}
                checked={preferences.authors.includes(author)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={`author-${author}`} className="text-gray-700">{author}</label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label htmlFor="genre" className="block mb-2">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={preferences.genre}
            onChange={handleGenreChange}
            className="w-full py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500"
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
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-600 transition duration-200 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;
