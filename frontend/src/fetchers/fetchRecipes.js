export const fetchAllRecipes = async () => {
  try {
    const res = await fetch("/api/recipe/all");
    return res.json();
  } catch (e) {
    throw e;
  }
};

export const fetchRecipeById = async (id) => {
  const res = await fetch(`/api/recipe/${id}`);
  return res.json();
};

export const fetchMyRecipes = async (userId) => {
  const res = await fetch(`/api/recipe/user/${userId}`);
  return res.json();
};

export const addRecipe = async (recipe, user) => {

  recipe.user = user._id;
  recipe.createdBy = user.username;
  const res = await fetch("/api/recipe/add", {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
