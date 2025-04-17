import React from 'react'
import Hero from '../components/Home/Hero'
import FeaturedBooks from '../components/Home/FeaturedBooks'

const Home = () => {
  return (
    <div className='bg-orange-200 text-black px-10 py-8 '>
      <Hero />
      <FeaturedBooks />
    </div>
  )
}

export default Home
