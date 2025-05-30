import React from 'react'
import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md text-center animate-fade-in-up">
        <h1 className="text-6xl font-bold text-[hsl(var(--primary))]">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-800">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center text-amber-600 hover:text-amber-700 transition font-medium"
        >
          <MoveLeft className="w-4 h-4 mr-2" />
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
