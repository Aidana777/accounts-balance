const accountListTag = document.querySelector(".account-list");
const addAccountBtn = document.querySelector("#add");
const doubleBtn = document.querySelector("#double");
const inputFrom = document.querySelector("#input-from");
const inputTo = document.querySelector("#input-to");
const messageTag = document.querySelector(".message__content");
const billionBtn = document.querySelector("#check-billionaire");
const millionBtn = document.querySelector("#check-millionaires");
const currencySelectTag = document.querySelector("#currency");

let accounts = [];
let lastId = 1;

const currencies = {
  USD: {
    value: 1,
    symbol: "$"
  },
  EURO: {
    value: 0.88,
    symbol: "€"
  },
  SOM: {
    value: 84.5,
    symbol: "с"
  }
};

let currentCurrency = currencies[currencySelectTag.value];

currencySelectTag.onchange = () => {
  currentCurrency = currencies[currencySelectTag.value];
  updateAccountList();
};

addAccountBtn.onclick = () => {
  const randomBalance = random(1000, 10000);
  accounts.push({ id: lastId, balance: randomBalance });
  messageTag.textContent = `#${lastId} баланс добавлен`;
  updateAccountList();
  lastId++;
};

doubleBtn.onclick = () => {
  accounts = accounts.map((oldAcc) => {
    return {
      ...oldAcc,
      balance: oldAcc.balance * 2
    };
  });
  messageTag.textContent = `Счета удвоены!`;
  updateAccountList();
};

billionBtn.onclick = () => {
  const hasBillionaire = accounts.some((acc) => acc.balance >= 1000000000);
  if (hasBillionaire) {
    messageTag.textContent = `Миллиардер найден!`;
  } else {
    messageTag.textContent = `Миллиардер не найден`;
  }
};

billionBtn.onclick = () => {
  // const hasBillionaire = accounts.some((acc) => acc.balance >= 1000000000);
  let hasBillionaire = false;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].balance * currentCurrency.value >= 1000000000) {
      hasBillionaire = true;
      break;
    }
  }

  if (hasBillionaire) {
    messageTag.textContent = `Миллиардер найден!`;
  } else {
    messageTag.textContent = `Миллиардер не найден`;
  }
};

millionBtn.onclick = () => {
  // const isAllMillionaires = accounts.every((acc) => acc.balance >= 1000000)

  let isAllMillionaires = true;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].balance * currentCurrency.value < 1000000) {
      isAllMillionaires = false;
      break;
    }
  }

  if (isAllMillionaires) {
    messageTag.textContent = `Все миллионеры!`;
  } else {
    messageTag.textContent = `Не все миллионеры!`;
  }
};

const onFilterAccounts = () => {
  const min = +inputFrom.value;
  const max = +inputTo.value >= min ? +inputTo.value : Infinity;
  const filteredAccounts = accounts.filter(
    (acc) => acc.balance >= min && acc.balance <= max
  );
  updateAccountList(filteredAccounts);
};

inputFrom.oninput = onFilterAccounts;

inputTo.oninput = onFilterAccounts;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAccount(id, balance) {
  const accountTag = document.createElement("div");
  accountTag.classList.add("account");

  const accountIdTag = document.createElement("span");
  accountIdTag.classList.add("account__id");
  accountIdTag.textContent = id;

  const accountBalanceTag = document.createElement("span");
  accountBalanceTag.classList.add("account__balance");
  const balanceValue = Math.round(balance * currentCurrency.value);
  accountBalanceTag.textContent = `${parseBalance(balanceValue)} ${currentCurrency.symbol}`;

  const accountBtn = document.createElement("button");
  accountBtn.classList.add("account__btn");
  accountBtn.textContent = "✖︎";

  accountTag.append(accountIdTag, accountBalanceTag, accountBtn);
  return accountTag;
}

function updateAccountList(data = accounts) {
  accountListTag.innerHTML = "";
  data.forEach((acc) => {
    accountListTag.append(createAccount(acc.id, acc.balance));
  });
}

function parseBalance(num) {
  if (num < 1000) return num;
  const digits = String(num).split("").reverse(); // ["0", "0", "0", "1"] ["0", "0", "0", " ", "1"]
  const digits2 = [];
  for (let i = 0; i < digits.length; i++) {
    if (i % 3 === 0) {
      digits2.push(" ");
    }
    digits2.push(digits[i]);
  }
  return digits2.reverse().join("");
}

console.log(parseBalance(100))
console.log(parseBalance(1000))
console.log(parseBalance(10000))
console.log(parseBalance(100000))


// <div class="account">
//   <span class="account__id">2</span>
//   <b class="account__balance">1000 $</b>
//  </div>