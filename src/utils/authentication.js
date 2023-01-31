/*
    AUTHENTICATION BY SESSION
    La idea aquí es que el usuario se loguee con usuario y contraseña
    Si el usuario y la contraseña existen, entonces se le otorga una
    id única que se guardará en un fichero JSON.
*/
const { v1: uuid } = require("uuid");
const authenticationService = require("../services/authenticationService");

const authenticateUser = (req, res, next) => {
  const { password, email } = req.body;
  const { cookies } = req;

  //Si no hay datos relativos a la autenticación del usuario, se rechaza la conexión
  if (!password && !email && !cookies.sessionId) {
    res.status(401).send({ mensaje: "NO AUTORIZADO" }).end();
    return;
  }

  //Si hay datos relativos al email y la contraseña, entonces se trata como si fuera el primer login
  if (req.body && password && email) {
    console.log("CHECK USER");

    //SE comprueba que el usuario está registrado en el sistema
    const id = authenticationService.checkUserEmail(email, password);
    if (!id) {
      res.status(401).send({ mensaje: "NO AUTORIZADO" }).end();
      return;
    }

    //Si el usuario existe, primero comprobamos si tiene una session asignada
    let sessionId = authenticationService.checkIfSessionExist(id);
    if (!sessionId) {
      sessionId = uuid();
      authenticationService.addSession(id, sessionId);
    }

    res.cookie("sessionId", sessionId, { hhtpOnly: true });
    next();


  } else if (cookies.sessionId) {
    console.log("CHECK COOKIE");

    //Si el usuario ya se ha logueado anteriormente, se comprueba la validez de su cookie
    //Si no se encuentra su sessionId, entonces es que el usuario no es reconocido
    const { sessionId } = cookies;
    if (!authenticationService.checkSession(sessionId)) {
      res.status(401).send({ mensaje: "NO AUTORIZADO" }).end();
      return;
    }
    next();
  } else {
    throw new Error("Error desconocido");
  }
};

module.exports.authenticateUser = authenticateUser;