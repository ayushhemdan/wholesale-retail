import fs from 'fs';
import path from 'path';
import { IProduct } from '@/models/Product';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export interface ProductData {
  _id?: string;
  name: string;
  price: number;
  image: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readProducts(): ProductData[] {
  ensureDataDir();
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeProducts(products: ProductData[]): void {
  ensureDataDir();
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
}

export async function getAllProducts(): Promise<ProductData[]> {
  return readProducts();
}

export async function getProductById(id: string): Promise<ProductData | null> {
  const products = readProducts();
  return products.find((p) => p._id === id) || null;
}

export async function createProduct(product: Omit<ProductData, '_id' | 'createdAt' | 'updatedAt'>): Promise<ProductData> {
  const products = readProducts();
  const newProduct: ProductData = {
    ...product,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  writeProducts(products);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<ProductData>): Promise<ProductData | null> {
  const products = readProducts();
  const index = products.findIndex((p) => p._id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeProducts(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = readProducts();
  const filtered = products.filter((p) => p._id !== id);
  if (filtered.length === products.length) return false;
  writeProducts(filtered);
  return true;
}

