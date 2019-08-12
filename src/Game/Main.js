import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {sleep} from "../resources/utils.resources";

const styles = theme => ({});

class Main extends React.Component {
    state = {
        cities: [
            {
                name: 'city',
                displayName: 'City',
                resources: {
                    food: 1000,
                    wood: 1000,
                    stone: 1000,
                    iron: 1000,
                },
                troops: {
                    transporter: 0,
                    warrior: 0,
                    scout: 0,
                    swordsman: 0,
                    pikeman: 0,
                    archer: 0,
                    cavalry: 0,
                    cataphract: 0,
                    batteringRam: 0,
                    ballista: 0,
                    catapult: 0,
                }
            }
        ],
        king: {
            name: 'king',
            level: 1,
        },
        armor: {
            legs: {
                level: 1,
            },
            chest: {
                level: 1,
            },
            arms: {
                level: 1,
            },
            shoulders: {
                level: 1,
            },
            head: {
                level: 1,
            },
            weaponry: {
                level: 1,
            },
        },
    };

    setStateAsync = state => {
        return new Promise(resolve => this.setState(state, resolve));
    };

    constructor(props) {
        super(props);
        this.updateCitiesResources = this.updateCitiesResources.bind(this);
    }

    async componentDidMount() {
        // console.log(this.state)
        await this.updateCitiesResources();
    }

    async updateCitiesResources() {
        const {cities} = this.state;

        await sleep(3);

        let updatedCities = cities.map(city => {
            let {resources} = city;
            let updatedResources = Object.keys(resources).reduce((accumulator, resource) => {
                return {
                    ...accumulator,
                    [resource]: resources[resource] + this.getKingLevelBoost()
                }
            }, {});
            return {
                ...city,
                resources: updatedResources,
            }
        });

        await this.setStateAsync({cities: updatedCities});
        console.log(this.state.cities)
        await this.updateCitiesResources();
    }

    getKingLevelBoost = () => {
        const {king} = this.state;
        return king.level * this.getArmorLevelBoost();
    };

    getArmorLevelBoost = () => {
        const {armor} = this.state;
        let boost = 0;
        Object.keys(armor).map((key, index) => boost += armor[key].level);
        return boost;
    };

    render() {
        return (
            <div>
                GAME
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Main));
export {c as Main};