const ulElement = document.getElementById("vaultList");
const addButton = document.getElementById("addBtn");
const removeButton = document.getElementById("removeBtn");
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

const rarity = {
  Common: "rgb(51, 143, 51)",
  Uncommon: "rgb(41, 92, 133)",
  Rare: "rgb(214, 109, 60)",
  Epic: "rgb(129, 57, 196)",
  Legendary: "rgb(238, 172, 29)",
};

addButton.addEventListener("click", getSong);
removeButton.addEventListener("click", removeItem);

function addItem(chosenSong) {
  const newItem = document.createElement("li"); // create a new li
  ulElement.appendChild(newItem); // place it into ulElement
  newItem.id = chosenItems.length;

  console.log(ulElement);
  newItem.textContent = `${chosenSong.name}, ${chosenSong.category}, ${chosenSong.rarity}`;
  chosenItems.push(newItem);
}

function removeItem() {
  if (chosenItems.length > 0) {
    chosenItems.pop();
    let element = document.getElementById(chosenItems.length);
    element.remove();
  }
}

function getSong() {
  let chosenSong = Math.floor(Math.random() * vault.length);
  chosenSong = vault[chosenSong];

  addItem(chosenSong);
}
