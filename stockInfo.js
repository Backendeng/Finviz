const { initializeBrowser } = require("./initializeBrowser");

module.exports = (function () {
  const service = {};
  service.stockInfo = async function (stockCode) {
    const [browser, page] = await initializeBrowser(stockCode);
    try {
      let stockDetails = await page.evaluate(() => {
        // Select all rows in the table
        const rows = document.querySelectorAll(".styled-table-new tbody tr");
        const data = Array.from(rows).map((row) => {
          // Extract each piece of information based on its position in the row
          const ticker =
            row.querySelector("td:nth-child(2) a")?.textContent.trim() ?? "N/A";
          const company =
            row.querySelector("td:nth-child(3) a")?.textContent.trim() ?? "N/A";
          const sector =
            row.querySelector("td:nth-child(4) a")?.textContent.trim() ?? "N/A";
          const industry =
            row.querySelector("td:nth-child(5) a")?.textContent.trim() ?? "N/A";
          const country =
            row.querySelector("td:nth-child(6) a")?.textContent.trim() ?? "N/A";
          const marketCap =
            row.querySelector("td:nth-child(7) a")?.textContent.trim() ?? "N/A";
          const pe =
            row.querySelector("td:nth-child(8) a")?.textContent.trim() ?? "N/A";
          const price =
            row.querySelector("td:nth-child(9) span")?.textContent.trim() ??
            "N/A";
          const change =
            row.querySelector("td:nth-child(10) span")?.textContent.trim() ??
            "N/A";
          const volume =
            row.querySelector("td:nth-child(11) a")?.textContent.trim() ??
            "N/A";

          return {
            ticker: { value: ticker },
            company: { value: company },
            sector: { value: sector },
            industry: { value: industry },
            country: { value: country },
            marketcap: { value: marketCap },
            pe: { value: pe },
            price: { value: price },
            change: { value: change },
            volume: { value: volume },
          };
        });
        return data;
      });

      // Assuming you have a logic to capture the chart image
      const chart = await page.$(".interactive-chart");
      let imageChart = null;
      if (chart) {
        imageChart = await chart.screenshot({ encoding: "base64" });
      }
      // Assuming you want to attach the image to each stock detail (optional)
      stockDetails = stockDetails.map((detail) => ({
        ...detail,
        image: { value: imageChart },
        stockCode: { value: stockCode },
      }));

      return stockDetails;
    } catch (error) {
      console.error("Error scraping stock info:", error);
      return null; // Or handle the error as appropriate for your application
    } finally {
      await browser.close();
    }
  };
  return service;
})();
