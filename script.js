const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilionerBtn = document.getElementById("show-milioners");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
let users = [];

getRendomUser();
getRendomUser();
getRendomUser();

// Fetch user and add to users array
async function getRendomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
  updateDom();
}

// Add new object to users array
function addData(obj) {
  users.push(obj);
}

// Double everyone's money
function doubleMoney() {
  users = users.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

//--------------------sort by the rechist------
function sortByRichest() {
  users.sort((a, b) => b.money - a.money);
  updateDom();
}

//---------------show milioners---------//
function showMillionaires() {
  const millionaires = users.filter((user) => user.money > 1000000);
  updateDom(millionaires);
}

//----------------calculate wealth====
function calculateWealth() {
  const wealth = users.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total money:<strong>${formatMoney(
    wealth
  )} </strong><h3>`;
  main.appendChild(wealthEl);
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Update DOM
function updateDom(data = users) {
  main.innerHTML = "";
  data.forEach((user) => {
    const userEl = document.createElement("div");
    userEl.classList.add("person");
    userEl.innerHTML = `<strong>${user.name}</strong> ${formatMoney(
      user.money
    )}`;
    main.appendChild(userEl);
  });
}

// Event listeners
addUserBtn.addEventListener("click", getRendomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMilionerBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
