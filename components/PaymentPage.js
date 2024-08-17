"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchpayments, fetchuser, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session, update } = useSession()

    useEffect(() => {
        getData()
        if (!session) {
            router.push('/')
        }
    }, [router, session])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast.success('Payment has been made. Thanks for the donation.', {
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
        router.push(`/${username}`)
    }, [])


    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        //get the order id from the server
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "FundRaze", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>

            <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover relative'>
                <img src={currentUser.coverpic} alt="" className='object-cover w-full h-48 md:h-[350px]' />
                <div className='absolute -bottom-12 md:right-[46%] right-[39%]'>
                <img className='rounded-full border-4 border-slate-700' width={95} height={95} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-300 text-center'>
                    Let's help {currentUser.name} reach his goals.
                </div>
                <div className='text-slate-400 text-center'>
                    {currentUser.name} is raising funds for a good cause. Let's help him by donating some money.
                </div>
                <div className='text-slate-400 text-center'>
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payment flex gap-3 w-[80%] flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700 mt-6 p-10 text-center">
                        <h2 className='text-lg font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='text-sm'>
                            {payments.length === 0 && <li className='my-2 flex gap-2 justify-center items-center'><span>No payments yet</span></li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-2 justify-start items-center'><img src="/user.png" alt="" width={18} className='invert' /><span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span></li>
                            })}
                            {/* <li className='my-2 flex gap-2 justify-center items-center'><img src="/user.png" alt="" width={18} className='invert' /><span>Shubham donated <span className='font-bold'>₹500</span> with a message "I support you bro."</span></li> */}

                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700 mt-6 p-10 text-center">
                        <h2 className='text-lg font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <input type="text" onChange={handlechange} value={paymentform.name} className='w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' placeholder='Enter Name' name="name" />
                            <input type="text" onChange={handlechange} value={paymentform.message} className='w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' placeholder='Enter your message' name="message" />
                            <input type="number" onChange={handlechange} value={paymentform.amount} className='w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' placeholder='Enter Amount in ₹' name="amount" />
                            <div className="text-center"><button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 rounded-lg p-2 w-28 disabled:bg-slate-950' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button></div>

                        </div>
                        <div className="flex gap-2 mt-5 flex-col md:flex-row">
                            <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 rounded-lg p-2' onClick={() => pay(10000)}>Pay ₹100</button>
                            <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 rounded-lg p-2' onClick={() => pay(50000)}>Pay ₹500</button>
                            <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 rounded-lg p-2' onClick={() => pay(100000)}>Pay ₹1000</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage
