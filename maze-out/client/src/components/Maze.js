import React from "react";
import { Button } from '@material-ui/core';
import { Tile } from "./Tile";
import "./Maze.css";

export class Maze extends React.Component {

    state = {
        // Creating a 2D Matrix for creating a maze grid.
        maze: new Array(this.props.boardSize).fill('+').map(x => (new Array(this.props.boardSize).fill('+'))),
        startPoint: false,
        endPoint: false,
        wallPoint: false,
        startCoord: null,
        endCoord: null,
    }

    /**
     * Method: Allows starting point to be set by the client
     */
    allowStartingPointClick = () => {
        if (!this.state.startPoint) {
            this.setState({
                startPoint: true,
                endPoint: false,
                wallPoint: false,
            });
        } else {
            this.setState({startPoint: false});
        }
    }

    /**
     * Method: Allows end point to be set by the client
     */
    allowEndPointClick = () => {
        if (!this.state.endPoint) {
            this.setState({
                endPoint: true,
                startPoint: false,
                wallPoint: false,
            });
        } else {
            this.setState({endPoint: false});
        }
    }

    /**
     * Method: Allows walls to be set by the client
     */
    allowWallsClick = () => {
        if (!this.state.wallPoint) {
            this.setState({
                wallPoint: true,
                startPoint: false,
                endPoint: false,
            });
        } else {
            this.setState({wallPoint: false});
        }
    }

    /**
     * Method: 
     * Sets the tile to the correct corresponding tile that the client wishes
     * Clients can set Starting Point, End Point, Walls.
     * @param {*} row 
     * @param {*} col 
     */
    handleSetTilesClick = (row, col) => {
        const currentGrid = this.state.maze;

        if (currentGrid[row][col] === "+") {
            if (this.state.startPoint && !this.state.startCoord) {
                currentGrid[row][col] = "o";
                this.setState({
                    maze: currentGrid,
                    startCoord: [row, col],
                });
            } else if (this.state.endPoint && !this.state.endCoord) {
                currentGrid[row][col] = "x";
                this.setState({
                    maze: currentGrid,
                    endCoord: [row, col],
                });
            } else if (this.state.wallPoint) {
                currentGrid[row][col] = "#";
                this.setState({
                    maze: currentGrid,
                });
            }
        } else {
            const currentCoord = currentGrid[row][col]
            currentGrid[row][col] = "+";

            if (currentCoord === "o") {
                this.setState({
                    startCoord: null,
                });
            } else if (currentCoord === "x") {
                this.setState({
                    endCoord: null,
                });
            }

            this.setState({
                maze: currentGrid,
            });
        }
    }

    /**
     * Method: 
     * Returns a (boardSize x boardSize) maze grid
     * boardSize is set by the client in the Set Maze Size menu.
     * Each tile in the grid consists of a Tile Component
     * Meaning: For each row, all the columns are displayed with Tile component.
     * 
     */
    createMaze = () => {
        const style = {
            margin:"auto",
            height: "auto",
            width:"auto",
            border:".1px solid black",
            tableLayout:'fixed',
        }

        const mazeGrid = this.state.maze;

        const maze = mazeGrid.map((row, i) => {
            return (
                <tr>
                    {row.map((col, j) => {

                        const tileColor = 
                        mazeGrid[i][j] === '+' ? '#000000' 
                        : mazeGrid[i][j] === 'o' ? '#4CAF50'
                        : mazeGrid[i][j] === 'x' ? '#f44336'
                        : mazeGrid[i][j] === '#' ? '#FFFFFF'
                        : 'red';

                        return (
                            <Tile
                                tileColor={tileColor}
                                handleSetTilesClick={() => this.handleSetTilesClick(i, j)}
                            />
                        )
                    })}
                </tr>
            )
        });

        return (
            <div>
                <table cellSpacing="0" style={style}>
                    <tbody>
                        {maze}
                    </tbody>
                </table>
            </div>
        )
    }

    runProgram = () => {

    }

    render() {
        return (
            <div>
                <div className="buttons">
                    <Button
                        onClick={this.allowStartingPointClick}
                        className="starting-point-button"
                    >
                        Click and Set Starting Point
                    </Button>
                    <Button
                        onClick={this.allowEndPointClick}
                        className="end-point-button"
                    >
                        Click and Set End Point
                    </Button>
                    <Button
                        onClick={this.allowWallsClick}
                        className="set-walls-button"
                    >
                        Click and Set Walls
                    </Button>
                    <Button
                        onClick={this.runProgram}
                        className="run-program-button"
                    >
                        Run Program
                    </Button>
                </div>
                {this.createMaze()}
            </div>
        )
    }
}