import React from 'react'
import  { createContext, useState } from 'react';

export const UserDataContext = createContext();




const UserContext = ({children}) => {

  const [ user, setUser] = useState({
    email: '',
    fullName:{
        firstName: '',
        lastName: ''
        
    }
     
  })
 

  return (
    <div>
         <UserDataContext.Provider value= {{user, setUser}}>
            {children}
         </UserDataContext.Provider>
    </div>
  )
}

export default UserContext










/* question---> who are it's children in the starting i.e.. when we have this code 

import React from 'react'

const UserContext = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default UserContext





Answer---> children = anything between the opening and closing tag of <UserContext>...</UserContext> which we did in main.jsx
*/