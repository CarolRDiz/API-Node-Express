const express = require("express")
const router = express.Router()
const productosRouter = require("./productosRoutes")

//RUTA DE ENTRADA HASTA ESTE MÓDULO: /api/v1

router.route("/")
    .get((req, res, next)=>{
        res.send("<h1>Hola Mundo</h1>").end();
        res.locals.mensaje = "OK"
        next()
    });
router.use("/productos", productosRouter);

module.exports.router = router