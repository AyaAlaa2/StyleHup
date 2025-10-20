import React, { useState, useCallback } from "react";
import { useAddOrder } from "../hooks/useAddOrder";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable("Country is required"),
  state: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable("State is required"),
  city: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable("City is required"),
  shoppingMethod: z.enum(["pickup", "express"], {
    errorMap: () => ({ message: "Please select a shipping method" }),
  }),
});

const CheckoutForm = ({ total, user, setCartFirebase, setShippingMethod }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addOrder } = useAddOrder();
  const navigate = useNavigate();

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value)
    : [];

  const countriesOptions = countries.map((item) => ({
    value: item.isoCode,
    label: item.name,
  }));

  const statesOptions = states.map((item) => ({
    value: item.isoCode,
    label: item.name,
  }));

  const citiesOptions = cities.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const updateCartInFirebase = useCallback(async () => {
    if (!user) {
      console.warn("User not found!");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { cart: [] });
      toast.success("Cart cleared !");
      setCartFirebase([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  }, [setCartFirebase, user]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.shoppingMethod == "express") {
      total += 10;
    }
    const newOrder = {
      id: Date.now().toString(),
      firstName: data.fname,
      lastName: data.lname,
      email: data.email,
      phone: data.phone,
      country: data.country?.label || "",
      state: data.state?.label || "",
      city: data.city?.label || "",
      shoppingMethod: data.shoppingMethod,
      total: total,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };
    await updateCartInFirebase();
    setLoading(false);
    addOrder(newOrder);
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      country: null,
      state: null,
      city: null,
      shoppingMethod: "pickup",
    },
  });

  return (
    <div className="max-w-3xl mx-auto shadow-md rounded-2xl p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Shopping Address</h2>
      <div className="flex gap-[16px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-[16px]">
            <div className="w-1/2 flex flex-col gap-[8px]">
              <label htmlFor="fname" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="fname"
                type="text"
                name="fname"
                {...register("fname")}
                className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
              />
              {errors.fname && (
                <p className="text-sm text-red-500">{errors.fname.message}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-[8px]">
              <label htmlFor="lname" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lname"
                type="text"
                name="lname"
                {...register("lname")}
                className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
              />
              {errors.lname && (
                <p className="text-sm text-red-500">{errors.lname.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-[16px]">
            <div className="w-1/2 flex flex-col gap-[8px]">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                {...register("email")}
                className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-[8px]">
              <label className="block text-sm font-medium">Phone</label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    country={selectedCountry?.value?.toLowerCase() || "sa"}
                    value={field.value}
                    onChange={field.onChange}
                    inputClass="!w-[93%] !text-[16px] !h-[40px]"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-[16px]">
            <div className="w-1/3 flex flex-col gap-[8px]">
              <label className="block text-sm font-medium">Country</label>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <Select
                    options={countriesOptions}
                    value={field.value}
                    onChange={(option) => {
                      setSelectedCountry(option);
                      setSelectedState(null);
                      setSelectedCity(null);
                      field.onChange(option);
                    }}
                  />
                )}
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            <div className="w-1/3 flex flex-col gap-[8px]">
              <label className="block text-sm font-medium">State</label>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    options={statesOptions}
                    value={field.value}
                    onChange={(option) => {
                      setSelectedState(option);
                      setSelectedCity(null);
                      field.onChange(option);
                    }}
                  />
                )}
              />
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state.message}</p>
              )}
            </div>

            <div className="w-1/3 flex flex-col gap-[8px]">
              <label className="block text-sm font-medium">City</label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    options={citiesOptions}
                    value={field.value}
                    onChange={(option) => {
                      setSelectedCity(option);
                      field.onChange(option);
                    }}
                  />
                )}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="gap-[16px]">
            <h2 className="text-2xl font-semibold mb-4">Shopping Method</h2>
            <Controller
              control={control}
              name="shoppingMethod"
              render={({ field }) => (
                <div className="space-x-3 flex">
                  <label className="w-1/2 flex items-center gap-3 border border-[#E5E8EB] p-5 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="pickup"
                      checked={field.value === "pickup"}
                      onChange={() => {
                        field.onChange("pickup");
                        setShippingMethod("pickup");
                      }}
                      className="radio"
                    />
                    <div>
                      <p className="font-medium">International Shipping</p>
                      <p className="text-sm text-gray-500">
                        Pick up your order from our nearest branch
                      </p>
                    </div>
                  </label>

                  <label className="w-1/2 flex items-center gap-3 border border-[#E5E8EB] p-5 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="express"
                      checked={field.value === "express"}
                      onChange={() => {
                        field.onChange("express");
                        setShippingMethod("express");
                      }}
                      className="radio"
                    />
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-gray-500">
                        Get it within 24 hours (extra $10)
                      </p>
                    </div>
                  </label>
                </div>
              )}
            />
            {errors.shoppingMethod && (
              <p className="text-red-500 text-sm">
                {errors.shoppingMethod.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full font-bold text-white py-2 rounded-md mt-4 duration-500
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-black/80 cursor-pointer"
    }`}
          >
            {loading ? (
              <p>
                <span>Pay now </span>
                <span className="loading loading-dots loading-md"></span>
              </p>
            ) : (
              "Pay now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
