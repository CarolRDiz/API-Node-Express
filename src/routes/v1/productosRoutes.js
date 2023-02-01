const express = require("express")
const router = express.Router()
const productosController = require("../../controllers/productosController")

router.route("/")
    .get(productosController.getAllProducts)
    .post()
router.route("/:prod")
    .get(productosController.getOneProduct)
    .delete(productosController.deleteOneProduct)
    .put(productosController.putOneProduct)

module.exports = router
