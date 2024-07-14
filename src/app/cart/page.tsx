'use client'
import React, { useState, useEffect } from 'react';

const CheckoutPage = ({ book }) => {
  const [billAmount, setBillAmount] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    // Generate a random bill amount between 10 and 100
    const amount = (Math.random() * (100 - 10) + 10).toFixed(2);
    setBillAmount(amount);
  }, []);

  const handlePayNow = () => {
    setPaymentComplete(true);
  };

  const handleShowInvoice = () => {
    setShowInvoice(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-gray-700">{book.authors?.map(author => author.name).join(', ')}</p>
          <p className="text-gray-600">First Published: {book.first_publish_year}</p>
          <p className="text-gray-600">Subjects: {book.subjects?.join(', ')}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Bill Amount: ${billAmount}</h3>
        </div>
        <button
          onClick={handleShowInvoice}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none mb-4"
        >
          Show Invoice
        </button>
        {showInvoice && (
          <div className="bg-gray-200 p-4 rounded mb-4">
            <h4 className="font-semibold mb-2">Invoice</h4>
            <p>Book: {book.title}</p>
            <p>Author: {book.authors?.map(author => author.name).join(', ')}</p>
            <p>Amount: ${billAmount}</p>
          </div>
        )}
        <button
          onClick={handlePayNow}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 focus:outline-none"
        >
          Pay Now
        </button>
        {paymentComplete && (
          <div className="bg-green-200 p-4 rounded mt-4">
            <h4 className="font-semibold">Payment Successful</h4>
            <p>Thank you for your payment of ${billAmount}!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock book data to simulate a book added to the cart
const mockBook = {
  title: 'The Adventures of Huckleberry Finn',
  authors: [{ name: 'Mark Twain' }],
  first_publish_year: 2020,
  subjects: ['Fiction', 'Science Fiction']
};

const MainPage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (book) => {
    setCart([...cart, book]);
  };

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 min-h-screen flex flex-col text-white">
      <main className="container mx-auto flex-grow py-8 px-4">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Library Books</h2>
          <button
            onClick={() => handleAddToCart(mockBook)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 focus:outline-none"
          >
            Add The Adventures of Huckleberry Finn to Cart
          </button>
        </section>
        {cart.length > 0 && <CheckoutPage book={cart[0]} />}
      </main>
    </div>
  );
};

export default MainPage;
