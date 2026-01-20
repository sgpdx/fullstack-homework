/** Exercise 01 - Coins **/

//Completed by Serena Glick (sglick@pdx.edu / sgpdx@github), January 2026

const calculateChange = (input) => {
  //Verify input is valid
  if (typeof input !== "number" || isNaN(input)) {
    return `Error: the input you provided, ${input}, is not a number`;
  }
  if (input < 0 || input > 100) {
    return `Error: the input you provided, ${input}, is not between 0 and 100`;
  } else if (input === 0) {
    return "No change needed";
  }
  //Professor recommends multiplying input by 100 to avoid floating point math
  let cents = Math.round(input * 100);

  const coins = {
    dollar: 100,
    quarter: 25,
    dime: 10,
    nickel: 5,
    penny: 1,
  };

  let change = "";

  for (item in coins) {
    let num_items = Math.trunc(cents / coins[item]);
    cents -= num_items * coins[item];
    if (item !== "penny") {
      change += `${num_items} ${item}${num_items > 1 || num_items === 0 ? "s" : ""}, `;
    } else {
      change +=
        `${num_items}` +
        ` penn${num_items > 1 || num_items === 0 ? "ies" : "y"}`;
    }
  }

  console.log(`$${input} ==> ` + change);
  return cents;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(-36.11));
console.log(calculateChange(25.123456));
console.log(calculateChange("25 dollars"));
console.log(calculateChange("0.25"));
console.log(calculateChange(45.99));
console.log(calculateChange(0));
console.log(calculateChange(0.58));
