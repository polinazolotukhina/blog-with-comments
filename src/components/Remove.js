import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import { getFirebase } from 'react-redux-firebase';


class Remove extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        open: false
      };
    }

   render() {
       const { id, title } = this.props;
       const firebase = getFirebase();
       const actions = [
         <FlatButton
           label="Cancel"
           primary={true}
           onClick={() => this.setState({open: false})}
         />,
         <FlatButton
           label="Delete"
           secondary={true}
           onClick={() => firebase.remove('posts/' + id)}
         />,
       ];
        return (
            <div className="remove" >
                <FlatButton secondary={true} label="Delete Post"  onClick={() => this.setState({open: true})}/>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={() => this.setState({open: false})}
                >
                    Are you sure you want to delete post <b>'{title}'</b>?
                </Dialog>

            </div>
        );
    }
}
export default Remove;
