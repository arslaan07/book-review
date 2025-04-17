import React from 'react';

const ReviewCard = ({ email='a@gmail.com', rating, review }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <span key={i} className="text-yellow-400">★</span> 
        ) : (
          <span key={i} className="text-gray-300">★</span> 
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 w-[400px] min-w-[300px] max-w-[400px] h-[200px]">
      <div className="flex items-center mb-2">
        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <span className="text-gray-600 text-normal font-medium">
            {email.charAt(0).toUpperCase()} {/* Show first letter of email as avatar */}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{email}</p>
          <div className="flex">{renderStars()}</div>
        </div>
      </div>
      <p className="text-gray-600 text-xl mt-2">{review}</p>
    </div>
  );
};

export default ReviewCard;