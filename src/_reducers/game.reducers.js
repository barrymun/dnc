import initialState from "./default.reducers";
import ac from "../_constants/action.constants";

export function game(state = initialState.game, action) {
    switch (action.type) {
        case ac.selectTile:
            return {
                ...state,
                selectedTile: action.selectedTile,
            };
        default:
            return state;
    }
}