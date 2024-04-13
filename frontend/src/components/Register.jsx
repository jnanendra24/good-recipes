import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const { setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();

  const registerUser = async (newUser) => {
    try {
      const response = await axios.post(
        "/api/auth/register",
        newUser
      );
      setUser(response.data._doc);
      navigate("/");
    } catch (error) {
      if (error.response)
        setError("root", { message: error.response.data.message });
      else setError("root", { message: error.message });
    }
  }; // Register User

  return (
    <div className="flex flex-col items-center mt-2">
      <form
        className={`flex flex-col space-y-2 border-2 p-6 rounded-md shadow-md`}
        onSubmit={handleSubmit(registerUser)}
      >
        <h2 className="text-2xl font-bold mb-6 mx-auto">Register</h2>
        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}
        <input
          {...register("username")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="text"
          placeholder="username"
        />
        <input
          {...register("email")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="email"
          placeholder="email"
        />
        <input
          {...register("password")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="password"
          placeholder="password"
        />
        <button
          type="submit"
          className="bg-slate-500 hover:bg-opacity-80 text-white py-2 px-4 w-fit rounded-md hover:scale-105 transition duration-500 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
