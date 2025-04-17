import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { changeRole, login } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api';
import { toast } from 'react-toastify'

const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  console.log(isAuthenticated)
  console.log(user)

  const [ Values, setValues ] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({});
    const validateField = (name, value) => {
      let newErrors = { ...errors };
  
      switch (name) {
        case "email":
          if (!value.trim()) {
            newErrors.email = "Email is required";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors.email = "Invalid email address";
          } else {
            delete newErrors.email;
          }
          break;
        case "password":
          if (!value.trim()) {
            newErrors.password = "Password is required";
          } else if (value.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
          } else if (!/[A-Z]/.test(value)) {
            newErrors.password =
              "Password must contain at least one uppercase letter";
          } else if (!/[a-z]/.test(value)) {
            newErrors.password =
              "Password must contain at least one lowercase letter";
          } else if (!/[0-9]/.test(value)) {
            newErrors.password = "Password must contain at least one number";
          } else if (!/[^A-Za-z0-9]/.test(value)) {
            newErrors.password =
              "Password must contain at least one special character";
          } else {
            delete newErrors.password;
          }
          break;
        default:
          break;
      }
  
      setErrors(newErrors);
    };
  const change = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setValues({...Values, [name]: value})
  }
  const submit = async (e) => {
    try {
        if(Object.keys(errors).length > 0) {
          return
        }
        const response = await api.post(`api/v1/sign-in`, Values)
        console.log(response)
        dispatch(login({email: response.data.email}))
        dispatch(changeRole(response.data.role))

        toast.success('login successfull !', {
          theme: 'dark',
        })
        response.data.role === 'admin' ? navigate('/profile/add-book') : navigate('/')
    } catch (error) {
        toast.error(error.response.data.message, {
          theme: "dark",
        });
    }
  }
  return (
    <div className='h-screen bg-orange-200 px-12 py-8 flex items-center justify-center'>
      <div className='bg-black rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Login</p>
        <div className='mt-4'>
            <div>
                <label htmlFor="" className='text-white'>Email</label>
                <input type="text" 
                className='w-full mt-2 bg-white text-black p-2 outline-none'
                placeholder='email'
                name='email'
                required
                value={Values.email}
                onChange={change}
                />
            </div>
            {errors.email && <div className='text-red-700'>{errors.email}</div>}
            <div className='mt-4'>
                <label htmlFor="" className='text-white'>Password</label>
                <input type="password" 
                className='w-full mt-2 bg-white text-black p-2 outline-none'
                placeholder='password'
                name='password'
                required
                value={Values.password}
                onChange={change}
                />
            </div>
            {errors.password && <div className='text-red-500'>{errors.password}</div>}
            <div className='mt-4'>
                <button 
                className='w-full bg-blue-500 text-white font-semibold py-2 rounded
                 hover:bg-blue-400 transition-all duration-300'
                 onClick={submit}
                 >Login</button>
            </div>
            <div className='mt-4 flex justify-center'>
                <p className='text-zinc-400'>Don't have an account? 
                    <Link to={'/signup'} className='text-blue-500'>  Signup</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
