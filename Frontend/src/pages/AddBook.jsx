import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import FeaturedBooks from '../components/Home/FeaturedBooks';

const AddBook = () => {
    const navigate = useNavigate()
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
        featuredBook: false
    })
    
    const change = (e) => {
      const { name, value, type, checked } = e.target;
      
      setData({
        ...Data,
        [name]: type === 'checkbox' ? checked : value
      });
    }
      const submit = async () => {
        try {
            if(Data.url === '' || 
                Data.title === '' ||
                Data.author === '' ||
                Data.price === '' ||
                Data.desc === '' ||
                Data.language === ''
            ) {
                toast.warn('All fields required', {
                            theme: 'dark',
                          })
                return
            }
            const response = await api.post(`api/v1/book`, Data)
            setData({
                url: '',
                title: '',
                author: '',
                price: '',
                desc: '',
                language: '',
                featuredBook: false
            })
            navigate('/')
            toast.success(response.data.message, {
                      theme: 'dark',
                    })
        } catch (error) {
            toast.error(error.response.data.message, {
                    theme: 'dark',
                  })
        }
      }
  return (
    <div className='h-[100%] px-4 md:p-4 '>
      <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8 '>
        Add Book
      </h1>
      <div className='bg-orange-100 rounded p-4'>
        <div>
            <label htmlFor="" className='text-black '>Image</label>
            <input type="text" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='Image URL'
            name='url'
            required
            value={Data.url}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-black'>Title of book</label>
            <input type="text" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='title of book'
            name='title'
            required
            value={Data.title}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-black'>Author of book</label>
            <input type="text" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='author of book'
            name='author'
            required
            value={Data.author}
            onChange={change}
            />
        </div>
        <div className='mt-4 flex gap-4 '>
            <div className='w-3/6'>
            <label htmlFor="" className='text-black'>Language</label>
            <input type="text" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='language of book'
            name='language'
            required
            value={Data.language}
            onChange={change}
            />
            </div>
            <div className='w-3/6'>
            <label htmlFor="" className='text-black'>Price</label>
            <input type="number" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='price of book'
            name='price'
            required
            value={Data.price}
            onChange={change}
            />
            </div>
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-black'>Description of book</label>
            <input type="text" 
            className='w-full mt-2 bg-white text-black p-2 outline-none'
            placeholder='description of book'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
            />
        </div>
        <div className="flex items-center gap-2 mt-2">
  <input 
    type="checkbox"
    name="featuredBook"
    checked={Data.featuredBook}
    onChange={change}
    className="w-4 h-4 text-black bg-zinc-100 rounded focus:ring-zinc-500 focus:ring-offset-zinc-900 focus:ring-2"
  />
  <label htmlFor="featuredBook" className="text-black select-none">
    Add to featured Books
  </label>
</div>
        <button onClick={submit}
        className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'>
            Add Book
        </button>
      </div>
    </div>
  )
}

export default AddBook
