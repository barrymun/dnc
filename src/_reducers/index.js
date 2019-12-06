import {combineReducers} from 'redux';
import {map} from "./map.reducers";

const rootReducer = combineReducers({
    map,
});
export default rootReducer;