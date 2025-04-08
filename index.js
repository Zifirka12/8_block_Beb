"use strict";

// Массив данных для комментариев
const commentsData = [
    {
        author: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likesCount: 3,
        isLiked: false
    },
    {
        author: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤️',
        likesCount: 75,
        isLiked: true
    }
];

// Рендеринг комментариев
function renderComments() {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = ''; // Очистка контейнера

    commentsData.forEach((comment, index) => {
        const commentItem = `
      <li class="comment" onclick="quoteComment(${index})">
        <div class="comment-header">
          <div>${comment.author}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${formatCommentText(comment.text)}</div> <!-- Исправлено здесь -->
        </div>
        <div class="comment-footer">
          <span class="likes-counter">${comment.likesCount}</span>
          <button class="like-button ${comment.isLiked ? 'active' : ''}" data-index="${index}" onclick="toggleLike(event, ${index})"></button>
        </div>
      </li>
    `;

        commentsContainer.insertAdjacentHTML('beforeend', commentItem);
    });
}

function formatCommentText(text) {
    return text.replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

// Обработчик клика на кнопку лайка
function toggleLike(event, index) {
    event.stopPropagation(); // Остановка всплытия события
    const comment = commentsData[index];
    comment.isLiked = !comment.isLiked; // Меняем состояние лайка
    comment.likesCount += comment.isLiked ? 1 : -1; // Увеличиваем или уменьшаем счетчик лайков

    renderComments(); // Перерендериваем комментарии
}

function quoteComment(index) {
    const comment = commentsData[index];
    const nameInput = document.querySelector('.add-form-name');
    const commentTextarea = document.querySelector('.add-form-text');

    nameInput.value = comment.author;
    commentTextarea.value = `> ${comment.text}`;
}

function sanitize(input) {
    return input.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"); // Экранирование HTML
}

// Форматирование даты
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

document.querySelector('.add-form-button').addEventListener('click', function() {
    const nameInput = document.querySelector('.add-form-name');
    const commentTextarea = document.querySelector('.add-form-text');

    if (!nameInput.value || !commentTextarea.value) return alert('Заполните оба поля!');

    // Получаем текущее время
    let currentDate = new Date();
    let dateString = formatDate(currentDate);

    commentsData.push({
        author: sanitize(nameInput.value),
        date: dateString,
        text: sanitize(commentTextarea.value),
        likesCount: 0,
        isLiked: false
    });

    renderComments();

    nameInput.value = '';
    commentTextarea.value = '';
});

renderComments();