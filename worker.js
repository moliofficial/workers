export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: 'Parameter url wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const decoded = decodeURIComponent(imageUrl);

    // Tentukan referer berdasarkan domain
    let referer = 'https://komikindo.ch/';
    if (decoded.includes('komiku')) {
      referer = 'https://komiku.org/';
    } else if (decoded.includes('img.komiku')) {
      referer = 'https://komiku.org/';
    }

    try {
      const response = await fetch(decoded, {
        headers: {
          'Referer': referer,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });

      if (!response.ok) {
        return new Response(`Gagal fetch gambar: ${response.status}`, { status: response.status });
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const imageData = await response.arrayBuffer();

      return new Response(imageData, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        }
      });

    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
};
