import initialState from "./default.reducers";
import ac from "../_constants/action.constants";

export function game(state = initialState.game, action) {
    switch (action.type) {
        case ac.selectTile:
            return {
                ...state,
                selectedTile: action.selectedTile,
            };
        case ac.regenMana:
            let updatedMana = {...state.mana};

            if ((state.mana.current + state.mana.regenAmount) >= state.mana.max) {
                updatedMana = {
                    ...updatedMana,
                    current: state.mana.max,
                }
            } else {
                updatedMana = {
                    ...updatedMana,
                    current: updatedMana.current + state.mana.regenAmount,
                }
            }

            return {
                ...state,
                mana: updatedMana,
            };
        default:
            return state;
    }
}