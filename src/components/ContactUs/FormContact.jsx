import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Email is not vaild",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const FormContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema), mode: "onBlur" });

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-2/5 space-y-[16px]">
      <div className="flex flex-col justify-center items-start gap-[8px] w-full">
        <label htmlFor="Name">
          <span className="text-[16px] font-medium text-[#141414]">Name</span>
        </label>
        <input
          type="text"
          id="Name"
          className="w-full rounded border border-[#E0E0E0] focus:outline-none p-2"
          placeholder="Your Name"
          required
          {...register("name")}
        />
        {errors?.name && (
          <p className="text-[13px] text-red-400">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-[8px]">
        <label htmlFor="Email">
          <span className="text-[16px] font-medium text-[#141414]">Email</span>
        </label>
        <input
          type="text"
          id="Email"
          className="w-full rounded border border-[#E0E0E0] focus:outline-none p-2"
          placeholder="Your Email"
          required
          {...register("email")}
        />
        {errors?.email && (
          <p className="text-[13px] text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-[8px]">
        <label htmlFor="Notes">
          <span className="text-[16px] font-medium text-[#141414]">
            Message
          </span>
        </label>
        <textarea
          id="Notes"
          className="w-full resize-none rounded border border-[#E0E0E0] focus:outline-none"
          rows="4"
          required
          {...register("message")}
        ></textarea>
        {errors?.message && (
          <p className="text-[13px] text-red-400">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-[16px] py-[8px] bg-black text-white rounded-lg font-bold text-[14px] cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default FormContact;
