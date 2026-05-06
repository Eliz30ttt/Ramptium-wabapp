const tg = window.Telegram.WebApp;
tg.expand();

// CONFIG (replace later with your real contract)
const CONTRACT = "0xYourContractAddressHere";
const RPC = "https://bsc-dataseed.binance.org/";
const API = "https://api.bscscan.com/api"; // explorer

let wallet = localStorage.getItem("wallet");

// UI init
if (wallet) {
  document.getElementById("walletAddress").value = wallet;
  loadWallet();
}

// Save wallet
function saveWallet() {
  wallet = document.getElementById("walletAddress").value;
  if (!wallet.startsWith("0x")) {
    alert("Invalid address");
    return;
  }

  localStorage.setItem("wallet", wallet);
  loadWallet();
}

// Load wallet data
async function loadWallet() {
  document.getElementById("username").innerText = wallet;

  await fetchBalance();
  await fetchTransactions();
}

// FETCH TOKEN BALANCE
async function fetchBalance() {
  try {
    const url = `${API}?module=account&action=tokenbalance&contractaddress=${CONTRACT}&address=${wallet}&tag=latest&apikey=YourApiKey`;

    const res = await fetch(url);
    const data = await res.json();

    let raw = data.result || "0";
    let balance = raw / 1e18;

    document.getElementById("balance").innerText = balance.toFixed(2);
  } catch (err) {
    console.log(err);
  }
}

// FETCH TRANSACTIONS
async function fetchTransactions() {
  try {
    const url = `${API}?module=account&action=tokentx&contractaddress=${CONTRACT}&address=${wallet}&page=1&offset=10&sort=desc&apikey=YourApiKey`;

    const res = await fetch(url);
    const data = await res.json();

    renderTxs(data.result || []);
  } catch (err) {
    console.log(err);
  }
}

// RENDER TRANSACTIONS
function renderTxs(txs) {
  const txList = document.getElementById("txList");
  txList.innerHTML = "";

  txs.forEach(tx => {
    const isSend = tx.from.toLowerCase() === wallet.toLowerCase();

    const div = document.createElement("div");
    div.className = `tx ${isSend ? "send" : "receive"}`;

    const amount = (tx.value / 1e18).toFixed(2);

    div.innerHTML = `
      <div class="tx-left">
        <span class="tx-type">${isSend ? "SEND" : "RECEIVE"}</span>
        <span class="tx-time">${new Date(tx.timeStamp * 1000).toLocaleString()}</span>
      </div>
      <div class="tx-amount">
        ${isSend ? "-" : "+"}${amount} RMP
      </div>
    `;

    txList.appendChild(div);
  });
}
