  // Modal
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    modal.style.display = 'block'; // Open the modal automatically when the page loads
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  // comment section
  const commentForm = document.getElementById('commentForm');
const usernameInput = document.getElementById('username');
const commentInput = document.getElementById('comment');
const commentsSection = document.getElementById('comments');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const comment = commentInput.value;

    if (username && comment) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ username, comment });
        localStorage.setItem('comments', JSON.stringify(comments));

        displayComments();
        usernameInput.value = '';
        commentInput.value = '';
    } else {
        alert('Please enter both username and comment.');
    }
});

function displayComments() {
    commentsSection.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${item.username}:</strong> ${item.comment}`;
        commentsSection.appendChild(div);
    });
}

displayComments();
  