import React, { useState } from 'react'
import {NavbarLinks} from "../../data/navbar-links"
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoArrowDown } from "react-icons/io5";



//for testing purpose only
const subLinks = [
    {
        name: "Android",
        link: "/catalog/android"
    },
    {
        name: "Python",
        link: "/catalog/python"
    },
    {
        name: "Web Development",
        link: "/catalog/web-dev"
    },
    {
        name: "AI Engineering",
        link: "/catalog/ai-engineering"
    }
]


const Navbar = () => {
    

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const totalItems = useSelector((state) => state.cart.totalItems)

    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);

    // async function fetchSubLinks() {
    //     try {
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing sublinks", result)
    //         setSubLinks(result.data.data)

    //     } catch (error) {
    //         console.log("Could not fetch the catalog list")
    //     }
    // }
    // useEffect(() => {
    //     fetchSubLinks();
    // }, [])

    function matchRoute(route) {
        return matchPath({path: route}, location.pathname)
    }
  return (
    <div className='flex items-center justify-center h-14 border-b border-b-richblack-700'>
      <div className='w-11/12 max-w-max-content flex items-center justify-between'>
      {/* Logo added */}
        <Link to={"/"}>
            <img src={Logo} alt="logo" width={160} height={42} loading='lazy'/>
        </Link>
        {/* Nav Links  */}
        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((link, index) => {
                        return (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ?  (
                                    <div className='relative flex items-center gap-2 group cursor-pointer hover:text-yellow-25'>
                                            <p>{link.title}</p>
                                        <IoArrowDown />
                                        <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-75 z-100'>
                                        <div className='invisible absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-45%] transition-all duration-200 group-hover:visible'></div>
                                        {
                                           subLinks.length ? (subLinks.map((subLink, index) => (
                                                    <Link to={`${subLink.link}`} key={index}>
                                                        <p className='text-richblack-900'>{subLink.name}</p> 
                                                    </Link>
                                                )
                                            )) : (<div></div>)
                                        }
                                        </div>
                                    </div>
                                ) : 
                                    (<Link to={link?.path}>
                                        <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                    </Link>)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </nav>

        {/* Login / Signup / Dashboard  */}
        <div className='flex gap-x-4 items-center'>
            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to={"/login"}>
                        <button className='p-2 text-richblack-100 border border-richblack-700 cursor-pointer rounded-md bg-richblack-800'>
                            Login
                        </button>
                    </Link>
                ) 
            }
            {
                token === null && (
                    <Link to={"/signup"}>
                        <button className='p-2 text-richblack-100 border border-richblack-700 cursor-pointer rounded-md bg-richblack-800'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && (
                    <ProfileDropDown/>
                )
            }
        </div>         

      </div>
    </div>
  )
}

export default Navbar
