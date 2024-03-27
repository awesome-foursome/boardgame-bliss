const themeSelector = document.getElementById('theme');
const html = document.querySelector('html');

// toggle theme
themeSelector.addEventListener('change', () => {
    const toggleState = themeSelector.value;

    html.dataset.theme = toggleState;
    localStorage.setItem('theme', toggleState);
});

// implement theme depending on saved preferences in local storage
function savedTheme() {
    const localStorageTheme = localStorage.getItem('theme');
    console.log(localStorageTheme);
    if (localStorageTheme !== null) {
        html.dataset.theme = localStorageTheme;
        themeSelector.value = localStorageTheme;
    }
};

// potentially put this into an on ready function at a later date
savedTheme();
