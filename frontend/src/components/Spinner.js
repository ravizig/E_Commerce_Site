import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Spinner = ({ path = "login", text = "Loding...", num = 1 }) => {

  const [count, setCount] = useState(num);
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue)
    }, 1000)

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);

  }, [count, navigate, location, path])

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
      <span className='m-1'>{text}</span>
    </div>
  )

};
