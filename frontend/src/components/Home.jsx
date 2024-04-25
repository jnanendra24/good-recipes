import React from "react";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "./RecipeCard";
import { fetchAllRecipes } from "../fetchers/fetchRecipes";

const Home = () => {
  const {data: recipes, isLoading , error} = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
    retry: 1,
  })

  return (
    <div>
      {isLoading && <span>Loading....</span>}
      {error && <span>{error.message}</span>}
      <div className="m-auto grid grid-cols-5 space-x-4 space-y-4 w-fit">
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                id= {recipe._id}
                name={recipe.name}
                createdBy={recipe.createdBy}
                time={recipe.time}
                image={recipe.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
