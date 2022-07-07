// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
// POST: '/' - Para incorporar productos al listado (disponible para administradores)
// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

import Productos from "../controllers/Productos.js";
const routerProductos = new router();

routerProductos("/productos")
  .get(":id", (req, res) => {
    try {
      let id = req.params.id;
      if (id) {
        res.send(Productos.getById(id));
      }
      res.send(Productos.getAll());
    } catch (error) {
      console.log(error);
    }
  })
  .post("/?", (req, res) => {
    try {
      let user = req.query.user;
      const userData = JSON.parse(
        fs.readFileSync("../db/dbUsuarios.js", "utf-8")
      );
      const usuario = userData.find((usuario) => usuario.name === user);
      if (usuario.authorized == true) {
        Productos.save(req.body);
      } else {
        res.send("error : -1, descripcion: ruta 'x' método 'y' no autorizada ");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .put("/:id?", (req, res) => {
    try {
      let id = req.params.id;
      let user = req.query.user;
      const userData = JSON.parse(
        fs.readFileSync("../db/dbUsuarios.js", "utf-8")
      );
      const usuario = userData.find((usuario) => usuario.name === user);
      if (usuario.authorized == true) {
        const productData = JSON.parse(
          fs.readFileSync("../db/dbProductos", "utf-8")
        );
        const producto = productData.find((p) => p.id === id);
        producto.modify(req.body); //esto no se si esta muy bien
      } else {
        res.send("error : -1, descripcion: ruta 'x' método 'y' no autorizada ");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .delete("/:id?", (req, res) => {
    try {
      let user = req.query.user;
      let id = req.params.id;
      const userData = JSON.parse(
        fs.readFileSync("../db/dbUsuarios.js", "utf-8")
      );
      const usuario = userData.find((usuario) => usuario.name === user);
      if (usuario.authorized == true) {
        res.send(Productos.getById(id));
      }
    } catch (error) {
      console.log(error);
    }
  });

export default { routerProductos };
