const pages = document.querySelectorAll('#left div');
const pageImages = document.querySelectorAll('#right > div');

// // make card image match card on mouseover
// pages.forEach((page) => {
//     page.addEventListener('mouseover', () => {

//         const target = page.dataset.target;

//         pageImages.forEach(image => {
//             if (image.getAttribute('id') === target) {
//                 image.classList.remove('is-hidden');
//             } else {
//                 image.classList.add('is-hidden')
//             }
//         })
//     })
// });

// // revert image to default on mouseout
// pages.forEach((page) => {
//     page.addEventListener('mouseout', () => {

//         const target = page.dataset.target;

//         pageImages.forEach(image => {
//             if (image.getAttribute('id') === target) {
//                 image.classList.add('is-hidden');
//                 document.querySelector('#index-img').classList.remove('is-hidden')
//             }
//         })
//     })
// });

// // max page cards into links
// pages.forEach((page) => {
//     page.addEventListener('click', () => {
//         const target = page.id;

//         location.href = `./${target}.html`;
//     })
// });

// make card image match card on mouseover
pages.forEach((page) => {
    page.addEventListener('mouseover', () => {

        const target = page.dataset.target;

        pageImages.forEach(image => {
            if (image.getAttribute('id') === target) {
                image.classList.remove('invisible');
            } else {
                image.classList.add('invisible')
            }
        })
    })
});

// revert image to default on mouseout
pages.forEach((page) => {
    page.addEventListener('mouseout', () => {

        const target = page.dataset.target;

        pageImages.forEach(image => {
            if (image.getAttribute('id') === target) {
                image.classList.add('invisible');
                document.querySelector('#index-img').classList.remove('invisible')
            }
        })
    })
});

// max page cards into links
pages.forEach((page) => {
    page.addEventListener('click', () => {
        const target = page.id;

        location.href = `./${target}.html`;
    })
});