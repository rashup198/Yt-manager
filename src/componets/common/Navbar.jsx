import React, { useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'

import { IoIosArrowDropdown } from 'react-icons/io'


const Navbar = () => {

  const {token} = useSelector(state => state.auth);
  // const {user} = useSelector(state => state.user);

  // const [subLinks, setSubLinks] = React.useState([]);

//   const fetchSubLinks = async () => 
//   {
//   try {
//     const result =await apiConnector("GET", categories.CATEGORIES_API);
//     setSubLinks(result.data);
//     console.log("categories list", result );
//   } catch (error) {
//     console.log("cannot fetch the categories list");
//   }
// }
 
  // useEffect(() => { 
  //   fetchSubLinks();
  // },[])

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }
  return (
    <div className='h-14 border-b-[1px] border-b-richblack-500'>
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center text-white justify-between  mt-2 ">
        <Link to='/' className='text-2xl font-bold text-white'>Yt-Manager</Link>

        {/* // Navbar Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link,index) => (
              <li key={index}>
                {
                  link.title ==="Catalog" ? (
                  <div className='relative flex gap-3 items-center group'>
                    <p>{link.title}</p>
                     <IoIosArrowDropdown className='text-white' /> 
                     <div className='invisible absolute left-[10%] top-[90%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[180px] gap-2 '>
                     {subLinks.map((subLink,index) => (
                        <Link key={index} to={`${subLink.link}`} >
                         {subLink.title}
                        </Link>
                      ))}
                     </div> 
                  </div>) : (<div>
                    <Link to={link?.path}>
                      <div className={` ${matchRoute(link?.path) ? 'text-yellow-25 hover:text-yellow-25' : 'text-white'}`}>
                        {link?.title}
                      </div>
                    </Link>
                  </div>)
                }
              </li>
            ))}
            
          </ul>
        </nav>

      {/* // Login Button */}

      <div className="flex gap-x-4 items-center">
        {/* {
          user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className='relative'>
              <AiOutlineShoppingCart className='text-2xl text-white' />
              {
                totalItems > 0 && (
                  <div>
                    {totalItems}
                  </div>
                )
              }
            </Link>

          )
        } */}
        {
          token === null && (
            <Link to='/login' className='border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold'>Login</Link>
          )
        }
        {
          token === null &&(
            <Link to={"/signup"} className='border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold'>Signup</Link>
          )
        }

        {
          token !== null && <ProfileDropDown />
        }
      </div>

      </div> 
    </div>
  )
}

export default Navbar
