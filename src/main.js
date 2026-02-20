import './style.css'

const articleContainer = document.querySelector("#articles-container")

async function buscaPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Erro ao obter resposta da API.")
  }
  const posts = await response.json();
  return posts
}

function renderizarPosts(posts) {
  articleContainer.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("article")
    div.innerHTML = `
    <h2 class='post-title'>${post.title}</h2>
    <p class='post-class'>${post.body}</p>`
    articleContainer.appendChild(div)
  })
}



async function criarPost(post) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
  if (!response.ok) {
    throw new Error("Erro ao criar post");
  }
  return await response.json();

}

function adicionarPostNaTela(post) {
  const div = document.createElement("article");

  div.innerHTML = `
    <h2 class='post-title'>${post.title}</h2>
    <p class='post-class'>${post.body}</p>`
    
  articleContainer.prepend(div)
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await buscaPosts();
    renderizarPosts(posts.slice(0, 15));
  }
  catch (err) {
    console.log(err);
    articleContainer.innerHTML = "Erro ao carregar POSTS."
  }
})
const form = document.querySelector("#form-post");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // impede reload

  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("content");


  const novoPost = {
    title: titleInput.value,
    body: bodyInput.value,
    userId: 1
  };

  try {
    const postCriado = await criarPost(novoPost);

    adicionarPostNaTela(postCriado);

    form.reset(); // limpa formulário

  } catch (error) {
    console.error(error);
    alert("Erro ao criar post");
  }
});



