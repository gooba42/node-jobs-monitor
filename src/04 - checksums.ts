const puppeteer = require("puppeteer");
const checksum = require("checksum");

const getPageSum = async (myURL: string) => {
  let myPageContent: string = "";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(myURL);
  //myPageContent = await page.content();
  let bodyHandle = await page.$("body");
  myPageContent = await page.evaluate(body => body.innerText, bodyHandle);
  await bodyHandle.dispose();
  await browser.close();
  return checksum(myPageContent);
  //return myPageContent;
};
