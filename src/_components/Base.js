import React from 'react';

class Base extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        this.setStateAsync = this.setStateAsync.bind(this);
    }


    /**
     *
     * @param state
     * @returns {Promise<unknown>}
     */
    setStateAsync(state) {
        return new Promise(resolve => this.setState(state, resolve));
    }

}

export {Base};