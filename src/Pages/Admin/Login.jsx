import React from 'react'
import {Link} from "react-router-dom"
import { useState, useEffect ,useRef } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setToken } from '../../Slice/authSlice';
import {toast} from 'react-hot-toast'
import Button from '../../Components/core/Button'

function Login() {

    const [error, setError] = useState("");
    let navigate  = useNavigate();
    const formRef = useRef(null);
    const auth = getAuth();
    const dispatch = useDispatch();
    const {token, loading} = useSelector((state) => state.auth)
    
    // useEffect(() => {
    //     // console.log("Loading state changed:", loading);
    //   }, [loading]);

    const handleLogin = async (e) => {

        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries())
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.token) {
            dispatch(setToken(idTokenResult.token))
            console.log("token from useSelector hook: ", token);
            toast.success("Login Successful")
            navigate ("/");
        } else {
          setError("You do not have admin privileges.");
        }
      } catch (err) {
        setError("Invalid email or password.");
        toast.error("Invalid email or password")
      }finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };


return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
    <div>
        {
            !loading && (

                <div>
                    <div>
                        <Link to={'/'}
                            className="transition-all block py-1 px-4 w-[4.5rem] text-white font-bold rounded-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg
                            absolute top-12 left-12 max-sm:left-6 ">
                            Back
                        </Link>
                    </div>
                    <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-[30rem] max-sm:w-[90%] max-sm:m-auto ">
                        <h1 className="font-bold text-center block text-2xl">Log In</h1>
                        <form ref={formRef} onSubmit={handleLogin}>
                            <label className="text-gray-500 block mt-3">"Email Address"
                                <input
                                    autoFocus={true}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="me@example.com"
                                    className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
                            </label>
                            <label className="text-gray-500 block mt-3">"Password"
                                <input
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="••••••••••"
                                    className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
                            </label>

                            <Button value="Submit"/>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
    
    </div>
)
}

export default Login


