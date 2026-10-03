import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "design/assets/oaktree-logo-horizontal.png": "assets/images/oaktree-logo-horizontal.png"
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap-icons/font": "assets/vendor/bootstrap-icons"
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async (src, alt, className = "", loading = "lazy", sizes = "100vw", preset = "card") => {
      const presetWidths = {
        card: [360, 720],
        feature: [640, 960, 1400],
        gallery: [360, 720, 1000],
        hero: [720, 1200, 1800],
        profile: [480, 800, 1200]
      };
      const metadata = await Image(src, {
        widths: presetWidths[preset] || presetWidths.card,
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/assets/generated",
        urlPath: "/assets/generated",
        sharpOptions: {
          animated: false
        },
        sharpWebpOptions: {
          quality: 78
        },
        sharpAvifOptions: {
          quality: 58
        }
      });

      return Image.generateHTML(metadata, {
        alt,
        class: className,
        sizes,
        loading,
        decoding: "async",
        fetchpriority: loading === "eager" ? "high" : "auto"
      });
    }
  );

  return {
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
