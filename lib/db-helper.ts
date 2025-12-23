import connectDB from './db';
import Product, { IProduct } from '@/models/Product';
import * as jsonDB from './products-json';
import { ProductData } from './products-json';

const USE_MONGODB = !!process.env.MONGODB_URI;

export async function getAllProducts(): Promise<ProductData[]> {
  if (USE_MONGODB) {
    try {
      await connectDB();
      const products = await Product.find({}).sort({ createdAt: -1 });
      return products.map((p) => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        image: p.image,
        availability: p.availability,
        description: p.description,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error('MongoDB error, falling back to JSON:', error);
      return jsonDB.getAllProducts();
    }
  }
  return jsonDB.getAllProducts();
}

export async function getProductById(id: string): Promise<ProductData | null> {
  if (USE_MONGODB) {
    try {
      await connectDB();
      const product = await Product.findById(id);
      if (!product) return null;
      return {
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        availability: product.availability,
        description: product.description,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('MongoDB error, falling back to JSON:', error);
      return jsonDB.getProductById(id);
    }
  }
  return jsonDB.getProductById(id);
}

export async function createProduct(
  product: Omit<ProductData, '_id' | 'createdAt' | 'updatedAt'>
): Promise<ProductData> {
  if (USE_MONGODB) {
    try {
      await connectDB();
      const newProduct = await Product.create(product);
      return {
        _id: newProduct._id.toString(),
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        availability: newProduct.availability,
        description: newProduct.description,
        createdAt: newProduct.createdAt.toISOString(),
        updatedAt: newProduct.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('MongoDB error, falling back to JSON:', error);
      return jsonDB.createProduct(product);
    }
  }
  return jsonDB.createProduct(product);
}

export async function updateProduct(
  id: string,
  updates: Partial<ProductData>
): Promise<ProductData | null> {
  if (USE_MONGODB) {
    try {
      await connectDB();
      const product = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!product) return null;
      return {
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        availability: product.availability,
        description: product.description,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('MongoDB error, falling back to JSON:', error);
      return jsonDB.updateProduct(id, updates);
    }
  }
  return jsonDB.updateProduct(id, updates);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (USE_MONGODB) {
    try {
      await connectDB();
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('MongoDB error, falling back to JSON:', error);
      return jsonDB.deleteProduct(id);
    }
  }
  return jsonDB.deleteProduct(id);
}

