const ulElement = document.getElementById("vaultList");
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
const totalItemsText = document.getElementById("totalItems")
const avgRatingText = document.getElementById("avgRating")
const chosenItems = [];

const vault = [
  {
    name: "Song1",
    category: "Pop",
    rarity: "Common",
    rating: 50,
  },
  {
    name: "Song2",
    category: "Pop",
    rarity: "Common",
    rating: 31,
  },
  {
    name: "Song3",
    category: "Pop",
    rarity: "Common",
    rating: 35,
  },
  {
    name: "Song4",
    category: "Pop",
    rarity: "Common",
    rating: 53,
  },
  {
    name: "Song5",
    category: "Pop",
    rarity: "Legendary",
    rating: 64,
  },
  {
    name: "Song6",
    category: "Pop",
    rarity: "Uncommon",
    rating: 35,
  },
  {
    name: "Song7",
    category: "Pop",
    rarity: "Rare",
    rating: 43,
  },
  {
    name: "Song8",
    category: "Pop",
    rarity: "Epic",
    rating: 64,
  },
];

const rarityColors = {
  Common: {
    rarityColor: "rgb(51, 143, 51)",
    rarityChance: 90,
  },
  Uncommon: {
    rarityColor: "rgb(41, 92, 133)",
    rarityChance: 75,
  },
  Rare: {
    rarityColor: "rgb(214, 109, 60)",
    rarityChance: 50,
  },
  Epic: {
    rarityColor: "rgb(129, 57, 196)",
    rarityChance: 25,
  },
  Legendary: {
    rarityColor: "rgb(238, 172, 29)",
    rarityChance: 2,
  },
};

addButton.addEventListener("click", getSong);
removeButton.addEventListener("click", removeItem);

function updateVisuals() {
   totalItemsText.textContent = `TOTAL ITEMS: ${chosenItems.length}`
}

function addItem(chosenSong) {
  const newItem = document.createElement("li"); // create a new li
  ulElement.appendChild(newItem); // place it into ulElement
  newItem.id = chosenItems.length;

  console.log(ulElement);
  newItem.textContent = `${chosenSong.name}, ${chosenSong.category}, ${chosenSong.rarity}`;
  newItem.style.backgroundColor = rarityColors[chosenSong.rarity].rarityColor;

  chosenItems.push(newItem);

  updateVisuals()
}

function removeItem() {
  if (chosenItems.length > 0) {
    // check if there are items in the chosenItems array
    chosenItems.pop(); // removes item from array
    let element = document.getElementById(chosenItems.length);
    element.remove(); // removes li element

    updateVisuals()
  }
}

function getSong() {
  let chosenSong = Math.floor(Math.random() * vault.length);
  chosenSong = vault[chosenSong];

  let chance = rarityColors[chosenSong.rarity].rarityChance;
  let randomNum = Math.round(Math.random() * 100)

  if (randomNum < chance) {
    addItem(chosenSong);
  } else {
    getSong()
  }
}
