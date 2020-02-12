const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const _FILE = "CV.html"; //e.g. document.html
const _PATH = `${process.cwd()}/files`; //e.g. C:\User\documents\
const _FORMAT = "A3";

const compile = async function(fileName, pathName) {
  const filePath = path.join(pathName, fileName);
  console.log(filePath);
  const html = await fs.readFile(filePath, "utf-8");

  return html;
};

(async function() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const doc = await compile(_FILE, _PATH);

    await page.setContent(doc);
    await page.emulateMedia("screen");
    await page.pdf({
      path: "newPDF.pdf",
      format: _FORMAT,
      printBackground: true
    });

    console.log("done");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("my error :)", e);
  }
})();
