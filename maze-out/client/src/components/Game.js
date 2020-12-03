import { Button, Slider } from '@material-ui/core';
import React from 'react';
import { Maze } from './Maze';
import "./Game.css";


export class Game extends React.Component {
    // The State of the Game Class
    state = {
        boardSize: 20,
        startGame: false,
    }

    // 
    GameStart() {
        return (
            <div>
                <Maze boardSize={this.state.boardSize} />
            </div>
        )
    }

    SetMazeSize() {

        return (
            <div className="config-game">
                <h2>Set the size of the maze to solve</h2>
                <div className="maze-size-input">
                    <Slider 
                        min={0}
                        max={40}
                        defaultValue={20}
                        valueLabelDisplay="on"
                        style={{ 
                            width: '500px',
                            color: '#3a8589',
                        }}
                        onChange={this.handleState}
                    />
                </div>
                <div className="button-input">
                    <Button 
                        onClick={this.PlayGameClick}
                        style={{
                            width: '500px',
                            color: "#fff",
                            backgroundColor: "#000",
                        }}
                    >
                        Solve the Maze!
                    </Button>
                </div>
            </div>
        )
    }

    handleState = (event, value) => {
        this.setState({
            boardSize: value
        })
    }

    PlayGameClick = () => {
        if (this.state.boardSize > 0) {
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