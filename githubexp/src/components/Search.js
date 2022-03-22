import React from 'react';

export default class Search extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    handleUserNameChange = e => {
        const value = e.target.value;
        this.setState({
            username: value,
        });
    };

    render() {
        //const { history } = this.props;
        const { fetchData } = this.props;
        const { username } = this.state;
    
        return (
          <div className="bg-dark">
            <div className="container py-5">
              <div className="row">
                <div className="col-8 offset-2 text-center">
                  <div className="row">
                    <div className="col-9">
                      <input
                        className="form-control"
                        value={username}
                        onChange={this.handleUserNameChange}
                        type="text"
                        name="username"
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="col-3">
                      <button
                        onClick={() => fetchData(username)}
                        className="btn btn-large btn-success">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      //onClick={() => history.push(`/${username}`)}
    /* Access input using event object
    handleKeyDown = e => {
        if(e.KeyCode === 13){
            const value = e.target.value;
            alert(`Hi! ${value}`);
        }
    }

    render(){
        return(
            <div>
                <input onKeyDown={this.handleKeyDown}
                type="text" name="username" placeholder="Enter Username"/>
            </div>
        );
    };*/

    /*
    // inputRef method 
    inputRef = React.createRef();
    handleClick = () => {
        const value = this.inputRef.current.value; 
        // fetches the value from the input box which has ref {this.inputRef}
        // when state is updated we have to update refs manually using this.inputRef.current.value
        alert("Hi! " + value);
    }

    render(){
        return(
            <div>
                <input ref={this.inputRef}
                type="text" name="username" placeholder="Enter Username"/>
                <button onClick={this.handleClick}>Click Me!</button>
            </div>
        );
    };*/

    /* 2 way mapping - changing the internal state to see reflection in input field and the other way around
    constructor(props){
        super(props);
        this.state = {
            username: ''
        } 
    }
    
    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            username: value
        })
    }

    render(){
        const username = this.state.username;
        return(
            <div>
                <input value={username} onChange={this.handleInputChange} 
                type="text" name="username" placeholder="Enter Username"/>
            </div>
        );
    };*/
}