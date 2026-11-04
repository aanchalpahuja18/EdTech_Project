import {React, useState} from 'react'
import Navbar from './Navbar'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import SignupImage from "../assets/Images/signup.webp"
import Frame from "../assets/Images/frame.png"



const Signup = () => {
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", contactNo: "", createPassword: "", confirmPassword: ""}); 
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
      {/* <div>
        <Navbar btnText = "Login"/>
      </div> */}
      <div className='flex justify-between items-center text-white mt-8'>
        {/* left part  */}
        <div className='flex flex-col gap-6 p-8 mx-auto h-fit'>
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
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName" className='text-white'>First Name</label>
                            <input type="text" id='firstName' placeholder='Enter first name' name='firstName' value={formData.firstName} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 rounded-lg mt-2'/> 
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName" className='text-white'>Last Name</label>
                            <input type="text" id='lastName' placeholder='Enter last name' name='lastName' value={formData.lastName} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 rounded-lg mt-2'/> 
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-white'>Email Address</label>
                        <input type="email" id='email' placeholder='Enter email address' name='email' value={formData.email} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 w-full rounded-lg mt-2'/> 
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="contactNo" className='text-white'>Phone No.</label> 
                        <div className='flex gap-2'>
                            <input type="text" placeholder='+91' className='bg-richblack-800 w-[15%] p-2 rounded-lg mt-2 px-4' />
                        <input type="text" id='contactNo' placeholder='12345 67890' name='contactNo' value={formData.contactNo} onChange={handleFormData} className='bg-richblack-800 p-2 rounded-lg mt-2 px-4 w-[85%]'/>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="createPassword" className='text-white'>Create Password</label>
                            <input type="password" id='createPassword' placeholder='Enter password' name='createPassword' value={formData.createPassword} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 rounded-lg mt-2'/> 
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="confirmPassword" className='text-white'>Confirm Password</label>
                            <input type="password" id='confirmPassword' placeholder='Enter password' name='confirmPassword' value={formData.confirmPassword} onChange={handleFormData} className='bg-richblack-800 p-2 px-4 rounded-lg mt-2'/> 
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-10'>
                    <button type='submit' className={`text-center text-[15px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 cursor-pointer`}>Create Account</button>
                </div>
            </form>
        </div>
        {/* right image part */}
        <div className='w-[50%] relative'>
            <img src={SignupImage} alt="signup image" className='-top-70 absolute z-10' width="558px" height="504px"/>
            <img src={Frame} alt="frame" className='absolute lg:-top-65 lg:right-47 lg:z-2' width="558px" height="504px" />
        </div>
      </div>

    </div>
  )
}

export default Signup
