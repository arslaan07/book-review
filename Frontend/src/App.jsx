import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ViewBookDetails from './components/Home/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import {  } from './store/auth'
import Settings from './components/Profile/Settings'
import AddBook from './pages/AddBook'
import { ToastContainer } from 'react-toastify';


const App = () => {
  const {isAuthenticated, role} = useSelector((state) => state.auth)
  console.log(role)
  return (
    <div>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/all-books' element={<AllBooks />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/profile' element={<Profile />} >
              {isAuthenticated && role === 'admin' && (
                <Route path='/profile/add-book' element={<AddBook />} />
              )}
              <Route path='/profile/settings' element={<Settings />} />
            </Route>
            <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
          </Routes>
        <Footer />
        <ToastContainer />
    </div>
  )
}

export default App
