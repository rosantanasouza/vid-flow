const containerVideos = document.querySelector(".videos__container");

const buscarEMostrarVideos = async () => {
    try {
        const consultaApi = await fetch("https://api.npoint.io/bd5f3164743f3cf81d65/videos");
        const videos = await consultaApi.json();

        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error("Algum Vídeo da lista não contém a propriedade CATEGORIA. Verifique a API.");
            }
            else {
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
            }
        });
    } catch (error) {
        containerVideos.innerHTML = `
            <p style="color: #FF0000;">
                Houve um problema para carregar as informações: ${error} .
            </p>
        `;
    } finally {
        console.log("Tentativa de carregar os dados da API finalizada.");
    }
}
buscarEMostrarVideos();


/* Lógica para filtrar os videos utilizando o input da barra de pesquisar */
const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", () => {
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    const videos = document.querySelectorAll(".videos__item");
    videos.forEach((video) => {
        const videoTitulo = video.querySelector(".titulo-video").innerText.toLowerCase();
        video.style.display = videoTitulo.includes(valorFiltro) ? "block" : "none";
    })
})


/* Lógica para filtrar os videos utilizando os botões de categoria na barra superior */
const categorias = document.querySelectorAll(".superior__item");
categorias.forEach((categoria) => {
    let nomeCategoria = categoria.getAttribute("name").toLowerCase();
    
    categoria.addEventListener("click", () => {
        const videos = document.querySelectorAll(".videos__item");
        videos.forEach((video) => {
            let videoCategoria = video.querySelector(".categoria").innerText.toLowerCase();
            video.style.display = videoCategoria.includes(nomeCategoria) || nomeCategoria == "tudo" ? "block" : "none";
        })
    })
})




