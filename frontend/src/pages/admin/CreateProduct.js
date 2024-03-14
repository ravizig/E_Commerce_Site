// import React, { useEffect, useState } from 'react'
// import { AdminDashboard } from './AdminDashboard'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { toast } from 'react-toastify'

// export const CreateProduct = () => {

//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [category, setCategory] = useState("");


//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);

//       if (data?.success) {
//         setCategories(data?.category);
//       }
//       else{
//         toast.error(data?.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting category");
//     }
//   };


// useEffect(() => {
//   getAllCategory();
// },[])



//   const handleCreate = async (e) => {

//     e.preventDefault();

//     try {

//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("quantity", quantity);
//       formData.append("photo", photo);
//       formData.append("category", category);

//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/product/create-product`,
//         formData, 
//         {
//         headers: { "Content-Type": 'multipart/form-data' }
//       }
//       );

//       if (data?.success) {
//         toast.success("Product Created Successfully");
//         navigate("/dashboard/admin/products");
//       } else {
//         toast.error(data?.message);

//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   }


//   return (
//     <div className='grid grid-flow-col'>
//       <AdminDashboard />
//       <form className="w-1/2 h-full sm:w-full mx-5 sm:mx-0 grid grid-flow-row p-2 mt-3" method='POST' encType='multipart/form-data' onSubmit={handleCreate} >
//         <div className="space-y-12">
//           <div className="border-b border-gray-900/10 pb-10">
//             <h2 className=" text-gray-900 text-2xl font-bold leading-tight tracking-tight ">Product Information</h2>
//             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//               <div className="sm:col-span-full">
//                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
//                 <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                   onChange={(e) => {
//                     setPhoto(e.target.files[0])
//                   }} accept="image/*" aria-describedby="file_input_help" id="photo"
//                   name='photo' type="file"
//                   hidden required/>
//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-600" id="file_input_help"> PNG, JPG (MAX. 3MB).</p>
//               </div>
//               <div className="sm:col-span-full">
//                 <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
//                   Product Name
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     name="product-name"
//                     id="product-name"
//                     autoComplete='off'
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required />
//                 </div>
//               </div>
//               <div className="inline-block relative w-64">
//                 <select onChange={(e) => {
//                   setCategory(e.target.value);
//                 }}
//                   showSearch
//                   value={category}
//                   className="block appearance-none w-full text-gray-900 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
//                   {categories?.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="sm:col-span-full">
//                 <label htmlFor="product-description" className="block text-sm font-medium leading-6 text-gray-900">
//                   Product Description
//                 </label>
//                 <div className="mt-2">
//                   <textarea
//                     type="text"
//                     name="product-description"
//                     id="product-description"
//                     autoComplete='off'
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required />
//                 </div>
//               </div>
//               <div className="sm:col-span-full">
//                 <label htmlFor="product-price" className="block text-sm font-medium leading-6 text-gray-900">
//                   Product Price
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="number"
//                     name="product-price"
//                     id="product-price"
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={price}
//                     min={1}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required />
//                 </div>
//               </div>
//               <div className="sm:col-span-full">
//                 <label htmlFor="product-quantity" className="block text-sm font-medium leading-6 text-gray-900">
//                   Product Quantity
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="number"
//                     name="product-quantity"
//                     id="product-quantity"
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     min={1}
//                     required />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-center mr-6 gap-x-6 ">
//           <button
//             type="submit"
//             className=" bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Create Product
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }




///////use hook form


import React, { useEffect, useState } from 'react'
import { AdminDashboard } from './AdminDashboard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"


export const CreateProduct = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,

  } = useForm()

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);

      if (data?.success) {
        setCategories(data?.category);
      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [])



  const onSubmit = async (data) => {
 
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("photo", data.photo[0]);
    formData.append("category", data.category);

    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/product/create-product`,
      formData,
      {
        headers: { "Content-Type": 'multipart/form-data' }
      }
    );

    console.log("res",res)
    if (res?.data?.success) {
      toast.success("Product Created Successfully");
      navigate("/dashboard/admin/products");
    } else {
      toast.error(res?.data?.message);
    }
  }


  return (
    <div className='grid grid-flow-col'>
      <AdminDashboard />
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full sm:w-full mx-5 sm:mx-0 grid grid-flow-row p-2 mt-3" method='POST' encType='multipart/form-data'>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-10">
            <h2 className=" text-gray-900 text-2xl font-bold leading-tight tracking-tight ">Product Information</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  {...register("photo")} accept="image/*" aria-describedby="file_input_help" id="photo"
                  name='photo' type="file"
                  hidden required />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-600" id="file_input_help"> PNG, JPG (MAX. 3MB).</p>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete='off'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    {...register("name")}
                    required />
                </div>
              </div>
              <div className="inline-block relative w-64">
                <select
                  showSearch

                  className="block appearance-none w-full text-gray-900 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id} {...register("category")}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    autoComplete='off'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    {...register("description")}
                    required />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="product-price" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    min={1}
                    {...register("price")}
                    required />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Quantity
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    {...register("quantity")}
                    min={1}
                    required />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center mr-6 gap-x-6 ">
          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}
