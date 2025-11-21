import React from 'react'
import { useState } from 'react';
import Heading from './Heading';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [ItemUserName, setItemUserName] = useState("");
    const [Password, setPassword] = useState("");


    function handleUserName(e) {
        setItemUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }


    const IP = "localhost:8080";
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        const response = await fetch(
            `http://${IP}/loginUser/${ItemUserName}/${Password}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: ItemUserName,
                    userPassword: Password,
                }),
            }
        );

        console.log(response);

        if (response.ok) {
            console.log("✅ User Logged-in successfully!");
            localStorage.setItem("loggedInUser", true);
        } else {
            console.error("❌ Failed to log in user.");
        }

        const isLogin=await response.json();
        
        if(isLogin){

            navigate('/explore');
        }
    }

    return (
        <div className='flex gap-4 items-center justify-center bg-[#74964E]  min-h-screen  flex-wrap'>

            <div className='dataAddContainer text-black border-2 border-[#A72703] p-5 w-min-[300px] m-3 bg-[#FCB53B] flex gap-2 rounded-xl flex-col m-6 justify-center items-center'>
                <h2 className='font-extrabold text-xl text-[#A72703]'>Login</h2>
                <label htmlFor="ItemName" className='text-[#A72703] font-bold'>User Name</label>
                <input type="text" onChange={handleUserName} value={ItemUserName} name="ItemName" className='border-[#A72703] border-1 rounded-xl px-2' />

                <label htmlFor="ItemCost" className='text-[#A72703] font-bold'>Password</label>
                <input type="password" onChange={handlePassword} value={Password} name="ItemCost" className='border-[#A72703] border-1 rounded-xl px-2' />



                <button onClick={handleLogin} className='border-1 border-[#A72703] px-4 rounded-xl mt-2 text-red-700 font-bold cursor-pointer'>Login</button>
                <div className='flex gap-1 items-end justify-end w-[100%] mt-2'>
                    <h6 className='text-[10px]'>Don't have an account?</h6>
                    <a href="/register" className="text-[10px] text-blue-700 underline">Register</a>
                </div>

            </div>
        </div>
    )
}

export default Login