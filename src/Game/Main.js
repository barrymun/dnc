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
                [troopNames.TRANSPORTER]: 0,
                [troopNames.WARRIOR]: 0,
                [troopNames.SCOUT]: 0,
                [troopNames.SWORDSMAN]: 0,
                [troopNames.PIKEMAN]: 0,
                [troopNames.ARCHER]: 0,
                [troopNames.CAVALRY]: 0,
                [troopNames.CATAPHRACT]: 0,
                [troopNames.RAM]: 0,
                [troopNames.BALLISTA]: 0,
                [troopNames.CATAPULT]: 0,
            },
            buildings: {
                internal: {
                    required: [
                        {
                            name: internalBuildingNames.CITY_HALL,
                            level: 1,
                            src: `city/internal/cityHall.png`,
                        },
                        {
                            name: internalBuildingNames.CITY_WALL,
                            level: 1,
                        },
                    ],
                    optional: [
                        ...Array(24).fill(
                            {
                                name: internalBuildingNames.SPACE,
                                level: 1,
                                src: `city/internal/space.png`,
                            }
                        )
                    ],
                },
                external: {
                    required: [
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
                    optional: [
                        ...Array(24).fill(
                            {
                                name: internalBuildingNames.SPACE,
                                level: 1,
                                src: `city/internal/space.png`,
                            }
                        )
                    ],
                },
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


    /**
     * don't set the state if one of the initial checks fail
     * this will prevent open dialogs from closing in situations where we do not want them to close
     * 
     * @param i
     * @param j
     * @param name
     * @returns {Promise<void>}
     */
    buildInternal = async (i, j, name) => {
        // check for null values
        if (i == null || j == null || name == null) return Promise.resolve();

        // check if it is permitted to build this building
        if (!this.canBuildInternal(name)) return Promise.resolve();

        const {cities, currentCity} = this.state;
        let optionalBuildingArray = cities[currentCity].buildings.internal.optional;
        let chunkSize = 6;
        let index = (i * chunkSize) + j;

        optionalBuildingArray[index] = {
            name,
            level: 1,
            src: `city/internal/${name}.png`
        };

        return this.setStateAsync(prevState => ({
            cities: [
                ...prevState.cities.slice(0, prevState.currentCity),
                {
                    ...prevState.cities[prevState.currentCity],
                    buildings: {
                        ...prevState.cities[prevState.currentCity].buildings,
                        internal: {
                            ...prevState.cities[prevState.currentCity].buildings.internal,
                            optional: optionalBuildingArray,
                        }
                    }
                },
                ...prevState.cities.slice(prevState.currentCity + 1),
            ],
        }));
    };


    /**
     * * used to check how many of each optional building type are permitted
     * (for internal buildings)
     * for example, there can only be 1 workshop, but many cottages can exist
     *
     * @param name
     */
    canBuildInternal = name => {
        const {cities, currentCity} = this.state;
        const limited = [
            internalBuildingNames.COMMAND_CENTRE,
            internalBuildingNames.WATCHTOWER,
            internalBuildingNames.STABLE,
            internalBuildingNames.MARKETPLACE,
            internalBuildingNames.COLLEGE,
            internalBuildingNames.WORKSHOP,
        ];

        return !cities[currentCity].buildings.internal.optional
            .some(o => o.name === name && limited.includes(name));
    };


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
                <CityMap
                    buildings={cities[currentCity].buildings.internal}
                    build={this.buildInternal}
                />
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