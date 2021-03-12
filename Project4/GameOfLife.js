'use strict';

/**
 *  Game of Life
 *  Author(s): Ummayair Ahmad, Kyle Jacobson
 */

/*
 * The "fs" module provides an API for interacting with the file system
 */
const fs = require('fs');

// Class that represents Game of Life
class GameOfLife {

    // Constructor that sets up instance variables with default values
    constructor() {
        this.grid = [];
        this.rows = 0;
        this.cols = 0;
    }

    // Reads data from the file, instantiates the grid, and loads the
    // grid with data from file. Sets this.grid, this.rows, and
    // this.cols instance variables for later use.
    loadGrid(file) {
        // Read the file into the data variable.
        let data = fs.readFileSync(file, 'utf8');

        // Split data using whitespace delimiter.
        let tokens = data.split(' ');

        // Get number of rows from the line read.
        this.rows = parseInt(tokens.shift());

        // Get number of cols from the line read.
        this.cols = parseInt(tokens.shift());

        // Create empty two-dimensional array for grid.
        this.grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
            this.grid[i].fill(0);
        }

        // Assign values from file to the grid.
        for (let temp = 0; temp < this.rows; temp++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[temp][j] = parseInt(tokens.shift()[0]);
            }
        }

        // Return the grid to the user.
        return this.grid;
    }

    // Saves the current grid values to the file specified.
    saveGrid(file) {
        let data = this.rows + ' ' + this.cols;

        // Iterates through the rows of the grid
        for (let temp = 0; temp < this.rows; temp++) {
            // Iterates through the columns of the grid.
            for (let j = 0; j < this.cols; j++) {
                // Take the current value on the grid and transfer it to the data.
                data = data + " " + this.grid[temp][j];
            }
        }
        // Write the data into a file.
        data += '\n';
        fs.writeFileSync(file, data);
    }

    // Mutates the grid to next generation
    mutate() {
        // Create a copy of the grid and fill it with zeros.
        let temp = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            temp[i] = new Array(this.cols);
            temp[i].fill(0);
        }

        // Iterates through the rows of the grid.
        for (let x = 0; x < this.rows; x++) {
            // Iterates through the columns of the grid.
            for (let y = 0; y < this.cols; y++) {
                // Obtain the number of neighbors that exist around a current cell.
                let neighbors = this.getNeighbors(x, y);

                // If the cell is currently live.
                if (this.grid[x][y] === 1) {
                    // A live cell with less than two live neighbors or more than three neighbors dies.
                    if (neighbors < 2 || neighbors > 3) {
                        temp[x][y] = 0;
                    }

                    // A live cell with two or three live neighbors lives.
                    if (neighbors === 2 || neighbors === 3) {
                        temp[x][y] = 1;
                    }
                }

                // If the cell is currently dead.
                else {
                    // A dead cell with three live neighbors becomes live.
                    if (neighbors === 3) {
                        temp[x][y] = 1;
                    }
                }
            }
        }
        // Return the newly created grid for the user.
        this.grid = temp;
    }

    // Returns the number of neighbors for cell at this.grid[i][j]
    getNeighbors(x, y) {
        // Variable for tracking the count of neighbors.
        let neighbors = 0;

        // Iterate through the rows.
        for (let i = -1; i < 2; i++) {
            // Iterate through the columns.
            for (let j = -1; j < 2; j++) {
                // Checks if surrounding cells are live.
                let col = (x + i + this.cols) % this.cols;
                let row = (y + j + this.rows) % this.rows;

                // If so, add to the neighbors count from the grid.
                neighbors = neighbors + this.grid[col][row]
            }
        }
        // Do not count yourself in neighbors.
        neighbors -= this.grid[x][y];
        // Return neighbors to the user.
        return neighbors;
    }

    // Returns a string representation of the grid (for display purposes)
    toString() {
        let str = '\n';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    str += ' . ';
                } else {
                    str += ' X ';
                }
            }
            str += "\n";
        }
        return str;
    }
}

module.exports = GameOfLife;