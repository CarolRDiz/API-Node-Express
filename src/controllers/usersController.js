const usersService = require("../services/usersService");

const addCoursesToUser = (req, res, next) => {
    const { courses } = req.body;
    const sessionId = req.cookies.sessionId;
    const user = usersService.getUserBySessionId(sessionId)
    user.courses = [...user.courses, ...courses]
    usersService.updateUser(user)
    res.status(200).send("Cursos del usuario actualizados").end();
};

module.exports.addCoursesToUser = addCoursesToUser;