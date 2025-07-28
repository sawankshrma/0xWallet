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
  // console.log(buttons);
  buttons.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.tagName.toLowerCase() === "button") {
      // console.log(e.target.dataset.id);
      switch (e.target.dataset.id) {
        case "sol":
          console.log("sol");
          localStorage.setItem("curr", "sol");
          localStorage.setItem("net", "main");
          break;
        case "eth":
          console.log("eth");
          localStorage.setItem("curr", "eth");
          localStorage.setItem("net", "main");
          break;
        case "soldev":
          console.log("soldev");
          localStorage.setItem("curr", "sol");
          localStorage.setItem("net", "dev");
          break;

        default:
          break;
      }
      localStorage.setItem("wallet_count", 0);

      document.querySelector(".text-container")?.classList.add("text-hide");
      document.querySelector(".button-row")?.classList.add("button-hide");
      document.querySelector(".flower")?.classList.add("flower-rotate");
      // console.log("aaaaaaaaaa");
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
            <form>
              <input class="seed-input" 
              placeholder="Enter your Secret Phrase (or leave blank to generate)"
              type="password"
            />
              <button class="new-btn" type = "submit" >Generate Wallet</button>
          </form>
            </div>
            </div>
        `;
          document.querySelector(".transition-container")?.appendChild(seed);
          // console.log(seed);

          const newText = seed.querySelector(".text-container");
          newText?.classList.add("text-animated");
          const newBtn = seed.querySelector(".button-row");
          newBtn?.classList.add("button-animated");

          const form = seed.querySelector("form");

          form.addEventListener("submit", (e) => {
            e.preventDefault();
            // console.log("bbbbbbbb");
            const seed_input = seed.querySelector(".seed-input");
            // console.log(seed_input.value);
            if (localStorage.curr === "sol")
              end_process_with_SOL(seed_input.value);
            else console.log("working on eth.."); //TODO: end_process_ETH
          });
        }, 1);
      }, 400);
    }
  });
});

async function end_process_with_SOL(seed) {
  const nSeed = seed.toString().trim();
  let mnemonic = nSeed;
  // console.log("ccccccccc");

  console.log(nSeed);
  if (nSeed === "") {
    await getMnemonic_sol();
    // console.log(localStorage.mnemonic);
    mnemonic = localStorage.mnemonic;
    await getWallet_sol(mnemonic);
  } else {
    await getWallet_sol(mnemonic);
  }
}

async function getMnemonic_sol() {
  const res = await fetch("http://localhost:3001/generate");
  const data = await res.json();
  localStorage.setItem("mnemonic", data.mnemonic);
  // console.log("Mnemonic:", data.mnemonic);
}

async function getWallet_sol(mnemonic) {
  const res = await fetch("http://localhost:3001/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mnemonic, index: 0 }),
  });

  const data = await res.json();
  // console.log(data);
  if (data.error === "Invalid seed phrase") {
    alert(`${data.error}! Please try again..`);
  } else {
    localStorage.setItem("mnemonic", mnemonic);
    // console.log(`secretKey= ${data.secretKey}`);
    const wallets = [data.secretKey];
    localStorage.setItem(`wallets`, wallets);
    localStorage.setItem(`wallet_count`, 1);
    //
    console.log("redirect from here..."); // redirect now...
  }
}
