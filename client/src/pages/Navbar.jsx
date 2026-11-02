import React from 'react'
import Logo from "../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";


const Navbar = ({btnText}) => {
  return (
    <div className='flex justify-evenly items-center py-4 bg-richblack-800'>
      <div>
        <img src={Logo} alt="studynotion logo" className='lg:w-40 lg:h-8'/>
      </div>
      <div>
        <ul className='flex gap-6 justify-evenly text-richblack-300'>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li className='text-yellow-100'>
               <Link to={"/catalog"}>Catalog</Link> 
            </li>
            <li>
                <Link to={"/about-us"}>About Us</Link>
            </li>
            <li>
                <Link to={"/contact-us"}>Contact Us</Link>
            </li>
        </ul>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <div>
            <IoSearchOutline className='text-richblack-300 text-2xl'/>
        </div>
        <div>
            <IoCartOutline className='text-richblack-300 text-2xl'/>
        </div>
        <div className='text-medium text-richblack-300 border rounded-md p-2 border-richblack-700'>
            <Link to={"/signup"}>{btnText}</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
