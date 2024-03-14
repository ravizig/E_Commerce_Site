import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/Auth'

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const createCart = async (userid) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/cart/create`,
        {
          userid
        }
      );

      if (res?.data?.success) {
        console.log(res?.data?.message);
      }
      else {
        console.log(res?.data?.message)
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`,
        { email, password }
      )

      if (res?.data?.success) {

        await setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })

        localStorage.setItem('auth', JSON.stringify(res.data))

        toast.success(res.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000)
        
        navigate(location.state || "/");


        createCart(res?.data?.user?.id);

      }
      else {
        toast.error(res.data.message)
        navigate("/signup")
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleTestCredentials = () => {
    setEmail(process.env.REACT_APP_TEST_EMAIL)
    setPassword(process.env.REACT_APP_TEST_PASSWORD)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-auto h-screen ">
        <div className="w-max bg-white rounded-lg shadow dark:border mt-0 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-end justify-end">
                <Link to={"/forgot-password"} className="text-sm mx-4 font-medium text-primary-600 hover:underline dark:text-gray-50 sm:text-xs">Forgot password?</Link>
              </div>
              <button type="submit" className=" bg-blue-700 hover:bg-blue-800 hover:underline dark:bg-blue-600 dark:hover:bg-blue-700  w-full  text-white bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 ">Login</button>
              <button type="submit" onClick={handleTestCredentials} className=" bg-blue-700 hover:bg-blue-800 hover:underline dark:bg-blue-600 dark:hover:bg-blue-700  w-full  text-white bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 ">Login With Test Credentials</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to={'/signup'} className="font-mediumtext-primary-600 hover:underline font-bold dark:text-gray-50">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
