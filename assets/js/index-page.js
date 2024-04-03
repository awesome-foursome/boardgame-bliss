const pages = document.querySelectorAll('#left div');
const pageImages = document.querySelectorAll('#right > img');

pages.forEach((page) => {
    page.addEventListener('mouseover', () => {

        const target = page.dataset.target;

        pageImages.forEach(image => {
            if (image.getAttribute('id') === target) {
                image.classList.remove('is-hidden');
            } else {
                image.classList.add('is-hidden')
            }
        })
    })
});

pages.forEach((page) => {
    page.addEventListener('mouseout', () => {

        const target = page.dataset.target;

        pageImages.forEach(image => {
            if (image.getAttribute('id') === target) {
                image.classList.add('is-hidden');
                document.querySelector('#index-img').classList.remove('is-hidden')
            }
        })
    })
});