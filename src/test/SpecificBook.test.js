import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SpecificBook from '../components/SpecificBook';
import { Context } from '../context/index';
import '@testing-library/jest-dom/extend-expect';

describe('SpecificBook', () => {
  const bookId = 1;
  const book = {
    id: 1,
    author: 'J.K. Rowling',
    price: 12.99,
    image: 'https://example.com/book1.jpg',
    title: "Harry Potter and the Sorcerer's Stone",
    shortDescription: 'The first book in the Harry Potter series.',
    description: 'Harry Potter and the Sorcerer\'s Stone is a fantasy novel...',
  };

  const state = {
    books: [book],
  };

  const setState = jest.fn();

  test('should display book information', () => {
    render(
      <MemoryRouter initialEntries={[`/specific-book/${bookId}`]}>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/specific-book/:bookId" element={<SpecificBook />} />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
  });

  test('increase button should increase quantity', () => {
    render(
      <MemoryRouter initialEntries={[`/specific-book/${bookId}`]}>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/specific-book/:bookId" element={<SpecificBook />} />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );

    const increaseQuantityButton = screen.getByText('+');
    fireEvent.click(increaseQuantityButton);
    expect(screen.getByLabelText('Quantity:')).toHaveValue(2);
    expect(screen.getByText('Total Price: $ 25.98')).toBeInTheDocument();
  });

  test('decrease button should decrease quantity', () => {
    render(
      <MemoryRouter initialEntries={[`/specific-book/${bookId}`]}>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/specific-book/:bookId" element={<SpecificBook />} />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );

    const decreaseQuantityButton = screen.getByText('-');
    fireEvent.click(decreaseQuantityButton);
    expect(screen.getByLabelText('Quantity:')).toHaveValue(1);
    expect(screen.getByText('Total Price: $ 12.99')).toBeInTheDocument();
  });

  test('should change quantity when input is changed', () => {
    render(
      <MemoryRouter initialEntries={[`/specific-book/${bookId}`]}>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/specific-book/:bookId" element={<SpecificBook />} />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );

    const quantityInput = screen.getByLabelText('Quantity:');
    fireEvent.change(quantityInput, { target: { value: 3 } });
    expect(quantityInput).toHaveValue(3);
    expect(screen.getByText('Total Price: $ 38.97')).toBeInTheDocument();
  });
});
