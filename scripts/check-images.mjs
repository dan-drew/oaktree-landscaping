import { access, readFile } from "node:fs/promises";
import path from "node:path";

const services = JSON.parse(await readFile("src/_data/services.json", "utf8"));
const projects = JSON.parse(await readFile("src/_data/projects.json", "utf8"));
const outputName = (source, suffix = "") =>
  `${path.parse(source).name}${suffix}.jpg`;

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

const expectedImages = [
  "src/assets/images/hero.jpg",
  "src/assets/images/owner.jpg",
  ...services.map((service) =>
    path.join("src/assets/images/services", outputName(service.image))
  ),
  ...projects.flatMap((project) =>
    project.images.flatMap((image) => [
      path.join("src/assets/images/projects", outputName(image, "-thumb")),
      path.join("src/assets/images/projects", outputName(image, "-full"))
    ])
  ),
  ...["home", "about", "services", "projects", "contact"].map(
    (page) => `src/assets/social/${page}.jpg`
  )
];

const missingImages = [];
for (const image of expectedImages) {
  try {
    await access(image);
  } catch {
    missingImages.push(image);
  }
}

if (missingImages.length) {
  throw new Error(
    `Missing optimized images:\n${missingImages.join("\n")}\nRun "pnpm images:generate" and commit the results.`
  );
}

console.log(`Verified ${expectedImages.length} optimized images.`);
