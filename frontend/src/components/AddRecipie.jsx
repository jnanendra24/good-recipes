import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../fetchers/fetchRecipes";

function AddRecipe() {
  const navigate = useNavigate();

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ([newRecipe, user]) => addRecipe(newRecipe, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
      navigate("/");
    },
  });

  const [recipe, setRecipe] = useState({
    name: "",
    procedure: "",
    time: "",
    image: "",
    ingredients: [{ name: "", quantity: "" }],
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleInputChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleIngredientChange = (index, event) => {
    const values = [...recipe.ingredients];
    if (event.target.name === "ingredient-name") {
      values[index].name = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }
    setRecipe({ ...recipe, ingredients: values });
  };

  const handleAddFields = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  };

  const handleRemoveFields = (index) => {
    const values = [...recipe.ingredients];
    values.splice(index, 1);
    setRecipe({ ...recipe, ingredients: values });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setRecipe({ ...recipe, image: base64String });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate([recipe, user]);
        }}
        className="flex flex-col w-1/2 space-y-2 border-2 shadow-md p-4 rounded-sm"
      >
        {error && <span>{error.message}</span>}
        <input
          className=" border-b-2 focus:outline-none focus:border-slate-500 "
          type="text"
          name="name"
          placeholder="name"
          value={recipe.name}
          onChange={handleInputChange}
        />
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center">
            <input
              className=" border-b-2 focus:outline-none focus:border-slate-500 w-64 mr-8"
              type="text"
              name="ingredient-name"
              placeholder="ingredient name"
              value={ingredient.name}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            <input
              className="border-b-2 focus:outline-none focus:border-slate-500 w-16 text-center mr-2"
              type="text"
              name="quantity"
              placeholder="quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            <button
              type="button"
              className="text-xl hover:scale-110"
              onClick={() => handleRemoveFields(index)}
            >
              <MdDelete />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="w-fit p-1 bg-slate-500 text-white rounded-md hover:bg-opacity-80"
          onClick={() => handleAddFields()}
        >
          Add
        </button>
        <textarea
          name="procedure"
          placeholder="procedure"
          className="w-full h-64"
          value={recipe.procedure}
          onChange={handleInputChange}
        />
        <input
          className="border-b-2 focus:outline-none focus:border-slate-500 w-16"
          type="number"
          name="time"
          placeholder="time"
          value={recipe.time}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button
          type="submit"
          className="w-fit p-2 bg-slate-500 text-white rounded-md"
          disabled={isPending}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
