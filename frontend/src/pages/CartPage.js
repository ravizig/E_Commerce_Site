import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { useAuth } from '../context/Auth';
import { toast } from 'react-toastify';


export const CartPage = () => {

  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("")

  // Getting User id from local storage
  const authData = localStorage?.getItem('auth')

  const data = JSON.parse(authData)

  const id = data?.user?.id;


  const getCartProducts = async (userid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/cart/${userid}`,
      );

      if (data?.success) {
        setCart(data?.cart?.products)
        setCartId(data?.cart?.id)
      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    getCartProducts(id)
  }, [])

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeFromCart = async (pid) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/cart/remove-from-cart`,
        {
          productId: pid,
          cartId
        }
      );

      if (res.data.success) {

        toast.success(res.data.message)
        getCartProducts(id)
        setTimeout(() => window.location.reload(), 1500)

      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="mt-4 mx-5 flex flex-col h-full p-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">

            {cart?.length > 0 ?

              (cart?.map((product) => (

                <li key={product?.id} className="flex py-6">
                  <div className="h-auto w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={`uploads/${product.photo}`}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </Link>
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <Link to={`/product/${product.slug}`}>
                          <h3>
                            {product.name}
                          </h3>
                        </Link>
                        <p className="ml-4">${product.price}</p>
                      </div>
                      <h4 className='text-gray-700'>
                        {product.description}
                      </h4>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Quantity Avilable : {product.quantity}</p>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium rounded-md border-2 px-2 py-1 bg-red-500 text-black hover:text-indigo-500"
                          onClick={() => {
                            removeFromCart(product.id)
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))) : "No Items"}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 p-8 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>{totalPrice()}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button
            className="flex items-center justify-center cursor-not-allowed bg-gray-500 rounded-md text-white border border-transparent px-6 py-3 text-base font-medium shadow-sm"
            disabled>
            Pay and Order
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
