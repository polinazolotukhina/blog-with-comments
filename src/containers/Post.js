import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import { compose } from 'redux';
import Remove from '../components/Remove';
import UserComment from '../components/UserComment';
import { getFirebase } from 'react-redux-firebase';
import FacebookLog from '../components/FacebookLog';
import CircularProgress from 'material-ui/CircularProgress';


import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS
} from 'react-redux-firebase';


 class Post extends Component {
     submit(values,dispatch, props) {
         const comments= {
             values: values,
             id:props.postId,
             name: props.commentatorName,
             url: props.commentatorImg
         }
       const firebase = getFirebase()

       firebase
       .push('comments', comments)
     }
     renderProfile(){
         const { profile, location } = this.props;
         if(profile){
             return (
                 <div>
                     <div className="col-md-1">
                         <img className = "avatar-main" src={profile &&profile.avatarUrl}  />
                     </div>
                     <div className="col-md-11">
                         <UserComment postId={location.query.id} commentatorImg = {profile&&profile.avatarUrl} commentatorName = {profile&&profile.displayName} onSubmit={this.submit} />
                     </div>
                 </div>
             );
         } else {
             return (<div className="remove"><FacebookLog/></div>);
         }
     }


     renderRemove(){
         const { posts,  comments, location  } = this.props;
         if( posts&&posts[location.query.id]) {
             return (
                 <div>
                   <h2>{posts&&posts[location.query.id]&&posts[location.query.id].title}</h2>
                   <h4>{posts&&posts[location.query.id]&&posts[location.query.id].subtitle}</h4>
                   <p>{posts&&posts[location.query.id]&&posts[location.query.id].notes}</p>
                   <hr/>
                   <div className="remove">
                     <Remove className="remove" id={location.query.id} title={posts[location.query.id].title} />
                   </div>

                         {this.renderProfile()}
                         {
                              comments&&Object.values(comments).filter( i => i.id ==location.query.id).map((item, index) =>
                                  <div key={index}>
                                     <img  className = "avatar" src = {item.url} />
                                     <p className="remove bold">{item.name}</p>
                                     <p className="remove">{item.values.Comment}</p>
                                 </div>
                             )
                         }

                 </div>
             );
         } else {
             return (
                 <div>
                     <h4>Post does not exist.</h4>
                     <RaisedButton label="Go to Blog" onClick={()=>{browserHistory.push('/');}} />
                 </div>
             );
         }
     }
  render() {
    const { posts } = this.props;
    return (
    <div className="container">
    {
        !isLoaded(posts)? (<div className = "load"><CircularProgress size={80} thickness={5} /></div>): (
            <div>
                { this.renderRemove() }
            </div>
        )}
    </div>
    );
  }
}


export default compose(
  firebaseConnect([
    'posts', // { path: 'todos' } // object notation
    { path: '/comments', queryParams: [ 'orderByKey' ]},
    // '/comments#orderByKey'

  ]),
  connect(
    (state) => ({
      posts: dataToJS(state.firebase, 'posts'), // in v2 todos: state.firebase.data.todos
      comments: dataToJS(state.firebase, 'comments'),
      auth: pathToJS(state.firebase, 'auth'),// in v2 todos: state.firebase.auth
      profile: pathToJS(state.firebase, 'profile')

    })
  )
)(Post)
