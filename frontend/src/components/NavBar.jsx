import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import NavItem from "./NavItem";

const NavBar = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
  };
  return (
    <nav className="bg-slate-300 flex justify-between p-4 sticky">
      <div className="logo"><h1 className="font-whisper text-4xl">Good Recipes</h1></div>
      <ul className="flex items-center">
        <NavItem itemName="Home" itemLink={"/"} />
        {!user && <NavItem itemName="Login" itemLink={"/login"} />}
        {user && <NavItem itemName={user.username} itemLink={""} />}
        {user && (
          <button 
          className="bg-slate-500 hover:scale-105 transition-all duration-300 ease-in-out text-white px-2 py-1 rounded-md mx-2 hover:bg-opacity-75 "
          onClick={() => navigate("/my-recipes")}
          >
            My recipes
          </button>
        )}
        {user && (
          <button
            onClick={logout}
            className="mx-2 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
