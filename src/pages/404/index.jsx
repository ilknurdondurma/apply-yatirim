import React from 'react'
import { Link } from 'react-router-dom'

export function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">Oops! 404</h1>
                <p className="text-xl text-gray-600 mt-4">We can't seem to find the page you're looking for.</p>
                <Link to="/" className="mt-8 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-secondary transition duration-300">Go back to Home</Link>
            </div>
        </div>
  )
}

export function PageNotFoundAdmin() {
  return (
    <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">Oops! 404</h1>
                <p className="text-xl text-gray-600 mt-4">We can't seem to find the page you're looking for.</p>
                <Link to="/admin/" className="mt-8 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-secondary transition duration-300">Go back to Home</Link>
            </div>
        </div>
  )
}
