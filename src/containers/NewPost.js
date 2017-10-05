import React from 'react'
import AddPost from '../components/AddPost';
import { getFirebase } from 'react-redux-firebase';
import { browserHistory } from 'react-router';


export default class NewPost extends React.Component {
    submit(values) {
      const firebase = getFirebase()
      firebase
      .push('posts', values)
      .then(() => {
        browserHistory.push('/')
      })
    }

    render() {

      return (
            <div className="container">
                <AddPost onSubmit={this.submit} />
            </div>
      )
    }
}
