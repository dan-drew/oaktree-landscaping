import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = "design/assets";
const imageDirectory = "src/assets/images";
const socialDirectory = "src/assets/social";
const jpegOptions = { quality: 82, mozjpeg: true };

const services = JSON.parse(await readFile("src/_data/services.json", "utf8"));
const projects = JSON.parse(await readFile("src/_data/projects.json", "utf8"));

const outputName = (source, suffix = "") =>
  `${path.parse(source).name}${suffix}.jpg`;

const resize = async (source, output, width) => {
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(path.join(sourceDirectory, source))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg(jpegOptions)
    .toFile(output);
};

await Promise.all([
  rm(imageDirectory, { recursive: true, force: true }),
  rm(socialDirectory, { recursive: true, force: true })
]);

await resize("park-plaza-cinemas-1.jpeg", path.join(imageDirectory, "hero.jpg"), 1800);
await resize("rene_garcia_sq.jpg", path.join(imageDirectory, "owner.jpg"), 1000);

for (const service of services) {
  await resize(
    service.image,
    path.join(imageDirectory, "services", outputName(service.image)),
    1200
  );
}

for (const project of projects) {
  project.images.forEach((image, index) => {
    const expectedName = `${project.slug}-${index + 1}${path.extname(image)}`;
    if (image !== expectedName) {
      throw new Error(
        `Project image "${image}" must be named "${expectedName}". Image 1 is the project's main image.`
      );
    }
  });
}

const projectImages = projects.flatMap((project) => project.images);
const projectNames = projectImages.map((image) => path.parse(image).name);
if (new Set(projectNames).size !== projectNames.length) {
  throw new Error("Project source filenames must have unique names.");
}

for (const image of projectImages) {
  await Promise.all([
    resize(
      image,
      path.join(imageDirectory, "projects", outputName(image, "-thumb")),
      720
    ),
    resize(
      image,
      path.join(imageDirectory, "projects", outputName(image, "-full")),
      1600
    )
  ]);
}

const socialCards = [
  ["park-plaza-cinemas-1.jpeg", "home.jpg"],
  ["rene_garcia_sq.jpg", "about.jpg"],
  ["garden-with-natural-vegetation-with-lots-trees-pool-that-creates-armonic-atmosphere.jpg", "services.jpg"],
  ["sun-city-debeaufain-drive-1.png", "projects.jpg"],
  ["park-plaza-cinemas-13.jpeg", "contact.jpg"]
];

for (const [source, filename] of socialCards) {
  await mkdir(socialDirectory, { recursive: true });
  await sharp(path.join(sourceDirectory, source))
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg(jpegOptions)
    .toFile(path.join(socialDirectory, filename));
}

console.log(
  `Generated ${projectImages.length * 2} project images, ${services.length} service images, 2 feature images, and ${socialCards.length} social cards.`
);
