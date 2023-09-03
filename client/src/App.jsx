import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import './styles/App.css'

import IndexCat from "./pages/cats/Index"
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

import Navbar from './components/Navbar';

import axios from './api'
import { addUser } from './redux/userSlice';

function App() {

  const user = useSelector((state) => state.user)

  console.log('this is user', user)

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true)

  async function getUser() {

    try {
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(addUser(response.data))
    } catch (err) {
      console.log(err, 'this is err')
      localStorage.removeItem("token")
    }
    setIsLoading(false)
  }

async function getBreeds() {

    const breedsUrl = `https://api.thecatapi.com/v1/breeds`;
    try {
        // console.log('v1.00')
        const response = await axios.get(breedsUrl,
            {
                headers: { "x-api-key": import.meta.env.VITE_APP_THE_CAT_API }
            }
        );
        console.log(response.data)
        setBreeds(response.data)

    } catch (err) {
        console.log(err)
    }
}

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      getUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/cats' />} />
        <Route path='/cats' element={<IndexCat />} />
        {/* <Route path='/cats/:id' element={<ShowCat />} /> */}

        {user?.username ? <>
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/cats/new' element={<NewCat />} /> */}
          {/* <Route path='/cats/:id/edit' element={<EditCat />} /> */}
          {/* <Route path='/comments/:id/edit' element={<EditComment />} /> */}
          {!isLoading && <Route path='*' element={<Navigate to='/cats' />} />}
        </>
          :
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {!isLoading && <Route path='*' element={<Navigate to='/login' />} />}
          </>
        }
      </Routes>
    </div>
  );
}

export default App

