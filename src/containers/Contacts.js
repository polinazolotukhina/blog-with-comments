import React from 'react'
import ContactForm from '../components/ContactForm';
import { getFirebase } from 'react-redux-firebase';


export default class NewPost extends React.Component {
    submit(values) {
      console.log(values)
      const firebase = getFirebase()
      firebase
      .push('contacts', values)


    }

    render() {

      return (
            <div className="container">
                <ContactForm onSubmit={this.submit} />
            </div>
      )
    }
}
