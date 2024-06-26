'use client'
import { user_forgot_password_service } from "@/services/account/user";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Item() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleRequestInfo = async () => {
        if (email.trim() === '') {
            toast.error('Please enter your email.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }

        await user_forgot_password_service(email);
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className='m-5'>
                    <div className='d-flex justify-content-center'>
                        <img src="/logo.png" style={{ cursor: "pointer" }}
                            alt="logo" width={"200px"}></img>
                    </div>
                    <div className="my-4" style={{ fontWeight: "300", fontSize: "24px" }}>
                        Password Assistance
                    </div>
                    <div>
                        Please enter your email and we will send you
                    </div>
                    <div>
                        a password reset link.

                    </div>
                    <div style={{ fontWeight: "500", }} className='my-3'>
                        Enter Your Email
                    </div>
                    <div >
                        <input className='w-100' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className='d-flex align-items-center my-4'>
                        <button type="button" className="btn btn-dark px-5" onClick={handleRequestInfo}>Request Info</button>
                        <div onClick={() => { router.push('/') }} className="px-5" style={{ textDecoration: "none" }}>Cancel</div>
                    </div>

                </div>
            </div>
            <ToastContainer></ToastContainer>

        </>

    );
}