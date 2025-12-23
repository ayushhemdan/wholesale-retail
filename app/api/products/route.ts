import { NextRequest, NextResponse } from 'next/server';
import * as dbHelper from '@/lib/db-helper';

export async function GET() {
  try {
    const products = await dbHelper.getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, image, availability, description } = body;

    if (!name || !price || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await dbHelper.createProduct({
      name,
      price: Number(price),
      image,
      availability: availability || 'in-stock',
      description,
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

