export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');
    if (!imageUrl) return new Response('Missing url', { status: 400 });
    
    const decoded = decodeURIComponent(imageUrl);

    const res = await fetch(decoded, {
      headers: {
        'Referer': 'https://komiku.org/',
        'Origin': 'https://komiku.org',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-site',
      }
    });

    const data = await res.arrayBuffer();
    return new Response(data, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};