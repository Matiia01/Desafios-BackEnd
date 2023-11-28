const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    console.log('Ruta al archivo de productos:', this.path);
    this.productIdCounter = 1;
  }

  async addProduct(product) {
    const { name, description, price, image, category, brand, weight, color } = product;

    if (!name || !description || !price || !image || !category || !brand || !weight || !color) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    const products = await this.getProducts();
    if (products.some((p) => p.name === name)) {
      console.log("Error: El nombre del producto ya existe.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      name,
      description,
      price,
      image,
      category,
      brand,
      weight,
      color,
    };

    products.push(newProduct);
    await this.saveProducts(products);
    console.log("Producto agregado satisfactoriamente.");
  }

  async getProducts(limit) {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const products = JSON.parse(data);
  
      if (limit) {
        return products.slice(0, limit);
      }
  
      return products;
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }
  

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      await this.saveProducts(products);
      console.log("Producto actualizado satisfactoriamente.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter((p) => p.id !== id);

    if (updatedProducts.length < products.length) {
      await this.saveProducts(updatedProducts);
      console.log("Producto eliminado satisfactoriamente.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    await fs.writeFile(this.path, data, 'utf8');
  }
}

module.exports = ProductManager;
