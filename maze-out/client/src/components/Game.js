import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { Maze } from './Maze';
import "./Game.css";


export class Game extends React.Component {
    state = {
        rows: 0,
        cols: 0,
        startGame: false,
    }

    GameStart() {
        return (
            <div>
                <Maze
                    rows={parseInt(this.state.rows, 10)}
                    cols={parseInt(this.state.cols, 10)} 
                />
            </div>
        )
    }

    SetMazeSize() {
        return (
            <div className="config-game">
                <h2>Set the size of the maze to solve</h2>
                <div className="maze-size-input">
                    <TextField
                        label="Rows"
                        value={this.state.rows}
                        onChange={event => this.setState({rows: event.target.value})}
                    />
                    <TextField
                        label="Columns"
                        value={this.state.cols}
                        onChange={event => this.setState({cols: event.target.value})}
                    />
                    <Button onClick={this.PlayGameClick}>
                        Solve the Maze!
                    </Button>
                </div>
            </div>
        )
    }

    PlayGameClick = () => {
        console.log(this.state);
        if (this.state.rows > 0 && this.state.cols > 0) {
            this.setState({startGame: true});
        }
    }

    render(){
        if (!this.state.startGame) {
            return this.SetMazeSize();
        } else {
            return this.GameStart();
        }
    }
}