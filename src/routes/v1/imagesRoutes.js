const express = require("express")
const router = express.Router()
const imagesController = require("../../controllers/imagesController")

router.route("/:image")
    .get(imagesController.getOneImage)
    .post()
module.exports = router
