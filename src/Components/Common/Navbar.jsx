import React, { useEffect } from 'react'
import { NavBarLink } from '../../Data/NavBarLink'
import {Link, NavLink, matchPath, useLocation} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from "firebase/auth";
import { useNavigate  } from "react-router-dom";
import { signOut } from "firebase/auth";
import { setToken } from '../../Slice/authSlice';
import toast from 'react-hot-toast';
import { slide as Menu } from "react-burger-menu";
import Button from '../core/Button';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import './navbar.css'

function Navbar() {
    let navigate  = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const token = useSelector((state) => state.auth.token);

    const handleLogout = async () => {

        try {
        const auth = getAuth();
        await signOut(auth);
        console.log("User logged out successfully.");
        dispatch(setToken(null)); 
        toast.success("Logout Successfully")
        navigate("/");
      } catch (error) {
        console.error("Error logging out: ", error.message);
      }
    };

    const confirmLogout = () => {
            confirmAlert({
              title: "Confirm Logout",
              message: "Are you sure you want to log out?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => handleLogout()
                },
                {
                  label: "No"
                }
              ]
            });
          };

    const path = location.pathname;
    const lastPart = path.split('/').pop();
    const route = "login";

    const matchRoute2 = () => {return lastPart === route;}

    return (
        <div className={ "flex justify-between pl-[2rem] pr-[2rem] items-center bg-[#0F8AFC] h-[3rem]  rounded-full text-white text-xl font-bold p-[0.5rem] " + 
            (matchRoute2() ? 'hidden' : 'block')
        }>
        <NavLink to={'/'} className='flex gap-2'>
            <img src="Logo.webp" className="w-8 rounded-full" alt="" />
            <p>DriveDeal</p>
        </NavLink>

        <div className='flex justify-evenly w-[40rem] max-md:hidden'>
        {
            NavBarLink.map((link, id)=>(
                <div key={id} className=''>
                    { link?.path!="/manageVehicle" && link?.path!="/AddVehicle" ? ( 
                        <NavLink  to={link?.path} >
                            <span className={`${
                                matchRoute(link?.path) && "text-[#FFF980] underline underline-offset-4" }  `}>{link?.title}
                            </span>
                        </NavLink >) : (
                        token && (
                        <NavLink  to={link?.path} >
                            <span className={`${
                                matchRoute(link?.path) && "text-[#FFF980] underline underline-offset-4" }  `}>{link?.title}
                            </span>
                        </NavLink >))    
                    }
                </div>
            ))
        }     
        </div>
        <div className='md:hidden'>
            <Menu  className=''>
                {
                    NavBarLink.map((link, id)=>(
                        <div key={id} className=''>
                            { link?.path!="/manageVehicle" && link?.path!="/AddVehicle" ? ( 
                                <NavLink  to={link?.path} >
                                    <span className={`${
                                        matchRoute(link?.path) && "text-[#FFF980] underline underline-offset-4" }  `}>{link?.title}
                                    </span>
                                </NavLink >) : (
                                token && (
                                <NavLink  to={link?.path} >
                                    <span className={`${
                                        matchRoute(link?.path) && "text-[#FFF980] underline underline-offset-4" }  `}>{link?.title}
                                    </span>
                                </NavLink >))    
                            }
                        </div>
                    ))
                }

                <div className='m-auto absolute bottom-[4rem] p-8 w-[76%] box-border'>
                {
                    !token ? (<Link to={'/login'} className=''>
                                    <Button  value="Login"></Button>
                            </Link>) : (<div onClick={confirmLogout}>
                                <Button  value="Logout"></Button>
                            </div>)
                }
            </div>

            </Menu>
        </div>

        <div className='max-md:hidden'>
            {
                !token ? (<Link to={'/login'} className=''>
                                <button>Login</button> 
                            </Link>) : (<div onClick={confirmLogout}>
                                <button>Logout</button>
                            </div>)
            }
        </div>
        
    </div>
  )
}

export default Navbar
