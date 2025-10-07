import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import uploadImageToCloudinary from "../cloudinary/uploadImageToCloudinary";
import toast from "react-hot-toast";

const Signup = ({ setTab }) => {
  const [loading, setLoading] = useState(false);

  const signupSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: "Username must contain 3 letter at least" }),
      email: z.email(),
      password: z.string().min(8, {
        message: "Password must contain 8 letters at least",
      }),
      confPassword: z.string().min(8, {
        message: "Password must contain 8 letters at least",
      }),
      image: z
        .any()
        .refine((file) => file?.length > 0, {
          message: "Profile picture is required",
        })
        .refine(
          (file) =>
            file &&
            ["image/jpeg", "image/png", "image/webp"].includes(file[0]?.type),
          { message: "Only JPEG, PNG, or WEBP images are allowed" }
        ),
    })
    .refine((data) => data.password === data.confPassword, {
      message: "Confirm Password does not match Password",
      path: ["confPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const file = data.image[0];
      const imageUrl = await uploadImageToCloudinary(file);
      7;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: data.username,
        email: data.email,
        profilePic: imageUrl,
        createdAt: new Date(),
      });
      toast.success("Account Created Successfully!");
      setTab("login");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Oops ! An Error Occured , Try Again !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control flex flex-col gap-3"
      >
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="username" className="text-[15px] text-normal">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            placeholder="username"
            required
            className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="email" className="text-[15px] text-normal">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            required
            className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="password" className="text-[15px] text-normal">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Password"
            required
            className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="confPassword" className="text-[15px] text-normal">
            Confirm Password
          </label>
          <input
            id="confPassword"
            {...register("confPassword")}
            type="password"
            required
            className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
          {errors.confPassword && (
            <p className="text-sm text-red-500">
              {errors.confPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="image" className="text-[15px] text-normal">
            Upload Profile Picture
          </label>
          <input
            id="image"
            type="file"
            {...register("image")}
            required
            className="file-input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
        </div>
        <button className="btn bg-black text-white mt-2" disabled={loading}>
          {loading ? (
            <p>
              <span>Creating Account </span>
              <span className="loading loading-dots loading-md"></span>
            </p>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="flex items-center  justify-center gap-[8px] mt-[32px]">
        <p className="text-sm grow-0 text-gray-600 ">
          Already have an account?
        </p>
        <button
          type="button"
          className="link text-black"
          onClick={() => setTab("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
