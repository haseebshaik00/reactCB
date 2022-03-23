import React from "react";

export default class RepoCard extends React.Component{

    render(){
        const repo = this.props.repo;
        return(
            <div>
                <div className="container card">
                    <div className="cardBody" style={{padding:"10px"}}>
                    <div className="d-flex">
                        <a href={repo.html_url} target="_blank">
                            <h6>{repo.name}</h6><br/>
                            <h6>Forks: {repo.forks}</h6>
                        </a>
                    </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }

}