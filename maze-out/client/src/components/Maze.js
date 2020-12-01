import React from "react";
import { Tile } from "./Tile";

export class Maze extends React.Component {

    state = {
        // Creating a 2D Matrix for creating a maze grid.
        maze: new Array(this.props.rows).fill('').map(x => (new Array(this.props.cols).fill(''))),
    }

    createMaze = () => {
        const mazeStyle = {
            textAlign: "center",
            height: "100%",
            width: "100%",
            tableLayout:"fixed",
        };

        const mazeGrid = this.state.maze;
        // Visualizing the maze grid with Tile component
        // For each row, all the columns are displayed with Tile component.
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
                <table cellSpacing="0" style={mazeStyle}>
                    <tbody>
                        {maze}
                    </tbody>
                </table>
            </div>
        )
    }

    handleClick(){

    }

    render() {        
        return (
            <div>
                {this.createMaze()}
            </div>
        )
    }
}