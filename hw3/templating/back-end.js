// services/dataService.js

// Generic function to transform API data into item1/item2 format
// So that it can be used in the Pug page.pug template
// I had GitHub Copilot help me with this function
function transformData(data, item1Extractor, item2Extractor) {
  return data.map((item) => ({
    item1: item1Extractor(item),
    item2: item2Extractor(item),
  }));
}

async function getCapitalsData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital",
    );
    const data = await response.json();

    // I had GitHub Copilot help me extract the correct fields,
    // Add "N/A" for countries without capitals,
    // And sort by country name
    // I then used this as a template for the other API functions
    const processed = transformData(
      data,
      (country) => country.name.common,
      (country) =>
        country.capital && country.capital.length > 0
          ? country.capital[0]
          : "N/A",
    ).sort((a, b) => a.item1.localeCompare(b.item1));

    return processed;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

module.exports = { getCapitalsData };
