const express = require("express")
const app = express()
const v1 = require("./routes/v1/indexRoutes")
const cors = require('cors')
const config = require('./config')
var cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var corsOptions = {
  origin: ['http://localhost:5173','http://localhost:3001/api/v1/users/login','https://api-node.up.railway.app/api/v1/users/login', 'https://gleaming-capybara-1425de.netlify.app', 'https://funny-pegasus-acdd4e.netlify.app/'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(
  corsOptions
));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

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