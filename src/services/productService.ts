
import { ProductFormData } from "@/components/ProductWizard";
import { products } from "@/data/mockData";

// In a real application, this would connect to a backend API
// For now, we'll use localStorage to simulate database persistence

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  image: string | null;
  description: string;
  barcode?: string;
  ean?: string;
  brand?: string;
  supplier?: string;
  warehouse?: string;
  variants?: any[];
  createdAt: string;
  updatedAt: string;
}

class ProductService {
  private storageKey = 'mun-c-products';

  // Initialize with mock data if no products exist
  constructor() {
    if (!this.getProducts().length) {
      this.initializeWithMockData();
    }
  }

  private initializeWithMockData() {
    const productsWithTimestamps = products.map(product => ({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(productsWithTimestamps));
  }

  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  getProductById(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  saveProduct(formData: ProductFormData): Product {
    const products = this.getProducts();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.productName,
      sku: formData.sku,
      price: parseFloat(formData.sellingPrice) || 0,
      stock: parseInt(formData.initialStock) || 0,
      category: formData.category,
      image: null, // TODO: Handle image upload
      description: formData.description,
      barcode: formData.barcode,
      ean: formData.ean,
      brand: formData.brand,
      supplier: formData.supplier,
      warehouse: formData.warehouse,
      variants: formData.variants,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    
    return newProduct;
  }

  updateProduct(id: string, formData: Partial<ProductFormData>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      name: formData.productName || products[index].name,
      sku: formData.sku || products[index].sku,
      price: formData.sellingPrice ? parseFloat(formData.sellingPrice) : products[index].price,
      stock: formData.initialStock ? parseInt(formData.initialStock) : products[index].stock,
      category: formData.category || products[index].category,
      description: formData.description || products[index].description,
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    
    return updatedProduct;
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) {
      return false; // Product not found
    }

    localStorage.setItem(this.storageKey, JSON.stringify(filteredProducts));
    return true;
  }

  generateSKU(category: string, productName: string): string {
    const categoryCode = category.substring(0, 3).toUpperCase();
    const nameCode = productName.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${categoryCode}${nameCode}-${timestamp}`;
  }

  generateBarcode(): string {
    return Math.random().toString().substring(2, 14);
  }

  generateEAN(): string {
    return Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  }
}

export const productService = new ProductService();
