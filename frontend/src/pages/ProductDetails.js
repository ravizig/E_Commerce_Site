import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProductDetails = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartId, setCartId] = useState("")


  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // Getting User id from local storage
  const authData = localStorage?.getItem('auth')

  const data = JSON.parse(authData)

  const id = data?.user?.id;


  // Getting cartId
  const getCart = async (userid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/cart/${userid}`,
      );

      if (data?.success) {
        setCartId(data?.cart?.id)
      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  const addToCart = async (pId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/cart/add-to-cart`,
        {
          cartId,
          productId: pId
        }
      );

      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message)
      }
      else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {

    getCart(id)
    getSingleProduct()

  }, [product])

  return (
    <div className="relative m-8 p-2 sm:m-4 flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md">
      <div>
        <div className='flex sm:flex-col'>
          <Link className="relative mx-3 mt-3 flex h-60 rounded-xl ">
            <img className="object-cover" src={`/uploads/${product.photo}`} alt="product image" />
          </Link>
          <h2 className='mt-3'>Description : {product.description}</h2>
        </div>

        <div className="mt-4 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900 font-medium">{product.name}</h5>
          <Link to={'/product-details'}>
            <p>
              <span className="text-3xl font-bold text-slate-900">${product.price}</span>
              <span className="text-sm text-slate-900 line-through">${product.price + 200}</span>
            </p>
            <div className="mt-2 mb-5 flex items-end justify-center">
              <div className="flex justify-center items-center">
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
              </div>
            </div>
          </Link>

          <button
            onClick={async (e) => {
              e.preventDefault()
              await addToCart(product?.id)
            }}
            className="flex items-center justify-center mt-3 rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg> Add To Cart
          </button>

        </div>
      </div>
    </div>
  )
}
