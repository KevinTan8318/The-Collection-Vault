// variables
const ulElement = document.getElementById("vaultList");
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
const mergeButton = document.getElementById("mergeBtn");
const totalItemsText = document.getElementById("totalItems");
const avgRatingText = document.getElementById("avgRating");

// array of chosen items
const chosenItems = [];

// the vault pool
let vault = [
  {name: "Song1", category: "Pop", rarity: "Common", rating: 48},
  {name: "Song2", category: "Pop", rarity: "Tung", rating: 31},
  {name: "Song3", category: "Pop", rarity: "Uncommon", rating: 35},
  {name: "Song4", category: "Pop", rarity: "Mythic", rating: 99},
  {name: "Song5", category: "Pop", rarity: "Legendary", rating: 85},
  {name: "Song6", category: "Pop", rarity: "Uncommon", rating: 35},
  {name: "Song7", category: "Pop", rarity: "Rare", rating: 65},
  {name: "Song8", category: "Pop", rarity: "Epic", rating: 73}
];

let bonusVault = [
  {name: "BonusSong1", category: "Pop", rarity: "Epic", rating: 85},
  {name: "BonusSong2", category: "Pop", rarity: "Mythic", rating: 95},
  {name: "BonusSong3", category: "Pop", rarity: "Rare", rating: 52}
];

// list of rarities and their respective properties
const rarities = {
  Common: {rarityColor: "rgb(218, 218, 218)", rarityChance: 99},
  Uncommon: {rarityColor: "rgb(67, 172, 58)", rarityChance: 75},
  Rare: {rarityColor: "rgb(60, 129, 185)", rarityChance: 50},
  Epic: {rarityColor: "rgb(129, 57, 196)", rarityChance: 25},
  Legendary: {rarityColor: "rgb(238, 172, 29)", rarityChance: 5},
  Mythic: {rarityColor: "rgb(255, 33, 26)", rarityChance: 1},
  Tung: {rarityColor: "rgb(170, 112, 55)", rarityChance: .1},
};

// event listeners
addButton.addEventListener("click", addItem);
removeButton.addEventListener("click", removeItem);
mergeButton.addEventListener("click", merge);

// in class example
function refresh() {
  let ulHTML = "<ul>";
  for (let i = 0; i < vault.length; i++) {
    ulHTML += ("<li>" + vault[i].name + " (" + vault[i].category + ") " + vault[i].rarity + "</li>");
  };

  ulHTML += "</ul>";
  document.getElementById("musicContainer").innerHTML = ulHTML;
};
refresh();

function addItem() {;
  vault.push({name: "MysterySong", category: "Pop", rarity: "Epic", rating: 95});
  refresh();
};

function removeItem() {
  vault.pop();
  refresh();
};

function merge() {
  vault = [...vault, ...bonusVault];
  refresh();
};






// function getRating() {
//   let totalRating = 0;
//   for (let i = 0; i < chosenItems.length; i++) {
//     totalRating += chosenItems[i].rating;
//   }
//   const avgRating = (totalRating / chosenItems.length);
//   return (chosenItems.length > 0 && avgRating.toFixed(2)) || 0; // return the calculated average rating (we also check if there's things inside chosenItems so it doesnt return NaN)
// };

// function updateVisuals() { // update the site's texts
//   totalItemsText.textContent = `TOTAL ITEMS: ${chosenItems.length}`;
//   avgRatingText.textContent = `AVERAGE RATING: ${getRating()}/100`;
// };

// function addItem(chosenSong) { // add the selected random song into the list
//   const newItem = document.createElement("li"); // create a new li
//   newItem.id = chosenItems.length;
//   newItem.rating = chosenSong.rating; // set the item's rating property (for avg rating calculation)
//   newItem.textContent = `${chosenSong.name}, ${chosenSong.category}, ${chosenSong.rarity}`;
//   newItem.style.backgroundColor = rarities[chosenSong.rarity].rarityColor;

//   ulElement.appendChild(newItem); // place it into ulElement
//   chosenItems.push(newItem);
//   console.log(newItem);

//   updateVisuals();
// };

// function removeItem() { // remove the last item in the list
//   if (chosenItems.length > 0) { // check if there are items in the chosenItems array
//     chosenItems.pop(); // removes item from array
//     let element = document.getElementById(chosenItems.length);
//     element.remove(); // removes li element
//   }
//   updateVisuals();
// };

// function getSong() { // get a random song from the vault
//   let chosenSong = Math.floor(Math.random() * vault.length);
//   chosenSong = vault[chosenSong];

//   let chance = rarities[chosenSong.rarity].rarityChance;
//   let randomNum = Math.round(Math.random() * 100);

//   if (randomNum < chance) { // if the random num generated is lower than the song's rarity chance then add the song
//     addItem(chosenSong);
//   } else {
//     getSong(); // otherwise reroll for a new song
//   }
// };
