import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function MyRecipies() {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [recipes, setRecipes] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    const res = await axios.get(`/api/recipe/user/${user._id}`);
    console.log(res.data);
    setRecipes(res.data);
  };
  return (
    <div>
      <div className="m-4 grid grid-cols-5 space-x-4 space-y-4 w-fit">
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                id={recipe._id}
                name={recipe.name}
                createdBy={recipe.createdBy}
                time={recipe.time}
                image={recipe.image}
              />
            );
          })}
      </div>

      <button
        className="bg-slate-500 text-white rounded-md p-2 m-4 hover:bg-opacity-80"
        onClick={() => navigate("/add-recipe")}
      >
        Add Recipe
      </button>
    </div>
  );
}

export default MyRecipies;
