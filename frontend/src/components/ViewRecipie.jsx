import React from "react";
import { useParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { fetchRecipeById } from "../fetchers/fetchRecipes";

function ViewRecipie() {
  let { id } = useParams();
  const {data: recipe, isLoading, error} = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    retry: 2,
  })

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {error && <span>{error.message}</span>}
      {recipe && (
        <div className="w-10/12 m-auto">
          <div className="flex items-center m-4">
            <img
              className="w-32 h-32 rounded-md"
              src={recipe.image}
              alt={recipe.name}
            />
            <div className="ml-4">
              {" "}
              <h2 className="text-3xl font-bold">{recipe.name}</h2>
              <h5 className="">by {recipe.createdBy}</h5>
            </div>
          </div>
          <hr></hr>
          <div>
            <h2 className="text-2xl font-semibold">Ingredients:</h2>
            <ul className="m-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name}: {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-2xl font-semibold">Procedure:</h2>
          <p className="mt-2 text-justify">{recipe.procedure}</p>
        </div>
      )}
    </div>
  );
}

export default ViewRecipie;
