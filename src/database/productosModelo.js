var datos = require("./productos.json")
const fs = require("fs")

const getAllProducts = () => {
    return datos.productos
}

const getOneProduct = (title) => {
    const course = datos["productos"][title]
    return course
}
const deleteOneProduct = (nombre) => {
  const producto = datos["productos"][nombre]
  //datos.remove(producto)
  delete datos["productos"][nombre]
  fs.writeFile(
    "./src/database/productos.json",
    JSON.stringify(datos, null, 2),
    "utf8",
    (err)=>{
      throw new Error("ERROR AL ESCRIBIR")
    }
  );
  return producto;
}
/*FUNCION DE PRUEBA PARSEANDO EL JSON A ARRAY (DON'T DEAD OPEN INSIDE)
const createOneProduct2 = (newProduct) => {
    //Para poder tratar el JSON y poder buscar en él, tenemos el problema
    //que por defecto, dicho JSON es simplemente un objeto que contiene otros objetos.
    //De esa manera, no podemos iterar sobre los productos existentes, así que lo convertimos a Array
    let datosArr = Object.entries(datos.productos);
    //Compruebo en esta línea, que el producto que estoy intentando insertar, no existe
    //previamente en la BBDD (en el JSON)
    if (datosArr.find((producto) => producto[0] === newProduct.nombre)) return false
    
    //Si no está el producto que se intenta persistir, entonces se procede con dicha persistencia
    datosArr.push(newProduct);
    //Convierto el array que he creado antes, el cual ya tiene el nuevo producto, a objeto
    //Esta operación aquí es necesaria para así no tener que modificar el formato del JSON que nos dan
    //Aún así, esto es una puta mierda... tiene que haber una manera más fácil seguro
    var objetoNuevo = {};
    for (let i = 0; i < datosArr.length; ++i) {
      objetoNuevo[datosArr[i][1].nombre.replace(/\s+/g, "").toLowerCase()] = datosArr[i][1];
    }
    
    //Ultimo paso antes de escribir el JSON, simplemente para no romper la estructura
    //que tenía el JSON antes de "tratarlo"
    datos.productos = {productos: objetoNuevo};
    fs.writeFileSync(
      "./src/database/productos.json",
      JSON.stringify(datos.productos, null, 2),
      "utf8"
    );
    
    return true
}*/

const createOneProduct = (newProduct) => {

    //Compruebo si el producto a insertar ya existe en la base de datos
    if (datos["productos"][`${newProduct.nombre.replace(/\s+/g, "").toLowerCase()}`]){
        return false;
    }
    
    //Si el producto no existe, entonces se introduce en la BDD
    let aux = newProduct.nombre
    let nombre = aux.replace(/\s+/g, "").toLowerCase();
    datos["productos"][nombre] = newProduct;

    //Escribo el producto nuevo en el fichero JSON
    fs.writeFile(
      "./src/database/productos.json",
      JSON.stringify(datos, null, 2),
      "utf8",
      (err)=>{
        throw new Error("ERROR AL ESCRIBIR")
      }
    );

    return newProduct;

};
const updateOneProduct = (product) => {

  //Compruebo si el producto a insertar ya existe en la base de datos
  if (datos["productos"][`${product.nombre.replace(/\s+/g, "").toLowerCase()}`]){
      return false;
  }
  
  //Si el producto no existe, entonces se introduce en la BDD
  let aux = product.nombre
  let nombre = aux.replace(/\s+/g, "").toLowerCase();
  datos["productos"][nombre] = product;

  //Escribo el producto nuevo en el fichero JSON
  fs.writeFile(
    "./src/database/productos.json",
    JSON.stringify(datos, null, 2),
    "utf8",
    (err)=>{
      throw new Error("ERROR AL ESCRIBIR")
    }
  );

  return product;

};

module.exports.getAllProducts = getAllProducts
module.exports.getOneProduct = getOneProduct
module.exports.createOneProduct = createOneProduct
module.exports.deleteOneProduct = deleteOneProduct
module.exports.updateOneProduct = updateOneProduct