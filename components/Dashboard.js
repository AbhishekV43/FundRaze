"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({})

    useEffect(() => {
        getData()
        if (!session) {
            router.push('/')
        }
    }, [router, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setForm(u)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        toast.success('Profile Updated!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <div className="container mx-auto py-5 px-6">
                <h1 className=' flex items-center justify-center md:text-xl text-3xl p-7 text-center'>
                    Welcome to your Dashboard
                </h1>
                <div>

                    <form className="max-w-sm mx-auto pb-16" action={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor='name' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input name='name' value={form.name ? form.name : ""} onChange={handleChange} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input name='email' value={form.email ? form.email : ""} onChange={handleChange} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder='name@email.com' />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='username' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input name='username' value={form.username ? form.username : ""} onChange={handleChange} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder='username' />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='profilepic' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile picture</label>
                            <input name="profilepic" value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" id="email" className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full 
                        p-2.5 text-sm"  placeholder='profile picture link' />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='coverpic' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover picture</label>
                            <input name="coverpic" value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" id="email" className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full 
                        p-2.5 text-sm"  placeholder='cover picture link' />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='razorpayid' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay id</label>
                            <input name="razorpayid" value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" id="razorpayid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='razorpay id' />
                        </div>
                        <div className="mb-5">
                            <label htmlFor='razorpay' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay secret</label>
                            <input name="razorpaysecret" value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" id="razorpaysecret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='secret key' />
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Dashboard
