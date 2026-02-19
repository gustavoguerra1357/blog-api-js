import './style.css'

const articleContainer = document.querySelector("#articles-container")

async function buscaPosts() {  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if(!response.ok) {
    throw new Error("Erro ao obter resposta da API.")
  }
  const posts = await response.json();
  return posts
}

function renderizarPosts(posts) {
  articleContainer.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <h2 class='post-title'>${post.title}</h2>
    <p class='post-class'>${post.body}</p>`
    div.classList.add("article")
    articleContainer.appendChild(div)
  })
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await buscaPosts();
    renderizarPosts(posts.slice(0, 10));
  }
  catch(err) {
    console.log(err);
    articleContainer.innerHTML = "Erro ao carregar POSTS."
  }
})



