import {combineReducers} from 'redux';
import {textWithNameReducer} from './components/redux/Reducers';

export const rootReducer = combineReducers({
    message: textWithNameReducer
});