import React from 'react'
import {FaUserCircle} from 'react-icons/fa'

const Message = ({text,uri,user="other"}) => {
  return (
      <div className={`flex ${user==="me"?"self-end bg-green-400": "self-start bg-gray-300"}  m-1 py-2 px-2 `}>
         <div>{text}</div>
         <div className='text-2xl pl-2' ><FaUserCircle/></div>
         </div>
  )
}

// alignSelf={user="me"?"flex-end":"flex-start"} 
export default Message