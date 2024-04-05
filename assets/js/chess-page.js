const requestContainer = $('#request-container');
const requestBtn = $('#request-btn');
const historyContainer = $('#history-container');
const formContainer = $('#form-container');
const chessForm = $('#chess-form');
const submitBtn = $('#submit-btn');
const usernameInput = $('#username-input');
const depthInput = $('#depth-input');
const resultsContainer = $('#results-container');
const disclaimerCheckbox = $('#disclaimer-checkbox');
const modal = $('.modal');
const modalBg = $('.modal-background');

// function to add new item to search history
const handleHistory = function (username, depth) {

	// retrieve existing history from local storage
	let history = JSON.parse(localStorage.getItem('history'));

	// if no history exists assign empty array
	if (!history) {
		history = [];
	}

	// create new history object from provided data
	const newHistoryObject = {
		username: username,
		depth: depth,
	}

	// loop through existing history to check for identical searches
	for (const searchObj of history) {
		const searchObjUsername = searchObj.username;
		const searchObjDepth = searchObj.depth;

		if (searchObjUsername === username && searchObjDepth === depth) {
			return;
		}
	}

	// add new object to history array
	history.push(newHistoryObject);

	// store updated history array
	localStorage.setItem('history', JSON.stringify(history));

};

// function to print history buttons
const printHistory = function () {

	// empty existing history buttons
	historyContainer.empty();

	// retrieve existing history 
	let history = JSON.parse(localStorage.getItem('history'));

	// if no hsitory exist stop function
	if (!history) {
		return;
	}

	// loop through history elements and print buttons to historyConatiner
	for (const searchObj of history) {
		const historyBtn = $('<button>')
			.addClass('button is-warning history-btn mx-1 my-1')
			.text(`${searchObj.username} | ${searchObj.depth}`)
			.attr('data-username', searchObj.username)
			.attr('data-depth', searchObj.depth);
		historyContainer.append(historyBtn);
	}
};

// function to print error card
const printErrorCard = function (error, game) {

	// create game title
	const gameWhite = game.white.replace('https://api.chess.com/pub/player/', '');
	const gameBlack = game.black.replace('https://api.chess.com/pub/player/', '');

	const gameTitle = `${gameWhite} vs ${gameBlack}`;
	const gameUrl = game.url;

	// debug log
	console.log('gameTitle:', gameTitle);

	// log error to console
	console.log(error);

	// create card elements
	const cardEl = $('<div>').addClass('card');
	const cardHeaderEl = $('<div>').addClass('card-header');
	const cardTitleEl = $('<h4>').addClass('card-header-title').text(gameTitle);
	const cardBodyEl = $('<div>').addClass('card-body px-4 py-4');
	const cardUrlEl = $('<a>').attr('href', gameUrl).text(gameUrl);
	const errorMsgEl = $('<p>').text('Failed to retrieve best move data :(');

	// construct card
	cardHeaderEl.append(cardTitleEl);
	cardBodyEl.append(cardUrlEl, errorMsgEl);
	cardEl.append(cardHeaderEl, cardBodyEl);

	// append card to results-container
	resultsContainer.prepend(cardEl);
};

// function to print best moves to results-container (below gameTitle and gameUrl)
const printBestMoves = function (data, game) {

	// create game title
	const gameWhite = game.white.replace('https://api.chess.com/pub/player/', '');
	const gameBlack = game.black.replace('https://api.chess.com/pub/player/', '');

	const gameTitle = `${gameWhite} vs ${gameBlack}`;
	const gameUrl = game.url;

	// debug log
	console.log('gameTitle:', gameTitle);

	// pull relevent information from 'data'
	const bestMove = data.bestmove.replace('bestmove', 'Best Move:');
	const continuation = data.continuation;
	const evaluation = data.evaluation;
	const mate = data.mate;

	// create card elements
	const cardEl = $('<div>').addClass('card');
	const cardHeaderEl = $('<div>').addClass('card-header');
	const cardTitleEl = $('<h4>').addClass('card-header-title').text(gameTitle);
	const cardBodyEl = $('<div>').addClass('card-body px-4 py-4');
	const cardUrlEl = $('<a>').attr('href', gameUrl).text(gameUrl);
	const bestMoveEl = $('<p>').text(bestMove);
	const continuationEl = $('<p>').text(`Continuation: ${continuation}`);
	const evaluationEl = $('<p>').text(`Evaluation: ${evaluation}`);
	const mateEl = $('<p>').text(`Mate: ${mate}`);

	// construct card
	cardHeaderEl.append(cardTitleEl);
	cardBodyEl.append(cardUrlEl, bestMoveEl, continuationEl, evaluationEl, mateEl);
	cardEl.append(cardHeaderEl, cardBodyEl);

	// append card to results-container
	resultsContainer.prepend(cardEl);

};

