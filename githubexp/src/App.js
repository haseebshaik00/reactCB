import React from 'react';
import './App.css';
import Search from './components/Search';
import UserCard from './components/UserCard';

export default class App extends React.Component{

  state = {
    user: null,
    repos: [],
    userDataError: null,
    repoDataError: null,
    loading: false
  }

  fetchUserData = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if(res.ok){
      const data = await res.json();
      /*console.log(data);
      return this.setState({
        user: data,
        loading: false
      });*/
      return {data};
    }
    else{
      const error = (await res.json()).message;
      /*this.setState({
        error:error,
        loading: false
      });*/
      return {error};
    }
  }

  fetchRepoData = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=1`);
    if(res.ok){
      const data = await res.json();
      return {data};
    }
    else{
      const error = (await res.json()).message;
      return {error};
    }
  }

  fetchData = async (username) => {
    // the code is placed in callback, as we are not sure the setState function will be async or not
    this.setState({
      loading: true
    }, async () => {
        //alert("Hi! " + username);
        try{
          const [user,repos] = await Promise.all([
            this.fetchUserData(username),
            this.fetchRepoData(username)
          ]);
          // const {data, error} = await this.fetchUserData(username);
          if(user.data !== undefined && repos.data !==undefined)
            return this.setState({
              user: user.data,
              repos: repos.data,
              loading: false
            });
          this.setState({
            userDataError: user.error,
            repoDataError: repos.error,
            loading: false
          });
        }
        catch(err){
          console.log(err);
          this.setState({
            userDataError: 'There has been an error on user data side!',
            repoDataError: 'There has been an error on repo data side!',
            loading: false
          });
        }
      });
  }

  render(){
    const {loading, userDataError, repoDataError, user, repos} = this.state;
    return (
      <div className="App">
        <br/><br/><b><em><u><h1>Github Fetch User</h1></u></em></b><br/><br/>
        <Search fetchData = {this.fetchData}/><br/><br/>
        {loading && <p className='text-primary'><b><em>Loading ...</em></b></p>}
        {userDataError && <p className='text-danger'><b><em>{userDataError}</em></b></p>}
        {!loading && !userDataError && user && <UserCard user={user}/>}
        {repoDataError && <p className='text-danger'><b><em>{repoDataError}</em></b></p>}
      </div>
    );
  }
}


