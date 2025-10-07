import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loggedReducer";
import toast from "react-hot-toast";

const Login = ({ setTab }) => {
  const dispatch = useDispatch();
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, {
      message: "Password must contain 8 letter at least",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;
      dispatch(
        login({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        })
      );
      toast.success("Login Successfully !");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Oops , An Error Occured , Tay Again !");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control flex flex-col gap-[8px]"
      >
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="email" className="text-[15px] text-normal">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
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
            placeholder="Password"
            {...register("password")}
            required
            className="input input-bordered border-[#E5E8EB] focus:outline-none focus:border-none"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="btn bg-black text-white text-[16px] mt-2">
          Login
        </button>
      </form>

      <div className="flex items-center  justify-center gap-[8px] mt-[32px]">
        <p className="text-sm grow-0 text-gray-600 ">Not registered yet?</p>
        <button
          type="button"
          className="link text-black"
          onClick={() => setTab("signup")}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default Login;
