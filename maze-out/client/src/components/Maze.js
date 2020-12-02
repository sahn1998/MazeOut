import React from "react";
import { Button } from '@material-ui/core';
import { Tile } from "./Tile";
import "./Maze.css";

export class Maze extends React.Component {

    state = {
        // Creating a 2D Matrix for creating a maze grid.
        row: this.props.boardSize,
        col: this.props.boardSize,
        maze: new Array(this.props.boardSize).fill('').map(x => (new Array(this.props.boardSize).fill(''))),
        startingPoint: false,
        endPoint: false,
        setWalls: false,
    }

    setStartingPointClick = () => {
        if (!this.startingPoint) {
            this.setState({
                startingPoint: true,
                endPoint: false,
                setWalls: false,
            });
        } else {
            this.setState({startingPoint: false});
        }
    }

    setEndPointClick = () => {
        if (!this.endPoint) {
            this.setState({
                endPoint: true,
                startingPoint: false,
                setWalls: false,
            });
        } else {
            this.setState({endPoint: false});
        }
    }

    setWallsClick = () => {
        if (!this.startingPoint) {
            this.setState({
                setWalls: true,
                startingPoint: false,
                endPoint: false,
            });
        } else {
            this.setState({setWalls: false});
        }
    }

    createMaze = () => {
        // Visualizing the maze grid with Tile component
        // For each row, all the columns are displayed with Tile component.

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
                        return (
                            <Tile handleClick={this.handleClick}/>
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

    render() {
        return (
            <div>
                <div className="buttons">
                    <Button
                        onClick={this.setStartingPointClick}
                        className="starting-point-button"
                    >
                        Click and Set Starting Point
                    </Button>
                    <Button
                        onClick={this.setEndPointClick}
                        className="end-point-button"
                    >
                        Click and Set End Point
                    </Button>
                    <Button
                        onClick={this.setWallsClick}
                        className="set-walls-button"
                    >
                        Click and Set Walls
                    </Button>
                </div>
                {this.createMaze()}
            </div>
        )
    }
}