import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


const Register = () => {
    const [ItemUserName, setItemUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    const navigate = useNavigate();


    function handleUserName(e) {
        setItemUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }
    const IP = "localhost:8080";


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ItemUserName || !Password || !Email) {
            toast.error("Please fill all fields.");
            return;
        }
        const existingUser = await fetch(
            `http://${IP}/existingUser/${ItemUserName}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: ItemUserName,

                }),
            }
        );


        if ((await existingUser.json()) === true) {
            console.error("❌ User already exists.");
            toast.info("User already exists.");
            return;
        }



        const response = await fetch(
            `http://${IP}/addUser`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: ItemUserName,
                    userPassword: Password,
                    userEmail: Email,
                }),
            }
        );

        if (response.ok) {
            console.log("✅ User added successfully!");
            navigate('/login');
            toast.success("Registered successfully! Please login.");

        } else {
            console.error("❌ Failed to add user.");
            toast.error("Registration failed. Please try again.");
        }
    }
    return (
        <div className='flex gap-4 items-center justify-center bg-[#74964E]  min-h-screen  flex-wrap'>

            <div className='dataAddContainer text-black border-2 border-[#A72703] p-5 w-min-[300px] m-3 bg-[#FCB53B] flex gap-2 rounded-xl flex-col m-6 justify-center items-center'>
                <h2 className='font-extrabold text-xl text-[#A72703]'>Register</h2>
                <label htmlFor="ItemName" className='text-[#A72703] font-bold'>User Name</label>
                <input type="text" onChange={handleUserName} value={ItemUserName} name="ItemName" className='border-[#A72703] border-1 rounded-xl px-2' />

                <label htmlFor="ItemCost" className='text-[#A72703] font-bold'>Password</label>
                <input type="password" onChange={handlePassword} value={Password} name="ItemCost" className='border-[#A72703] border-1 rounded-xl px-2' />

                <label htmlFor="ItemCost" className='text-[#A72703] font-bold'>Email</label>
                <input type="text" onChange={handleEmail} value={Email} name="ItemCost" className='border-[#A72703] border-1 rounded-xl px-2' />

                <button onClick={handleSubmit} className='border-1 border-[#A72703] px-4 rounded-xl mt-2 text-red-700 font-bold cursor-pointer'>Register</button>

                <div className='flex gap-1 items-end justify-end w-[100%] mt-2'>
                    <h6 className='text-[10px]'>Already have an account?</h6>
                    <a href="/login" className="text-[10px] text-blue-700 underline">Login</a>
                </div>

            </div>
        </div>
    )
}

export default Register