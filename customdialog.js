export function createDialog(type) {
  let output = document.getElementById("output");
  const temp = document.getElementById("dialog-temp");
  let clone = temp.content.cloneNode(true);
  clone.querySelector("div").id = type;
  let p = clone.querySelector("p");
  let ok = clone.querySelectorAll("button")[0];
  let cancel = clone.querySelectorAll("button")[1];
  ok.id = `${type}-ok`;
  if (type == "alert") {
    // alert
    cancel.remove();
    ok.addEventListener("click", () => {
      output.innerHTML = "";
      let modal = document.getElementById(type);
      modal.style.display = "none";
    });
  } else {
    cancel.id = `${type}-cancel`;
    if (type === "confirm") {
      // confirm
      p.textContent = "Do you confirm this?";
      ok.addEventListener("click", () => {
        let modal = document.getElementById(type);
        modal.style.display = "none";
        output.innerHTML = "Confirm result: true";
      });
      cancel.addEventListener("click", () => {
        let modal = document.getElementById(type);
        modal.style.display = "none";
        output.innerHTML = "Confirm result: false";
      });
    } else if (type === "prompt") {
      // prompt
      p.textContent = "What is your name?";
      p.appendChild(document.createElement("br"));
      let input = document.createElement("input");
      p.appendChild(input);
      ok.addEventListener("click", () => {
        let modal = document.getElementById(type);
        modal.style.display = "none";
        let sanitized = DOMPurify.sanitize(input.value);
        output.innerHTML = `Prompt result: ${sanitized}`;
        input.value = "";
      });
      cancel.addEventListener("click", () => {
        let modal = document.getElementById(type);
        modal.style.display = "none";
        output.innerHTML = "User didn't enter anything.";
        input.value = "";
      });
    }
  }
  document.body.appendChild(clone);
}

export function showDialog(type) {
  let modal = document.getElementById(type);
  modal.style.display = "flex";
}
