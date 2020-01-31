import React from 'react';
import {getManaBoost} from "../_utils/utils.utils";

class Base extends React.Component {

  state = {};


  constructor(props) {
    super(props);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.getManaBoost = this.getManaBoost.bind(this);
  }


  /**
   *
   * @param state
   * @returns {Promise<unknown>}
   */
  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }


  /**
   *
   * @returns {{max: *, regenAmount: number}}
   */
  getManaBoost() {
    return getManaBoost(this.props);
  }

}

export {Base};