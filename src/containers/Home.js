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
  pathToJS
} from 'react-redux-firebase';


class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { posts } = this.props;
        const postList = !isLoaded(posts)
            ? <div className = "load"><CircularProgress size={80} thickness={5} /></div>
            : isEmpty(posts)
              ? (<div>
                  <h2>Posts list is empty</h2>
                  <RaisedButton label="Create a new post" onClick={()=>{browserHistory.push('/newpost')}} />

                 </div>)
              : Object.keys(posts).map(
                  (key, id) => (
                    <PostItem key={key} id={key} post={posts[key]} />
                  )
                )
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
    {
        path: 'posts',
        storeAs: 'posts',
        queryParams: []
    }
  ]),
  connect(
    (state) => ({
      posts: dataToJS(state.firebase, 'posts'),
    })
  )
)(Home)
