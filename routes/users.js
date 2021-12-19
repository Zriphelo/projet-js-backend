var express = require("express");
var router = express.Router();
const { Users } = require("../models/users");
const usersModel = new Users();
const { authorize } = require("../utils/authorize");

// Read all users : only if the user is authenticated and he has an admin role
router.get("/", authorize, function (req, res) {
  if (req.user.role !== "admin") return res.sendStatus(403); //Forbidden status code
  return res.json(usersModel.getAll());
});

// read one user by it's user id
router.get("/id/:id",function(req, res) {
  if(
    !req.params.id < 0
  )
    return res.sendStatus(400).end();
  return res.json(usersModel.getOne(req.params.id));
});

// read one user by it's unique username
router.get("/name/:username",function(req, res) {
  if(
    !req.params.id < 0
  )
    return res.sendStatus(400).end();
  return res.json(usersModel.getOneByUsername(req.params.username));
});

router.post("/sendScores", async function(req, res) {


  if (
      !req.body ||
      !req.body.password ||
      !req.body.username
    )
    return res.sendStatus(400).end();

    
  let email = await usersModel.sendMail(req.body.username, req.body.password);
  if (!email)
    return res.sendStatus(401).end();

  return res.json(email.messageId);
});


// Update the user data, but refuse to update the username and password
// Only the authenticated user can update its data, not those of somebody else
router.put("/:username", authorize, function (req, res) {
  if (
    !req.body ||
    !req.body.password ||
    !req.body.username ||
    (req.body.role && req.body.role.length === 0) ||
    (req.body.email && req.body.email.length === 0)
  )
    return res.sendStatus(400);

  emailCheck(req.body.email)
  .then(function(res){

  })
  .catch(function (err) {
    return res.status(401).end();
  })
  
  // Ensure that the user associated to the token (req.user loaded in the authorize middleware)
  // is the user that shall see its data updated
  if (req.params.username !== req.user.username) return res.sendStatus(403); //Forbidden status code
  const user = usersModel.getOneByUsername(req.params.username);
  // Send an error code '404 Not Found' if the user was not found
  if (!user) return res.sendStatus(404);

  const users = usersModel.updateOne(req.params.username, req.body, "username");

  return res.json(users);
});

module.exports = router;
