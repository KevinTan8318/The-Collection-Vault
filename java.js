const liElements = document.getElementsByTagName("li");

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

const bonusItems = [
  {
    name: "BonusSong1",
    category: "Pop",
    rarity: "Common",
    rating: 50,
  },
  {
    name: "BonusSong2",
    category: "Pop",
    rarity: "Common",
    rating: 50,
  },
  {
    name: "BonusSong3",
    category: "Pop",
    rarity: "Common",
    rating: 50,
  },
];

const chosenItems = []
const rarity = {
  Common: "rgb(51, 143, 51)",
  Uncommon: "rgb(41, 92, 133)",
  Rare: "rgb(214, 109, 60)",
  Epic: "rgb(129, 57, 196)",
  Legendary: "rgb(238, 172, 29)",
}

function refresh(array) {
  // clear all the text
  for (let i = 0; i < 8; i++) {
    liElements[i].textContent = ""
  }
  // redraw the text with updated content
  for (let i = 0; i < array.length; i++) {
      let msg = `${array[i].name}, ${array[i].category}, ${array[i].rarity}`
      liElements[i].textContent = msg
      liElements[i].style.backgroundColor = rarity[array[i].rarity]
  }
  document.getElementById("totalItems").textContent = `TOTAL ITEMS: ${chosenItems.length}`
}

document.getElementById("addBtn").addEventListener('click', () => {
    let chosenIndex = Math.floor(Math.random() * vault.length)
    let item = vault[chosenIndex]
    if (chosenItems.length < vault.length) {
      chosenItems.push(item)
      refresh(chosenItems)
      console.log(chosenItems)
    }
});

document.getElementById("removeBtn").addEventListener('click', () => {
  chosenItems.pop()
  refresh(chosenItems)
  console.log(chosenItems)
});

document.getElementById("mergeBtn").addEventListener('click', () => {
  for (let i = 0; i < 3; i++) {
    let chosenIndex = Math.floor(Math.random() * bonusItems.length)
    let item = bonusItems[chosenIndex]
    chosenItems.push(item)
    refresh(chosenItems)
    console.log(chosenItems)
  }
});
