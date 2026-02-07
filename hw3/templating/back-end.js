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

async function getPopulousData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population",
    );
    const data = await response.json();

    // const processed = transformData(
    //   data,
    // TO DO

    // return processed;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

async function getRegionsData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=region",
    );
    const data = await response.json();

    // Count up the number of countries in each region
    // I had GitHub Copilot help me do this count since I was getting confused trying to do it myself
    const counts = data.reduce((count, country) => {
      const region = country.region || "Unknown";
      count[region] = (count[region] || 0) + 1;
      return count;
    }, {});

    // Convert counts to an intermediate array, then use transformData
    // I had GitHub Copilot help me with this part so I can reuse the same transformData function
    const entries = Object.entries(counts).map(([region, count]) => ({
      region,
      count,
    }));
    const processed = transformData(
      entries,
      (entry) => entry.region,
      (entry) => entry.count,
    );

    return processed;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

module.exports = { getCapitalsData, getPopulousData, getRegionsData };
