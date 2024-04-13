import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchRecipes();
  }, []);


  const fetchRecipes = async () => {
    const res = await axios.get("/api/recipe/all")
    setRecipes(res.data);
  }


  return (
    <div>
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
