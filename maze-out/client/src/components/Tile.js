import React from 'react';

export class Tile extends React.Component{
    render() {
        return (
            <td onClick={this.props.handleClick}>
                <div
                    style={{
                        border: "1px solid",
                        height:25,
                    }}
                />
            </td>
        )
    }
}