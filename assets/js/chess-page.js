const chessForm = $('#chess-form');
const submitBtn = $('#submit-btn');
const usernameInput = $('#username-input');
const depthInput = $('#depth-input');
const resultsContainer = $('#results-container');

// function to print best moves to results-container
const printBestMoves = function () {};

// function for form submit
const getBestMove = function (event) {

	// prevent default form behaviour
	event.preventDefault();

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

				// create game title
				const gameWhite = game.white.replace('https://api.chess.com/pub/player/', '');
				const gameBlack = game.black.replace('https://api.chess.com/pub/player/', '');
				const gameUrl = game.url;

				const gameTitle = `${gameWhite} vs ${gameBlack}`;

				// debug log
				console.log('gameTitle:', gameTitle);

				// create heading element for game
				resultsContainer.append($('<h3>').text(gameTitle));
				// append gameUrl link beneath gameTitle
				resultsContainer.append($('<a>').attr('href', gameUrl).text(gameUrl));
				
				// encode FEN for URL
				const encodedFen = encodeURI(game.fen);
				
				// set up request URL for best move
				const requestBestMoveUrl = `https://stockfish.online/api/s/v2.php?fen=${encodedFen}&depth=${depth}`;
				
				// async fetch funtion for best move
				const fetchBestMove = async function () {
					const response = await fetch(requestBestMoveUrl);
					const data = await response.json();

					return data;
				};

				// execute async fetch function
				fetchBestMove()
					.then((data) => {
						// debug log
						console.log(data);
					})
			}
		});

};

// event handler for submit button
submitBtn.on('click', getBestMove);