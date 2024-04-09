const themeSelector = document.querySelectorAll('option');
const html = document.querySelector('html');
const currentPage = document.documentElement.getAttribute('id');
const pageLinks = document.querySelectorAll('.navbar-end a');

// // toggle theme
themeSelector.forEach((theme) => {
    theme.addEventListener('click', () => {
        const toggleState = theme.value;

        html.dataset.theme = toggleState;
        localStorage.setItem('theme', toggleState);
    })
});

// implement theme depending on saved preferences in local storage
function savedTheme() {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme !== null) {
        html.dataset.theme = localStorageTheme;
    }
};

// mobile burger menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

// potentially put this into an on ready function at a later date
savedTheme();


pageLinks.forEach((link) => {
    if (link.getAttribute('id') === currentPage) {
        link.style.borderBottom = "solid 8px";
        link.style.backgroundColor = "var(--background-color-main)";
    }
});