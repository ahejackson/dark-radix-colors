const fs = require("fs");
const path = require("path");
const allColorScales = require("../index");

const outputDir = require("../tsconfig.json").compilerOptions.outDir;

const supportsP3AtRule = "@supports (color: color(display-p3 1 1 1))";
const matchesP3MediaRule = "@media (color-gamut: p3)";

Object.keys(allColorScales)
  .filter((key) => !key.includes("P3"))
  .forEach((key) => {
    let selector = ":root";

    let isDark = key.includes("Dark");

    const srgbValues = Object.entries(allColorScales).find(
      ([name]) => name === key
    )[1];

    const srgbCssProperties = Object.entries(srgbValues)
      .map(([name, value]) => [toCssCasing(name, isDark), value])
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n");

    const srgbCssRule = `${selector} {\n${srgbCssProperties}\n}`;

    const p3Values = Object.entries(allColorScales).find(
      ([name]) => name === key + "P3" || name === key.replace(/.$/, "P3A")
    )[1];

    const p3CssProperties = Object.entries(p3Values)
      .map(([name, value]) => [toCssCasing(name, isDark), value])
      .map(([name, value]) => `      --${name}: ${value};`)
      .join("\n");

    let p3CssRule = `    ${selector} {\n${p3CssProperties}\n    }`;
    p3CssRule = `  ${matchesP3MediaRule} {\n${p3CssRule}\n  }`;
    p3CssRule = `${supportsP3AtRule} {\n${p3CssRule}\n}`;

    fs.writeFileSync(
      path.join(outputDir, toFileName(key) + ".css"),
      `${srgbCssRule}\n\n${p3CssRule}`
    );
  });

function toCssCasing(str, isDark) {
  str = str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")

  if (isDark) {
    str = str.replace(/([a-z])\-([A-Z]?\d)/, "$1-dark-$2")
  }

  return str.toLowerCase();
}

function toFileName(str) {
  return toCssCasing(str).replace(/-a$/, "-alpha");
}
