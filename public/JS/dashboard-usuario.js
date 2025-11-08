const publishBtn = document.getElementById('publish-btn');
const postText = document.getElementById('post-text');
const feed = document.getElementById('feed');
const imageUpload = document.getElementById('image-upload');
const fileUpload = document.getElementById('file-upload');
const previewArea = document.getElementById('preview-area');

let selectedImages = [];
let selectedFiles = [];

// Mostrar vista previa de imágenes
imageUpload.addEventListener('change', (e) => {
    selectedImages = Array.from(e.target.files);
    renderPreviews();
});

// Mostrar vista previa de archivos
fileUpload.addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
    renderPreviews();
});

// Renderizar vista previa
function renderPreviews() {
    previewArea.innerHTML = '';

    // Imágenes
    selectedImages.forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewArea.appendChild(img);
    });

    // Archivos
    selectedFiles.forEach(file => {
        const div = document.createElement('div');
        div.classList.add('file-item');
        div.textContent = `📎 ${file.name}`;
        previewArea.appendChild(div);
    });
}

// Publicar post
publishBtn.addEventListener('click', () => {
    const text = postText.value.trim();
    if (text === '' && selectedImages.length === 0 && selectedFiles.length === 0) {
        alert('No puedes publicar algo vacío.');
        return;
    }

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Texto del post
    if (text) {
        const content = document.createElement('p');
        content.textContent = text;
        postDiv.appendChild(content);
    }

    // Mostrar imágenes
    selectedImages.forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        postDiv.appendChild(img);
    });

    // Mostrar archivos (descargables)
    selectedFiles.forEach(file => {
        const link = document.createElement('a');
        link.textContent = `📄 ${file.name}`;
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.classList.add('file-download');
        postDiv.appendChild(link);
    });

    // Área de acciones
    const actions = document.createElement('div');
    actions.classList.add('post-actions');
    actions.style.marginTop = '10px';
    actions.innerHTML = `
        <button class="like-btn">👍 Me gusta <span class="like-count">0</span></button>
        <button class="comment-btn">💬 Comentar</button>
        <div class="comment-section" style="margin-top:10px; display:none;">
            <input type="text" class="comment-input" placeholder="Escribe un comentario...">
            <button class="send-comment-btn">Enviar</button>
            <div class="comments-list"></div>
        </div>
    `;
    postDiv.appendChild(actions);

    // Like funcional con contador
    const likeBtn = actions.querySelector('.like-btn');
    const likeCount = likeBtn.querySelector('.like-count');
    let liked = false;
    let count = 0;

    likeBtn.addEventListener('click', () => {
        liked = !liked;
        count += liked ? 1 : -1;
        likeBtn.style.color = liked ? '#0073e6' : 'black';
        likeCount.textContent = count;
    });

    // Comentarios
    const commentBtn = actions.querySelector('.comment-btn');
    const commentSection = actions.querySelector('.comment-section');
    const sendCommentBtn = actions.querySelector('.send-comment-btn');
    const commentInput = actions.querySelector('.comment-input');
    const commentsList = actions.querySelector('.comments-list');

    commentBtn.addEventListener('click', () => {
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
        commentInput.focus();
    });

    sendCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const comment = document.createElement('p');
            comment.textContent = `💬 ${commentText}`;
            comment.style.marginLeft = '10px';
            commentsList.appendChild(comment);
            commentInput.value = '';
        }
    });

    // Agregar al feed (al inicio)
    feed.prepend(postDiv);

    // Limpiar inputs
    postText.value = '';
    selectedImages = [];
    selectedFiles = [];
    previewArea.innerHTML = '';
    imageUpload.value = '';
    fileUpload.value = '';
});
