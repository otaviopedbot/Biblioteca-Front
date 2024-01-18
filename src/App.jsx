import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import Home from './pages/Home';

import Authors from './pages/authors/Authors';
import CreateAuthors from './pages/authors/CreateAuthors';
import ViewAuthors from './pages/authors/ViewAuthors';
import EditAuthors from './pages/authors/EditAuthors';

import Books from './pages/books/Books';
import Bookshelves from './pages/bookshelves/Bookshelves';
import Rents from './pages/rents/Rents';
import Customers from './pages/customers/Customers';


// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />

          {/* authors */}
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<ViewAuthors />} />
          <Route path="/authors/create" element={<CreateAuthors />} />
          <Route path="/authors/:id/edit" element={<EditAuthors />} />

          {/* <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<View />} />

        <Route path="/bookshelves" element={<Bookshelves />} />
        <Route path="/bookshelves/:id" element={<View />} />

        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<View />} />

        <Route path="/rents" element={<Rents />} />
        <Route path="/rents/:id" element={<View />} /> */}

        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce/>
    </>
  )
}

export default App