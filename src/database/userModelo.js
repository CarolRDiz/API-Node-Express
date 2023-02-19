const users = require("./users.json");
const fs = require("fs")


const updateUser = (newUser) => {
    const userIndex = users.users.findIndex(user => user.id === newUser.id);
    users["users"][userIndex] = newUser;
    fs.writeFile(
        "./src/database/users.json",
        JSON.stringify(users, null, 2),
        "utf8",
        (err)=>{
            throw new Error("ERROR AL ESCRIBIR")
        }
    );
}

module.exports = {
    updateUser
};