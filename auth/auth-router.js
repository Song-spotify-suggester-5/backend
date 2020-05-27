const router = require("express").Router();
const Users = require("../users/users-models");
const bcrypt = require("bcryptjs");
const { checkUser } = require("../middleware/checkUser");

router.post("/register", checkUser(), async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_PASSWORD_ROUNDS || 12;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    const user = await Users.add(credentials);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json(authError);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const user = await Users.findBy({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({ message: `welcome ${user.username}` });
    } else {
      res.status(401).json(authError);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
