import React, { useEffect, useState } from 'react'
import Loader from '../components/Home/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import api from '../api';

const booksPerPage = 3
const AllBooks = () => {
    const [Data, setData] =  useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [Loading, setLoading] = useState(false)
    let params = { page: currentPage, limit: booksPerPage, search: searchQuery };
    useEffect(() => {
        const fetch = async () => {

           const response = await api.get(`api/v1/books`, {params})
           console.log(response)
          
           setTotalPages(response.data.totalPages)
           setData(response.data.data)
           setLoading(false)
        }
        if(searchQuery) {
          setCurrentPage(0)
        }
        const timer2 = setTimeout(() => {
          if(searchQuery) {
            setLoading(true)
          }  
        }, 600)
        console.log('wait 2 second...')
        const timer = setTimeout(() => {
          console.log('search api fired...')
          fetch()
        }, 2000)
        if(searchQuery === '') {
          fetch()
        }
        return () => {
          clearTimeout(timer)
          clearTimeout(timer2)
        }
    } , [currentPage, searchQuery])

    let pages = []
          for(let page=1; page<=totalPages; page++) {
            pages.push(page)
          }
          console.log(currentPage)
    if(Loading) {
      return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Loader />
      </div>
    }
  return (
    <div className='bg-orange-200 px-12 min-h-screen py-8'>
        <div className='flex justify-center mb-6'>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
      <h4 className='text-3xl text-black font-semibold'>All Books</h4>
      {!Data && <div className='flex h-screen items-center justify-center my-8'> <Loader /> </div> }
      <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data && 
        Data.map((items, i) => (
            <div key={i}>
                <BookCard data={items} /> {" "}
            </div>
        ))}
      </div>
      <div className='flex gap-2 justify-center mt-8'>
        {
          pages.map((page, i) => (
            <button onClick={() => {
              setSearchQuery('')
              setCurrentPage(page-1)
            }} className='bg-white py-2 px-3 rounded-md font-semibold hover:bg-zinc-400'>{page}</button>
          ))
        }
      </div>
    </div>
  )
}

export default AllBooks
