import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import NewPost from './containers/NewPost';
import Post from './containers/Post';
import Search from './containers/Search';
import Contacts from './containers/Contacts';
import NotFoundPage from './components/NotFoundPage';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>experiments
            <IndexRoute component={Home} ignoreScrollBehavior />
            <Route path="Home" component={Home} ignoreScrollBehavior/>
            <Route path="newpost" component={NewPost} ignoreScrollBehavior/>
            <Route path="post" component={Post} ignoreScrollBehavior/>
            <Route path="search" component={Search} ignoreScrollBehavior/>
            <Route path="contact" component={Contacts} ignoreScrollBehavior/>
            <Route path="*" component={NotFoundPage} ignoreScrollBehavior/>
        </Route>
    </Router>
);
