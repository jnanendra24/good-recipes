import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { useParams } from "react-router-dom";

function ViewRecipie() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const res = await axios.get(`/api/recipe/${id}`);
    setRecipe(res.data);
  };
  return (
    <div>
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
