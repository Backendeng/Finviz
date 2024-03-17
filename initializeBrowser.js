const puppeteer = require("puppeteer");

module.exports = (function () {
  const service = {};

  service.initializeBrowser = async function (stockCode) {
    const browser = await puppeteer.launch({
      headless: true, // Launches Chrome in headless mode (without a GUI).
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Disables Chrome's sandbox for security reasons, often necessary in certain environments like Docker containers.
    });
    const page = await browser.newPage(); // Opens a new tab in the browser.

    await Promise.all([
      page.setExtraHTTPHeaders({
        "Accept-Language": "en", // Sets the Accept-Language request header to English.
      }),
      page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36" // Sets a custom User-Agent string.
      ),
      page.setDefaultNavigationTimeout(0),
      console.log(`https://finviz.com/screener.ashx?v=${stockCode}`), // Disables navigation timeout.
      page.goto(`https://finviz.com/screener.ashx?v=${stockCode}`, {
        // Navigates to the Finviz page for the given stock code.
        waitUntil: "networkidle0", // Waits until there are no more than 0 network connections for at least 500 ms.
      }),
    ]);

    return [browser, page]; // Returns the browser and page objects for further use.
  };
  return service;
})();
