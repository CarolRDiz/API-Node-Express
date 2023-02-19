const path = require("path")
//import path from "path"
const fs = require("fs-extra")
//import fs from "fs-extra"

const getOneImage = async (req, res, next) => {
    let image = req.params.image;
    const pathImage = path.resolve(__dirname, `../images/${image}`)
    if (await fs.existsSync(pathImage)){
        res.sendFile(pathImage)
    }
    else{
        const pathNoImage = path.resolve (__dirname, "../images/not-found.png")
        res.sendFile(pathNoImage)
    }
    // res.sendFile(image, { root: "/home/carolina/Documentos/2DAW-todo/Repo-API-Proyecto-Final/src/images/" });
    // res.locals.mensaje = "OK";
};

module.exports.getOneImage = getOneImage;