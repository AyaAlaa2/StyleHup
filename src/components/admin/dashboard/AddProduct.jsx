import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import uploadImageToCloudinary from "../../cloudinary/uploadImageToCloudinary";
import { useAddProduct } from "../../hooks/addProduct";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { mutate: addProduct } = useAddProduct();
  const category = ["Men", "Women", "Kids", "Accessories"];
  const productSchema = z.object({
    productName: z
      .string()
      .min(3, { message: "Product name must be at least 3 characters" }),
    price: z.coerce
      .number()
      .positive("Price must be greater than 0")
      .min(1, { message: "Price must be greater than 0" }),
    category: z.string().min(2, { message: "Category is required" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    image: z
      .any()
      .refine((files) => files?.length > 0, "Please Select Image")
      .refine(
        (files) => files && files[0]?.type.startsWith("image/"),
        "File must be an image"
      ),
    size: z
      .array(z.string().min(1, "Size cannot be empty"))
      .min(1, "Please add at least one size"),
    material: z
      .string()
      .min(3, { message: "Material must be at least 3 characters" }),
    color: z
      .array(z.string().min(1, "Color cannot be empty"))
      .min(1, "Please add at least one color"),
    careInstructions: z.string().min(5, {
      message: "Care instructions must be at least 5 characters",
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
  });

  const imageFiles = watch("image");

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const file = imageFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFiles]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageFile = data.image[0];
      const uploadedUrl = await uploadImageToCloudinary(imageFile);

      const newProduct = {
        id: Date.now().toString(),
        name: data.productName,
        description: data.description,
        price: Number(data.price),
        size: data.size,
        material: data.material,
        category: data.category,
        color: data.color,
        careInstructions: data.careInstructions,
        inWishlist: false,
        inCard: false,
        customer_reviews: {
          average_rating: 0,
          total_reviews: 0,
          ratings_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        },
        image: uploadedUrl,
      };
      addProduct(newProduct);
      toast.success("Product added successfully!");
      reset();
      setImage(null);
    } catch (err) {
      console.error("Error uploading product:", err);
      toast.error("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full">
      <div className="px-[16px] py-[20px] pb-[12px]">
        <h2 className="text-[22px] leading-[28px] text-[#121417] font-bold ">
          Add New Product
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label
            htmlFor="productName"
            className="block text-[16px] font-medium leading-[24px] text-[#121417]"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            {...register("productName")}
            placeholder="Enter product name"
            className="input border-[#DBE0E5] w-full focus:outline-none p-[15px]"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label
            htmlFor="price"
            className="block text-[16px] font-medium leading-[24px] text-[#121417]"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register("price")}
            placeholder="Enter product price"
            className="input border-[#DBE0E5] w-full focus:outline-none p-[15px]"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="form-control flex gap-[8px] px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label
            htmlFor="category"
            className="block text-[16px] font-medium leading-[24px] text-[#121417]"
          >
            <span className="label-text">Category</span>
          </label>
          <select
            id="category"
            {...register("category")}
            className="border border-[#DBE0E5] rounded-lg w-full focus:outline-none p-[15px] bg-white"
            defaultValue=""
          >
            <option hidden value="Select Size">
              Select Category
            </option>
            {category.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label className="block text-[16px] font-medium leading-[24px] text-[#121417]">
            Sizes
          </label>
          <input
            type="text"
            {...register("size", {
              setValueAs: (v) =>
                v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Enter sizes separated by commas"
            className="input border-[#DBE0E5] w-full focus:outline-none p-[15px]"
          />
          {errors.size && (
            <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label className="block text-[16px] font-medium leading-[24px] text-[#121417]">
            Material
          </label>
          <input
            type="text"
            {...register("material")}
            placeholder="Enter material"
            className="input border-[#DBE0E5] w-full focus:outline-none p-[15px]"
          />
          {errors.material && (
            <p className="text-red-500 text-sm mt-1">
              {errors.material.message}
            </p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label className="block text-[16px] font-medium leading-[24px] text-[#121417]">
            Colors (comma separated)
          </label>
          <input
            type="text"
            {...register("color", {
              setValueAs: (v) =>
                v
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean),
            })}
            placeholder="Enter colors separated by commas"
            className="input border-[#DBE0E5] w-full focus:outline-none p-[15px]"
          />
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label className="block text-[16px] font-medium leading-[24px] text-[#121417]">
            Care Instructions
          </label>
          <textarea
            rows="2"
            {...register("careInstructions")}
            placeholder="Enter care instructions"
            className="textarea w-full border-[#DBE0E5] focus:outline-none p-[15px]"
          ></textarea>
          {errors.careInstructions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.careInstructions.message}
            </p>
          )}
        </div>

        <div className="px-[16px] py-[12px] flex flex-col gap-[16px] w-full lg:w-1/2">
          <label
            htmlFor="description"
            className="block text-[16px] font-medium leading-[24px] text-[#121417]"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            {...register("description")}
            placeholder="Enter description"
            className="textarea w-full border-[#DBE0E5] focus:outline-none p-[15px]"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="p-[16px]">
          <div className="border-2 border-dashed border-[#DBE0E5] rounded-lg py-[56px] px-[24px] text-center w-full">
            {image ? (
              <div className="flex flex-row justify-start items-center">
                <div className="relative w-36 h-36 rounded-lg mx-auto">
                  <FaTimes
                    className="absolute right-0 top-[-5px] bg-gray-400 text-white rounded-lg p-1 text-lg cursor-pointer"
                    onClick={() => setImage(null)}
                  />
                  <img
                    src={image}
                    alt="Product Image"
                    className="mb-3 w-36 h-36 object-cover rounded-lg "
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[24px] items-center">
                <div className="flex flex-col gap-[8px]">
                  <p className="font-bold text-[18px] leading-[23px] text-[#121417]">
                    Upload Product Image
                  </p>
                  <p className="text-[14px] leading-[21px] text-[#121417]">
                    Drag and drop or click to upload
                  </p>
                </div>
                <label className="btn cursor-pointer bg-[#F0F2F5] font-bold text-[14px] leading-[21px]">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="hidden"
                  />
                </label>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-[16px] py-[12px] flex justify-end">
          <button
            type="submit"
            className={`btn ${
              loading
                ? "bg-blue-600/40 hover:bg-blue-700/40 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white self-end mt-3 `}
          >
            {loading ? (
              <p>
                Loading
                <span className="loading loading-dots loading-xs"></span>
              </p>
            ) : (
              <p>Add Product</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
