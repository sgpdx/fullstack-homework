// services/dataService.js

// Generic function to transform API data into item1/item2 format
// So that it can be used in the Pug page.pug template
// I had GitHub Copilot help me with this function
// but it was my idea to have this kind of wrapper function to use with the pug template
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
    // It adds "N/A" for countries without capitals and sorts by country name
    // I then used this as a template for the other API transform functions
    const processed = transformData(
      data,
      (country) => country.name.common,
      (country) =>
        country.capital && country.capital.length > 0
          ? country.capital[0]
          : "no data",
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

    const processed = transformData(
      data,
      (country) => country.name.common,
      (country) =>
        // GitHub gave this suggestion to sort out only the higher populations here
        // whereas I was going to do it afterwards, so good idea AI!
        // return raw number here so we can sort numerically
        country.population >= 50000000 ? country.population : null,
    )
      .filter((item) => item.item2 !== null)
      .sort((a, b) => b.item2 - a.item2)
      // AI suggested this part, to add the commas to make the population more readable
      .map((item) => ({
        item1: item.item1,
        item2: item.item2.toLocaleString(),
      }));
    return processed;
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
