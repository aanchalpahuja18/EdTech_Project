import React from 'react'
import {NavbarLinks} from "../../data/navbar-links"
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();

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
                                    link.title === "Catalog" ?  (<div></div>) : 
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
            
        </div>         

      </div>
    </div>
  )
}

export default Navbar
