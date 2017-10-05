import React from 'react';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { browserHistory } from 'react-router';

export default class App extends React.Component {
 constructor(props) {
       super(props);
       this.handleToggle = this.handleToggle.bind(this);
       this.handleClose = this.handleClose.bind(this);
       this.state = {open: false};
 }

 handleToggle() {
    this.setState({open: !this.state.open});
 }
 handleClose(){
     this.setState({open: false});
 }

    openLink(link){
        browserHistory.push(link);
    }
    render() {

        return (
            <div className="wrapper">
                <AppBar
                    title="Menu"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onClick={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                    <MenuItem  onClick={this.handleClose} onTouchTap={() => {this.openLink('/')}}>Blog</MenuItem>
                    <MenuItem  onClick={this.handleClose} onTouchTap={() => {this.openLink('/newpost')}}>New Post</MenuItem>
                    <MenuItem onClick={this.handleClose} onTouchTap={() => {this.openLink('/search')}}>Search</MenuItem>
                    <MenuItem onClick={this.handleClose} onTouchTap={() => {this.openLink('/login')}}>Login</MenuItem>
                    <MenuItem onClick={this.handleClose} onTouchTap={() => {this.openLink('/contact')}}>Contact Us</MenuItem>
                </Drawer>
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
