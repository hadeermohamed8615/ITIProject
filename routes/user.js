const { Router } = require("express");
const bcrypt = require("bcrypt");
const email_verifier = require("email-verifier-node");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authentication");
const tokenHelpers = require("../helpers/token");

//const Verifier = require("email-verifier");
const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const { password, email, Type } = req.body;
    const currentUser = await User.findAll({
      where: { email: email }
    });

    console.log(`curr ${currentUser}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    data.password = hashedPassword;
    email_verifier.verify_email(email).then(result => {
      console.log(result);
      if (result.message === "Email Verified") {
        if (!currentUser[0]) {
          User.create(data).then(newUser => {
            res.status(200).json(newUser);
          });
        } else {
          res.status(401).json({ message: "this email is already exist" });
        }
      } else {
        res.status(404).json(result.message);
      }
    });

    // console.log(password)
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const currentUser = await User.findAll({
      where: { email: email }
    });
    // console.log(currentUser[0].dataValues.password)
    const isMatch = await bcrypt.compare(
      password,
      currentUser[0].dataValues.password
    );
    console.log(isMatch);
    if (isMatch) {
      const token = await tokenHelpers.sign(currentUser[0].dataValues.id);
      res.json({ token: token, Type: currentUser[0].dataValues.Type });
    } else {
      res.status(400).json({ error: "some thing wrong" });
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Error.." });
  }
});
userRouter.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//userRouter.use(authMiddleware)

userRouter.get("/profile", authMiddleware, async (req, res, next) => {
  res.status(200).json(req.currentUser);
});

userRouter.patch("/profile/update/:id",authMiddleware, (req, res, next) => {
  const updates = req.body;
  const { id } = req.params;
  try{
    User.update(
        {
          fName: updates.fName,
          lName: updates.lName,
          email: updates.email,
          password: updates.password,
          gender: updates.gender,
          phone:updates.phone
        },
        {
          where: {
            id: id
          }
        }
      );
      res.status(200).json(updates)
  }catch(err){
      res.status(404).json({message:"Error.."})
  }
});

userRouter.delete("/profile/delete/:id",async (req, res, next) => {
  const { id } = req.params;
 try{
 
    await User.destroy({
        where: {
          id: id
        }
      });
      
      res.status(200).json({message:"user deleted"})
 }catch(err){
    res.status(404).json({message:"error.."})
 }
});

module.exports = userRouter;
