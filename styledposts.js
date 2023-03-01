import {
  myStorage,
  modal,
  postForm,
  postList,
  noPost,
  prePopulateData,
} from "/blog.js";

export function loadLocalPosts() {
  //pre-populate the data store with a set array
  if (!myStorage.getItem("a-post-list")) {
    myStorage.setItem("a-post-list", JSON.stringify(prePopulateData));
  }
  const posts = JSON.parse(myStorage.getItem("a-post-list"));
  if (posts.length > 0) {
    document.getElementById("no-post").style.display = "none";
    for (let i = 0; i < posts.length; i++) {
      createStyledPost(posts[i]);
    }
  }
}

export function formSubmit(action) {
  const localPosts = JSON.parse(myStorage.getItem("a-post-list"));
  // remove no post message
  noPost.style.display = "none";

  // get data about new post
  const formData = new FormData(postForm);
  var dataEntries = {};
  formData.forEach(function (value, key) {
    dataEntries[key] = DOMPurify.sanitize(value);
  });

  if (action === "submit") {
    // submit new post
    createStyledPost(dataEntries, postList.childElementCount);
    localPosts.push(dataEntries);
  } else {
    // edit current post
    var index = Number(action);
    editPost(dataEntries, postList.children[index]);
    localPosts.splice(index, 1, dataEntries);
  }
  myStorage.setItem("a-post-list", JSON.stringify(localPosts));
  postForm.reset();
}

function editPost(post, postItem) {
  let entries = postItem.querySelectorAll("span");
  entries[0].innerHTML = post.title;
  entries[1].innerHTML = post.date;
  entries[2].innerHTML = post.summary;
}

function createStyledPost(post) {
  const temp = document.getElementById("post-temp");
  let clone = temp.content.cloneNode(true);
  let postItem = clone.querySelector("li");
  let entries = clone.querySelectorAll("span");
  entries[0].innerHTML = post.title;
  entries[1].innerHTML = post.date;
  entries[2].innerHTML = post.summary;
  let editButton = clone.querySelectorAll("i")[0];
  editButton.addEventListener("click", () => {
    document.getElementById("title").value = post.title;
    document.getElementById("date").value = post.date;
    document.getElementById("summary").value = post.summary;

    let array = postItem.parentNode.children;
    let index = [].indexOf.call(array, postItem);
    document.getElementById("action").value = index;

    modal.showModal();
  });
  let deleteButton = clone.querySelectorAll("i")[1];
  deleteButton.addEventListener("click", () => {
    const localPosts = JSON.parse(myStorage.getItem("a-post-list"));
    let array = postItem.parentNode.children;
    let index = [].indexOf.call(array, postItem);
    localPosts.splice(index, 1);
    myStorage.setItem("a-post-list", JSON.stringify(localPosts));
    postItem.remove();

    if (postList.childElementCount == 0) {
      noPost.style.display = "block";
    }
  });

  postList.appendChild(clone);
}
