var express = require("express");
var router = express.Router();
const { Scores } = require("../models/scores");
const scoresModel = new Scores();


// GET /texts : read all the texts
router.get("/", function(req, res){
    return res.json(scoresModel.getAll());
})

// GET /texts : read all the scores of player
router.get("/player/:playerId", function(req, res){
    const scores = scoresModel.getScoresByPlayer(req.params.playerId);
    if (!scores) return res.status(404).end();

    return res.json(scores);
})

// GET /texts : read all the scores of text
router.get("/text/:textId", function(req, res){
    const scores = scoresModel.getScoresByText(req.params.textId);
    if (!scores) return res.status(404).end();

    return res.json(scores);
})

router.post("/add", function(req, res){
    if(
        !req.body ||
        !req.body.hasOwnProperty("player") ||
        !req.body.hasOwnProperty("text")
    )
        return res.status(400).end();

    const score = scoresModel.addOne(req.body);
    
    return res.json(score);
})

module.exports = router;