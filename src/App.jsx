import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages
import Home from './pages/Home';
import Author from './pages/Author';
import Books from './pages/Books';
import Bookshelves from './pages/Bookshelves';
import Rents from './pages/Rents';
import Customers from './pages/Customers';

// components
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookshelves" element={<Bookshelves />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rents" element={<Rents />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App