'use strict';

/**
 * Othello game
 * Author(s): Your Name(s)
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

		// TO DO: COMPLETE THIS METHOD

  	}

	// Returns true if placing the disc of current player at row,col is valid; else returns false
	isValidMove(row, col) {
		return this.isValidMoveForDisc(row, col, this.disc);
	}

	// Returns true if placing the specified disc at row,col is valid; else returns false
	isValidMoveForDisc(row, col, disc) {

		// TO DO: COMPLETE THIS PART OF THE METHOD


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

		// TO DO: COMPLETE THIS PART OF THE METHOD

		
		// DO NOT DELETE - if control reaches this statement, then a valid move is not available
		return false;	// not a valid move
	}

	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {

		// TO DO: COMPLETE THIS PART OF THE METHOD

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

		// TO DO: COMPLETE THIS METHOD
		
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
