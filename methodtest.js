const deleteUrl = "https://httpbin.org/delete";

const postBtn = document.getElementById("postBtn");
const getBtn = document.getElementById("getBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
export const output = document.getElementById("response");

const form = document.getElementById("form");
const date = document.getElementById("date");

export async function postArticle() {
  let currTime = new Date();
  date.value = currTime.toString();
  let formData = new FormData(form);
  let parameters = queryParameters(true, formData);
  const postUrl = `https://httpbin.org/post`;

  const response = await fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: parameters,
  });
  if (!response.ok) {
    output.innerHTML = "There was an error.";
  } else {
    const data = await response.json();
    output.innerHTML = JSON.stringify(data, null, 2);
  }
}

export async function getArticle() {
  let formData = new FormData(form);
  let parameters = queryParameters(false, formData);
  const getUrl = `https://httpbin.org/get?${parameters}`;

  const response = await fetch(getUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!response.ok) {
    output.innerHTML = "There was an error.";
  } else {
    const data = await response.json();
    output.innerHTML = JSON.stringify(data, null, 2);
  }
}

export async function putArticle() {
  let currTime = new Date();
  date.value = currTime.toString();
  let id = document.getElementById("id").value;
  let formData = new FormData(form);
  let parameters = queryParameters(true, formData);
  const putUrl = `https://httpbin.org/put/${id}`;

  const response = await fetch(putUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: parameters,
  });
  if (!response.ok) {
    output.innerHTML = "There was an error.";
  } else {
    const data = await response.json();
    output.innerHTML = JSON.stringify(data, null, 2);
  }
}

export async function deleteArticle() {
  let id = document.getElementById("id").value;
  const deleteUrl = `https://httpbin.org/delete/${id}`;

  const response = await fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!response.ok) {
    output.innerHTML = "There was an error.";
  } else {
    const data = await response.json();
    output.innerHTML = JSON.stringify(data, null, 2);
  }
}

function queryParameters(includeDate, formData) {
  const parametersList = [];
  for (const pair of formData.entries()) {
    if (!includeDate && pair[0] === "date") continue;
    if (pair[1] !== "")
      parametersList.push(`${pair[0]}=${encodeURIComponent(pair[1])}`);
  }
  return parametersList.join("&");
}
