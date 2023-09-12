import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // store book data in a stateful varible
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('Art');

  // fetch data on app loading
  useEffect( () => {
    const fetchBooks = async () => {
      try {
      const response = await fetch("books.json");

      // Check if everything is fine with fetching
      if (!response.ok) {
        throw new Error("Problem fetching data");
      }

      const data = await response.json();

      setBookData(data);
      setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    }
  fetchBooks();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const filteredBooks = bookData.books.filter(book => book.title.toLocaleLowerCase().includes(searchString))

  return (
    <>
      <h1>Book App</h1>
      <div>
        <input placeholder="Search book title" type="text" name="serach" onInput={ e => setSearchString(e.target.value)} value={searchString}/>
      </div>
      <div>
        {filteredBooks.map(book => (<div className='bookCard' key={book.title}><b>title: {book.title}</b><small>author: {book.author}</small><i>description: {book.description}</i></div>))}
      </div>
    </>
  )
}

export default App
