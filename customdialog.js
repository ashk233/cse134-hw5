export function createDialog(type) {
  const temp = document.getElementById("dialog-temp");
  let clone = temp.content.cloneNode(true);
  clone.querySelector("div").id = type;
  let p = clone.querySelector("p");
  let ok = clone.querySelectorAll("button")[0];
  let cancel = clone.querySelectorAll("button")[1];
  ok.id = `${type}-ok`;
  cancel.id = `${type}-cancel`;
  if (type === "confirm") {
    // confirm
    p.textContent = "Do you confirm this?";
  } else if (type === "prompt") {
    // prompt
    p.textContent = "What is your name?";
    p.appendChild(document.createElement("br"));
    p.appendChild(document.createElement("input"));
  } else {
    // alert
    cancel.remove();
  }
  document.body.appendChild(clone);
}

export function showDialog(type) {
  var modal = document.getElementById(type);
  modal.style.display = "flex";
}
