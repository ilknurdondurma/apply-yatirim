import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import ToggleSwitch from '../../components/toggle';
import { AiOutlineLogout } from "react-icons/ai";

function NavigationAdmin() {
    const theme=useSelector((state)=> state.theme.theme);
   
  return (
    <div className='flex justify-between items-center p-5  rounded-lg ' style={theme}>
        <div className='text-xl'>Admin Panel</div>
        <div></div>
        
        <div className='flex items-center'>
          <div className='flex items-center mx-5'>
              <AiOutlineMessage className='mr-4' size={20}/>
              <IoNotificationsOutline className='mr-4' size={20}/>
              
          </div>
          <ToggleSwitch />
        <AiOutlineLogout size={20}/>
        </div>
    </div>
  )
}

export default NavigationAdmin