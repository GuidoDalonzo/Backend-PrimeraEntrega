// POST: '/' - Crea un carrito y devuelve su id.
// DELETE: '/:id' - Vacía un carrito y lo elimina.
// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

import fs from "fs";
import dbCarrito from "../db/dbCarrito.js";
import dbProductos from "../db/dbProductos.js";

export default class Carrito {
  constructor(user, productos, id) {
    this.user = user;
    this.id = id;
    this.productos = [{ productos }];
  }
  async create(obj) {
    let id = 0;
    try {
      const data = JSON.parse(await fs.promises.readFile(dbCarrito, "utf-8"));
      let carritos = data;
      carritos.push(obj);
      //asignar id
      carritos.forEach((carrito) => {
        if (carrito.id > id) {
          id = carrito.id;
        }
      });
      obj.id = id++;
      fs.writeFileSync(dbcarrito, JSON.stringify(carritos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async saveProductos(productoId, carritoId) {
    try {
      //busco el carrito
      const data = JSON.parse(await fs.promises.readFile(dbCarrito, "utf-8"));
      let carritos = data;
      const carrito = carritos.find((carrito) => carrito.id === carritoId);
      //busco el producto
      const productos = JSON.parse(
        await fs.promises.readFile(dbProductos, "utf-8")
      );
      const producto = productos.find((producto) => producto.id === productoId);
      this.productos.push(producto);
      fs.writeFileSync(dbcarrito, JSON.stringify(this.productos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async getProductos(carritoId) {
    try {
      const data = JSON.parse(await fs.promises.readFile(dbCarrito, "utf-8"));
      let carritos = data;
      const carrito = carritos.find((carrito) => carrito.id === carritoId);
      if (carrito.productos > 0) {
        const productos = this.productos.map((p) => p);
        return productos;
      } else {
        console.log("no hay productos en el carrito");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(productoId, carritoId) {
    try {
      //busco el carrito
      const data = JSON.parse(await fs.promises.readFile(dbCarrito, "utf-8"));
      let carritos = data;
      const carrito = carritos.find((carrito) => carrito.id === carritoId);
      //busco el producto
      const productos = JSON.parse(
        await fs.promises.readFile(dbProductos, "utf-8")
      );
      const producto = productos.find((producto) => producto.id === productoId);
      this.productos.splice(producto, 1);
      fs.writeFileSync(dbcarrito, JSON.stringify(this.productos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll(carritoId) {
    try {
      const data = JSON.parse(await fs.promises.readFile(dbCarrito, "utf-8"));
      let carritos = data;
      const carrito = carritos.find((carrito) => carrito.id === carritoId);
      carritos.splice(carrito, 1);
      fs.writeFileSync(dbcarrito, JSON.stringify(carritos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}
