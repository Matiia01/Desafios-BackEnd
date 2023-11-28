class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
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
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
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
  }
  
  // Crear una instancia de la clase ProductManager
  const productManager = new ProductManager();
  
  // Llamar al método getProducts, debe devolver un arreglo vacío []
  console.log(productManager.getProducts());
  
  // Agregar un producto
  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  
  // Llamar al método getProducts nuevamente, esta vez debe aparecer el producto recién agregado
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código, debe arrojar un error
  productManager.addProduct({
    title: "producto repetido",
    description: "Este producto tiene el mismo código",
    price: 150,
    thumbnail: "Otra imagen",
    code: "abc123",
    stock: 10,
  });
  
  // Evaluar que getProductById devuelva un error si no encuentra el producto
  const productoNoEncontrado = productManager.getProductById(100);
  console.log(productoNoEncontrado);
  