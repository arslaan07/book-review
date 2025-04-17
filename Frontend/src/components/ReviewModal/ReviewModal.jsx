import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import api from '../../api'
import Loader from '../Home/Loader/Loader'

const ReviewModal = ({ isOpen, closeModal, bookId }) => {
    if (!isOpen) {
        return null
    }
    const [Loading, setLoading] = useState(false)
    const [starsSelected, setStarsSelected] = useState(-1)
    const [reviewText, setReviewText] = useState('')

    const handleStarClick = (e) => {
        const { id } = e.target
        const starId = parseInt(id)
        setStarsSelected(starId)
    }
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        if(starsSelected === -1) {
            newErrors.stars = 'Please provide rating'
        } else if(reviewText === '') {
            newErrors.reviewText = 'Please write a review'
        }
        setErrors(newErrors)
        if(Object.keys(newErrors).length > 0) {
            return
        }
        const data = {
            rating: starsSelected+1,
            review: reviewText
        }
        try {
            setLoading(true)
            const response = await api.put(`/api/v1/review/${bookId}`, data)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        console.log('Rating:', starsSelected + 1, 'Review:', reviewText)
        // Here you would typically send data to your backend
        closeModal()
    }
    if(Loading) {
          return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <Loader />
          </div>
        }
    return ReactDOM.createPortal(
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50'>
            <div className='relative bg-white w-[500px] h-[340px] rounded-md p-4'>
                <button onClick={closeModal} className='absolute top-2 right-4 text-xl hover:font-semibold'>X</button>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            {[0, 1, 2, 3, 4].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    id={item}
                                    onClick={handleStarClick}
                                    className={`text-2xl cursor-pointer ${item <= starsSelected ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    {item <= starsSelected ? '★' : '☆'}
                                </button>
                            ))}
                        </div>
                        {errors.stars && <div className='text-red-500'>{errors.stars}</div>}
                        <h1 className="mt-2">Write a review</h1>
                        <textarea
                            className='w-full h-[140px] border-2 border-black rounded-md p-2 mt-2'
                            placeholder='please provide your feedback...'
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        {errors.reviewText && <div className='text-red-500'>{errors.reviewText}</div>}
                        <button
                            type="submit"
                            className='bg-zinc-300 p-2 rounded-md hover:bg-zinc-200 font-semibold mt-4'
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('portal-root')
    )
}

export default ReviewModal