import React, { useState } from 'react'
import Navbar from './Navbar'
import LoginImage from "../assets/Images/login.webp"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({email: "", password: ""});
    const [accountType, setAccountType] = useState("Student");


    function handleFormData(e) {
        const {name, value} = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        } )
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("Printing form data: ");
        console.log(formData);
    }


    function handleAccountType(value){
        console.log(value)
        setAccountType(value);
    }
  return (
    <div className='flex flex-col'>
      <div>
        <Navbar btnText = "Signup"/>
      </div>
      <div className='flex justify-between items-center text-white mt-16'>
        {/* left part  */}
        <div className='flex flex-col gap-8 p-8 mx-auto h-fit'>
            <div className='text-richblack-5 font-inter font-semibold text-3xl'>Welcome Back</div>
            <div>
                <p className='text-lg font-inter leading-6.5 font-medium text-richblack-300'>Discover your passions,</p>
            <p className='text-richblue-200 text-lg italic font-inter font-bold'>Be Unstoppable</p>
            </div>
            <div className='w-57.5 h-11 flex gap-5 items-center justify-between bg-richblack-800 p-4 rounded-full'>
                <button className={`cursor-pointer ${accountType === "Student" ? "bg-richblack-900 p-1 px-4 rounded-full" : "bg-richblack-800 p-1 px-4 "}`} onClick={() => handleAccountType("Student")}>Student</button>
                <button className={`cursor-pointer ${accountType === "Instructor" ? "bg-richblack-900 p-1 px-4 rounded-full" : "bg-richblack-800 p-1 px-4 "}`} onClick={() => handleAccountType("Instructor")}>Instructor</button>
            </div>

            {/* form part  */}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-white'>Email Address</label>
                        <input type="email" id='email' placeholder='Enter email address' name='email' value={formData.email} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 lg:w-111 rounded-lg mt-2'/> 
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="password" className='text-white'>Password</label> 
                        <input type="password" id='password' placeholder='Enter password' name='password' value={formData.password} onChange={handleFormData} className='bg-richblack-800 p-2 lg:w-111 rounded-lg mt-2 px-4'/>
                        <div className='absolute top-12 right-3 cursor-pointer flex items-center justify-center text-xl'>
                            <MdOutlineRemoveRedEye/>
                        </div>
                        <div className='absolute top-20 right-2'>
                            <Link className='text-xs text-richblue-100 font-medium' to={"/forgot-password"}>Forgot Password</Link>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-10'>
                    <button type='submit' className={`text-center text-[15px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 cursor-pointer`}>Submit</button>
                </div>
            </form>
        </div>
        {/* right image part */}
        <div className='w-[50%]'>
            <img src={LoginImage} alt="login image"/>
        </div>
      </div>
    </div>
  )
}

export default Login
