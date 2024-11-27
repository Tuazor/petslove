import { NextResponse } from 'next/server';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Unsplash API key is not configured');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    console.log(`Fetching images for query: ${query}`);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query || '')}&per_page=6&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          'Accept-Version': 'v1'
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Unsplash API error:', errorData);
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Found ${data.results?.length || 0} images`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 