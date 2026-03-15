import { NextResponse } from 'next/server';
import { getBlueprints, getPrintProviders, getVariants } from '@/utils/printify';

/**
 * GET /api/printify/catalog
 * Query params:
 *   (none)             → list all blueprints
 *   ?blueprint=6       → list print providers for blueprint 6
 *   ?blueprint=6&provider=99 → list variants for that combo
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blueprintId = searchParams.get('blueprint');
    const providerId = searchParams.get('provider');

    // Variants for a specific blueprint + provider
    if (blueprintId && providerId) {
      const variants = await getVariants(Number(blueprintId), Number(providerId));
      return NextResponse.json({ variants });
    }

    // Print providers for a specific blueprint
    if (blueprintId) {
      const providers = await getPrintProviders(Number(blueprintId));
      return NextResponse.json({ providers });
    }

    // All blueprints
    const blueprints = await getBlueprints();
    return NextResponse.json({ blueprints });
  } catch (error) {
    console.error('Printify catalog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalog data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
