import React from "react";
import Board from "./Board";

export default class Game extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [  
                {squares: Array(9).fill(null)}      
            ]
            //,value: 5
        }
        // this.state.xIsNext = false; --  never write change state like this
    }

    /*
    // sent as props
    someFunction = () => {
        return 5;
    }

    // to set state
    changeState = () => {
        // async task
        this.setState({
            value: 6
        });
    }
    */

    handleClick = (i) => {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares;

        squares[i] = this.state.xIsNext ? 'X':'O';
        
        this.setState({
            history: history.concat({squares:squares}),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }
    
    gameOver = (squares) => {
        const arr = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        let flag =0;
        arr.forEach(e => {
            if(squares[e[0]] && squares[e[0]] === squares[e[1]] && squares[e[1]] === squares[e[2]]){
                console.log("Winner!");
                flag = 1;
            }     
        });
        if(flag===0 && this.state.stepNumber===9)
            console.log("loser");
    }

    // here gameProps = {result} is the props
    // <Board gameProps = {result}/>
    render(){
        // const result = this.someFunction();

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares;
        this.gameOver(squares);
        return(
            <div className="game">
                <div className="game-board">
                    <Board clickAction={(i) => this.handleClick(i)} squares={squares}/>
                </div>
            </div>
        );
    }
};