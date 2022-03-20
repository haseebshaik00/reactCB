import React from 'react';

export default function Square(props){
    // {props.boardProps} on line 7
    return(
        <button className="square" onClick={props.handleClick}>
            {props.value}
        </button>
    );
};

