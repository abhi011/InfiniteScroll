const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let page = 1;
let limit = 3;

async function showPosts() {
  const posts = await getPosts();
  console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
          ${post.body}
          </p>
        </div>`;
    postContainer.appendChild(postEl);
  });
}

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(
      () => {
        page += 1;
        showPosts();
      },

      300
    );
  }, 1000);
}

showPosts();
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log(`${scrollTop},${scrollHeight},${clientHeight}`);
  if (scrollTop + clientHeight > scrollHeight - 5) {
    showLoading();
  } else loading.classList.remove("show");
});

function filterDocument(e) {
  let term = e.target.value.toUpperCase();
  console.log(term);
  let posts = document.querySelectorAll(".post");
  console.log(posts);
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const postBody = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || postBody.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

filter.addEventListener("input", filterDocument);
