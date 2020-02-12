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
      this.setRoundsRemaining(this.roundsRemaining - 1);
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
    // console.log(this.attackersDistance)

  };


  defend = () => {
    const {
      troopStats,  // stats for defenders
      // map,  // used to get the player city
      // selectedTile,  // tile being attacked
    } = this.state;

    let rangeMap = Object.keys(troopStats).map(key => ({name: key, ...troopStats[key]}));
    // ascending sort: attacking troops with lowest range get attacked first
    rangeMap.sort((a, b) => a.range - b.range);
    console.log({rangeMap})

    // descending order: defending troops with highest range attack first
    let revRangeMap = [...rangeMap].reverse();

    revRangeMap.forEach(defender => {

      // attacking troops (keys) in range of the defenders for this round
      let inRange = [];

      rangeMap.forEach(attacker => {
        // check each attacking troop against each defending troop for range
        // add each attacker (in range of the defenders) to the list
        // anything in this list will be attacked by every defending troop
        // defending troops with highest range will attack first
        // attacking troops with lowest range will be attacked first

        if (defender.range >= this.attackersDistance[attacker.name]) inRange = [...inRange, attacker];
      });

      console.log({inRange})

    });

  };

}

export {Attack};