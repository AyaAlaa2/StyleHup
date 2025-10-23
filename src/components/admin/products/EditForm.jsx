import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditForm({
  handleImageChange,
  handleSubmit,
  preview,
  onSubmit,
  register,
  errors,
  loading,
}) {
  const navigate = useNavigate();
  return (
    <div className=" bg-white p-6 my-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full md:w-[80%] "
      >
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Product Name</label>
          <input
            type="text"
            {...register("name")}
            className="border border-gray-400 rounded-md px-4 py-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price")}
            className="border border-gray-400 rounded-md px-4 py-2"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Description</label>
          <textarea
            rows="3"
            {...register("description")}
            className="border border-gray-400 rounded-md px-4 py-2 resize-none"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1">Category</label>
          <input
            type="text"
            {...register("category")}
            className="border border-gray-400 rounded-md px-4 py-2"
          />
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg font-medium mb-1">Product Image</h1>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-md mt-3 mb-3 "
            />
          )}
          <label className="btn cursor-pointer bg-[#F0F2F5] font-bold text-[14px] leading-[21px] w-1/3">
            Update Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex justify-start gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`font-bold text-white px-6 py-2 rounded-md duration-500cursor-pointer hover:bg-gray-800
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-black/80 cursor-pointer"
    }`}
          >
            {loading ? (
              <p>
                <span>Save Changes </span>
                <span className="loading loading-dots loading-md"></span>
              </p>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
