const tg = window.Telegram.WebApp;
tg.expand();

// Load user
const user = tg.initDataUnsafe?.user;

if (user) {
  document.getElementById("username").innerText =
    `${user.first_name || ""} (@${user.username || "user"})`;
} else {
  document.getElementById("username").innerText = "Guest";
}

// Balance animation (subtle, premium feel)
let value = 0;
let target = 1250.00;

function animate() {
  let step = setInterval(() => {
    value += 25;
    if (value >= target) {
      value = target;
      clearInterval(step);
    }
    document.getElementById("balance").innerText = value.toFixed(2);
  }, 20);
}

animate();

// Actions
function sendToken() {
  tg.showPopup({
    title: "Send",
    message: "Coming soon",
    buttons: [{type: "ok"}]
  });
}

function receiveToken() {
  tg.showPopup({
    title: "Receive",
    message: "Coming soon",
    buttons: [{type: "ok"}]
  });
}
