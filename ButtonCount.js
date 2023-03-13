class ButtonCount extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    let count = 0;
    button.textContent = `Times Clicked: ${count}`;
    button.addEventListener("click", () => {
      count++;
      button.textContent = `Times Clicked: ${count}`;
    });

    shadow.appendChild(button);
  }
}

customElements.define("button-count", ButtonCount);
