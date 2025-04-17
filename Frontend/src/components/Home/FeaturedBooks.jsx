import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "./Loader/Loader";
import api from "../../api";

const FeaturedBooks = ({ shouldRefetch }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`api/v1/featured-books`);
        if (isMounted) {
          setData(response.data.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch books");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [shouldRefetch]); // Add proper dependency here

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-semibold text-2xl">
        <p>Failed to load featured books: {error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-black font-semibold">Featured Books</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedBooks;