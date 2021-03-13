'use strict';

/**
 * Othello game
 * Author(s): Ummayair Ahmad, Kyle Jacobson
 */

class Othello {

	// Constructs and initializes the board of given size
	constructor(size, startPlayer, discColor) {
		// validate arguments
		if (size < 4 || size > 8 || size % 2 !== 0) {
			throw new Error("Invalid value for board size.");
		}
		if (startPlayer < 1 || startPlayer > 2) {
			throw new Error("Invalid value for player number.");
		}
		if (discColor !== Othello.WHITE && discColor !== Othello.BLACK) {
			throw new Error("Invalid value for disc.");
		}

		// set instance variables
		this.size = size;
		this.turn = startPlayer;
		this.disc = discColor;

		// set two more instance variables p1Disc and p2Disc
		if (this.turn === 1) {
			this.p1Disc = this.disc;
			this.p2Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		} else {
			this.p2Disc = this.disc;
			this.p1Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		}

		// create the grid (as array of arrays)
		this.board = new Array(this.size);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.size);
			this.board[i].fill(0);
		}

		// initialize the grid
		this.initializeBoard();
	}

	// Getter for white disc
  	static get WHITE() {
    	return "W";
  	}

  	// Getter for black disc
  	static get BLACK() {
    	return "B";
  	}

  	// Getter for empty
  	static get EMPTY() {
    	return "-";
  	}

  	// Getter for tie
  	static get TIE() {
    	return "T";
  	}

  	// Initializes the board with start configuration of discs (as per project specs)
	initializeBoard() {
		// Iterate through the rows of the board.
		for (let i = 0; i < this.size; i++) {
			// Iterate through the columns of the board.
			for (let j = 0; j < this.size; j++) {
				// Empty spaces will be identified with a hyphen.
				this.board[i][j] = '-';
			}
		}

		// Switch used for initializing different board sizes.
		switch (this.size) {
			// 4x4 initial board layout.
			case 4:
				this.board[1][1] = 'B';
				this.board[2][1] = 'W';
				this.board[1][2] = 'W';
				this.board[2][2] = 'B';
				break;
			// 6x6 initial board layout.
			case 6:
				this.board[2][2] = 'B';
				this.board[3][2] = 'W';
				this.board[2][3] = 'W';
				this.board[3][3] = 'B';
				break;
			// 8x8 initial board layout.
			case 8:
				this.board[3][3] = 'B';
				this.board[4][3] = 'W';
				this.board[3][4] = 'W';
				this.board[4][4] = 'B';
				break;
		}
  	}

	// Returns true if placing the disc of current player at row,col is valid; else returns false
	isValidMove(row, col) {
		return this.isValidMoveForDisc(row, col, this.disc);
	}

    // Returns true if placing the specified disc at row,col is valid; else returns false
    isValidMoveForDisc(row, col, disc) {
		// Represents the opponent's disc color regarding the current player.
		this.disc = this.prepareNextTurn(this.disc);

		// If the current move is out of range on the board, return false.
		if (row > this.size || col > this.size || row < 0 || col < 0) {
			return false;
		}

		// If the current space is occupied by a disc, return false.
		if (this.board[row][col] !== '-') {
			return false;
		}

		// Checks if adjacent space is occupied by opponent.
		if (this.board[row][col - 1] === this.disc) {
			// Iterates through the left spaces.
			for (let i = col - 2; i >= 0; i--) {
				// If the space is empty, break from the process.
				if (this.board[row][i] === '-') {
					break;
				}

				// If space contains disc, move is valid.
				else if (this.board[row][i] === disc) {
					return true;
				}
			}
		}

		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row + 1][col] === this.disc) {
		// 	// Iterates through the down spaces.
		// 	for (let i = row + 2; i <= this.size; i++) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][col] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][col] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }

		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row][col + 1] === this.disc) {
		// 	// Iterates through the right spaces.
		// 	for (let i = col + 2; i < this.size; i++) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[row][i] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[row][i] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		//
		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row - 1][col] === this.disc) {
		// 	// Iterates through the up spaces.
		// 	for (let i = row - 2; i >= 0; i--) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][col] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][col] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		//
		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row - 1][col + 1] === this.disc) {
		// 	// Iterates through the up-right spaces.
		// 	for (let i = row - 2, j = col - 2; i >= 0 && j >= 0; i--, j--) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][j] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][j] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		//
		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row + 1][col - 1] === this.disc) {
		// 	// Iterates through the down-left spaces.
		// 	for (let i = row + 2, j = col - 2; i <= this.size && j >= 0; i++, j--) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][j] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][j] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		//
		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row - 1][col + 1] === this.disc) {
		// 	// Iterates through the up-right spaces.
		// 	for (let i = row - 2, j = col + 2; i >= 0 && j <= this.size; i--, j++) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][j] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][j] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		//
		// // Checks if adjacent space is occupied by opponent.
		// if (this.board[row + 1][col + 1] === this.disc) {
		// 	// Iterates through the down-right spaces.
		// 	for (let i = row + 2, j = col + 2; i <= this.size && j <= this.size; i++, j++) {
		// 		// If the space is empty, break from the process.
		// 		if (this.board[i][j] === '-') {
		// 			break;
		// 		}
		//
		// 		// If space contains disc, move is valid.
		// 		else if (this.board[i][j] === disc) {
		// 			return true;
		// 		}
		// 	}
		// }
		
        // DO NOT DELETE - if control reaches this statement, then it is not a valid move
        return false;	// not a valid move
    }

	// Places the disc of current player at row,col and flips the opponent discs as needed
	placeDiscAt(row, col) {
		if (!this.isValidMove(row, col)) {
			return;
		}

		// place the current player's disc at row,col
		this.board[row][col] = this.disc;


		// TO DO: COMPLETE THIS PART OF THE METHOD


		// DO NOT DELETE - prepares for next turn if game is not over
		if (!this.isGameOver()) {
			this.prepareNextTurn();
		}
	}

	// Sets turn and disc information for next player
	prepareNextTurn() {
		if (this.turn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1;
		}
		if (this.disc === Othello.WHITE) {
			this.disc = Othello.BLACK;
		} else {
			this.disc = Othello.WHITE;
		}
	}

	// Returns true if a valid move for current player is available; else returns false
	isValidMoveAvailable() {
		return this.isValidMoveAvailableForDisc(this.disc);
	}

	// Returns true if a valid move for the specified disc is available; else returns false
	isValidMoveAvailableForDisc(disc) {
		// Iterate through the rows of the board.
		for (let i = 0; i < this.size; i++) {
			// Iterate through the columns of the board.
			for (let j = 0; j < this.size; j++) {
				// Checks if space is currently empty.
				if (this.board[i][j] === '-') {
					// If the move is valid, return true.
					if (this.isValidMove(i, j, disc)) {
						return true;
					}
				}
			}
		}

		// DO NOT DELETE - if control reaches this statement, then a valid move is not available
		return false;	// not a valid move
	}

	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {
		// Iterate through the rows of the board.
		for (let i = 0; i < this.size; i++) {
			// Iterate through the columns of the board.
			for (let j = 0; j < this.size; j++) {
				// If the board has empty spaces, return false.
				if (this.board[i][j] === '-') {
					return false;
				}
			}
		}
		// If the board is full, return true.
		return true;
	}

	// Returns true if either the board is full or a valid move is not available for either disc
	isGameOver() {
		return this.isBoardFull() ||
					(!this.isValidMoveAvailableForDisc(Othello.WHITE) &&
								!this.isValidMoveAvailableForDisc(Othello.BLACK));
	}

	// If there is a winner, it returns Othello.WHITE or Othello.BLACK.
	// In case of a tie, it returns Othello.TIE
	checkWinner() {
		// Counts the amount of points allocated to each player.
		let whitePoints = 0;
		let blackPoints = 0;

		// If the game is not over, return 0.
		if (!this.isGameOver(this.size, this.board)) {
			return 0;
		}

		// Iterate through the rows of the board.
		for (let i = 0; i < this.size; i++) {
			// Iterate through the columns of the board.
			for (let j = 0; j < this.size; j++) {
				// If the space contains a white disc, add one point.
				if (this.board[i][j] === 'W') {
					whitePoints++;
				}

				// If the space contains a black disc, add one point.
				else if (this.board[i][j] === 'B') {
					blackPoints++;
				}
			}
		}

		// If player "White" has more points than player "Black", return "White" as winner.
		if (whitePoints > blackPoints) {
			return 'W';
		}

		// If player "Black" has more points than player "White", return "Black" as winner.
		else if (whitePoints < blackPoints) {
			return 'B';
		}

		// Otherwise, declare a tie.
		return 'T';
	}

	// Returns a string representation of the board (for display purposes)
	toString() {
		let str = '\n ';
		for (let i = 0; i < this.size; i++) {
			str += ' ' + (i+1)
		}
		str += "\n";
		for (let i = 0; i < this.size; i++) {
			str += i+1 + ' ';
			str += this.board[i].join(' ') + "\n";
		}
		return str;
	}
}

module.exports = Othello;
