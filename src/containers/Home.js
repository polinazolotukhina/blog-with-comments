import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import { compose } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import PostItem from '../components/PostItem';

import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
} from 'react-redux-firebase';


class Home extends React.Component {
    checkIfEmpty(){
        const { posts, comments } = this.props;
        if(isEmpty(posts)){
            return (<div>
                <h2>Posts list is empty</h2>
                <RaisedButton label="Create a new post" onClick={()=>{browserHistory.push('/newpost');}} />
               </div>);
        } else{
            return (
                Object.keys(posts).map(
                    (key) => (
                      <PostItem key={key} id={key} post={posts[key]} comments={comments} />
                    )
                  )
            );
        }
    }

    render() {
        const { posts } = this.props;
        const postList = !isLoaded(posts)
            ? <div className = "load"><CircularProgress size={80} thickness={5} /></div>
            : this.checkIfEmpty();
        return (
            <div className="container">
                <ul>
                    {postList}
                </ul>
            </div>
        );
    }
}

export default compose(
  firebaseConnect([
    'comments',
    {
        path: 'posts',
        storeAs: 'posts',
        queryParams: [],
    }
  ]),
  connect(
    (state) => ({
      posts: dataToJS(state.firebase, 'posts'),
      comments: dataToJS(state.firebase, 'comments'),

    })
  )
)(Home)
