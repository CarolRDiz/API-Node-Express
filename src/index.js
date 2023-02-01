const express = require("express")
const app = express()
const v1 = require("./routes/v1/indexRoutes")
const cors = require('cors')
const config = require('./config')

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(
  corsOptions
));

app.use((req, res, next) => {
  let date = new Date().toLocaleTimeString();
  console.log(
    "\x1b[41m%s\x1b[0m",
    `[info] ${date} peticion: ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use("/api/v1", v1.router)


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`[INFO] Servidor escuchando en ${PORT} `)
})