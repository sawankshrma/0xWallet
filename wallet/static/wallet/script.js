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
            <p id="sub-text">Save these words in a safe place</p>
            </div>

            <form></form>
        `;

          document.querySelector(".transition-container")?.appendChild(seed);
          console.log(seed);

          const newText = seed.querySelector(".text-container");
          newText?.classList.add("text-animated");
        }, 1);
      }, 400);
    }
  });
});
