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

// currentPage = document.documentElement.getAttribute('id');
// pageLinks = document.querySelectorAll('.nabar-end a');
// console.log(currentPage);

// pageLinks.forEach((link) => {
//     if (link.getAttribute('id') == currentPage) {
//         document.link.style.border - border = "solid 10px";
//     }

// })
//     ;

// pages.forEach((page) => {
//     page.addEventListener('mouseout', () => {

//         const target = page.dataset.target;

//         pageImages.forEach(image => {
//             if (image.getAttribute('id') === target) {
//                 image.classList.add('invisible');
//                 document.querySelector('#index-img').classList.remove('invisible')
//             }
//         })
//     })
// });

const currentPage = document.documentElement.getAttribute('id');
const pageLinks = document.querySelectorAll('.navbar-end a');
console.log(currentPage);

pageLinks.forEach((link) => {
    if (link.getAttribute('id') === currentPage) {
        // link.style.paddingTop = "8px";
        link.style.borderBottom = "solid 8px";
        link.style.backgroundColor = "var(--background-color-main)";
    }
});