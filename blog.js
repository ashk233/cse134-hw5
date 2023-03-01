const myStorage = window.localStorage;
const modal = document.getElementById("post-modal");
const postList = document.getElementById("post-list");
const noPost = document.getElementById("no-post");

export function loadLocalPosts() {
  //   window.addEventListener("DOMContentLoaded", () => {
  if (!myStorage.getItem("a-post-list")) {
    myStorage.setItem("a-post-list", "[]");
  }
  const posts = JSON.parse(myStorage.getItem("a-post-list"));
  if (posts.length > 0) {
    document.getElementById("no-post").style.display = "none";
    for (let i = 0; i < posts.length; i++) {
      createPost(tasks[i]);
    }
  }
  //   });
}

export function handleAdd() {
  document.getElementById("action").value = "submit";
  modal.style.display = "flex";
}

export function formCancel() {
  modal.style.display = "none";
}

export function formSubmit(action) {
  // remove no post message
  noPost.style.display = "none";

  // get data about new post
  const form = document.getElementById("post-form");
  const formData = new FormData(form);
  var dataEntries = {};
  formData.forEach(function (value, key) {
    dataEntries[key] = DOMPurify.sanitize(value);
  });
  var json = JSON.stringify(dataEntries);

  console.log(dataEntries);
  console.log(postList.childElementCount);
  if (action === "submit") {
    // submit new post
    createPost(dataEntries, postList.childElementCount);
  } else {
    console.log(document.getElementById("action").value);
    // edit current post
    editPost(dataEntries, postList.children[Number(action)]);
  }
  form.reset();
  modal.style.display = "none";
}

function editPost(post, postItem) {
  let entries = postItem.querySelectorAll("span");
  entries[0].innerHTML = post.title;
  entries[1].innerHTML = post.date;
  entries[2].innerHTML = post.summary;
}

function createPost(post) {
  const temp = document.getElementById("post-temp");
  let clone = temp.content.cloneNode(true);
  let postItem = clone.querySelector("li");
  let entries = clone.querySelectorAll("span");
  entries[0].innerHTML = post.title;
  entries[1].innerHTML = post.date;
  entries[2].innerHTML = post.summary;
  let editButton = clone.querySelectorAll("button")[0];
  editButton.addEventListener("click", (e) => {
    document.getElementById("title").value = post.title;
    document.getElementById("date").value = post.date;
    document.getElementById("summary").value = post.summary;

    let array = e.target.parentNode.parentNode.children;
    let index = [].indexOf.call(array, e.target.parentNode);
    document.getElementById("action").value = index;

    modal.style.display = "flex";
  });
  let deleteButton = clone.querySelectorAll("button")[1];
  deleteButton.addEventListener("click", () => {
    postItem.remove();
    if (postList.childElementCount == 0) {
      noPost.style.display = "block";
    }
  });

  postList.appendChild(clone);
}
