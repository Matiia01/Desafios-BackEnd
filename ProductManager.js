const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readProductsFromFile();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  writeProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    const newProduct = {
      id: this.getNextProductId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.writeProductsToFile(this.products);
    console.log("Producto agregado satisfactoriamente.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.writeProductsToFile(this.products);
      console.log("Producto actualizado satisfactoriamente.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const updatedProducts = this.products.filter((p) => p.id !== id);

    if (updatedProducts.length < this.products.length) {
      this.writeProductsToFile(updatedProducts);
      console.log("Producto eliminado satisfactoriamente.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  getNextProductId() {
    return this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
  }
}

module.exports = ProductManager;
