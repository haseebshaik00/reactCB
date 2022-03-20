import React from "react";
import Square from "./Square";

export default function Board(props){
    // <Square boardProps = {props.gameProps}/> on line 9
    return(
        <div>
            <div className="border-row">
                <Square/>
                <Square/>
                <Square/>
            </div>
            <div className="border-row">
                <Square/>
                <Square/>
                <Square/>
            </div>
            <div className="border-row">
                <Square/>
                <Square/>
                <Square/>
            </div>
        </div>
    );
};