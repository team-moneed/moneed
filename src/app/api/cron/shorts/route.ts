import ShortService from '@/services/short.service';
import { NextResponse } from 'next/server';

export async function GET() {
    const shortService = new ShortService();
    await shortService.updateShorts({ query: '주식투자', count: 10, pageToken: '', totalQuota: 10000, cost: 100 });
    return NextResponse.json({ message: 'Shorts updated' });
}
