export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const videoId = searchParams.get('v');
  const quality = searchParams.get('q') || 'maxresdefault';
  
  if (!videoId) {
    return new Response("Missing video ID", { status: 400 });
  }

  const imageUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Image not found");

    const imageBlob = await response.blob();
    
    // إرسال الصورة للمستخدم مع أمر "التحميل المباشر"
    return new Response(imageBlob, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="thumbnail-${videoId}.jpg"`,
        "Access-Control-Allow-Origin": "*"
      },
    });
  } catch (error) {
    return new Response("Error fetching thumbnail", { status: 500 });
  }
}