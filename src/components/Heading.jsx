import React from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Heading = () => {
const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userName");
    navigate('/login');
  }

  const userName = localStorage.getItem("userName");

  return (
    <div className='w-full h-10 flex justify-center items-center font-bold gap-2 bg-green-900 flex-wrap justify-evenly'>
      <h2 className='text-sm text-orange-600 relative left-[-170px] top-[-4px]'>Welcome, {userName}</h2>
      <h1 className='text-xl text-red-600 relative top-[-4px]'>Expense Explorer</h1>
      <button onClick={handleLogout} className='left-[170px] top-[-4px] text-sm font-bold text-amber-500 relative cursor-pointer'>Logout</button>

    </div>
  )
}

export default Heading