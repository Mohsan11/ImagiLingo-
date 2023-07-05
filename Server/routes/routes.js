const express = require("express");
const router = require("express").Router();
const { textGeneration } = require("../Controller/Controller");
const { generateImage } = require("../Controller/Controller");
const { allInOne } = require("../Controller/Controller");
router.post("/textgeneration", textGeneration);
router.post("/generateimage", generateImage);
router.post("/allinone", allInOne);
module.exports = router;
