export function createDialog(type) {
  const output = document.getElementById("output");
  const temp = document.getElementById("custom-dialog");
  let clone = temp.content.cloneNode(true);
  let dialog = clone.querySelector("dialog");
  dialog.id = type;
  let form = clone.querySelector("form");
  let p = clone.querySelector("p");
  let cancel = clone.querySelectorAll("button")[0];
  let ok = clone.querySelectorAll("button")[1];
  ok.id = `${type}-ok`;
  if (type === "alert") {
    cancel.remove();
  } else {
    cancel.id = `${type}-cancel`;
    if (type === "confirm") {
      // confirm
      p.textContent = "Do you confirm this?";
    } else if (type === "prompt") {
      // prompt
      p.textContent = "What is your name?";
      p.appendChild(document.createElement("br"));
      let input = document.createElement("input");
      p.appendChild(input);
    }
  }
  dialog.addEventListener("close", () => {
    if (type === "alert") {
      output.innerHTML = "";
    } else if (type === "confirm") {
      output.innerHTML = `Cofirm result: ${dialog.returnValue}`;
    } else {
      let result = DOMPurify.sanitize(dialog.querySelector("input").value);
      output.innerHTML =
        dialog.returnValue === "false"
          ? "User didn't enter anything."
          : `Prompt result: ${result}`;
      form.reset();
    }
  });
  document.body.appendChild(clone);
}

export function showDialog(type) {
  let dialog = document.getElementById(type);
  dialog.showModal();
}
