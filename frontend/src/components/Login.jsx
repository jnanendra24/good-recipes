import React from "react";
import { useUserStore } from "../stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../fetchers/fetchUser";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (existingUser) => loginUser(existingUser),
    onSuccess: (data) => {
      setUser(data._doc);
      navigate("/");
    },
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <form
        className="flex flex-col space-y-4 border-2 p-8 rounded-md shadow-md"
        onSubmit={handleSubmit((existingUser) => mutate(existingUser))}
      >
        <h2 className="text-2xl font-bold mb-4 mx-auto">Login</h2>
        {error && <span className="text-red-500">{error.message}</span>}
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-md p-2 w-64"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 w-64"
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-slate-500 hover:bg-opacity-80 text-white py-2 px-4 w-fit rounded-md hover:scale-105 transition duration-500 ease-in-out"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
      </form>
      <span className="text-sm m-2">
        Not a user?{" "}
        <Link
          to="/register"
          className="underline hover:text-base transition-all duration-150 ease-in-out"
        >
          Register
        </Link>
      </span>
    </div>
  );
};

export default Login;
