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

    // Checks if a cell is outside the range of the boards playing field
    checkBounds(row, col) {
        return (row >= 0 && row < this.size) && (col >= 0 && col < this.size);
    }

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
        // Variables to help with iterating through grid successfully.
        let rows = row;
        let cols = col;

        // Iterates through the nearby positions.
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Increment the row and column by i and j, respectively.
                row = rows + i;
                col = cols + j;

                // If the grid is inbounds, continue the code.
                if (!this.checkBounds(row, col)) {
                    continue;
                }

                // If the board is on the game piece, or a empty spot, continue the code.
                if (this.board[row][col] === disc || this.board[row][col] === "-") {
                    continue;
                }

                // Iterate through positions on grid until the code is out of bounds.
                while (this.checkBounds(row, col)) {
                    // If the current position is empty, break from the code.
                    if (this.board[row][col] === "-") {
                        break;
                    }

                    // If the current position is the disc, return true.
                    if (this.board[row][col] === disc) {
                        return true;
                    }

                    // Increment the row and column by i and j, respectively.
                    row += i;
                    col += j;
                }
            }
        }

        // DO NOT DELETE - if control reaches this statement, then it is not a valid move
        return false;	// not a valid move
    }

    // Places the disc of current player at row,col and flips the opponent discs as needed
    placeDiscAt(row, col) {
        let opponentDisc = this.prepareNextTurn()

        // Place the current player's disc at row,col.
        this.board[row][col] = this.disc;

        // If move is valid, run through board game process.
        if (this.isValidMove(row, col, this.disc)) {
            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row, col - 1)) {
                // Checks if adjacent space is occupied by opponent.
                if (this.board[row][col - 1] === opponentDisc) {
                    // Iterates through the left spaces.
                    for (let i = col - 2; i >= 0; i--) {
                        // When an empty space is encountered, break from process.
                        if (this.board[row][i] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[row][i] === this.disc) {
                            for (let j = col - 1; j >= i; j--) {
                                this.board[row][j] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row + 1, col)) {
                // Reassign right spaces to current player when appropriate.
                if (this.board[row + 1][col] === opponentDisc) {
                    // Iterates through the down spaces.
                    for (let i = row + 2; i <= this.size; i++) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][col] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][col] === this.disc) {
                            for (let j = row + 1; j <= i; j++) {
                                this.board[j][col] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row, col + 1)) {
                // Reassign down spaces to current player when appropriate.
                if (this.board[row][col + 1] === opponentDisc) {
                    // Iterates through the right spaces.
                    for (let i = col + 2; i <= this.size; i++) {
                        // When an empty space is encountered, break from process.
                        if (this.board[row][i] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[row][i] === this.disc) {
                            for (let j = col + 1; j <= i; j++) {
                                this.board[row][j] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row - 1, col)) {
                // Reassign left spaces to current player when appropriate.
                if (this.board[row - 1][col] === opponentDisc) {
                    // Iterates through the up spaces.
                    for (let i = row - 2; i >= 0; i--) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][col] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][col] === this.disc) {
                            for (let j = row - 1; j >= i; j--) {
                                this.board[j][col] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row - 1, col + 1)) {
                // Reassign up-left spaces to current player when appropriate.
                if (this.board[row - 1][col + 1] === opponentDisc) {
                    // Iterates through the up-right spaces.
                    for (let i = row - 2, j = col - 2; i >= 0 && j >= 0; i--, j--) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][j] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][j] === this.disc) {
                            for (let k = row - 1, l = col - 1; k >= i && l >= j; k--, l--) {
                                this.board[k][l] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row + 1, col - 1)) {
                // Reassign up-right spaces to current player when appropriate.
                if (this.board[row + 1][col - 1] === opponentDisc) {
                    // Iterates through the down-left spaces.
                    for (let i = row + 2, j = col - 2; i <= this.size && j >= 0; i++, j--) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][j] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][j] === this.disc) {
                            for (let k = row + 1, l = col - 1; k <= i && l >= j; k++, l--) {
                                this.board[k][l] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row - 1, col + 1)) {
                // Reassign down-left spaces to current player when appropriate.
                if (this.board[row - 1][col + 1] === opponentDisc) {
                    // Iterates through the up-left spaces.
                    for (let i = row - 2, j = col + 2; i >= 0 && j <= this.size; i--, j++) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][j] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][j] === this.disc) {
                            for (let k = row - 1, l = col + 1; k >= i && l <= j; k--, l++) {
                                this.board[k][l] = this.disc;
                            }
                        }
                    }
                }
            }

            // Checks if the directional iteration is within bounds.
            if (this.checkBounds(row + 1, col - 1)) {
                // Reassign down-right spaces to current player when appropriate.
                if (this.board[row + 1][col - 1] === opponentDisc) {
                    // Iterates through the down-right spaces.
                    for (let i = row + 2, j = col + 2; i <= this.size && j <= this.size; i++, j++) {
                        // When an empty space is encountered, break from process.
                        if (this.board[i][j] === '-') {
                            break;
                        }

                        // Add current player's disc on board when appropriate.
                        else if (this.board[i][j] === this.disc) {
                            for (let k = row + 1, l = col + 1; k >= i && l >= j; k++, l++) {
                                this.board[k][l] = this.disc;
                            }
                        }
                    }
                }
            }
        }

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
            str += ' ' + (i + 1)
        }
        str += "\n";
        for (let i = 0; i < this.size; i++) {
            str += i + 1 + ' ';
            str += this.board[i].join(' ') + "\n";
        }
        return str;
    }
}

module
    .exports = Othello;
