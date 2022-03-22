import React from "react";

export default class UserCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const user = this.props.user;
        return(
            <div>
                <div className="container card">
                    <div className="cardBody">
                        <h3>{user.name}</h3>
                        <h3>{user.blog}</h3>
                        <h3>{user.company}</h3>
                        <h3>{user.location}</h3>
                    </div>
                </div>
            </div>
        );
    }
}