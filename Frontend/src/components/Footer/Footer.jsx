import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-orange-200 text-black py-12">
      <hr style={{ border: "1px solid black" }} />
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-black">
            Your trusted platform for book reviews and literary discussions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-black">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Reviews
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Authors
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-black">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-white">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-black hover:text-white">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-black hover:text-white">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-black hover:text-white">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-black">
        <p>&copy; 2025 BookReview. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
