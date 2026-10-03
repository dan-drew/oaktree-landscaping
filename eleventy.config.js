import path from "node:path";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "design/assets/oaktree-logo-horizontal.png": "assets/images/oaktree-logo-horizontal.png"
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap-icons/font": "assets/vendor/bootstrap-icons"
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());
  eleventyConfig.addFilter(
    "optimizedImage",
    (source, category, suffix = "") =>
      `/assets/images/${category}/${path.parse(source).name}${suffix}.jpg`
  );

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk"
  };
}
