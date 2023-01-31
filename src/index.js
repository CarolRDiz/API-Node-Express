const express = require("express")
const app = express()
const v1 = require("./routes/v1/indexRoutes")

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