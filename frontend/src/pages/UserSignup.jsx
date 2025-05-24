 import React, { useState, useContext } from 'react'
 import { Link } from 'react-router-dom'
  import { UserDataContext } from '../context/UserContext'
 import { useNavigate } from 'react-router-dom'
 import axios from 'axios'
 
 //import UserContext from '../context/UserContext'

 const UserSignup = () => { 
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [firstName, setfirstName] = useState('')
   const [lastName, setlastName] = useState('')
   const [ userData, setUserData ] = useState ({})
   const navigate = useNavigate();//You want to conditionally route based on some logic.
   /* You must be inside a <BrowserRouter> for useNavigate to work. */
  
   
   const {user, setUser} = useContext(UserDataContext)

   //const [ userData, setUserData ] = useContext(UserDataContext)

   const submitHandler = async (e) => {
     //const p = e.target.password.value;
     e.preventDefault();

      //setUserData({
      const newUser ={
        fullName:{
          firstName: firstName,
          lastName: lastName 
        },
        email:email,
        password:password 
      }
    // })

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if(response.status === 201){
        const data = response.data;

        setUser(data.user)
          
        navigate('/home');
      }

     console.log(userData);
     //console.log(email,password)
     setfirstName('')
     setlastName('')
     setEmail('')
     setPassword('')
   }
   return(
     <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-16 py-5 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <form onSubmit={ (e) => {
             submitHandler(e);
        }
       }>
        <h3 className='text-lg font-medium mb-2'>what's your name</h3>
        <div className='flex gap-4 mb-6'>
        <input 
          required 
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base'
          type='text' placeholder='First name'
          value={firstName}
          onChange={(e)=> {
            setfirstName(e.target.value);
          }}  
          ></input> 
         <input required
          className='bg-[#eeeeee] w-1/2   rounded px-4 py-2 border text-lg placeholder:text-base'
          type='text' placeholder='Last name' 
           value={lastName}
          onChange={(e)=> {
            setlastName(e.target.value);
          }}  
          ></input>

          </div>
         
        
         
 <h3 className='text-lg mb-2'>What's Your email</h3>
         <input 
          required
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type='email' placeholder='email@example.com'></input>
        
        <h3 className='text-lg mb-2'>Enter Password</h3>
         <input  
         required
         className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
         type='password' placeholder='password'></input>
 
 
        <button
        className='bg-[#111] text-white font-semibold mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Create Account</button>
 
       <p className='text-center'>Already Have a account ?
       <Link to='/login'className='text-blue-600'>Login Here</Link></p>
        </form>
       </div>
       <div>
         <p className='text-xs py-20'>By proceeding, you agree to our Terms of Service and Privacy Policy, you consent to get Calls, WhatsApp or SMS, including by autmoated means, from Uber and it's affiliates to the number provided .</p>   
       </div>
     </div>
   )
 }
 export default UserSignup 