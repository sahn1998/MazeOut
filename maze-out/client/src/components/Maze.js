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
     * 
     * Starting Point has a label "o"
     * End Point has a label "x"
     * Walls have a label "#"
     * Paths have a label "+"
     * 
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
                        /**
                         * Tile Color에서 사용되는 '?'는 Conditional operator이라고 해... 그냥 그건
                         * If and else statement이라고 보면 돼
                         * 
                         * 아래를 if and else statement으로 생각하면
                         * 
                         * tileColor = 
                         * if (mazeGrid[i][j] === "+") {
                         *  '#000000'
                         * } else if (mazeGrid[i][j] === "o") {
                         *  '#4CAF50
                         * }
                         * 
                         * Starting Point has a color "Green" ( '#4CAF50' )
                         * End Point has a color "Red" ( '#f44336' )
                         * Walls have a color "White" ( '#000000' )
                         * Paths have a color "Black" ( '#FFFFFF' )
                         * Visited Paths should have a color "Blue" ( '#008CBA' )
                         */
                        const tileColor = 
                        mazeGrid[i][j] === '+' ? '#000000' 
                        : mazeGrid[i][j] === 'o' ? '#4CAF50'
                        : mazeGrid[i][j] === 'x' ? '#f44336'
                        : mazeGrid[i][j] === '#' ? '#FFFFFF'
                        : '#008CBA';

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

    /**
     * Method: Runs the program to solve the maze
     * Each tile visited should have a "v" label
     * At each point, you should check the next point to see if the path is viable.
     * Visited tiles should have a different color value of red
     * Use algorithms to go through the tiles until the end point is reached
     * Should return a "solved" if the maze gets solved
     * Should return a "no solution" if there is no way to get from starting point to the end point
     * 
     * Currently:
     * Starting Point has a label "o"
     * End Point has a label "x"
     * Walls have a label "#"
     * Paths have a label "+"
     * 
     */
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