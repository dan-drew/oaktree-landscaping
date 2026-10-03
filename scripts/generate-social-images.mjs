import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const cards = [
  ["design/assets/TC_03476.JPG", "home.jpg"],
  ["design/assets/rene_garcia_sq.jpg", "about.jpg"],
  ["design/assets/garden-with-natural-vegetation-with-lots-trees-pool-that-creates-armonic-atmosphere.jpg", "services.jpg"],
  ["design/assets/Debeaufain-IMG_aerial.png", "projects.jpg"],
  ["design/assets/TC_03543.JPG", "contact.jpg"]
];
const outputDirectory = "src/assets/social";

await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  cards.map(([source, filename]) =>
    sharp(source)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outputDirectory, filename))
  )
);

console.log(`Generated ${cards.length} metadata-free social sharing images.`);
