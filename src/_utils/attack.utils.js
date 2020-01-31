/**
 *
 */

import tc from "../_constants/troop.constants";
import {getTroopStatsBoost} from "./utils.utils";


class Attack {

  constructor(props) {
    console.log({props});
    if (props == null) throw new Error("incorrect config");
    this.setState(props);
    this.fight();
  }


  state = {};
  round = 1;
  distance = 1000;  // TODO: make this a constant
  attackersDistance = {
    [tc.warrior]: this.distance,
    [tc.swordsman]: this.distance,
    [tc.archer]: this.distance,
    [tc.cavalry]: this.distance,
  };


  setState = (state) => {
    this.state = {
      ...this.state,
      ...state,
    };
  };


  setRound = (round) => {
    this.round = round;
  };


  setDistance = (distance) => {
    this.distance = distance;
  };


  setAttackersDistance = (attackersDistance) => {
    this.attackersDistance = attackersDistance;
  };


  getRemainingNpcTroops = () => {
    const {selectedTile} = this.state;
    return Object.values(selectedTile.troopCount).reduce((acc, value) => acc + value);
  };


  getRemainingPlayerTroops = () => {
    const {map} = this.state;
    return Object.values(map[0].troopCount).reduce((acc, value) => acc + value);
  };


  fight = () => {

    while (this.getRemainingNpcTroops() > 0 && this.getRemainingPlayerTroops() > 0) {
      // both must have troops in order for the rounds to continue

      this.move();
      break;  // 1 iteration only for now
    }
  };


  move = () => {
    let troopStats = getTroopStatsBoost(this.state);
    console.log({troopStats})

    let attackersDistance = {}

    Object.keys(troopStats).forEach(key => {
      attackersDistance[key] = (this.attackersDistance[key] - troopStats[key].speed) >= 0
        ? this.attackersDistance[key] - troopStats[key].speed
        : 0
    });
    this.setAttackersDistance(attackersDistance)
    console.log(this.attackersDistance)
  };

}

export {Attack};