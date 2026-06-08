export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');
    if (!imageUrl) return new Response('Missing url', { status: 400 });
    
    const decoded = decodeURIComponent(imageUrl);

    // Komikindo tidak perlu referer (sudah bisa no-referrer)
    // Komiku perlu referer komiku.org
    const isKomiku = decoded.includes('komiku') || 
                     decoded.includes('himmga') || 
                     decoded.includes('gaimg');

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/*,*/*;q=0.8',
    };

    if (isKomiku) {
      headers['Referer'] = 'https://komiku.org/';
      headers['Sec-Fetch-Site'] = 'same-site';
    }

    const res = await fetch(decoded, { headers });
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