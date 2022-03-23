import React from 'react';
import './App.css';
import RepoCard from './components/RepoCard';
import Search from './components/Search';
import UserCard from './components/UserCard';

const PAGE_SIZE = 5;

export default class App extends React.Component{

  state = {
    user: null,
    repos: [],
    userDataError: null,
    repoDataError: null,
    loading: false,
    pageSize: 10,
    page: 1
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
    const {page} = this.state;
    const {pageSize} = this.state;
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`);
    if(res.ok){
      const data = await res.json();
      //return {data, page:page+1};
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
              //page: repos.page,
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

  // loadmore = async () => {
  //   const {data, page} = await this.fetchRepoData(this.state.user.login);
  //   if(data){
  //     this.setState(state => ({
  //       repos: [...state.repos, ...data],
  //       page: state.page + 1,
  //     }))
  //   }
  // }

  loadPage = async () =>{
    const {data} = await this.fetchRepoData(this.state.user.login, this.state.page);
    if(data){
      this.setState(state => ({
        repos: data
      }))
    }
  }

  handlePageChange = (page) => {
    this.setState({
      page: page
    }, () => this.loadPage())
  }

  handlePageSizeChange = (e) => {
    this.setState({
      pageSize: e.target.value
    }, () => this.loadPage())
  }

  render(){

    const {loading, userDataError, repoDataError, page, user, repos, pageSize} = this.state;
    const renderRepoShortcut = !loading && !repoDataError && !!repos.length; 
    
    return (
      <div className="App">
        <br/><br/><b><em><u><h1>Github Fetch User</h1></u></em></b><br/><br/>
        <Search fetchData = {this.fetchData}/><br/><br/>
        {loading && <p className='text-primary'><b><em>Loading ...</em></b></p>}
        {userDataError && <p className='text-danger'><b><em>{userDataError}</em></b></p>}
        {!loading && !userDataError && user && <UserCard user={user}/>} <br/><br/>
        {repoDataError && <p className='text-danger'><b><em>{repoDataError}</em></b></p>}
        {renderRepoShortcut && (
           <React.Fragment>  
           <div className='mb-4'>
               {
                 [...new Array(Math.ceil(user.public_repos/pageSize))].map(
                   (_,index) => (
                     <button key={index} className="btn btn-success mx-2"
                       onClick={() => this.handlePageChange(index+1)}
                     >{index+1}</button>
                   )
                 )
               }
           </div>  

            <div className='d-inline-block mb-4'>
              <select className='form-control' value={pageSize} onChange={this.handlePageSizeChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>

           {repos.map((repo)=> <RepoCard key={repo.id} repo={repo}/>)}
         </React.Fragment>
        )}  
      </div>
    );
  }
}

//{!loading && !userDataError && user && (page-1)*PAGE_SIZE < user.public_repos
// && (<button className='btn btn-success' onClick={this.loadmore}>Load More!</button>)}<br/><br/><br/>


// on line 95 the key is passed to diffrentiate between the list items, as react 
//.. finds it difficult to diffrentiate in between them also during crud there might be a possibility that 2 items has
//.. same index hence we use an unique id

