import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => { 
  return(
    <div className='p-7'>
       <form>
        <h3 className='text-xl mb-2'>What's Your Email</h3>
        <input 
         required 
         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
         type='email' placeholder='email@example.com'></input>
       
       
        <h3 className='text-xl mb-2'>Enter Password</h3>


        <input  
        required 
         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='password' placeholder='password'></input>


       <button
       className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
       >Login</button>


       </form>
    </div>
  )
}
export default UserLogin  