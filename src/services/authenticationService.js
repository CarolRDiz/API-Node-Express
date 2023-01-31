const usuariosModelo = require("../database/usersModelo");

const checkUserEmail = (email, password) => {
  const usuario = usuariosModelo.checkUserEmail(email, password);
  if (!usuario.id) return false;
  return usuario.id;
};

const addSession = (id_usuario, id_sesion) => {
  //1º Comprobamos que la sesión no existe. Si no existe, la insertamos
  if (!usuariosModelo.checkSession(id_sesion)) {
    usuariosModelo.addSession(id_usuario, id_sesion);
  }
};

const checkSession = (id_sesion) => {
  const session = usuariosModelo.checkSession(id_sesion);
  if (!session) return false;
  return session.sessionId;
};

const checkIfSessionExist = (id_usuario) => {
  const session = usuariosModelo.checkIfSessionExist(id_usuario);
  if (!session) return false;
  return session.sessionId;
}

module.exports = {
  checkUserEmail,
  addSession,
  checkSession,
  checkIfSessionExist
};