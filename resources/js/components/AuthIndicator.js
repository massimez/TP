import React from 'react'
import { Link } from 'react-router-dom'

const AuthIndicator = ({isLoggedIn}) => {
    if (! isLoggedIn) {
        return (
            <a
                className="px-3 py-2 rounded-md text-sm font-medium text-indigo-300 cursor-pointer hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700"
                onClick={() => api().post('/logout').then(() => logOut())}
            >
                Sign Out
            </a>
        )
        }
    return (
        <Link href="/login">
            <a
                className="px-3 py-2 rounded-md text-sm font-medium text-indigo-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700">
                Sign In
            </a>
        </Link>
    )
}

export default AuthIndicator
