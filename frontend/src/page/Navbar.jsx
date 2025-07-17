import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
   <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MySite</h1>
        <ul className={`md:flex gap-6`}>
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/createNote" className="hover:text-gray-300">Create Note</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
