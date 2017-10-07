import React from 'react';
import { RaisedButton } from 'material-ui';
import { getFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
   firebaseConnect,
   isLoaded,
   isEmpty,
   dataToJS,
   pathToJS
 } from 'react-redux-firebase';

 class FacebookLog extends React.Component {
     constructor(props){
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

   login() {
       const firebase = getFirebase();
       this.props.firebase.login({
          provider: 'facebook',
          type: 'redirect'
        })

   }

   logout(){
        const firebase = getFirebase();
        firebase.logout()
   }

   render() {
     const { auth, profile } = this.props;
     return (
         <div className="remove">
         {
             (!profile) ? (
                <RaisedButton primary={true} label="Login with Facebook to leave comments" onClick={this.login} />
             ):(
                 <div>
                     <img className="avatar-main" src={profile &&profile.avatarUrl}  />
                     <div><RaisedButton primary={true}  label="Logout" onClick={this.logout}/></div>
                </div>
            )
        }
       </div>
     )
   }
 }

 export default compose(
   firebaseConnect(),
   connect(
     (state) => ({
         auth: pathToJS(state.firebase, 'auth'), // in v2 todos: state.firebase.auth
         authError: pathToJS(state.firebase, 'authError'),
         profile: pathToJS(state.firebase, 'profile')
     })
   )
 )(FacebookLog)
