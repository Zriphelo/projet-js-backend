var express = require("express");
var router = express.Router();
const { Scores } = require("../models/scores");
const scoresModel = new Scores();


// GET /scores : read all the texts
router.get("/", function(req, res){
    return res.json(scoresModel.getAll());
})

// GET /scores/{id} : get a score from it's id
router.get("/:id", function(req, res){
    const score = scoresModel.getOne(req.params.id);
    if(!score) return res.sendStatus(404);

    return res.json(score);
})

// GET /scores/player/{playerid} : read all the scores of player
router.get("/player/:playerId", function(req, res){
    const scores = scoresModel.getScoresByPlayer(req.params.playerId);
    if (!scores) return res.status(404).end();

    return res.json(scores);
})

// GET /scores/text/{textId} : read all the scores of text
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