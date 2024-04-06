const listTitle = document.querySelector('#list-title');
const listContainer = document.querySelector('#list-parent');
const listItems = document.querySelectorAll('.card');


// allTimeList = `https://boardgamegeek.com/xmlapi/geeklist/256388`;
tutsReviews = `https://boardgamegeek.com/xmlapi/geeklist/23763?pagesize=10`;
// searchUrl = `https://boardgamegeek.com/xmlapi/boardgame/342942/`;
// searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=Cascadia&exact=1`;

let rankValue = 1;

function renderGame() {

    fetch(searchUrl)
        .then(function (response) {
            if (response.status !== 200) {
                throw searchUrl;
            } else {
                return response.text();
            };
        })
        .then(function (xmlString) {
            if (!xmlString) {
                console.log('No results found!');
            } else {
                const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');

                // console.log(xmlResponse);

                // let list = xmlResponse.getElementsByTagName('item');

                let id = xmlResponse.getElementsByTagName('item')[0].getAttribute('id');
                let name = xmlResponse.getElementsByTagName('name')[0].getAttribute('value');
                let yearPublished = xmlResponse.getElementsByTagName('yearpublished')[0].getAttribute('value');

                // console.log(rank, id, name, yearPublished);

                const createDivCard = document.createElement('div');
                createDivCard.setAttribute('class', 'card');
                createDivCard.setAttribute('id', id);
                createDivCard.addEventListener('click', () => {
                    location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                });

                const createDivCardContent = document.createElement('div');
                createDivCardContent.setAttribute('class', 'card-content');

                const createDivMedia = document.createElement('div');
                createDivMedia.setAttribute('class', 'media');

                const createDivMediaLeft = document.createElement('div');
                createDivMediaLeft.setAttribute('class', 'media-left');

                const createDivMediaContent = document.createElement('div');
                createDivMediaContent.setAttribute('class', 'media-content');

                const createDivContentColumns = document.createElement('div');
                createDivContentColumns.setAttribute('class', 'content columns');

                // const createFigure = document.createElement('figure');
                // createFigure.setAttribute('class', 'image is-48x48');

                // const createImg = document.createElement('img');
                // createImg.setAttribute('src', thumbnail);

                const createPTitle = document.createElement('p');
                createPTitle.setAttribute('class', 'title is-4');
                createPTitle.textContent = name;

                const createPRank = document.createElement('p');
                createPRank.setAttribute('class', 'column');
                createPRank.textContent = `Rank: ${rankValue++}`;

                const createPYear = document.createElement('p');
                createPYear.setAttribute('class', 'column');
                createPYear.textContent = `Year published: ${yearPublished}`;

                createDivContentColumns.append(createPRank, createPYear);
                createDivMediaContent.append(createPTitle);

                // createDivMediaLeft.append(createFigure);
                createDivMedia.append(createDivMediaLeft, createDivMediaContent);
                createDivCardContent.append(createDivMedia, createDivContentColumns);
                createDivCard.append(createDivCardContent);
                listContainer.append(createDivCard);

            }
        }
        )
};

