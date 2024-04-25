import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../fetchers/fetchUser";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const { setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (newUser) => registerUser(newUser),
    onSuccess: (data) => {
      setUser(data._doc);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <div className="flex flex-col items-center mt-2">
      <form
        className={`flex flex-col space-y-2 border-2 p-6 rounded-md shadow-md`}
        onSubmit={handleSubmit((newUser) => mutate(newUser))}
      >
        <h2 className="text-2xl font-bold mb-6 mx-auto">Register</h2>
        {error && <span className="text-red-500">{error.message}</span>}
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
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
