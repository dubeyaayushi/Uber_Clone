 import React, { useState, useContext } from 'react'
 import { Link } from 'react-router-dom'
 import { UserDataContext } from '../context/UserContext'
 import { useNavigate } from 'react-router-dom'
 import axios from 'axios'
 
 const CaptainLogin = () => { 
   const [email, setEmail] = useState('')
   const[password, setPassword] = useState('')
    const [captainData, setcaptainData] = useState('')
   const submitHandler = (e) => {
     //const p = e.target.password.value;
     e.preventDefault();
     setcaptainData({
       email:email,
       password:password
     })
     console.log(captainData);
     //console.log(email,password)
     setEmail('')
     setPassword('')
   }
   return(
     <div className='p-7 h-creen flex flex-col justify-between'>
       <div>
         <img className='w-16' src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
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
         </form>
       <p className='text-center'> Join a fleet?

       <Link to='/captain-signup'className='text-blue-600'> Register as a Captain</Link></p>

       </div>
       <div>
         <Link
         to= '/login'
         className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
         >Sign-in as User</Link>
       </div>
     </div>
   )
 }
 export default CaptainLogin   