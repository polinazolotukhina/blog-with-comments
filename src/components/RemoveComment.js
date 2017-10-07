import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import { getFirebase } from 'react-redux-firebase';


class RemoveComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        open: false
      };
    }

   render() {
       const { comment  } = this.props;
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
           onClick={() => firebase.remove('comments/' + comment )}
         />,
       ];
        return (
            <div className="remove" >
                <FlatButton secondary={true} label="Delete"  onClick={() => this.setState({open: true}) }/>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={() => this.setState({open: false})}
                >
                    Are you sure you want to delete post <b>lala</b>?
                </Dialog>

            </div>
        );
    }
}
export default RemoveComment;