// function for form submit
const getBestMove = function (username, depth) {

	// set up request URL with username
	const requestGameStateUrl = `https://api.chess.com/pub/player/${username}/games`

	// debug log
	console.log('requestGameStateUrl:', requestGameStateUrl);

	// async fetch function for current game states
	const fetchCurrentGames = async function () {
		const response = await fetch(requestGameStateUrl);
		const data = await response.json();

		return data;
	};

	// execute async fetch function
	fetchCurrentGames()
		.then((data) => {
			// debug log
			console.log(data)

			// throw error and end function if there are no games or username is invalid
			if (!data.games) {
				throw new Error(`${username} is not a valid Chess.com username`);

			} else if (data.games.length === 0) {
				throw new Error(`${username} has no ongoing Daily Games`);
			}

			// add new search to localStorage
			handleHistory(username, depth);

			// print updated history buttons
			printHistory();

			// loop through resultant games and pull FEN
			for (const game of data.games) {
				// debug log
				console.log(game.fen);

				// encode FEN for URL
				const encodedFen = encodeURI(game.fen);

				// set up request URL for best move 
				const requestBestMoveUrl = `https://stockfish.online/api/s/v2.php?fen=${encodedFen}&depth=${depth}`;

				// create abort controller for timeout
				const abortController = new AbortController();
				setTimeout(() => abortController.abort(), 10000);

				// async fetch funtion for best move
				const fetchBestMove = async function () {
					const response = await fetch(requestBestMoveUrl, { signal: abortController.signal });
					console.log(response);
					const data = await response.json();

					return data;
				};

				// execute async fetch function
				fetchBestMove()
					.then((data) => {
						// debug log
						console.log(data);

						// print best move data to results container  
						printBestMoves(data, game);

						// remove loading graphic from submit button
						submitBtn.removeClass('is-loading');

						// hide modal once results have been printed
						modal.removeClass('is-active');

					}).catch(error => {
						printErrorCard(error, game);

						// remove loading graphic from submit button
						submitBtn.removeClass('is-loading');

						// hide modal once results have been printed
						modal.removeClass('is-active');

					});
			}
		}).catch(error => {

			// debug log
			console.log(error.message);

			// alert to inform user of error
			window.alert(error.message);

			// remove loading graphic from submit button
			submitBtn.removeClass('is-loading');

			// hide modal once results have been printed
			modal.removeClass('is-active');
		});
};

// function to handle form submit
const handleFormSubmit = function (event) {

	// prevent default form behaviour
	event.preventDefault();

	// form validation
	if (usernameInput.val() === '') {
		usernameInput.attr('placeholder', 'Please input a username');
		return;
	}

	// reset placeholder for usernameInput to default
	usernameInput.attr('placeholder', 'Enter Chess.com username..');

	// loading graphic for submit button
	submitBtn.addClass('is-loading');

	// pull username and depth from form
	const username = usernameInput.val();
	const depth = depthInput.val();

	// debug log
	console.log('username:', username);
	console.log('depth:', depth);

	// get best moves
	getBestMove(username, depth);

	// clear form inputs
	chessForm[0].reset();
};

// prepare history request data for getBestMove parameters
const getHistoryRequest = function (event) {

	// prevent default form behaviour
	event.preventDefault();

	// retrieve username and depth from button element data-attributes
	const username = event.target.dataset.username;
	const depth = event.target.dataset.depth;

	// debug log
	console.log('history username:', username);
	console.log('history depth:', depth);

	getBestMove(username, depth);

};

// EVENT HANDLERS
// event handler for submit button
submitBtn.on('click', handleFormSubmit);

// event handler for disclaimer checkbox
disclaimerCheckbox.on('change', () => {
	if (disclaimerCheckbox.prop('checked')) {
		requestContainer.removeClass('is-hidden');
	} else {
		requestContainer.addClass('is-hidden');
	}
});

// modal event handlers
requestBtn.on('click', () => {
	modal.addClass('is-active');
});

modalBg.on('click', () => {
	modal.removeClass('is-active');
});

// event handler for printing history on page load
$(document).ready(printHistory);

// event handler for history buttons
historyContainer.on('click', '.history-btn', getHistoryRequest);