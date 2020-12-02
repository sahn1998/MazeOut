import React from 'react';
import "./Tile.css";

export class Tile extends React.Component {

    state = {
        clicked: false,
    }

    render() {
        const tileStyle = {
            overflow:'hidden',
            width:'19px',
            height:'19px',
            backgroundColor:'black',
        }

        return (
            <td
                style={tileStyle}
            >
                <button 
                    onClick={this.props.handleClick}
                    style={{
                        width:'100%',
                        height:'100%',
                    }}
                />
            </td>
        )
    }
}