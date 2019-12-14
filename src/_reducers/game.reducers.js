import initialState from "./default.reducers";
import ac from "../_constants/action.constants";

export function game(state = initialState.game, action) {
    switch (action.type) {
        case ac.selectTileId:
            return {
                ...state,
                selectedTileId: action.selectedTileId,
            };
        default:
            return state;
    }
}