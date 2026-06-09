export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: 'Missing url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const decoded = decodeURIComponent(imageUrl);

    // Tentukan referer berdasarkan domain gambar
    let referer = 'https://komikindo.ch/';
    let origin = 'https://komikindo.ch';

    if (decoded.includes('himmga')  decoded.includes('gaimg')  
        decoded.includes('komiku')  decoded.includes('imageainew') 
        decoded.includes('gaimgame')) {
      referer = 'https://himmga.lat/';
      origin = 'https://himmga.lat';
    }

    try {
      const response = await fetch(decoded, {
        headers: {
          'Referer': referer,
          'Origin': origin,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        }
      });

      if (!response.ok) {
        return new Response(Error: ${response.status}, { status: response.status });
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const data = await response.arrayBuffer();

      return new Response(data, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        }
      });

    } catch (e) {
      return new Response(Error: ${e.message}, { status: 500 });
    }
  }
};