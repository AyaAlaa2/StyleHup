import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditProduct from "../../hooks/EditProduct";
import { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useProducts";
import toast from "react-hot-toast";
import EditForm from "./EditForm";

const Edit = () => {
  const navigate = useNavigate();
  const { itemPage } = useParams();
  const id = Number(itemPage.split("-").pop());

  const editMutation = EditProduct();
  const { data: product, isLoading, isError } = useProduct(id);

  const [preview, setPreview] = useState("");

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce
      .number()
      .positive("Price must be greater than 0")
      .min(1, { message: "Price must be greater than 0" }),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
      });
      setPreview(product.image);
    }
  }, [product, reset]);

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-2xl text-red-600">Oops! Error loading product.</p>
      </div>
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values) => {
    const updatedValues = { ...product, ...values, id, image: preview };
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

  return (
    <div>
      <EditForm
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        preview={preview}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </div>
  );
};
export default Edit;
