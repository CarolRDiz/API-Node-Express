const usuarios = require("./users.json");
const sessions = require("./sessions.json");
const fs = require("fs")

const checkUser = (email, password) => {
  const usuario = usuarios.users.find(
    (usu) => usu.email === email && usu.password === password
  );
  return usuario;
};

const checkSession = (id_usuario) => {
  //COMPRUEBO SI LA SESSION EXISTE PARA EL ID_USUARIO
  const session = sessions.sessions.find((sess) => sess.id === id_usuario);
  if (session) return session.sessionId;
  return 
};

const getUserBySessionId = (sessionId) => {
  //COMPRUEBO SI EXISTE EL ID DE USUARIO DE LA SESION DE LA COOKIE
  const session = sessions.sessions.find((sess) => sess.sessionId === sessionId)
  const usuario = usuarios.users.find((user) => user.id === session.id);
  return usuario;
};

const addSession = (id, sessionId) => {

  sessions.sessions.push({ id, sessionId });
  fs.writeFileSync(
    "./src/database/sessions.json",
    JSON.stringify(sessions, null, 2),
    "utf8"
  );
};

//SINGUP

const checkEmail = (email) => {
  return usuarios.users.find((user) => user.email === email)
}

const createUser = (newUser) => {
  usuarios.users.push(newUser);
  fs.writeFileSync(
    "./src/database/users.json",
    JSON.stringify(usuarios, null, 2),
    "utf8"
  );
}

const deleteSession = (sessionId) => {
  // 1. Parsear el JSON
  //let data = JSON.parse(sessions);
  // 4. Convertir el objeto en una cadena JSON
  // let result = JSON.stringify(data);

  const sessionsData = { sessions: sessions.sessions.filter(session => session.sessionId !== sessionId)};

  fs.writeFileSync(
    "./src/database/sessions.json",
    JSON.stringify(sessionsData, null, 2),
    "utf8"
  );
  return sessionId
}


module.exports = {
  checkUser,
  checkSession,
  addSession,
  getUserBySessionId,
  checkEmail,
  createUser,
  deleteSession
};