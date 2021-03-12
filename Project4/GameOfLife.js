'use strict';

/**
 *  Game of Life
 *  Author(s): Your Name(s)
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
        //read file
        let data = fs.readFileSync(file, 'utf8');

        //split using delimiter
        let tokens = data.split(' ');

        //Get number of rows from the line read
        this.rows = parseInt(tokens.shift());

        //Get number of cols from the line read
        this.cols = parseInt(tokens.shift());

        //making empty 2d array grid
        this.grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
            this.grid[i].fill(0);
        }

        //assigning values from file to grid
        for (let temp = 0; temp < this.rows; temp++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[temp][j] = parseInt(tokens.shift()[0]);
            }
        }

        return this.grid;

    }

    // Saves the current grid values to the file specified.
    saveGrid(file) {
        let data = this.rows + ' ' + this.cols;

        // TO DO: append the values in this.grid to data
        for (let temp = 0; temp < this.rows; temp++) {
            for (let j = 0; j < this.cols; j++) {
                data = data + " " + this.grid[temp][j];
            }
        }
        data += '\n';
        fs.writeFileSync(file, data);
    }

    // Mutates the grid to next generation
    mutate() {
        // make a copy of grid and fill it with zeros
        let temp = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            temp[i] = new Array(this.cols);
            temp[i].fill(0);
        }

        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                let neighbors = this.getNeighbors(x, y);

                //if the cell is currently alive
                if (this.grid[x][y] === 1) {
                    //A Live cell with less than two live neighbors or more than three neighbors dies.
                    if (neighbors < 2 || neighbors > 3) {
                        temp[x][y] = 0;
                    }
                    //A live cell with two or three live neighbors lives.
                    if (neighbors === 2 || neighbors === 3) {
                        temp[x][y] = 1;
                    }
                } else {

                    //A dead cell with three live neighbors become alive.
                    if (neighbors === 3) {
                        temp[x][y] = 1;
                    }

                }

            }
        }
        // set this.grid to temp grid
        this.grid = temp;
    }

    // Returns the number of neighbors for cell at this.grid[i][j]
    getNeighbors(x, y) {
        let neighbors = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + this.cols) % this.cols;
                let row = (y + j + this.rows) % this.rows;
                neighbors = neighbors + this.grid[col][row]
            }
        }
        neighbors -= this.grid[x][y];
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