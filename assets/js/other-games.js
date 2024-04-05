// let game =
// let weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

// const createH3 = document.createElement('h3');
// const createImg = document.createElement('img');
// createImg.src = weatherIconUrl;
// const createPTemp = document.createElement('p');
// const createPWind = document.createElement('p');
// const createPHumidity = document.createElement('p');

// createH3.textContent = `${currentWeather.name} (${dateNow.format('DD/MM/YYYY')})`;
// createPTemp.textContent = `Temp: ${currentWeather.main.temp} °C`
// createPWind.textContent = `Wind: ${currentWeather.wind.speed} km/h`
// createPHumidity.textContent = `Humidity: ${currentWeather.main.humidity} %`

// // remove previous contents to stop duplicating
// document.querySelector('#current').innerHTML = '';

// createH3.append(createImg);
// document.querySelector('#current').append(createH3, createPTemp, createPWind, createPHumidity);


function renderDisplayedLocation() {

    xmlUrl = `https://boardgamegeek.com/xmlapi2/hot?boardgame&pagesize=10`

    fetch(xmlUrl)
        .then(function (response) {
            if (response.status !== 200) {

                throw xmlUrl;
            } else {
                // console.log(response);
                return response.text();
            };
        })
        .then(function (xmlString) {
            if (!xmlString) {
                console.log('No results found!');
            } else {
                // console.log(xmlString);
                const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');
                console.log(xmlResponse);
                let list = xmlResponse.getElementsByTagName('item');

                console.log(list);
                for (let index = 0; index < 10; index++) {
                    let item = list[index];
                    let thumbnail = item.getElementsByTagName('thumbnail')[0].getAttribute('value');
                    let name = item.getElementsByTagName('name')[0].getAttribute('value');
                    let yearPublished = item.getElementsByTagName('yearpublished')[0].getAttribute('value');

                    console.log(thumbnail);
                    console.log(name);
                    console.log(yearPublished);
                    // renderList(xmlResponse);

                }
            }
        }
            // .catch(function (error) {
            //     console.error(error);
            // })
        )
};

// function renderList(xmlString) {
//     const xmlResponse = new DOMParser().parseFromString(xmlString, 'text/xml');
//     let itemList = xmlResponse.getElementsByTagName('item');

//     for (let index = 0; index < itemList.length; index++) {
//         let item = itemList[index];
//         let thumbnail = item.getElementsByTagName('thumbnail')[0].textContent;
//         let name = item.getElementsByTagName('name')[0].textContent;
//         let yearPublished = item.getElementsByTagName('yearpublished')[0].getAttribute('value');

//         console.log(thumbnail);
//         console.log(name);
//         console.log(yearPublished);
//     }
// }

// function renderList() {
//     let list = xmlResponse.getElementsByTagName('item');

//     console.log(list);
//     for (let index = 0; index < list.length; index++) {
//         let item = list[index];
//         let thumbnail = item.getElementsByTagName('thumbnail')[0].getAttribute('value');
//         let name = item.getElementsByTagName('name')[0].getAttribute('value');
//         let yearPublished = item.getElementsByTagName('yearpublished')[0].getAttribute('value');

//         console.log(thumbnail);
//         console.log(name);
//         console.log(yearPublished);

//     }
// }

renderDisplayedLocation();


// // key for weather api
// var key = "c4cf4b862a7cbf3d8ab3425135711b32";

// // render previously searched locations in local storage as link buttons
// function renderSavedLocations() {
//     let locations = JSON.parse(localStorage.getItem('savedLocations'));

//     const pastSearches = document.querySelector('#pastsearches');

//     // empty container to stop results duplicating
//     pastSearches.innerHTML = '';

//     for (let index = 0; index < locations.length; index++) {
//         const createLocationButton = document.createElement('button');
//         pastSearches.append(createLocationButton);
//         createLocationButton.textContent = locations[index];
//     }
// };

// // render both the current weather conditions and 5 day forecast for previously interacted item
// function renderDisplayedLocation() {
//     let location = JSON.parse(localStorage.getItem('displayedLocation'));
//     let dateNow = dayjs();

//     // url for current conditions
//     currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`
//     // url for 5 day forecast
//     forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}&units=metric`

//     // render current conditions
//     fetch(currentWeatherUrl)
//         .then(function (response) {
//             if (response.status !== 200) {
//                 // maybe not the optimal command here response should be ok though as it wouldn't get to here without
//                 //  first being checked when first added with the query selector
//                 throw currentWeatherUrl;
//             } else {
//                 return response.json();
//             };
//         })
//         .then(function (currentWeather) {
//             if (!currentWeather) {
//                 console.log('No results found!');
//             } else {
//                 let weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

