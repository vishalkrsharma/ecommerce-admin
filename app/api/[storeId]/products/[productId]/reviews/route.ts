import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  try {
    const body = await req.json();
    const { content, sentiment, userId: storeUserId } = body;

    if (!params.productId) {
      return new NextResponse('Product Id is required', { status: 400 });
    }

    if (!content) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!sentiment) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!storeUserId) {
      return new NextResponse('Store User Id is required', { status: 400 });
    }

    const review = await prismadb.review.create({
      data: {
        productId: params.productId,
        userId: storeUserId,
        content,
        sentiment,
      },
    });

    return NextResponse.json(review, { headers: corsHeaders });
  } catch (error) {
    console.log('[REVIEW_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string; productId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse('Product Id is required', { status: 400 });
    }

    const reviews = await prismadb.review.findMany({
      where: {
        productId: params.productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.log('[REVIEWS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
