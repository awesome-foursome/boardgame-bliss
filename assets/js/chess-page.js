const chessForm = $('#chess-form');
const submitBtn = $('#submit-btn');
const usernameInput = $('#username-input');
const depthInput = $('#depth-input');
const resultsContainer = $('#results-container');

// function to print error card 
const printErrorCard = function (error, game) {

	// create game title
	const gameWhite = game.white.replace('https://api.chess.com/pub/player/', '');
	const gameBlack = game.black.replace('https://api.chess.com/pub/player/', '');

	const gameTitle = `${gameWhite} vs ${gameBlack}`;
	const gameUrl = game.url;

	// debug log
	console.log('gameTitle:', gameTitle);

	// log error to conmsole
	console.log(error);

	// create card elements
	const cardEl = $('<div>').addClass('card');
	const cardTitleEl = $('<h4>').text(gameTitle);
	const cardBodyEl = $('<div>').addClass('card-body');
	const cardUrlEl = $('<a>').attr('href', gameUrl).text(gameUrl);
	const errorMsgEl = $('<p>').text('Failed to retrieve best move data :(');

	// construct card
	cardBodyEl.append(cardUrlEl, errorMsgEl);
	cardEl.append(cardTitleEl, cardBodyEl);

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
	const cardTitleEl = $('<h4>').text(gameTitle);
	const cardBodyEl = $('<div>').addClass('card-body');
	const cardUrlEl = $('<a>').attr('href', gameUrl).text(gameUrl);
	const bestMoveEl = $('<p>').text(bestMove);
	const continuationEl = $('<p>').text(`Continuation: ${continuation}`);
	const evaluationEl = $('<p>').text(`Evaluation: ${evaluation}`);
	const mateEl = $('<p>').text(`Mate: ${mate}`);

	// construct card
	cardBodyEl.append(cardUrlEl, bestMoveEl, continuationEl, evaluationEl, mateEl);
	cardEl.append(cardTitleEl, cardBodyEl);

	// append card to results-container
	resultsContainer.prepend(cardEl);

};

// function for form submit
const getBestMove = function (event) {

	// prevent default form behaviour
	event.preventDefault();

	// empty result-container before printing fresh results
	// resultsContainer.empty();

	// pull username and depth from form
	const username = usernameInput.val();
	const depth = depthInput.val();

	// debug log
	console.log('username:', username);
	console.log('depth:', depth);

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
				const timoutId = setTimeout(() => abortController.abort(), 10000);

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
					}).catch(error => printErrorCard(error, game));
			}
		});

	// clear form inputs
	chessForm[0].reset();
};

// event handler for submit button
submitBtn.on('click', getBestMove);