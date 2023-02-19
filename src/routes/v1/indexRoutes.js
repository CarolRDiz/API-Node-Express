const express = require("express")
const router = express.Router()
const productosRoutes = require("./productosRoutes")
const imagesRoutes = require("./imagesRoutes.js")
const usersRoutes = require("./usersRoutes")
//RUTA DE ENTRADA HASTA ESTE MÓDULO: /api/v1

router.route("/")
    .get((req, res, next)=>{
        res.send("<h1>Hola Mundo</h1>").end();
        res.locals.mensaje = "OK"
        next()
    });
router.use("/productos", productosRoutes);
router.use("/images", imagesRoutes);
router.use("/users", usersRoutes);

module.exports.router = router