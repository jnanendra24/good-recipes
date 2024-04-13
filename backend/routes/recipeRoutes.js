const Router = require("express");
const Recipe = require("../schemas/recipeSchema");

const router = Router();

router.get("/all", async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.status(200).json(recipe);
});

router.get("/user/:id", async (req, res) => {
    const recipes = await Recipe.find({ user: req.params.id });
    res.status(200).json(recipes);
 })

router.post("/add", async (req, res) => {
  const newRecipe = await Recipe.create(req.body);
  res.status(200).json(newRecipe);
});

router.delete("/delete/:id", async (req, res) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedRecipe);
});

module.exports = router;