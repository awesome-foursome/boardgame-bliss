// note all api responses for this page are xml not json so the syntax is different
// also note there are 2 different apis used:
// https://boardgamegeek.com/xmlapi/ (old - stable) and
// https://boardgamegeek.com/xmlapi2/ (new - beta), the paramaters and documentation are different for each:
// documentation for 1: https://boardgamegeek.com/wiki/page/BGG_XML_API&redirectedfrom=XML_API#
// documentation for 2: https://boardgamegeek.com/wiki/page/BGG_XML_API2

const listTitle = document.querySelector('#list-title');
const listContainer = document.querySelector('#list-parent');

// possibly used later to add a 4th list
// tutsReviews = `https://boardgamegeek.com/xmlapi/geeklist/23763?pagesize=10`;

// used to assign a rank to appended cards
let rankValue = 1;

// retrieve data and print card based on the title received from aggregate list
// not used for the other 2 lists as they provide data needed that isn't provided by this api
// unfortunately there are no images to retreive for this list
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

                let id = xmlResponse.getElementsByTagName('item')[0].getAttribute('id');
                let name = xmlResponse.getElementsByTagName('name')[0].getAttribute('value');
                let yearPublished = xmlResponse.getElementsByTagName('yearpublished')[0].getAttribute('value');

                const createDivCard = document.createElement('div');
                createDivCard.setAttribute('class', 'card');
                createDivCard.setAttribute('id', id);

                // link to corresponding page on BGG
                const createA = document.createElement('a');
                createA.setAttribute('href', `https://boardgamegeek.com/boardgame/${id}/${name}`);
                // createDivCard.addEventListener('click', () => {
                //     location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                // });

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

                const createPTitle = document.createElement('p');
                createPTitle.setAttribute('class', 'title is-4');
                createPTitle.textContent = name;

                const createPRank = document.createElement('p');
                createPRank.setAttribute('class', 'column');
                // create an artificial rank value as it isn't provided by fetch
                createPRank.textContent = `Rank: ${rankValue++}`;

                const createPYear = document.createElement('p');
                createPYear.setAttribute('class', 'column');
                createPYear.textContent = `Year published: ${yearPublished}`;

                createDivContentColumns.append(createPRank, createPYear);
                createDivMediaContent.append(createPTitle);

                createDivMedia.append(createDivMediaContent);
                createDivCardContent.append(createDivMedia, createDivContentColumns);
                createA.append(createDivCardContent);
                createDivCard.append(createA);
                listContainer.append(createDivCard);
            }
        }
        )
};

// pull the names of the games from the list
// list doesn't provide details on the games so the names are sent to the function above to pull details and render cards
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

                let list = xmlResponse.getElementsByTagName('item');

                // clear container and adjust title
                listTitle.textContent = "Top Games by Reviewer Ranking:";
                listContainer.innerHTML = '';

                rankValue = 1;

                // send off name from each list(item) to render
                for (let index = list.length - 1; index >= list.length - 10; index--) {
                    let item = list[index];
                    let name = item.getAttribute('objectname');
                    searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${name}&exact=1`;
                    renderGame(searchUrl);
                }
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

                let list = xmlResponse.getElementsByTagName('item');

                // reset and adjust content container
                listTitle.textContent = "Trending Now:"
                listContainer.innerHTML = '';

                for (let index = 0; index < 10; index++) {
                    let item = list[index];
                    let rank = item.getAttribute('rank');
                    let thumbnail = item.getElementsByTagName('thumbnail')[0].getAttribute('value');
                    let name = item.getElementsByTagName('name')[0].getAttribute('value');
                    let yearPublished = item.getElementsByTagName('yearpublished')[0].getAttribute('value');
                    let id = item.getAttribute('id');

                    const createDivCard = document.createElement('div');
                    createDivCard.setAttribute('class', 'card');
                    createDivCard.setAttribute('id', id);

                    const createA = document.createElement('a');
                    createA.setAttribute('href', `https://boardgamegeek.com/boardgame/${id}/${name}`);
                    // links to external BGG site
                    // createDivCard.addEventListener('click', () => {
                    //     location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                    // });

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
                    createA.append(createDivCardContent);
                    createDivCard.append(createA);
                    listContainer.append(createDivCard);
                }
            }
        }
            // .catch(function (error) {
            //     console.error(error);
            // })
        )
};

// unfortunately neither of the apis below supply images.
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

                let list = xmlResponse.getElementsByTagName('item');

                listTitle.textContent = "Past and Present #1's:"
                listContainer.innerHTML = '';

                for (let index = 0; index < list.length; index++) {
                    let item = list[index];
                    let name = item.getAttribute('objectname');
                    let summary = item.getElementsByTagName('body')[0].textContent;

                    // retrieve id from second api in order to enable links to BGG
                    searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${name}&exact=1`;

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

                                // name and summary are provided by previous call
                                let id = xmlResponse.getElementsByTagName('item')[0].getAttribute('id');
                                let yearPublished = xmlResponse.getElementsByTagName('yearpublished')[0].getAttribute('value');

                                const createDivCard = document.createElement('div');
                                createDivCard.setAttribute('class', 'card');
                                createDivCard.setAttribute('id', id);

                                // link to external bgg page
                                const createA = document.createElement('a');
                                createA.setAttribute('href', `https://boardgamegeek.com/boardgame/${id}/${name}`);
                                // createDivCard.addEventListener('click', () => {
                                //     location.href = `https://boardgamegeek.com/boardgame/${id}/${name}`
                                // });

                                const createDivCardContent = document.createElement('div');
                                createDivCardContent.setAttribute('class', 'card-content');

                                const createDivMedia = document.createElement('div');
                                createDivMedia.setAttribute('class', 'media');

                                const createDivMediaContent = document.createElement('div');
                                createDivMediaContent.setAttribute('class', 'media-content');

                                const createDivContentColumns = document.createElement('div');
                                createDivContentColumns.setAttribute('class', 'content columns');

                                const createPTitle = document.createElement('p');
                                createPTitle.setAttribute('class', 'title is-4');
                                createPTitle.textContent = `${name} - ${yearPublished}`;

                                const createPSummary = document.createElement('p');
                                createPSummary.setAttribute('class', 'column is-8');
                                createPSummary.textContent = `${summary}`;

                                createDivContentColumns.append(createPSummary);
                                createDivMediaContent.append(createPTitle);
                                createDivMedia.append(createDivMediaContent);
                                createDivCardContent.append(createDivMedia, createDivContentColumns);
                                createA.append(createDivCardContent);
                                createDivCard.append(createA);
                                listContainer.append(createDivCard);
                            }
                        })
                }
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