//                 const createH3 = document.createElement('h3');
//                 const createImg = document.createElement('img');
//                 createImg.src = weatherIconUrl;
//                 const createPTemp = document.createElement('p');
//                 const createPWind = document.createElement('p');
//                 const createPHumidity = document.createElement('p');

//                 createH3.textContent = `${currentWeather.name} (${dateNow.format('DD/MM/YYYY')})`;
//                 createPTemp.textContent = `Temp: ${currentWeather.main.temp} °C`
//                 createPWind.textContent = `Wind: ${currentWeather.wind.speed} km/h`
//                 createPHumidity.textContent = `Humidity: ${currentWeather.main.humidity} %`

//                 // remove previous contents to stop duplicating
//                 document.querySelector('#current').innerHTML = '';

//                 createH3.append(createImg);
//                 document.querySelector('#current').append(createH3, createPTemp, createPWind, createPHumidity);
//             }
//         })
//         .catch(function (error) {
//             console.error(error);
//         });

//     // render 5 day forecast
//     fetch(forecastWeatherUrl)
//         .then(function (response) {
//             if (response.status !== 200) {
//                 // again maybe not the optimal command here response should be ok though as it wouldn't get to here without
//                 //  first being checked when first added with the query selector
//                 throw forecastWeatherUrl;
//             } else {
//                 return response.json();
//             };
//         })
//         .then(function (forecastWeather) {
//             if (!forecastWeather) {
//                 console.log('No results found!');
//             } else {
//                 // remove previous contents to stop duplicating
//                 document.querySelector('#forecast').innerHTML = '';

//                 for (let index = 0; index < 5; index++) {
//                     const forecast = (forecastWeather.list)[index];

//                     let weatherIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

//                     const createAside = document.createElement('aside');
//                     const createImg = document.createElement('img');
//                     createImg.src = weatherIconUrl;
//                     const createH5 = document.createElement('h5');
//                     const createPTemp = document.createElement('p');
//                     const createPWind = document.createElement('p');
//                     const createPHumidity = document.createElement('p');

//                     createAside.append(createH5, createImg, createPTemp, createPWind, createPHumidity);
//                     document.querySelector('#forecast').append(createAside);

//                     // should probably set the time of day for forecasts for something specific like midday to get daytime results
//                     //  but I figure this is way overboard what is required for this task
//                     createH5.textContent = `${dateNow.add([index + 1], 'day').format('DD/MM/YYYY')}`;
//                     createPTemp.textContent = `Temp: ${forecast.main.temp} °C`
//                     createPWind.textContent = `Wind: ${forecast.wind.speed} km/h`
//                     createPHumidity.textContent = `Humidity: ${forecast.main.humidity} %`
//                 }
//             }
//         })
//         .catch(function (error) {
//             console.error(error);
//         });
// };

// // add form location to local storage and then run other functions
// document.querySelector('#form').addEventListener('submit', function (inputLocation) {
//     inputLocation.preventDefault();

//     const location = document.querySelector('#location').value;
//     let locations = JSON.parse(localStorage.getItem('savedLocations'));

//     if (!locations) {
//         locations = [
//         ];
//     };

//     // Challenge description says:
//     // **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name.
//     // Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?
//     // I had no issues getting it to work without doing this so I didn't see the point but if I had to I'd do something along the lines of:
//     // pulling the latitude and longitude from the city fetch response and save the results as a variable which i'd then use to get a
//     // new latitude and longitude search url to save that item to local storage

//     currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`

//     fetch(currentWeatherUrl)
//         .then(function (response) {
//             if (response.status !== 200) {
//                 alert('Please Enter Valid Location');
//                 // and again maybe not the optimal command here response should be ok though as it wouldn't get to here without
//                 // first being checked when first added with the query selector, this is the instance that matters most
//                 // as it's response is used for future fetchs
//                 throw currentWeatherUrl;
//             } else {
//                 return response.json();
//             };
//         })
//         .then(function (currentWeather) {
//             if (!currentWeather) {
//                 console.log('No results found!');
//             } else {
//                 locations.push(currentWeather.name);

//                 localStorage.setItem('displayedLocation', JSON.stringify(currentWeather.name));
//                 localStorage.setItem('savedLocations', JSON.stringify(locations));

//                 // empty the form input
//                 document.querySelector('#location').value = '';

//                 renderDisplayedLocation();
//                 renderSavedLocations();
//             }
//         })
//         .catch(function (error) {
//             console.error(error);
//         });
// });

// // render the city selected from saved buttons selected
// document.querySelector('#pastsearches').addEventListener('click', function (event) {
//     localStorage.setItem('displayedLocation', JSON.stringify(event.target.textContent));

//     renderDisplayedLocation();
// });

// // render most recently displayed location on page load
// if (JSON.parse(localStorage.getItem('displayedLocation'))) {
//     renderDisplayedLocation();
//     renderSavedLocations();
// };