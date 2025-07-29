import { fetchVideos } from '@/api/youtube.api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get('q');
    const count = request.nextUrl.searchParams.get('count') ? Number(request.nextUrl.searchParams.get('count')) : 10;
    const page = request.nextUrl.searchParams.get('page');
    if (!q) {
        return NextResponse.json({ message: '검색 키워드를 입력해주세요.' }, { status: 400 });
    }
    const res = await fetchVideos({ q, count, page });
    return NextResponse.json(res.data);
}
