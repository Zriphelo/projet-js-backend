var express = require("express");
var router = express.Router();
const { Texts } = require("../models/texts");
const textsModel = new Texts();


// GET /texts : read all the texts
router.get("/", function(req, res){
    return res.json(textsModel.getAll());
})

// GET /texts/{id} : get a text from it's id
router.get("/:id", function(req, res){
    const text = textsModel.getOne(req.params.id);
    if(!text) return res.sendStatus(404);

    return res.json(text);
})

router.post("/add", function(req, res){
    if(
        !req.body ||
        !req.body.title ||
        !req.body.text
    )
        return res.sendStatus(400);

    const text = textsModel.addOne(req.body);
    return res.json(text);
})

module.exports = router;