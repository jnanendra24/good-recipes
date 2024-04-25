import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMyRecipes } from "../fetchers/fetchRecipes";
import RecipeCard from "./RecipeCard";

function MyRecipies() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const {
    data: myRecipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myRecipes", user?._id],
    queryFn: () => fetchMyRecipes(user._id),
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {myRecipes && myRecipes.length === 0 && <div>No recipes found</div>}
      <div className="m-4 grid grid-cols-5 space-x-4 space-y-4 w-fit">
        {myRecipes &&
          myRecipes.map((recipe, index) => {
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
