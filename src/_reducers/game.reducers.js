import initialState from "./default.reducers";
import ac from "../_constants/action.constants";

export function game(state = initialState.game, action) {
  switch (action.type) {
    case ac.selectTile:
      return {
        ...state,
        selectedTile: action.selectedTile,
      };
    case ac.regenGold:
      return {
        ...state,
        gold: {
          ...state.gold,
          current: state.gold.current + state.gold.regenAmount,
        },
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
    case ac.regenTroops:
      let playerTroops = state.map[0].troops;
      Object.keys(playerTroops).forEach(key => playerTroops[key] += state.troopGen[key]);

      return {
        ...state,
        map: {
          ...state.map,
          0: {
            ...state.map[0],
            troops: playerTroops,
          },
        },
      };
    case ac.attack:
      return {
        ...state,
      };
    case ac.buy:
      console.log(action.item)
      return {
        ...state,
      };
    default:
      return state;
  }
}