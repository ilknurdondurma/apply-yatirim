import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineMessage } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

function NavigationAdmin() {
    const theme=useSelector((state)=> state.theme.theme);
   
  return (
    <div className='flex justify-between items-center p-5  rounded-lg' style={theme}>
        <div className='text-xl'>Admin Panel</div>
        <div></div>
        <div className='flex items-center'>
            
            <AiOutlineMessage className='mr-2' size={20}/>
            <IoNotificationsOutline className='mr-2' size={20}/>
        </div>
    </div>
  )
}

export default NavigationAdmin