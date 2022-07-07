import fs from "fs";
import dbProductos from "../db/dbProductos.js";

const baseDatos = JSON.parse(fs.readFileSync(dbProductos, "utf-8"));

export default class Productos {
  constructor(producto) {
    this.listaProductos = producto;
  }

  /**
   * It reads a JSON file, pushes a new object to the array, and then writes the array back to the JSON
   * file
   * @param obj - {
   */
  static async save(obj) {
    let id = 0;
    try {
      const data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));
      let listaProductos = data;
      listaProductos.push(obj);

      listaProductos.forEach((producto) => {
        if (producto.id > id) {
          id = producto.id;
        }
      });
      obj.id = id + 1;
      fs.writeFileSync(dbProductos, JSON.stringify(listaProductos, null, 2));
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * It takes an id number as an argument, reads a JSON file, filters the JSON file for the id number,
   * and returns the product with that id number.
   * @param idNumber - product id given from route /productos/:id
   */
  static async getById(idNumber) {
    idNumber = parseInt(idNumber);

    try {
      let data;
      let producto;

      data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));

      this.listaProductos = data;

      // producto
      producto = this.listaProductos.filter(
        (producto) => producto.id == idNumber
      );

      if (producto) {
        console.log(`Requested product ${JSON.stringify(producto)}`);

        return JSON.stringify(producto);
      } else {
        console.log("No existe producto con ese id asignado");
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * It reads a JSON file, parses it, and then maps the parsed data to a new array.
   */
  async getAll() {
    try {
      const data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));
      let productos = data;
      if (productos.length > 0) {
        const listaCompleta = productos.map((producto) => producto);
      } else {
        console.log("No hay productos");
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It takes in an id number, a new model, a new brand and a new price, and then it modifies the product
   * with the given id number with the new model, brand and price
   * @param idNumber - The id of the product to be modified.
   * @param newModelo - String
   * @param newMarca - "Samsung"
   * @param newPrecio - number
   */
  static async modify(idNumber, newModelo, newMarca, newPrecio) {
    const data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));
    let id = parseInt(idNumber);
    try {
      const producto = baseDatos.find((producto) => producto.id === id);
      if (producto) {
        producto.modelo = newModelo;
        producto.marca = newMarca;
        producto.precio = newPrecio;
        fs.writeFileSync(dbProductos, JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It takes an id number as an argument, reads the JSON file, filters the array of objects for the
   * object with the matching id number, and then deletes that object from the array.
   * @param idNumber - number
   */
  static async deleteById(idNumber) {
    try {
      const data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));
      this.listaProductos = data;
      let producto = this.listaProductos.filter(
        (producto) => producto.id === idNumber
      );
      if (producto) {
        this.listaProductos.splice(this.listaProductos.indexOf(producto));
        fs.writeFileSync(
          dbProductos,
          JSON.stringify(this.listaProductos, null, 2)
        );
        console.log(`el producto con id ${idNumber} fue eliminado`);
      } else {
        console.log("No existe producto con ese id asignado");
      }
    } catch (err) {
      console.log(err);
    }
  }

  /* Deleting all the products in the JSON file. */
  async deleteAll() {
    try {
      const data = JSON.parse(await fs.promises.readFile(dbProductos, "utf-8"));
      let productos = data;
      if (productos.length > 0) {
        const listaCompleta = productos.map((producto) => producto);
        listaCompleta.splice(0, listaCompleta.length);
        fs.writeFileSync(dbProductos, JSON.stringify(listaCompleta, null, 2));
      } else {
        console.log("No hay productos");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
const productos = new Productos(baseDatos);
