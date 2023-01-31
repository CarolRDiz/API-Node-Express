const infoEndOfRequest = (req, res, next) => {
    if (res.locals.mensaje) {
      let { mensaje } = res.locals;
      console.log(
        "\x1b[34m%s\x1b[0m",
        `[${req.method} ${req.originalUrl}] - ${mensaje}`
      );
    }
    res.end()
};
  
const infoBeginOfRequest = (req, res, next) => {
let date = new Date().toLocaleTimeString();
console.log(
    "\x1b[41m%s\x1b[0m",
    `[info] ${date} peticion: ${req.method} ${req.originalUrl}`
);
next();
};


module.exports = {
    infoBeginOfRequest,
    infoEndOfRequest
}