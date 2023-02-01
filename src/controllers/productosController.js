const productosService = require("../services/productosService");
/*
CONTROLADOR
En el controlador se implementa la lógica de la aplicación.
Desde el controlador, se llaman a los diferentes servicios que realizarán la interacción
con la Base de Datos.
En el controlador simplemente "se reparte el juego".
*/
const getAllProducts = (req, res, next) => {
  const allProducts = productosService.getAllProducts();
  res.send(allProducts).end();
  res.locals.mensaje = "OK";
};

/*
  Ejercicio para la clase, implementa la funcionalidad que debe tener "getOneProduct"
  Realiza la división entre "controlador" "servicio" "modelo"
*/
const getOneProduct = (req, res, next) => {
  let nombreProducto = req.params.prod;
  const producto = productosService.getOneProduct(nombreProducto);
  res.send(producto).end();
  res.locals.mensaje = "OK";
};

//En esta funcion se define el método post de un producto
//SOLO se implementa la logica de la aplicacion, es decir, simplemente
//valida que existen datos en el cuerpo de la petición y que
//si se inserta, manda una página con el producto insertado
//y si no, envía el código de estado correspondiente y una página de error
const postOneProduct = (req, res, next) => {
  const { body } = req;

  if (!body.nombre || !body.precio) {
    res.status(400).send({ mensaje: "Datos Incompletos" }).end();
    res.locals.mensaje = "NOT OK";
  } else {
    const newProduct = {
      nombre: body.nombre,
      precio: body.precio,
    };

    const createdProduct = productosService.createOneProduct(newProduct);

    if (createdProduct) {
      res.send(createdProduct).end();
      res.locals.mensaje = "OK";
    } else {
      res.status(409).send({ mensaje: "Entrada duplicada" }).end();
      res.locals.mensaje = "NOT OK";
    }
  }
};

const putOneProduct = (req, res, next) => {
  let nombreProducto = req.params.prod;
  res.send(`<h1>PUT ${nombreProducto}</h1>`).end();
  res.locals.mensaje = "OK";
  next();
};

const deleteOneProduct = (req, res, next) => {
  let nombreProducto = req.params.prod;
  const deletedProduct = productosService.deleteOneProduct(nombreProducto);
  if (deletedProduct) {
    res.send(deletedProduct).end();
    res.locals.mensaje = "OK";
  } else {
    res.status(404).send({ mensaje: "Producto inexistente" }).end();
    res.locals.mensaje = "NOT OK";
  }
};

module.exports.getAllProducts = getAllProducts;
module.exports.getOneProduct = getOneProduct;
module.exports.postOneProduct = postOneProduct;
module.exports.putOneProduct = putOneProduct;
module.exports.deleteOneProduct = deleteOneProduct;