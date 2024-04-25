const Router = require("express");
const User = require("../schemas/userSchema");
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    return res.status(200).json({ ...user, message: "Login successful" });
  }
});

router.post("/register", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = await User.create(req.body);
    res.status(200).json({ ...newUser, message: "User created successfully" });
  }
});

module.exports = router;