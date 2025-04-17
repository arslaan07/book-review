import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../api';
import { toast } from 'react-toastify';

const BookCard = ({ data }) => {
    console.log(data)
    
 
  return (
    <div className='bg-white rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img src={data.url} alt='/' className='h-[25vh]' />
            </div>
            <h2 className='mt-4 text-xl font-semibold text-black'> {data.title} </h2>
            <p className='mt-2 text-black font-semibold'>by {data.author} </p>
            <p className='mt-2 text-black font-semibold'>Rs. {data.price} </p>
        </div>
      </Link>
     
    </div>
  )
}

export default BookCard