function renderAggregateList() {
    aggregateList = `https://boardgamegeek.com/xmlapi/geeklist/334409?pagesize=10`;

    fetch(aggregateList)
        .then(function (response) {
            if (response.status !== 200) {

                throw aggregateList;
            } else {
                return response.text();
            };
        })
        .then(function (xmlString) {
            if (!xmlString) {
                console.log('No results found!');
            } else {
                const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');
                console.log(xmlResponse);
                let list = xmlResponse.getElementsByTagName('item');
                listTitle.textContent = "Top Games by Reviewer Ranking:";
                listContainer.innerHTML = '';

                rankValue = 1;
                // Start the loop from the end of the list
                for (let index = list.length - 1; index >= list.length - 10; index--) {
                    let item = list[index];
                    let name = item.getAttribute('objectname');
                    // console.log(name);
                    searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${name}&exact=1`;
                    renderGame(searchUrl);
                }
                // addEventListeners();

                // const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');

                // console.log(xmlResponse);

                // let list = xmlResponse.getElementsByTagName('item');

                // listTitle.textContent = "Top Games by Reviewer Ranking:"
                // listContainer.innerHTML = '';

                // for (let index = 0; index < 10; index++) {
                //     let item = list[index];
                //     let name = item.getAttribute('objectname');

                //     console.log(name);

                //     searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${name}&exact=1`;

                //     renderGame(searchUrl);
            }
        }

            // .catch(function (error) {
            //     console.error(error);
            // })
        )
};

function renderHotList() {

    hotList = `https://boardgamegeek.com/xmlapi2/hot?boardgame&pagesize=10`;

    fetch(hotList)
        .then(function (response) {
            if (response.status !== 200) {

                throw hotList;
            } else {
                return response.text();
            };
        })
        .then(function (xmlString) {
            if (!xmlString) {
                console.log('No results found!');
            } else {
                const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');

                // console.log(xmlResponse);

                let list = xmlResponse.getElementsByTagName('item');

                listTitle.textContent = "Trending Now:"
                listContainer.innerHTML = '';

                for (let index = 0; index < 10; index++) {
                    let item = list[index];
                    // console.log(item);
                    let rank = item.getAttribute('rank');
                    let thumbnail = item.getElementsByTagName('thumbnail')[0].getAttribute('value');
                    let name = item.getElementsByTagName('name')[0].getAttribute('value');
                    let yearPublished = item.getElementsByTagName('yearpublished')[0].getAttribute('value');
                    let id = item.getAttribute('id');

                    const createDivCard = document.createElement('div');
                    createDivCard.setAttribute('class', 'card');
                    createDivCard.setAttribute('id', id);
                    createDivCard.addEventListener('click', () => {
                        location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                    });

                    const createDivCardContent = document.createElement('div');
                    createDivCardContent.setAttribute('class', 'card-content');

                    const createDivMedia = document.createElement('div');
                    createDivMedia.setAttribute('class', 'media');

                    const createDivMediaLeft = document.createElement('div');
                    createDivMediaLeft.setAttribute('class', 'media-left');

                    const createDivMediaContent = document.createElement('div');
                    createDivMediaContent.setAttribute('class', 'media-content');

                    const createDivContentColumns = document.createElement('div');
                    createDivContentColumns.setAttribute('class', 'content columns');

                    const createFigure = document.createElement('figure');
                    createFigure.setAttribute('class', 'image is-48x48');

                    const createImg = document.createElement('img');
                    createImg.setAttribute('src', thumbnail);

                    const createPTitle = document.createElement('p');
                    createPTitle.setAttribute('class', 'title is-4 pl-2');
                    createPTitle.textContent = name;

                    const createPRank = document.createElement('p');
                    createPRank.setAttribute('class', 'column');
                    createPRank.textContent = `Rank: ${rank}`;

                    const createPYear = document.createElement('p');
                    createPYear.setAttribute('class', 'column');
                    createPYear.textContent = `Year published: ${yearPublished}`;

                    createDivContentColumns.append(createPRank, createPYear);
                    createDivMediaContent.append(createPTitle);
                    createFigure.append(createImg);
                    createDivMediaLeft.append(createFigure);
                    createDivMedia.append(createDivMediaLeft, createDivMediaContent);
                    createDivCardContent.append(createDivMedia, createDivContentColumns);
                    createDivCard.append(createDivCardContent);
                    listContainer.append(createDivCard);
                }
                // addEventListeners();
            }
        }
            // .catch(function (error) {
            //     console.error(error);
            // })
        )
};

function renderAllTimeList() {
    allTimeList = `https://boardgamegeek.com/xmlapi/geeklist/256388`;

    fetch(allTimeList)
        .then(function (response) {
            if (response.status !== 200) {

                throw allTimeList;
            } else {
                return response.text();
            };
        })
        .then(function (xmlString) {
            if (!xmlString) {
                console.log('No results found!');
            } else {
                const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');

                console.log(xmlResponse);

                let list = xmlResponse.getElementsByTagName('item');

                listTitle.textContent = "Past and Present #1's:"
                listContainer.innerHTML = '';

                for (let index = 0; index < list.length; index++) {
                    let item = list[index];
                    // console.log(item);
                    let id = item.getAttribute('id');
                    // let imgId = item.getAttribute('imageid');
                    let name = item.getAttribute('objectname');
                    // let thumbnail = `https://boardgamegeek.com/image/${imgId}/${name}`;
                    let summary = item.getElementsByTagName('body')[0].textContent;
                    // let yearPublished = item.getElementsByTagName('body').textContent;

                    const createDivCard = document.createElement('div');
                    createDivCard.setAttribute('class', 'card');
                    createDivCard.setAttribute('id', id);
                    createDivCard.addEventListener('click', () => {
                        location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                    });

                    const createDivCardContent = document.createElement('div');
                    createDivCardContent.setAttribute('class', 'card-content');

                    const createDivMedia = document.createElement('div');
                    createDivMedia.setAttribute('class', 'media');

                    // const createDivMediaLeft = document.createElement('div');
                    // createDivMediaLeft.setAttribute('class', 'media-left');

                    const createDivMediaContent = document.createElement('div');
                    createDivMediaContent.setAttribute('class', 'media-content');

                    const createDivContentColumns = document.createElement('div');
                    createDivContentColumns.setAttribute('class', 'content columns');

                    // const createFigure = document.createElement('figure');
                    // createFigure.setAttribute('class', 'image is-48x48');

                    // const createImg = document.createElement('img');
                    // createImg.setAttribute('src', thumbnail);

                    const createPTitle = document.createElement('p');
                    createPTitle.setAttribute('class', 'title is-4 pl-2');
                    createPTitle.textContent = name;

                    // const createPRank = document.createElement('p');
                    // createPRank.setAttribute('class', 'column');
                    // createPRank.textContent = `Rank: ${rank}`;

                    const createPYear = document.createElement('p');
                    createPYear.setAttribute('class', 'column');
                    createPYear.textContent = `${summary}`;

                    createDivContentColumns.append(createPYear);
                    createDivMediaContent.append(createPTitle);
                    // createFigure.append(createImg);
                    // createDivMediaLeft.append(createFigure);
                    createDivMedia.append(createDivMediaContent);
                    createDivCardContent.append(createDivMedia, createDivContentColumns);
                    createDivCard.append(createDivCardContent);
                    listContainer.append(createDivCard);
                }
                // addEventListeners();
            }
        }
            // .catch(function (error) {
            //     console.error(error);
            // })
        )
};

document.querySelector('#trending').addEventListener('click', () => {
    renderHotList();
});

document.querySelector('#review-rank').addEventListener('click', () => {
    renderAggregateList();
});

document.querySelector('#number1').addEventListener('click', () => {
    renderAllTimeList();
});



// function addEventListeners() {
//     listItems.forEach((item) => {
//         item.addEventListener('click', () => {
//             const id = item.id;
//             console.log(id);
//         })
//     });

// }



// const listItems = document.querySelectorAll('.card');

// listItems.forEach((item) => {
//     item.addEventListener('click', () => {
//         const id = item.id;
//         console.log(id);
//     })
// });