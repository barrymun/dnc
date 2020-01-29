import React from 'react';
import {getRealMana} from "../_utils/utils.utils";

class Base extends React.Component {

  state = {};


  constructor(props) {
    super(props);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.getRealMana = this.getRealMana.bind(this);
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
  getRealMana() {
    return getRealMana(this.props);
  }

}

export {Base};