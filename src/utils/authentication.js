const authenticationService = require("../services/authenticationService")

const login = (req, res, next) => {
  //0. Obtenemos los diferentes datos de la petición
  const { email, password } = req.body;
  const sessionId = req.cookies.sessionId;
  if (!email && !password && !sessionId) {
    res.status(401).send({ mensaje: "NO AUTORIZADO" }).end();
  }
  if (email && password) {
    const credenciales = {
      email,
      password
    }
    const idUserLogueado = authenticationService.checkUser(credenciales)
    if (!idUserLogueado) {
      res.status(401).send({ mensaje: "NO AUTORIZADO" }).end();
    }
    const sessionId = authenticationService.generateSessionId(idUserLogueado)
    res.cookie("sessionId", sessionId, { httpOnly: false })
    const userData =  authenticationService.getUser(sessionId)
    res.status(200).send({message: "AUTORIZADO", user: userData}).end();
  }
  else if (sessionId) {
    if (authenticationService.checkCookieSession(sessionId)) {
      res.cookie("sessionId", sessionId, { httpOnly: false })
      const userData =  authenticationService.getUser(sessionId)
      res.status(200).send({message:"AUTORIZADO", user: userData}).end()
    }
  }
  res.status(500).send("NO AUTORIZADO").end()
};

// const login = (req, res, next) => {
//   //0. Obtenemos los diferentes datos de la petición
//   const { email, password } = req.body;
//   const { cookies } = req;

//   if (!email && !password && !cookies.sessionId) {
//     res.status(401).send({ mensaje: "NO AUTORIZADO" });
//     return;
//   }
//   //1º Comprobar si está registrado
//   if (email && password) {
//     const credenciales = {
//       email,
//       password
//     }
//     const idUserLogueado = authenticationService.checkUser(credenciales)
//     console.log(idUserLogueado)
//     if (!idUserLogueado) {
//       res.status(401).send({ mensaje: "NO AUTORIZADO" });
//       return;
//     }
//     //Si está registrado
//     //GENERAR UN SESSIONID, meterlo en la cookie y mandarlo al cliente
//     const sessionId = authenticationService.generateSessionId(idUserLogueado)
//     res.cookie("sessionId", sessionId, { httpOnly: true })
//     next()
//     } 
//     else if (cookies.sessionId) {
//       // 2º Comprobar si esa cookie contiene una session válida
//       if (authenticationService.checkCookieSession(cookies.sessionId)) {
//         //Si la sesión es válida...
//         res.cookie("sessionId", cookies.sessionId, { httpOnly: true })
//         next()
//       }
//       // COGEMOS LA COOKIe, y comprobamos en la BDD si esa cookie existe/es válida
//     } 
//     else {
//       res.send(500)
//       return
//     }
//   res.status(200).send(cookies.sessionId).end();
// };

const signup = (req, res, next) => {

  //0. Obtenemos los diferentes datos de la petición
  const { name, email, password } = req.body;
  //1º Comprobar si el email ya está en uso
  if (authenticationService.checkEmail(email)) {
    res.status(401).send({ mensaje: "EMAIL EN USO" });
    return;
  }
  //2º Registrar el usuario
  const datos = {
    name,
    email,
    password
  }
  authenticationService.createUser(datos)
  return res.status(200).json({ message: 'Usuario creado con éxito' });
};

const logout = (req, res, next) => {
  authenticationService.deleteSession(req.cookies.sessionId);
  // // No enviar la cookie en futuras respuestas
  res.clearCookie("sessionId");
  res.status(200).send(req.cookies.sessionId).end();
}

const getUser = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const userData =  authenticationService.getUser(sessionId)
  res.status(200).send(userData).end();
}

module.exports = {
  login,
  signup,
  logout,
  getUser
};