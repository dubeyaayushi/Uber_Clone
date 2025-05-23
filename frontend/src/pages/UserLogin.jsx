import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => { 
  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const { userData, setUserData } = useState ({})
  const submitHandler = (e) => {
    //const p = e.target.password.value;
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })
    console.log(userData);
    //console.log(email,password)
    setEmail('')
    setPassword('')
  }
  return(
    <div className='p-7 h-creen flex flex-col justify-between'>
      <div>
        <img className='w-16 py-5 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
       <form onSubmit={ (e) => {
            submitHandler(e);
       }
      }>
        <h3 className='text-lg mb-2'>What's Your Email</h3>
        <input 
         required 
        value = {email}
        onChange={(e)=> {
          setEmail(e.target.value);

        }}
         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
         type='email' placeholder='email@example.com'></input>
       
       
        <h3 className='text-lg mb-2'>Enter Password</h3>


        <input  
        required 
        value = {password}
        onChange={(e)=> {
          //console.log(e.target.value);
          setPassword(e.target.value);
        }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='password' placeholder='password'></input>


       <button
       className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
       >Login</button>

      <p className='text-center'>New Here?

      <Link to='/signup'className='text-blue-600'> Create New Account</Link></p>
       </form>
      </div>
      <div>
        <Link
        to= '/captain-login'
        className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign-in as Captain</Link>
      </div>
    </div>
  )
}
export default UserLogin  