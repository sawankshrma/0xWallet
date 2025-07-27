function showLanding() {
  document.getElementById("black-overlay").classList.add("hide");
  document.querySelector(".text-container")?.classList.add("text-animated");
  document.querySelector(".button-row")?.classList.add("button-animated");
  document.querySelector(".flower")?.classList.add("flower-animated");
}

window.addEventListener("load", function () {
  setTimeout(showLanding, 400); // 0.4 second black screen
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelector(".button-row");
  buttons.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === "button") {
      document.querySelector(".text-container")?.classList.add("text-hide");
      document.querySelector(".button-row")?.classList.add("button-hide");
      document.querySelector(".flower")?.classList.add("flower-rotate");

      setTimeout(() => {
        document.querySelector(".text-container")?.classList.add("hidden");
        document.querySelector(".button-row")?.classList.add("hidden");

        setTimeout(() => {
          const seed = Object.assign(document.createElement("div"), {
            className: "seed-wrp",
          });

          seed.innerHTML = `
            <div class="text-container">
            <h1 id="main-text" class="scrt-phrase">Secret Recovery Phrase</h1>
            <p id="sub-text" class="safe-place">Save these words in a safe place</p>
            <div class="button-row input-row">
              <input class="seed-input" 
              placeholder="Enter your Secret Phrase (or leave blank to generate)"
              type="password"
            />
              <button class="new-btn">Generate Wallet</button>

            </div>
            </div>
        `;

          document.querySelector(".transition-container")?.appendChild(seed);
          // console.log(seed);

          const newText = seed.querySelector(".text-container");
          newText?.classList.add("text-animated");
          const newBtn = seed.querySelector(".button-row");
          newBtn?.classList.add("button-animated");
        }, 1);
      }, 400);
    }
  });
});

async function getMnemonic() {
  const res = await fetch("http://localhost:3001/generate");
  const data = await res.json();
  localStorage.setItem("mnemonic", data.mnemonic);
  console.log("Mnemonic:", data.mnemonic);
}

async function getWallet(mnemonic) {
  const res = await fetch("http://localhost:3001/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mnemonic }),
  });

  const data = await res.json();
  console.log(data);
  console.log(`secretKey= ${data.secretKey}`);
}
