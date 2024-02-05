import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages

import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';

import Profile from './pages/users/Profile';
import EditProfile from './pages/users/EditProfile';
import Dashboard from './pages/users/Dashboard';
import Users from './pages/users/Users';

import Authors from './pages/authors/Authors';
import CreateAuthors from './pages/authors/CreateAuthors';
import ViewAuthors from './pages/authors/ViewAuthors';
import EditAuthors from './pages/authors/EditAuthors';

import Books from './pages/books/Books';
import CreateBooks from './pages/books/CreateBooks';
import ViewBooks from './pages/books/ViewBooks';
import EditBooks from './pages/books/EditBooks';

import Bookshelves from './pages/bookshelves/Bookshelves';
import CreateBookshelves from './pages/bookshelves/CreateBookshelves';
import ViewBookshelves from './pages/bookshelves/ViewBookshelves';
import EditBookshelves from './pages/bookshelves/EditBookshelves';

import Rents from './pages/rents/Rents';
import CreateRents from './pages/rents/CreateRents';
import ViewRents from './pages/rents/ViewRents';
import EditRents from './pages/rents/EditRents';

import Customers from './pages/customers/Customers';
import CreateCustomers from './pages/customers/CreateCustomers';
import ViewCustomers from './pages/customers/ViewCustomers';
import EditCustomers from './pages/customers/EditCustomers';


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

          {/* books */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<ViewBooks />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/:id/edit" element={<EditBooks />} />

          {/* bookshelves */}
          <Route path="/bookshelves" element={<Bookshelves />} />
          <Route path="/bookshelves/:id" element={<ViewBookshelves />} />
          <Route path="/bookshelves/create" element={<CreateBookshelves />} />
          <Route path="/bookshelves/:id/edit" element={<EditBookshelves />} />


          {/* customers */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<ViewCustomers />} />
          <Route path="/customers/create" element={<CreateCustomers />} />
          <Route path="/customers/:id/edit" element={<EditCustomers />} />

          {/* Rents */}
          <Route path="/rents" element={<Rents />} />
          <Route path="/rents/:id" element={<ViewRents />} />
          <Route path="/rents/create" element={<CreateRents />} />
          <Route path="/rents/:id/edit" element={<EditRents />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/dashboard" element={<Dashboard />} />

          {/* user search */}
          <Route path="/users/:username" element={<Users />} />

        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce />
    </>
  )
}

export default App