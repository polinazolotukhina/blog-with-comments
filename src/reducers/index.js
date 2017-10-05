import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    firebase: firebaseStateReducer
});

export default rootReducer;
