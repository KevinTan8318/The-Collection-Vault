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

const chosenItems = []

function refresh(array) {
    for (let i = 0; i < array.length; i++) {
        let msg = `${array[i].name}, ${array[i].category}, ${array[i].rarity}`
        liElements[i].textContent = msg
    }
}

document.getElementById("addBtn").addEventListener('click', () => {
    let chosenIndex = Math.floor(Math.random() * vault.length)
    let item = vault[chosenIndex]
    chosenItems.push(item)
    refresh(chosenItems)
    console.log(chosenItems)
});
