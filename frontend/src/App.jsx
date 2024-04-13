import React from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import MyRecipies from "./components/MyRecipies";
import AddRecipe from "./components/AddRecipie";
import ViewRecipie from "./components/ViewRecipie";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-recipes" element={<MyRecipies />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<ViewRecipie />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
