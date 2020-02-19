import _ from "lodash";
import initialState from "./default.reducers";
import ac from "../_constants/action.constants";
import ic from "../_constants/item.constants";
import {
  getManaBoost,
  goldBoost,
} from "../_utils/utils.utils";
import {Attack} from "../_utils/attack.utils";

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
      let realGold = goldBoost(state);

      return {
        ...state,
        gold: {
          ...gold,
          current: parseFloat((realGold.current + realGold.regenAmount).toFixed(1)),
        },
      };
    case ac.regenMana:
      let updatedMana = {...mana};
      let realMana = getManaBoost(state);

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
      let playerTroops = state.map[0].troopCount;
      Object.keys(playerTroops).forEach(key => playerTroops[key] += state.troopGen[key]);

      return {
        ...state,
        map: {
          ...state.map,
          0: {
            ...state.map[0],
            troopCount: playerTroops,
          },
        },
      };
    case ac.attack:
      // npcCity = action.tile;
      // playerCity = map[0];
      // // console.log({npcCity, playerCity})
      //
      // let r = getTroopStatsBoost(state);
      // console.log({r})
      //
      // let remainingNpcTroops = Object.values(npcCity.troopCount).reduce((acc, value) => acc + value);
      // let remainingPlayerTroops = Object.values(playerCity.troopCount).reduce((acc, value) => acc + value);
      // console.log({remainingNpcTroops, remainingPlayerTroops})

      let attack = new Attack(_.cloneDeep(state))



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