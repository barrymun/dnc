import initialState from "./default.reducers";
import ac from "../_constants/action.constants";
import ic from "../_constants/item.constants";
import {getRealMana} from "../_utils/utils.utils";

export function game(state = initialState.game, action) {
  const {gold, mana, playerItems} = state;

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
      let updatedMana = {...mana};
      let realMana = getRealMana(state);

      if ((realMana.current + realMana.regenAmount) >= realMana.max) {
        updatedMana = {
          ...mana,
          current: realMana.max,
        }
      } else {
        updatedMana = {
          ...mana,
          current: realMana.current + realMana.regenAmount,
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
      let {item} = action;

      // cannot buy more than allocated amount
      if (playerItems >= ic.maxPlayerItems) return state;
      // cannot but the item if the player does not have the required gold
      if (gold.current < item.cost) return state;

      let remainingGold = gold.current - item.cost;

      return {
        ...state,
        gold: {
          ...state.gold,
          current: remainingGold,
        },
        playerItems: [
          ...state.playerItems,
          item,
        ],
      };
    default:
      return state;
  }
}