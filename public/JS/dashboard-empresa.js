const postText = document.getElementById("postText");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");
const imageInput = document.getElementById("imageInput");
const fileInput = document.getElementById("fileInput");
const previewArea = document.getElementById("previewArea");

let selectedFile = null;
let selectedFileType = null;

// Vista previa
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        selectedFileType = "image";
        const reader = new FileReader();
        reader.onload = (ev) => {
            previewArea.innerHTML = `<img src="${ev.target.result}" alt="Vista previa">`;
        };
        reader.readAsDataURL(file);
    }
});

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        selectedFileType = "file";
        previewArea.innerHTML = `<p>📄 ${file.name}</p>`;
    }
});

// Publicar
postBtn.addEventListener("click", () => {
    const text = postText.value.trim();
    if (!text && !selectedFile) return alert("Escribe algo o selecciona un archivo.");

    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    let content = `<p>${text}</p>`;

    if (selectedFileType === "image") {
        const reader = new FileReader();
        reader.onload = (ev) => {
            content += `<div class="post-content"><img src="${ev.target.result}" alt="Imagen subida"></div>`;
            addPost(content, postDiv);
        };
        reader.readAsDataURL(selectedFile);
    } else if (selectedFileType === "file") {
        const url = URL.createObjectURL(selectedFile);
        content += `<div class="post-content"><a href="${url}" download="${selectedFile.name}">📎 Descargar ${selectedFile.name}</a></div>`;
        addPost(content, postDiv);
    } else {
        addPost(content, postDiv);
    }

    postText.value = "";
    previewArea.innerHTML = "";
    selectedFile = null;
    selectedFileType = null;
});

function addPost(content, postDiv) {
    postDiv.innerHTML = `
        ${content}
        <div class="post-actions-btns">
            <button class="like-btn">👍 Me gusta (<span>0</span>)</button>
            <button class="comment-btn">💬 Comentar</button>
        </div>
        <div class="comment-section">
            <div class="comment-box" style="display: none;">
                <input type="text" placeholder="Escribe un comentario...">
                <button>Enviar</button>
            </div>
            <div class="comment-list"></div>
        </div>
    `;
    feed.prepend(postDiv);

    const likeBtn = postDiv.querySelector(".like-btn");
    const commentBtn = postDiv.querySelector(".comment-btn");
    const commentBox = postDiv.querySelector(".comment-box");
    const commentInput = commentBox.querySelector("input");
    const sendComment = commentBox.querySelector("button");
    const commentList = postDiv.querySelector(".comment-list");

    let likes = 0;

    likeBtn.addEventListener("click", () => {
        likes++;
        likeBtn.querySelector("span").textContent = likes;
    });

    commentBtn.addEventListener("click", () => {
        commentBox.style.display = commentBox.style.display === "none" ? "flex" : "none";
    });

    sendComment.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (!commentText) return;
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.textContent = commentText;
        commentList.appendChild(comment);
        commentInput.value = "";
    });
}
