const productosModelo = require("../database/productosModelo")
const {v4: uuid} = require("uuid")
/*
SERVICIOS
En esta parte de la aplicación vamos a implementar toda la parte de interacción
con la base de datos.
Aquí implementaríamos la lógica del negocio. Es decir, las reglas que se aplican
a la hora de resolver "problemas reales".
https://stackoverflow.com/questions/4816692/what-is-a-good-example-of-a-service-layer-in-asp-net-mvc/4817935#4817935
*/
const getAllProducts = () => {
    const allProductos = productosModelo.getAllProducts()
    return allProductos;
}

const getOneProduct = (nombre) => {
    const producto = productosModelo.getOneProduct(nombre)
    return producto
}
const getImageProduct = (nombre) => {
    const image = productosModelo.getImageProduct(nombre)
    return image
}

const createOneProduct = (newProduct) => {
    let today = new Date().toISOString()

    //"Construyo" el nuevo objeto, estableciendo un id
    newProduct = {
        ...newProduct,
        id: uuid(),
        createdAt: today,
        updatedAt: today
    };
    
    return productosModelo.createOneProduct(newProduct)

}
const deleteOneProduct = (nombre) => {
    return productosModelo.deleteOneProduct(nombre)
}
const updateOneProduct = (producto) => {
    return productosModelo.updateOneProduct(producto)
}

module.exports.getAllProducts = getAllProducts
module.exports.getOneProduct = getOneProduct
module.exports.getImageProduct = getImageProduct
module.exports.createOneProduct = createOneProduct
module.exports.deleteOneProduct = deleteOneProduct
module.exports.updateOneProduct = updateOneProduct