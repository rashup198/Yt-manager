import React, { useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { IoIosArrowDropdown } from 'react-icons/io';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-14 border-b-[1px] border-b-richblack-500 bg-richblack-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center text-white justify-between mt-2">
        <Link to="/" className="text-2xl font-bold text-white">
          StreamLine
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Navbar Links */}
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:gap-x-6 text-richblack-25 absolute lg:static top-[60px] left-0 w-full lg:w-auto lg:bg-transparent bg-richblack-900 lg:text-white p-6 lg:p-0 z-10`}
        >
          <ul className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index} onClick={closeMobileMenu}>
                {link.title === 'Catalog' ? (
                  <div className="relative flex gap-3 items-center group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown className="text-white" />
                    <div className="invisible absolute left-[10%] top-[90%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[180px] gap-2">
                      {/* {subLinks.map((subLink, index) => (
                        <Link key={index} to={`${subLink.link}`}>
                          {subLink.title}
                        </Link>
                      ))} */}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} onClick={closeMobileMenu}>
                    <div
                      className={`${
                        matchRoute(link?.path)
                          ? 'text-yellow-25 hover:text-yellow-25'
                          : 'text-white'
                      }`}
                    >
                      {link?.title}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Login/Signup/Profile Buttons */}
          <div className="lg:hidden gap-9 items-center justify-center">
            {token === null ? (
              <div className='flex gap-10 mt-[20px]'>
                <Link
                  to="/login"
                  className="border border-richblack-700 bg-richblue-800 px-[12px] py-[5px]  rounded-md text-white font-semibold"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold"
                  onClick={closeMobileMenu}
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex justify-center items-center">
              <ProfileDropDown />
              </div>
            )}
          </div>
        </nav>

        {/* ProfileDropDown for larger screens */}
        <div className="hidden lg:flex gap-x-4 items-center">
          {token === null ? (
            <>
              <Link
                to="/login"
                className="border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
