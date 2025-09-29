import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { z } from "zod";
import L from "leaflet";
import { RiGlobalLine } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email is not vaild",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema), mode: "onBlur" });

  const randomPosition = [
    31.95 + (Math.random() - 0.5) * 0.1,
    35.91 + (Math.random() - 0.5) * 0.1,
  ];

  return (
    <div>
      <p className="text-[32px] font-bold ">Contact Us</p>
      <p className="font-normal text-[14px] text-[#757575] pt-[12px] pb-[16px]">
        We're here to help! Reach out with any questions or feedback.
      </p>
      <form onSubmit={handleSubmit} className="w-2/5 space-y-[16px]">
        <div className="flex flex-col justify-center items-start gap-[8px] w-full">
          <label htmlFor="Name">
            <span className="text-[16px] font-medium text-[#141414]">Name</span>
          </label>
          <input
            type="text"
            id="Name"
            className="w-full rounded border border-[#E0E0E0] focus:outline-none p-2"
            placeholder="Your Name"
            {...register("name")}
          />
          {errors?.name && (
            <p className="text-[13px] text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-[8px]">
          <label htmlFor="Email">
            <span className="text-[16px] font-medium text-[#141414]">
              Email
            </span>
          </label>
          <input
            type="text"
            id="Email"
            className="w-full rounded border border-[#E0E0E0] focus:outline-none p-2"
            placeholder="Your Email"
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
            {...register("message")}
          ></textarea>
          {errors?.message && (
            <p className="text-[13px] text-red-400">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-[16px] py-[8px] bg-black text-white rounded-lg font-bold text-[14px]"
        >
          Submit
        </button>
      </form>

      <div className="w-full h-96 rounded-2xl overflow-hidden shadow overflow-hidden mt-[12px]">
        <MapContainer
          center={randomPosition}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={randomPosition} icon={customIcon}></Marker>
        </MapContainer>
      </div>

      <div>
        <p className="font-normal text-[16px] mt-[4px] text-[#141414]">
          Visit us at our store or connect with us online. We're always happy to
          assist you.
        </p>
        <div className="flex flex-row gap-[8px] mt-[16px] items-center">
          <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
            <IoLocationOutline className="text-[#141414] text-[22px]" />
          </div>
          <p className="text-[16px] font-normal text-[#141414]">
            123 Fashion Avenue, San Francisco, CA 94105
          </p>
        </div>
        <div className="flex flex-row gap-[8px] mt-[16px] items-center">
          <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
            <LuPhone className="text-[#141414] text-[22px]" />
          </div>
          <p className="text-[16px] font-normal text-[#141414]">
            (555) 123-4567
          </p>
        </div>
        <div className="flex flex-row mt-[16px] items-center justify-between">
          <div className="w-[50%] flex items-center gap-[8px]">
            <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
              <RiGlobalLine className="text-[#141414] text-[22px]" />
            </div>
            <p className="text-[16px] font-normal text-[#141414]">
              Follow us on social media
            </p>
          </div>
          <div>
            <GoArrowRight className="text-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
