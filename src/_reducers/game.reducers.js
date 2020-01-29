import initialState from "./default.reducers";
import ac from "../_constants/action.constants";
import ic from "../_constants/item.constants";
import {
  getRealMana,
  getRealGold,
} from "../_utils/utils.utils";

export function game(state = initialState.game, action) {
  // deconstruct the state
  const {gold, mana, playerItems} = state;

  // set ...
  let item;

  switch (action.type) {
    case ac.selectTile:
      return {
        ...state,
        selectedTile: action.selectedTile,
      };
    case ac.regenGold:
      let realGold = getRealGold(state);

      return {
        ...state,
        gold: {
          ...gold,
          current: parseFloat((realGold.current + realGold.regenAmount).toFixed(1)),
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
          current: parseFloat((realMana.current + realMana.regenAmount).toFixed(1)),
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
      item = action.item;

      // cannot buy more than allocated amount
      if (playerItems.length >= ic.maxPlayerItems) return state;
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
    case ac.sell:
      item = action.item;

      let updatedGoldCurrent = gold.current + (item.cost / 2);
      let checked = false;
      let updatedPlayerItems = playerItems.filter(o => {
        if (o.id === item.id && !checked) {
          checked = true;
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        gold: {
          ...state.gold,
          current: updatedGoldCurrent,
        },
        playerItems: updatedPlayerItems,
      };
    default:
      return state;
  }
}