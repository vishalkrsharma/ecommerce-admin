import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
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
    // const { userId } = auth();
    const body = await req.json();
    const { content, sentiment, userId: storeUserId } = body;

    console.log(storeUserId);

    if (!params.productId) {
      return new NextResponse('Product Id is required', { status: 400 });
    }

    if (!content) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!sentiment) {
      return new NextResponse('Label is required', { status: 400 });
    }

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

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
