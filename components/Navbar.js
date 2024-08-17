"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    return (
        <nav className='text-white flex justify-between px-6 items-center md:h-12 relative flex-col md:flex-row md:justify-between'>

            <Link href={"/"} className='logo font-bold md:text-lg text-2xl'>FundRaze</Link>
            
            <div className='flex md:gap-4 gap-1 relative pr-4'>
                <div className='flex md:gap-4 gap-1 items-center'>
                    {session && <>
                        <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => { setTimeout(() => { setShowdropdown(false) }, 100); }}
                            id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 rounded-lg px-2 py-3 text-center inline-flex items-center hover:text-slate-500" type="button">Welcome {session.user.email}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdown" className={`z-1 ${showdropdown ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 my-8 top-4 left-[250px] z-10`}>
                            <ul className="py-2 mx-auto my-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                </li>
                                {/* <li>
                                <Link onClick={()=> {signOut()}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li> */}
                            </ul>
                        </div>
                    </>
                    }

                    {
                        session &&
                        <button className='hover:text-slate-500 cursor-pointer' onClick={() => { signOut() }}>
                            Logout
                        </button>
                    }
                    {
                        !session &&
                        <Link href={"/login"}>
                            <button className='hover:text-slate-500 cursor-pointer'>
                                Login
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
