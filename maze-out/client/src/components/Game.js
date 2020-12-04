import { Button, Slider } from '@material-ui/core';
import React from 'react';
import { Maze } from './Maze';
import "./Game.css";


export class Game extends React.Component {
    /**
     * The State of the Game Class
     */
    state = {
        boardSize: 20,
        startGame: false,
    }

    /**
     * Method: Starts the game by creating the Maze Board
     */
    GameStart() {
        return (
            <div>
                <Maze boardSize={this.state.boardSize} />
            </div>
        )
    }

    /**
     * Method: Sets the size of the Maze Board
     */
    SetMazeSize() {
        return (
            <div className="config-game">
                <h1>Maze Out</h1>
                <h2>By: Sung Hyun Ahn and Jenny HyeonJeong Lee</h2>
                <h4>Set the size of the maze to solve</h4>
                <h2> </h2>
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

    /**
     * Method: Helper method to set the value of the boardSize
     * @param {size of the board} value 
     */
    handleState = (event, value) => {
        this.setState({
            boardSize: value
        })
    }

    /**
     * Method: Sets state of startGame to true for Game to Start.
     */
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