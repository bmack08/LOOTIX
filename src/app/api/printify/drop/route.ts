import { NextResponse } from 'next/server';
import { runDropPipeline, type DropPipelineInput } from '@/utils/printify';

/**
 * POST /api/printify/drop
 * Body: DropPipelineInput
 *
 * Runs the full Lootix drop pipeline:
 * Upload image → Create product → Publish
 */
export async function POST(request: Request) {
  try {
    const body: DropPipelineInput = await request.json();

    // Basic validation
    if (!body.imageUrl || !body.title || !body.blueprintId || !body.printProviderId || !body.variants?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, title, blueprintId, printProviderId, variants' },
        { status: 400 }
      );
    }

    const result = await runDropPipeline(body);

    if (!result) {
      return NextResponse.json(
        { error: 'Drop pipeline failed. Check server logs for details.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image_id: result.image.id,
      product_id: result.product.id,
      published: result.published,
      product: result.product,
    });
  } catch (error) {
    console.error('Printify drop pipeline error:', error);
    return NextResponse.json(
      { error: 'Drop pipeline failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
