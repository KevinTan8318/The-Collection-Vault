// variables
const ulElement = document.getElementById("vaultList");
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
const mergeButton = document.getElementById("mergeBtn");
const mysteryBtn = document.getElementById("mysteryBtn");
const totalItemsText = document.getElementById("totalItems");
const avgRatingText = document.getElementById("avgRating");
const mysteryTriesText = document.getElementById("mysteryTries");

const filterBtn = document.getElementById("filterBtn");
const showAllBtn = document.getElementById("showAllBtn");
const inputText = document.getElementById("inputText");

// the vault pool
let vault = [
  { name: "Song1", category: "Pop", rarity: "Common", rating: 48 },
  { name: "Song2", category: "Pop", rarity: "Common", rating: 31 },
  { name: "Song3", category: "Pop", rarity: "Uncommon", rating: 35 },
  { name: "Song6", category: "Pop", rarity: "Uncommon", rating: 35 },
  { name: "Song7", category: "Pop", rarity: "Rare", rating: 65 },
  { name: "Song8", category: "Pop", rarity: "Epic", rating: 73 },
  { name: "Song4", category: "Pop", rarity: "Legendary", rating: 99 },
  { name: "Song5", category: "Pop", rarity: "Legendary", rating: 85 },
];

let bonusVault = [
  { name: "BonusSong1", category: "Pop", rarity: "Epic", rating: 85 },
  { name: "BonusSong2", category: "Pop", rarity: "Uncommon", rating: 95 },
  { name: "BonusSong3", category: "Pop", rarity: "Rare", rating: 52 },
];

// list of rarities and their respective properties
const rarities = {
  Common: { rarityColor: "rgb(218, 218, 218)", rarityChance: 99 },
  Uncommon: { rarityColor: "rgb(67, 172, 58)", rarityChance: 75 },
  Rare: { rarityColor: "rgb(60, 129, 185)", rarityChance: 50 },
  Epic: { rarityColor: "rgb(129, 57, 196)", rarityChance: 25 },
  Legendary: { rarityColor: "rgb(238, 172, 29)", rarityChance: 5 },
};

// event listeners
addButton.addEventListener("click", addItem);
removeButton.addEventListener("click", removeItem);
mergeButton.addEventListener("click", merge);
mysteryBtn.addEventListener("click", roll);
filterBtn.addEventListener("click", filterSongs);
showAllBtn.addEventListener("click", buildList);

// STEP 1: building the list and displaying it on the page
function refresh() {
  let ulHTML = "<ul>";
  for (let i = 0; i < vault.length; i++) {
    ulHTML +=
      "<li>" +
      vault[i].name +
      " (" +
      vault[i].category +
      ") " +
      vault[i].rarity +
      "</li>";
  }

  ulHTML += "</ul>";
  document.getElementById("musicContainer").innerHTML = ulHTML;
}

// STEP 2: grab every li element on the page and color it according to its rarity
function colorItems() {
  let items = document.getElementsByTagName("li");

  // a for loop that defines a start, end, and an incremental value
  for (let i = 0; i < items.length; i++) {
    // items[i] on the page matches vault[i] in the array, because we built them in the same order
    let rarity = vault[i]["rarity"];
    items[i].style.backgroundColor = rarities[rarity].rarityColor;
  }

  document.getElementById("totalItems").innerHTML = items.length;
}

// STEP 3: loop over the array to add up every rating and get the average by dividing it by vault.length
function getRating() {
  let totalRating = 0;

  for (let i = 0; i < vault.length; i++) {
    totalRating += vault[i]["rating"];
  }
  const avgRating = (totalRating / vault.length).toFixed(2);

  if (totalRating === 0) {
    document.getElementById("avgRating").innerHTML = "0/100";
  } else {
    document.getElementById("avgRating").innerHTML = avgRating + "/100";
  }
}

function addItem() {
  vault.push({
    name: "MysterySong",
    category: "Pop",
    rarity: "Epic",
    rating: 95,
  });
  buildList();
}

function removeItem() {
  vault.pop();
  buildList();
}

function merge() {
  vault = [...vault, ...bonusVault];
  buildList();
}

let currentTries = 0;

