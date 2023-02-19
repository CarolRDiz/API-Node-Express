const productosService = require("../services/productosService");

const getAllProducts = (req, res, next) => {
  const allProducts = productosService.getAllProducts();
  res.send(allProducts).end();
  res.locals.mensaje = "OK";
};

const getOneProduct = (req, res, next) => {
  let nombreProducto = req.params.prod;
  const producto = productosService.getOneProduct(nombreProducto);
  res.send(producto).end();
  res.locals.mensaje = "OK";
};


const postOneProduct = (req, res, next) => {

  //const { body } = req;
  
  console.log("Body: " + body)

  if (!body.title || !body.price) {
    res.status(400).send({ mensaje: "Datos Incompletos" }).end();
    res.locals.mensaje = "NOT OK";
  } else {
    const newProduct = {
      title: req.body.title,
      price: req.body.price,
    }
    };

    const newProduct = {
      title: body.title,
      price: body.price
    };
      
    const createdProduct = productosService.createOneProduct(newProduct);

    if (createdProduct) {
      res.send(createdProduct).end();
      res.locals.mensaje = "OK";
    } else {
      res.status(409).send({ mensaje: "Entrada duplicada" }).end();
      res.locals.mensaje = "NOT OK";
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