import {combineReducers} from 'redux';
import {game} from "./game.reducers";

const rootReducer = combineReducers({
    game,
});
export default rootReducer;