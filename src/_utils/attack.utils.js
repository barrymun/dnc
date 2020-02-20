/**
 *
 */

import tc from "../_constants/troop.constants";
import {troopStatsBoost} from "./utils.utils";
import _ from "lodash";


class Attack {

  constructor(props) {
    console.log({props});
    if (props == null) throw new Error("incorrect config");
    this.setState(_.cloneDeep(props));
    this.fight();
  }


  state = {};
  currentRound = 1;
  roundsRemaining = 100;
  distance = 1000;  // TODO: make this a constant
  attackersDistance = {
    [tc.warrior]: this.distance,
    [tc.swordsman]: this.distance,
    [tc.archer]: this.distance,
    [tc.cavalry]: this.distance,
  };


  getState = () => {
    return this.state;
  };


  setState = state => {
    this.state = {
      ...this.state,
      ...state,
    };
  };


  getRound = () => {
    return this.currentRound;
  };


  setRound = currentRound => {
    this.currentRound = currentRound;
  };


  getDistance = () => {
    return this.distance;
  };


  setDistance = distance => {
    this.distance = distance;
  };


  setAttackersDistance = attackersDistance => {
    this.attackersDistance = attackersDistance;
  };


  getRoundsRemaining = () => {
    return this.roundsRemaining;
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


  /**
   *
   */
  fight = () => {

    // both must have troops in order for the rounds to continue
    while (this.getRemainingNpcTroops() > 0 && this.getRemainingPlayerTroops() > 0 && this.getRoundsRemaining() > 0) {

      // console.log(`BEFORE`, this.state.map[0].troopCount, this.state.selectedTile.troopCount)
      this.move();
      this.defend();
      this.attack();
      this.setRoundsRemaining(this.getRoundsRemaining() - 1);
      // console.log(`AFTER`, this.state.map[0].troopCount, this.state.selectedTile.troopCount)
      // console.log(`----- ROUNDS LEFT: `, this.getRoundsRemaining())
    }
  };


  /**
   * advance the attackers by their given "speeds"
   */
  move = () => {
    let troopStats = troopStatsBoost(this.state);
    let attackersDistance = {};

    Object.keys(troopStats).forEach(key => {
      attackersDistance[key] = (this.attackersDistance[key] - troopStats[key].speed) >= 0
        ? this.attackersDistance[key] - troopStats[key].speed
        : 0
    });
    this.setAttackersDistance(attackersDistance);
    // console.log(this.attackersDistance)

  };


  /**
   * defenders attack the attackers first
   * this is essentially a free attack on the attackers (by the defenders)
   * defenders troop counts will remain unchanged after defending
   */
  defend = () => {
    const {
      troopStats,  // stats for defenders
      map,  // used to get the player city
      selectedTile,  // tile being attacked
    } = this.state;

    let rangeMap = Object.keys(troopStats).map(key => ({name: key, ...troopStats[key]}));
    // ascending sort: attacking troops with lowest range get attacked first
    rangeMap.sort((a, b) => a.range - b.range);

    // descending order: defending troops with highest range attack first
    let revRangeMap = [...rangeMap].reverse();

    revRangeMap.forEach(defender => {

      rangeMap.forEach(attacker => {
        // check each attacking troop against each defending troop for range
        // add each attacker (in range of the defenders) to the list
        // anything in this list will be attacked by every defending troop
        // defending troops with highest range will attack first
        // attacking troops with lowest range will be attacked first

        if (defender.range >= this.attackersDistance[attacker.name]) {
          let defendingForce = selectedTile.troopCount[defender.name] * troopStats[defender.name].attack;  // defenders attacking
          let attackingForce = map[0].troopCount[attacker.name] * troopStats[attacker.name].defence;  // attackers defending

          if (defendingForce >= attackingForce) {
            map[0].troopCount[attacker.name] = 0;
          } else {
            map[0].troopCount[attacker.name] = ~~((attackingForce - defendingForce) / troopStats[attacker.name].defence);
          }
        }

      });

    });

  };


  /**
   * attackers attack the defenders
   */
  attack = () => {
    const {
      map,  // used to get the player city
      selectedTile,  // tile being attacked
    } = this.state;

    // stats for attackers (when retrieving range)
    let troopStats = troopStatsBoost(this.state);
    let rangeMap = Object.keys(troopStats).map(key => ({name: key, ...troopStats[key]}));
    // ascending sort: defending troops with lowest range get attacked first
    rangeMap.sort((a, b) => a.range - b.range);

    // descending order: attacking troops with highest range attack first
    let revRangeMap = [...rangeMap].reverse();

    revRangeMap.forEach(attacker => {

      rangeMap.forEach(defender => {

        if (attacker.range >= this.attackersDistance[attacker.name]) {
          let defendingForce = selectedTile.troopCount[defender.name] * troopStats[defender.name].defence;  // defenders defending
          let attackingForce = map[0].troopCount[attacker.name] * troopStats[attacker.name].attack;  // attackers attacking

          if (defendingForce >= attackingForce) {
            map[0].troopCount[attacker.name] = 0;
            selectedTile.troopCount[defender.name] = ~~((defendingForce - attackingForce) / troopStats[defender.name].defence);
          } else {
            map[0].troopCount[attacker.name] = ~~((attackingForce - defendingForce) / troopStats[attacker.name].attack);
            selectedTile.troopCount[defender.name] = 0;
          }
        }

      });
    });


  };

}

export {Attack};