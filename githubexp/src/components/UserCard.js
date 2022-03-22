import React from "react";

export default class UserCard extends React.Component{
    render(){
        const user = this.props.user;
        return(
            <div>
                <div className="container card">
                    <div className="cardBody">
                    <div className="d-flex">
                    <img className="img-round user-image mr-5" height={100} src={user.avatar_url} />
                    <div>
                        <h5>{user.name}</h5>
                        <p className="mb-0 font-italic">{user.company}</p>
                        <p className="mb-0">{user.location}</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}