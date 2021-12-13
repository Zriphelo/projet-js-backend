var express = require("express");
var router = express.Router();
const { Scores } = require("../models/scores");
const scoresModel = new Scores();


// GET /texts : read all the texts
router.get("/", function(req, res){
    return res.json(scoresModel.getAll());
})


module.exports = router;