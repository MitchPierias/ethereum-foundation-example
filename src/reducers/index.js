// Modules
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import stageReducer from './StageReducer';

/*
 * Root Reducer
 * @desc A collection of all reducers combined
 * @note Combine reducer is not reuqired here but is used anyway for future features
 */
const rootReducer = combineReducers({
	stage:stageReducer
});

/*
 * Initial State
 * @desc Preloaded state tree, like history or previous session
 */
const initialState = {};

/*
 * Store
 * @desc Redux store which holds the complete state tree of the app
 */
export default createStore(rootReducer, initialState, applyMiddleware(thunk));

