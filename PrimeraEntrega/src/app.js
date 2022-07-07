import express from "express";
import { routerProductos } from "./routes/routeProductos.js";
import { routerCarrito } from "./routes/routeCarrito.js";
const router = require("./routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/", router);

const PORT = process.env.PORT || 8080;
const app = express();

app.use(function (req, res, next) {
  let user = req.query.user;
  const userData = JSON.parse(fs.readFileSync("../db/dbUsuarios.js", "utf-8"));
  const usuario = userData.find((usuario) => usuario.name === user);
  if (usuario.authorized == true) {
    next();
  } else {
    res.redirect("/api");
  }
});

const server = app.listen(PORT, () => {
  console.log(`server funcionando en port http://localhost:${PORT}`);
});
server.on("error", (err) => console.error(err));
