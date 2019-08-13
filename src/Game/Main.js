import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {sleep} from "../resources/utils.resources";
import {
    CityMap,
    Gold,
} from "./components";
import {
    troopNames,
    resourceNames, internalBuildingNames,
} from "./constants";
import {externalBuildingConstants} from "./constants/external.building.constants";
import HUD from "./components/HUD";

import './static/css/Main.css';

const styles = theme => ({});
const delay = 10;
const defaultState = {
    cities: [
        {
            name: 'city',
            displayName: 'City',
            resources: {
                [resourceNames.FOOD]: 1000,
                [resourceNames.WOOD]: 1000,
                [resourceNames.STONE]: 1000,
                [resourceNames.IRON]: 1000,
            },
            troops: {
                [troopNames.TRS]: 0,
                [troopNames.WAR]: 0,
                [troopNames.SCT]: 0,
                [troopNames.SWD]: 0,
                [troopNames.PKE]: 0,
                [troopNames.ARC]: 0,
                [troopNames.CAV]: 0,
                [troopNames.CAT]: 0,
                [troopNames.RAM]: 0,
                [troopNames.BAL]: 0,
                [troopNames.PUL]: 0,
            },
            buildings: {
                internal: [
                    {
                        name: internalBuildingNames.CITY_HALL,
                        level: 1,
                        src: "city/internal/cityHall.png",
                    },
                    {
                        name: internalBuildingNames.CITY_WALL,
                        level: 1,
                    },
                    ...Array(24).fill(
                        {
                            name: internalBuildingNames.SPACE,
                            level: 1,
                            src: "city/internal/space.png",
                        }
                    )
                ],
                external: [
                    {
                        name: externalBuildingConstants.FARM,
                        level: 1,
                    },
                    {
                        name: externalBuildingConstants.MILL,
                        level: 1,
                    },
                    {
                        name: externalBuildingConstants.QUARRY,
                        level: 1,
                    },
                    {
                        name: externalBuildingConstants.MINE,
                        level: 1,
                    },
                ],
            }
        }
    ],
    currentCity: 0,  // index of the city in view
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
    gold: 10000,
};

class Main extends React.Component {
    state = {
        ...defaultState,
    };

    setStateAsync = state => {
        return new Promise(resolve => this.setState(state, resolve));
    };

    constructor(props) {
        super(props);
        this.updateCitiesResources = this.updateCitiesResources.bind(this);
    }

    async componentDidMount() {
        console.log(this.state)
        await this.updateCitiesResources();
    }

    async updateCitiesResources() {
        const {cities} = this.state;

        await sleep(delay);

        let updatedCities = cities.map(city => {
            let {resources} = city;
            let updatedResources = Object.keys(resources).reduce((accumulator, resource) => {
                return {
                    ...accumulator,
                    [resource]: resources[resource] + (this.getKingLevelBoost() * delay),
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
        const {cities, currentCity, gold} = this.state;

        return (
            <div>
                <Gold gold={gold}/>
                <CityMap buildings={cities[currentCity].buildings.internal}/>
                <div className={'HUDContainer'}>
                    <HUD
                        cities={cities}
                        currentCity={currentCity}
                    />
                </div>
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