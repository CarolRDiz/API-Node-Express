const express = require("express")
const router = express.Router()
const coursesController = require("../../controllers/coursesController")

router.route("/")
    .get(coursesController.getAllProduct)
    .post()
router.route("/:prod")
    .get()
    .delete(coursesController.deleteOneProduct)
    .put(coursesController.updateOneProduct)

module.exports.router = router
