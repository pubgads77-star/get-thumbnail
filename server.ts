import express from "express";
import axios from "axios";
import sharp from "sharp";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/download", async (req, res) => {
  const { v, q, f } = req.query;
  if (!v) return res.status(400).send("Video ID missing");

  const imageUrl = `https://img.youtube.com/vi/${v}/${q || 'maxresdefault'}.jpg`;

  try {
    const response = await axios({ url: imageUrl, method: 'GET', responseType: 'arraybuffer' });
    let imageBuffer = Buffer.from(response.data);
    let contentType = 'image/jpeg';
    let ext = 'jpg';

    if (f === 'PNG') {
      imageBuffer = await sharp(imageBuffer).png().toBuffer();
      contentType = 'image/png';
      ext = 'png';
    } else if (f === 'WEBP') {
      imageBuffer = await sharp(imageBuffer).webp().toBuffer();
      contentType = 'image/webp';
      ext = 'webp';
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="thumbnail-${v}.${ext}"`);
    res.send(imageBuffer);
  } catch (e) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`✅ API Server running at http://localhost:${PORT}`);
});