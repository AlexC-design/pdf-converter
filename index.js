const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const _FILE = "Enter file name here";

const compile = async function(fileName) {
  const filePath = path.join(process.cwd(), "files", `${fileName}.html`);
  const html = await fs.readFile(filePath, "utf-8");

  return html;
};

(async function() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const doc = await compile(_FILE);

    await page.setContent(doc);
    await page.emulateMedia("screen");
    await page.pdf({
      path: "newPDF.pdf",
      //   format: "A3",
      printBackground: true
    });

    console.log("done");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("my error :)", e);
  }
})();
