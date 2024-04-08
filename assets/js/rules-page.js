// Theme selctor
const themeSelector = document.querySelectorAll('option');
const html = document.querySelector('html');

// // toggle theme
themeSelector.forEach((theme) => {
  theme.addEventListener('click', () => {
    const toggleState = theme.value;

    html.dataset.theme = toggleState;
    localStorage.setItem('theme', toggleState);
  })
});

// Implement theme depending on saved preferences in local storage
function savedTheme() {
  const localStorageTheme = localStorage.getItem('theme');

  if (localStorageTheme !== null) {
    html.dataset.theme = localStorageTheme;
  }
};

// Comment section
const commentForm = document.getElementById('commentForm');
const usernameInput = document.getElementById('username');
const commentInput = document.getElementById('comment');
const commentsSection = document.getElementById('comments');


commentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = usernameInput.value;
  const comment = commentInput.value;

  if (username && comment) {

    // Creates an empty array for the comments variable in localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    // Add the new comment to the array
    comments.push({ username, comment });
    
    // Save the updated comments array back to local storage
    localStorage.setItem('comments', JSON.stringify(comments));

    //Display the comments
    displayComments();

    //Clears inputs after submitting
    usernameInput.value = '';
    commentInput.value = '';
  } else {
    alert('Please enter both username and comment.');
  }
});

//Displays the comments 
function displayComments() {
  
  // clear out existing content before adding new content dynamically.
  commentsSection.innerHTML = '';

  //Retrieves localstorage comments then converts in to a object
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  //forEach method iterates over each item in the comments and performs the following actions:
  comments.forEach((item) => {

    //Creates a new div element
    const div = document.createElement('div');

    // ${item.username and comment} inserts the username and comment property of the current item in the comments array.
    // <strong>${item.username}:</strong>: wraps the username in <strong> tags to make it bold.
    div.innerHTML = `<strong>${item.username}:</strong> ${item.comment}`;

    // This action effectively displays the comment on the webpage within the designated commentsSection container.
    commentsSection.appendChild(div);
  });
}

displayComments();

            fetch('https://www.tronalddump.io/random/quote')
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('quote').textContent = data.value;
                        })
                        .catch(error => console.error('Error fetching quote:', error));
            


