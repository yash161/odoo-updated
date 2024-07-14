"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getBooks() {
      const response = await fetch('/api/userhome'); // endpoint that handles book fetching and filtering
      const data = await response.json();
      if (data.success) {
        setBooks(data.data);
        setFilteredBooks(data.data);
      } else {
        console.error('Error fetching books:', data.message);
      }
    }
    getBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, books]);

  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ background: 'linear-gradient(to right, #00695c, #00796b, #00897b)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'white' }}>
      <main style={{ container: 'mx-auto', flexGrow: 1, padding: '1rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Library Books</h2>
          <div style={{ display: 'flex', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flexGrow: 1, padding: '0.5rem', border: '1px solid', borderRadius: '0.25rem 0 0 0.25rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', outline: 'none' }}
            />
            <button style={{ backgroundColor: '#0288d1', color: 'white', padding: '0.5rem', borderRadius: '0 0.25rem 0.25rem 0', transition: 'background-color 0.2s', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              Search
            </button>
          </div>
          <div style={{ display: 'flex', marginBottom: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <label style={{ marginRight: '0.5rem' }}>Books per page:</label>
            <input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ padding: '0.5rem', border: '1px solid', borderRadius: '0.25rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', outline: 'none' }}
              min="1"
            />
            <FaFilter style={{ marginLeft: '0.5rem', fontSize: '1.25rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ backgroundColor: '#0288d1', color: 'white', padding: '0.5rem', borderRadius: '0.25rem 0 0 0.25rem', transition: 'background-color 0.2s', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ backgroundColor: '#0288d1', color: 'white', padding: '0.5rem', borderRadius: '0 0.25rem 0.25rem 0', transition: 'background-color 0.2s', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            >
              Next
            </button>
          </div>
        </section>
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Books</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book, index) => (
                <div key={index} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.2s', color: 'black' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{book.title}</h4>
                  <img src={`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`} alt={book.title} style={{ marginBottom: '0.5rem', width: '100px', height: '150px' }} />
                  <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>{book.authors?.map(author => author.name).join(', ')}</p>
                  <p style={{ color: '#718096', marginBottom: '0.5rem' }}>{book.first_publish_year}</p>
                  <p style={{ color: '#718096', marginBottom: '0.5rem' }}>{book.subjects?.join(', ')}</p>
                  <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0288d1', textDecoration: 'underline', marginBottom: '0.5rem', display: 'block' }}>More Info</a>
                <Link href='/cart'>
                  <button style={{ marginTop: '0.75rem', backgroundColor: '#0288d1', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', transition: 'background-color 0.2s' }}>
                    Add to cart
                  </button>
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%' }}>No books found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
