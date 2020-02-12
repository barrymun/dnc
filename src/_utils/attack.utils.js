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
  currentRound = 1;
  roundsRemaining = 20;
  distance = 1000;  // TODO: make this a constant
  attackersDistance = {
    [tc.warrior]: this.distance,
    [tc.swordsman]: this.distance,
    [tc.archer]: this.distance,
    [tc.cavalry]: this.distance,
  };


  setState = state => {
    this.state = {
      ...this.state,
      ...state,
    };
  };


  setRound = currentRound => {
    this.currentRound = currentRound;
  };


  setDistance = distance => {
    this.distance = distance;
  };


  setAttackersDistance = attackersDistance => {
    this.attackersDistance = attackersDistance;
  };


  setRoundsRemaining = roundsRemaining => {
    this.roundsRemaining = roundsRemaining;
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

    while (this.getRemainingNpcTroops() > 0 && this.getRemainingPlayerTroops() > 0 && this.roundsRemaining > 0) {
      // both must have troops in order for the rounds to continue

      this.move();
      this.defend();
      this.setRoundsRemaining(this.roundsRemaining - 1)
      // break;  // 1 iteration only for now
    }
  };


  move = () => {
    let troopStats = getTroopStatsBoost(this.state);
    let attackersDistance = {};

    Object.keys(troopStats).forEach(key => {
      attackersDistance[key] = (this.attackersDistance[key] - troopStats[key].speed) >= 0
        ? this.attackersDistance[key] - troopStats[key].speed
        : 0
    });
    this.setAttackersDistance(attackersDistance);
    console.log(this.attackersDistance)

  };


  defend = () => {
    const {
      map,
      troopStats,  // stats for defenders
    } = this.state;

    // console.log(this.attackersDistance)

    Object.keys(troopStats).forEach(defKey => {
      Object.keys(troopStats).forEach(atkKey => {
        // console.log(troopStats[defKey].range, this.attackersDistance[atkKey])
        if (troopStats[defKey].range >= this.attackersDistance[atkKey]) console.log(`YES_${defKey}_${atkKey}`)
      });
    });
  };

}

export {Attack};