import React, { useEffect, useState } from 'react'
import { AdminDashboard } from './AdminDashboard'
import axios from "axios";
import { toast } from 'react-toastify';

export const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success("Category is created");
        setName("")
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in input form");
    }
  };


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleEdit = (category) => {
    setSelected(category);
    setUpdatedName(category.name);
    setVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(selected.id);
    try {

      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/api/category/update-category/${selected.id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <div className='grid grid-flow-col'>
      <AdminDashboard />
      <div className="w-1/2 h-full sm:w-full mx-5 sm:mx-0 grid grid-flow-row p-2 mt-2">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-10">
              <h2 className=" text-gray-900 text-2xl font-bold leading-tight tracking-tight ">Create Category</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label htmlFor="category-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Category Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="category-name"
                      id="category-name"
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center mr-4 gap-x-6 ">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        <div className="relative overflow-x-scroll mt-6 rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-2 py-3">Category Name</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={c.id}>
                    <td key={c.id} className="px-2 py-3">{c?.name}</td>
                    <td className="px-2 py-3">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="ml-2 bg-red-600 hover:bg-red-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {visible && (
          <form onSubmit={handleUpdate} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
            <label htmlFor="updated-name" className="block text-sm font-medium leading-6 text-gray-900">
              Updated Category Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="updated-name"
                id="updated-name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  setUpdatedName("");
                }}
                className="bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800 px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
