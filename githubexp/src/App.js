import React from 'react';
import './App.css';
import Search from './components/Search';
import UserCard from './components/UserCard';

export default class App extends React.Component{

  state = {
    user: null,
    error: null,
    loading: false
  }

  fetchUserData = async (username) => {
    // the code is placed in callback as we are not sure the setState function is async or not
    this.setState({
      loading: true
    }, async () => {
        //alert("Hi! " + username);
        const res = await fetch(`https://api.github.com/users/${username}`);
        try{
          if(res.ok){
            const data = await res.json();
            console.log(data);
            return this.setState({
              user: data,
              loading: false
            });
          }
          else{
            const error = (await res.json()).message;
            this.setState({
              error:error,
              loading: false
            });
          }
        }
        catch(err){
          console.log(err);
          this.setState({
            error:'There has been an error!',
            loading: false
          });
        }
        });
  }

  render(){
    const {loading, error, user} = this.state;
    return (
      <div className="App">
        <br/><br/><b><em><u><h1>Github Fetch User</h1></u></em></b><br/><br/>
        <Search fetchData = {this.fetchUserData}/>
        <br/><br/>
        {loading && <p className='text-primary'><b><em>Loading ...</em></b></p>}
        {error && 
          <p className='text-danger'><b><em>{error}</em></b></p>
        }
        {!loading && !error && user && 
          <UserCard user={user}/>
        }
      </div>
    );
  }
}


