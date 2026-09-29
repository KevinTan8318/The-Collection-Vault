// variables
const ulElement = document.getElementById("vaultList");
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
const mergeButton = document.getElementById("mergeBtn");
const mysteryBtn = document.getElementById("mysteryBtn");
const totalItemsText = document.getElementById("totalItems");
const avgRatingText = document.getElementById("avgRating");
const mysteryTriesText = document.getElementById("mysteryTries");

// the vault pool
let vault = [
  { name: "Song1", category: "Pop", rarity: "Common", rating: 48 },
  { name: "Song2", category: "Pop", rarity: "Common", rating: 31 },
  { name: "Song3", category: "Pop", rarity: "Uncommon", rating: 35 },
  { name: "Song4", category: "Pop", rarity: "Uncommon", rating: 99 },
  { name: "Song5", category: "Pop", rarity: "Legendary", rating: 85 },
  { name: "Song6", category: "Pop", rarity: "Uncommon", rating: 35 },
  { name: "Song7", category: "Pop", rarity: "Rare", rating: 65 },
  { name: "Song8", category: "Pop", rarity: "Epic", rating: 73 },
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

// in class example
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
  let chosenSong = Math.floor(Math.random() * vault.length);
  chosenSong = vault[chosenSong];
  let chance = rarities[chosenSong.rarity].rarityChance;
  let randomNum = Math.round(Math.random() * 100);

  if (randomNum < chance && chosenSong.rarity === "Legendary") {
    mysteryTriesText.innerHTML = currentTries;
    currentTries = 0;
    
  } else {
    currentTries++;
    roll();
  }
}

function buildList() {
  refresh();
  colorItems();
  getRating();
}

buildList();
