import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PostItem from '../components/PostItem';
import CircularProgress from 'material-ui/CircularProgress';
import { compose } from 'redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS
} from 'react-redux-firebase'



 class Search extends Component {
     constructor(props) {
         super(props);
         this.state = {input: '', querry:'', hidePosts:false}
         this.handleChange = this.handleChange.bind(this);
         this.searchForPost = this.searchForPost.bind(this);

       }
    handleChange(e){
        this.setState({ input: e.target.value.toLowerCase() });
    }
    searchForPost(){
        this.setState({ hidePosts : true})
        let res = [];
        Object.keys(this.props.posts).forEach(key => {
            res.push({[key] : this.props.posts[key].title.toLowerCase()});   //
       });
      console.log ("res", res);

      const idArr =   res.filter(x =>{
      for(var key in x){
          return x[key] == this.state.input }
      });
      console.log('idArr', idArr )
// ["-KuJOd2Bdk-Dm4dQv_n8", "-KuKjuPTexP2Aa3flXTv"]


     const id =  idArr.map(function(a) {return (Object.keys(a)).toString()});
         //   ["-KuJOd2Bdk-Dm4dQv_n8", "-KuKjuPTexP2Aa3flXTv"]
     this.setState({querry:id})
    }


    render() {
        const { posts } = this.props;
        const postList = !isLoaded(posts)
            ? <div className = "load"><CircularProgress size={80} thickness={5} /></div>
            : isEmpty(posts)
              ? 'Posts list is empty'
              : Object.keys(posts).map(
                  (key, id) => (
                    <PostItem key={key} id={key} post={posts[key]}/>
                  )
                )
        console.log('posts', posts&&posts['-KuJOd2Bdk-Dm4dQv_n8'])

        return (
          <div className="container">

                <TextField onChange={this.handleChange} hintText="Search for posts..."/>
                <RaisedButton primary={true} onClick={this.searchForPost} label="Search"/>
                        <div>{console.log("Baby",this.state.querry.length<1 )}
                            {
                                (this.state.querry=="" && this.state.hidePosts)? (
                                    <div>
                                        <h4>No post found...</h4>
                                        <h2>Other Posts:<hr/></h2>
                                        <div>
                                          {postList}
                                        </div>
                                    </div>
                                ):(
                                this.state.querry&&this.state.querry.map((quary, index) =>
                                    <div key={index}>
                                        <h2>{posts&&posts[quary]&&posts[quary].title}</h2>
                                        <h4>{posts[quary].subtitle}</h4>
                                        <p>{posts[quary].notes.slice(0,250)}...</p>
                                        <FlatButton  primary={true}  label="Read More" onClick={()=>{browserHistory.push({
                                            pathname:'/post',
                                            query: {id: quary}
                                        })
                                        }} />


                                    </div>)
                                )



                            }
                        </div>

          </div>
        );
    }
}


export default compose(
  firebaseConnect([
    'posts' // { path: 'todos' } // object notation
  ]),
  connect(
    (state) => ({
      posts: dataToJS(state.firebase, 'posts'), // in v2 todos: state.firebase.data.todos
      auth: pathToJS(state.firebase, 'auth') // in v2 todos: state.firebase.auth
    })
  )
)(Search)
