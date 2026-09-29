// vault ul element
const ulElement = document.getElementById("vaultList");

// text labels
const totalItemsText = document.getElementById("totalItems");
const avgRatingText = document.getElementById("avgRating");
const mysteryTriesText = document.getElementById("mysteryTries");

// buttons
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
const mergeButton = document.getElementById("mergeBtn");
const mysteryBtn = document.getElementById("mysteryBtn");
const filterBtn = document.getElementById("filterBtn");
const showAllBtn = document.getElementById("showAllBtn");

// filter input
const inputText = document.getElementById("inputText");

// the vault pool
let vault = [
  { name: "Sunflower", artist: "Post Malone and Swae Lee", rarity: "Common", rating: 48 },
  { name: "Shape Of You", artist: "Ed Sheeran", rarity: "Common", rating: 31 },
  { name: "Lose Yourself", artist: "Eminem", rarity: "Uncommon", rating: 35 },
  { name: "Lover Girl", artist: "Laufey", rarity: "Uncommon", rating: 35 },
  { name: "The Monster", artist: "Eminem ft. Rihanna", rarity: "Rare", rating: 65 },
  { name: "PUNK TACTICS", artist: "Joey Valence and Brae", rarity: "Epic", rating: 73 },
  { name: "running on a rope", artist: "Tanger ft. Treb & Ofir Tabakov", rarity: "Legendary", rating: 99 },
  { name: "tiny windows", artist: "Tanger ft. Frizk", rarity: "Legendary", rating: 85 },
];

// bonus vault pool
let bonusVault = [
  { name: "Never Gonna Give You Up", artist: "Rick Astley", rarity: "Legendary", rating: 85 },
  { name: "Lucid Dreams", artist: "JUICE WRLD", rarity: "Uncommon", rating: 52 },
  { name: "RN", artist: "Joey Valence and Brae", rarity: "Rare", rating: 89 },
];

// list of rarities and their respective properties
const rarities = {
  Common: { rarityColor: "rgb(218, 218, 218)", rarityChance: 99 },
  Uncommon: { rarityColor: "rgb(67, 172, 58)", rarityChance: 75 },
  Rare: { rarityColor: "rgb(71, 146, 207)", rarityChance: 50 },
  Epic: { rarityColor: "rgb(160, 101, 216)", rarityChance: 25 },
  Legendary: { rarityColor: "rgb(238, 172, 29)", rarityChance: 5 },
};

// event listeners
addButton.addEventListener("click", addItem);
removeButton.addEventListener("click", removeItem);
mergeButton.addEventListener("click", merge);
mysteryBtn.addEventListener("click", rollLegendary);
filterBtn.addEventListener("click", filterSongs);
showAllBtn.addEventListener("click", buildList);

// STEP 1: building the list and displaying it on the page
function refresh() {
  let ulHTML = "<ul>";
  for (let i = 0; i < vault.length; i++) {
    ulHTML +=
      "<li>'" +
      vault[i].name +
      "' - " +
      vault[i].artist +
      " [" +
      vault[i].rarity +
      "]</li>";
  }

  ulHTML += "</ul>";
  document.getElementById("musicContainer").innerHTML = ulHTML; // set the music container's innerhtml as the final ul string
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

  document.getElementById("totalItems").innerHTML = items.length; // display the total items
}

// STEP 3: loop over the array to add up every rating and get the average by dividing it by vault.length
function getRating() {
  let totalRating = 0;

  for (let i = 0; i < vault.length; i++) {
    totalRating += vault[i]["rating"];
  }
  const avgRating = (totalRating / vault.length).toFixed(2); // calculate average rating

  // display the average rating
  if (totalRating === 0) {
    document.getElementById("avgRating").innerHTML = "0/100"; // ensures it doesn't display NaN
  } else {
    document.getElementById("avgRating").innerHTML = avgRating + "/100";
  }
}

// add item to vault
function addItem() {
  vault.push({name: "i like this", artist: "Joey Valence and Brae", rarity: "Epic", rating: 95});
  buildList();
}

// remove item from vault
function removeItem() {
  vault.pop();
  buildList();
}

// merge bonus vault with main vault
function merge() {
  vault = [...vault, ...bonusVault];
  buildList();
}

let currentTries = 0;
function rollLegendary() { // roll a legendary
  while (true) { // get a random song until a legendary gets pulled
    let chosenSong = Math.floor(Math.random() * vault.length);
    chosenSong = vault[chosenSong];

    let chance = rarities[chosenSong.rarity].rarityChance;
    let randomNum = Math.round(Math.random() * 100);

    // check if the legendary is pulled
    if (randomNum < chance && chosenSong.rarity === "Legendary") {
      // update the list and text
      vault.push(chosenSong);
      mysteryTriesText.innerHTML = "LEGENDARY PULLED! ATTEMPTS: " + currentTries;
      
      currentTries = 0; // reset the attempts
      buildList(); // rebuild the list with the new legendary
      break; // exit out of the loop
    } else {
      currentTries++;
    }
  }
}

// filtering system
function filterSongs() {
  let items = document.getElementsByTagName("li");

  let filteredList = [];
  let hiddenList = [];

  for (let i = 0; i < vault.length; i++) {
    if (vault[i].rarity.toLowerCase() === inputText.value.toLowerCase()) {
      filteredList.push(vault[i]); // if the item's rarity matches what is being searched then add it to filteredList
    } else {
      hiddenList.push(vault[i]); // if the item's rarity is being filtered out then add it to hiddenList
    }
  }

  vault = filteredList;  // override the list with the new filtered list
  buildList(); // rebuild the list

  vault = [...filteredList, ...hiddenList];
}

// build the list, color the items, and get the average rating of songs
function buildList() {
  refresh();
  colorItems();
  getRating();
}

// initialize
buildList();
