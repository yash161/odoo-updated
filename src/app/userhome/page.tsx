'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const MainPage = () => {
  const predefinedAuthors = ['Author 1', 'Author 2', 'Author 3'];
  const predefinedGenres = ['Fiction', 'Science Fiction', 'Fantasy'];

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getBooks() {
      const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=100');
      const data = await response.json();
      const booksData = data.works;
      setBooks(booksData);
      setFilteredBooks(booksData);
    }
    getBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const authorMatch = selectedAuthor ? book.authors.some(author => author.name === selectedAuthor) : true;
      const genreMatch = selectedGenre ? book.subjects && book.subjects.includes(selectedGenre) : true;
      return titleMatch && authorMatch && genreMatch;
    });
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, selectedAuthor, selectedGenre, books]);

  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 min-h-screen flex flex-col text-white">
      <main className="container mx-auto flex-grow py-8 px-4">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Library Books</h2>
          <div className="flex mb-6 justify-center">
            <input
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow py-2 px-4 border rounded-l-md shadow-sm focus:outline-none"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-r-md shadow-sm hover:bg-blue-600 transition duration-200 focus:outline-none">
              Search
            </button>
          </div>
          <div className="flex mb-6 justify-center items-center space-x-4">
            <label className="mr-2">Author:</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="py-2 px-4 border text-black rounded-md shadow-sm focus:outline-none"
            >
              <option value="">All</option>
              {predefinedAuthors.map((author, index) => (
                <option key={index} value={author}>{author}</option>
              ))}
            </select>
            <label className="mr-2">Genre:</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="py-2 px-4 border text-black rounded-md shadow-sm focus:outline-none"
            >
              <option value="">All</option>
              {predefinedGenres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
            <FaFilter className="text-gray-300" style={{ fontSize: '1.25rem' }} />
          </div>
          <div className="flex mb-6 justify-center items-center space-x-4">
            <label className="mr-2">Books per page:</label>
            <input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="py-2 px-4 border text-black rounded-md shadow-sm focus:outline-none"
              min="1"
            />
          </div>
          <div className="flex justify-center mx-auto py-4 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 focus:outline-none"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 focus:outline-none"
            >
              Next
            </button>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedBooks.length > 0 ? (
            displayedBooks.map((book, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 hover:shadow-lg">
                <img
                  src={`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/mark.jpg'; // Replace with your default image URL
                  }}
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{book.title}</h4>
                  <p className="text-gray-700 mb-2">{book.authors?.map(author => author.name).join(', ')}</p>
                  <p className="text-gray-600 mb-2">{book.first_publish_year}</p>
                  <p className="text-gray-600 mb-2">{book.subjects?.join(', ')}</p>
                  <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block mb-2">More Info</a>
                  <Link href='/cart'>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none">
                      Add to cart
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No books found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
