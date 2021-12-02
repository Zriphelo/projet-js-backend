var express = require("express");
var router = express.Router();
const { Texts } = require("../models/texts");
const textsModel = new Texts();

router.get("/", function(req, res){
    return res.json(textsModel.getAll());
})

module.exports = router;