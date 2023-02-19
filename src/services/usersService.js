const authenticationModelo = require("../database/authenticationModelo")
const userModelo = require("../database/userModelo")

const getUserBySessionId = (sessionId) => {
    const user = authenticationModelo.getUserBySessionId(sessionId)
    return user;
}

const updateUser = (user) => {
    userModelo.updateUser(user)
}
module.exports = {
    getUserBySessionId,
    updateUser
}