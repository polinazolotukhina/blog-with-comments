import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, FlatButton } from 'material-ui';
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
       console.log("values", values)
       const firebase = getFirebase()

       firebase
       .push('comments', comments)
     }

  render() {
    const { posts, profile, comments  } = this.props;
    return (
    <div className="container">
    {
        !isLoaded(posts)? (<div className = "load"><CircularProgress size={80} thickness={5} /></div>
        ): (
            <div>
            {
                ( posts&&posts[this.props.location.query.id])?(
                    <div>
                      <h2>{posts&&posts[this.props.location.query.id]&&posts[this.props.location.query.id].title}</h2>
                      <h4>{posts&&posts[this.props.location.query.id]&&posts[this.props.location.query.id].subtitle}</h4>
                      <p>{posts&&posts[this.props.location.query.id]&&posts[this.props.location.query.id].notes}</p>
                      <hr/>
                      <div className="remove">
                        <Remove className="remove" id={this.props.location.query.id} title={posts[this.props.location.query.id].title} />
                      </div>

                            {
                                 (profile)?(
                                        <div>
                                            <div className="col-md-1">
                                                <img className = "avatar-main" src={profile &&profile.avatarUrl}  />
                                            </div>
                                            <div className="col-md-11">
                                                <UserComment postId={this.props.location.query.id} commentatorImg = {profile&&profile.avatarUrl} commentatorName = {profile&&profile.displayName} onSubmit={this.submit} />
                                            </div>
                                        </div>
                                    ):(<div className="remove"><FacebookLog/></div>)
                            }
                            {
                                 comments&&Object.values(comments).filter( i => i.id ==this.props.location.query.id).map((item, index) =>
                                     <div key={index}>
                                        <img  className = "avatar" src = {item.url} />
                                        <p className="remove bold">{item.name}</p>
                                        <p className="remove">{item.values.Comment}</p>
                                    </div>
                                )
                            }

                    </div>
                ):(
                    <div>
                        <h4>Post does not exist.</h4>
                        <RaisedButton label="Go to Blog" onClick={()=>{browserHistory.push('/')}} />
                    </div>
                )
            }

            </div>
        )}

    </div>
    );
  }
}


export default compose(
  firebaseConnect([
    'posts', // { path: 'todos' } // object notation
    'comments'

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