function roll() {
  while (true) {
    let chosenSong = Math.floor(Math.random() * vault.length);
    chosenSong = vault[chosenSong];
    let chance = rarities[chosenSong.rarity].rarityChance;
    let randomNum = Math.round(Math.random() * 100);

    if (randomNum < chance && chosenSong.rarity === "Legendary") {
      vault.push(chosenSong);
      mysteryTriesText.innerHTML =
        "LEGENDARY PULLED! ATTEMPTS: " + currentTries;
      currentTries = 0;
      buildList();
      break;
    } else {
      currentTries++;
    }
  }
}

function filterSongs() {
  let items = document.getElementsByTagName("li");

  let filteredList = [];
  let hiddenList = [];

  for (let i = 0; i < vault.length; i++) {
    if (vault[i].rarity.toLowerCase() === inputText.value.toLowerCase()) {
      filteredList.push(vault[i]);
    } else {
      hiddenList.push(vault[i]);
    }
  }

  vault = filteredList;
  buildList();

  vault = [...filteredList, ...hiddenList];
}

function buildList() {
  refresh();
  colorItems();
  getRating();
}

buildList();

// // Original burger menu
// let burgers = [
//   { name: "Chicken", category: "Meat", popularity: 8, rating: 3.75, price: 5 },
//   { name: "Beef", category: "Meat", popularity: 10, rating: 4, price: 4 },
//   {
//     name: "Veggie",
//     category: "Vegetarian",
//     popularity: 4,
//     rating: 3.92,
//     price: 6,
//   },
//   { name: "Heavy", category: "Other", popularity: 6, rating: 2, price: 4 },
//   {
//     name: "Lettuce",
//     category: "Vegetarian",
//     popularity: 3,
//     rating: 1.25,
//     price: 5,
//   },
//   { name: "Smash", category: "Other", popularity: 10, rating: 4.93, price: 7 },
//   { name: "Fish", category: "Meat", popularity: 7, rating: 2.5, price: 3 },
//   {
//     name: "Cheese",
//     category: "Vegetarian",
//     popularity: 6.3,
//     rating: 4.1,
//     price: 2,
//   },
// ];

// // Additional burgers for the merge vault
// let bonusBurgers = [
//   {
//     name: "Taco",
//     category: "Vegetarian",
//     popularity: 7.1,
//     rating: 4.75,
//     price: 1,
//   },
//   { name: "Shrimp", category: "Meat", popularity: 5, rating: 3, price: 1 },
//   { name: "Plastic", category: "Other", popularity: 1, rating: 1, price: 1 },
// ];

// // make an empty string to gather our HTML

// function burgerList() {
//   let ulHTML = "<ul>";

//   for (let i = 0; i < burgers.length; i++) {
//     ulHTML += `<li>${burgers[i].name} |  ${burgers[i].category} | ${burgers[i].popularity} | ${burgers[i].rating}</li>`;
//   }

//   ulHTML += "</ul>";
//   document.getElementById("burgers-container").innerHTML = ulHTML;
// }

// // STEP 2: grab every li on the page and color it by rarity

// function colorItems() {
//   let items = document
//     .getElementById("burgers-container")
//     .getElementsByTagName("li");

//   for (let i = 0; i < items.length; i++) {
//     let rating = burgers[i].rating;

//     if (rating >= 4.5) {
//       items[i].style.backgroundColor = "#FFD700";
//     } else if (rating >= 3.5) {
//       items[i].style.backgroundColor = "#C0C0C0";
//     } else {
//       items[i].style.backgroundColor = "#CD7F32";
//     }
//   }

//   document.getElementById("total-items").innerHTML =
//     "Total items: " + items.length;
// }

// function showTotal() {
//   let totalValue = 0;

//   for (let i = 0; i < burgers.length; i++) {
//     totalValue += burgers[i].price;
//   }

//   document.getElementById("total-value").innerHTML =
//     "Total value: $" + totalValue.toFixed(2);
// }

// document.getElementById("add-btn").addEventListener("click", function () {
//   burgers.push({
//     name: "Mystery",
//     category: "Other",
//     popularity: 10,
//     rating: 5,
//     price: 3,
//   });
//   buildBurgers();
// });

// document.getElementById("remove-btn").addEventListener("click", function () {
//   burgers.pop();
//   buildBurgers();
// });

// document.getElementById("merge-btn").addEventListener("click", function () {
//   burgers = [...burgers, ...bonusBurgers];
//   buildBurgers();
// });

// function buildBurgers() {
//   burgerList();
//   colorItems();
//   showTotal();
// }

// buildBurgers();
