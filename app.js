// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Load user info
const user = tg.initDataUnsafe?.user;

if (user) {
  document.getElementById("username").innerText =
    `${user.first_name || ""} ${user.last_name || ""} (@${user.username || "user"})`;
} else {
  document.getElementById("username").innerText = "Guest User";
}

// Fake balance (replace later with blockchain)
let balance = 1000;

function updateBalance() {
  document.getElementById("balance").innerText = balance + " RMP";
}

updateBalance();

// Button actions
function sendToken() {
  alert("Send feature coming soon 🚀");
}

function receiveToken() {
  alert("Your wallet address will appear here soon 📥");
}
