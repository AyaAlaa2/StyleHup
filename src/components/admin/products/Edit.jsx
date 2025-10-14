import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import EditProduct from "../../hooks/EditProduct";
import { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const navigate = useNavigate();
  const { itemPage } = useParams();
  const id = Number(itemPage.split("-").pop());

  const editMutation = EditProduct();
  const { data: product, isLoading, isError } = useProduct(id);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product && product.image) {
      setPreview(product.image);
    }
  }, [product]);

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops! An error occurred.</p>
      </div>
    );

  const initialValues = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    size: product.size,
    image: product.image,
  };

  const handleSubmit = (values) => {
    const updatedValues = { ...values, image: preview };
    editMutation.mutate(updatedValues, {
      onSuccess: () => {
        toast.success("Edited Successfully!");
        navigate(-1);
      },

      onError: () => {
        toast.error("Edit Failed. Please try again.");
      },
    });
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" border-gray-400 rounded-xl shadow-md bg-white p-6  my-10">
      <h1 className="text-3xl font-bold mb-6  text-gray-800">Edit Product</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Price</label>
              <Field
                type="number"
                name="price"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Category</label>
              <Field
                type="text"
                name="category"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="3"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Size</label>
              <Field
                as="select"
                name="size"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
              </Field>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="border border-gray-400 rounded-md px-4 py-2 bg-white"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md mt-3 border"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer_ hover:bg-red-700"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800  cursor-pointer"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Edit;
