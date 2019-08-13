import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";

import withStyles from "@material-ui/core/styles/withStyles";

import {CityHall} from "./CityHall";
import {internalBuildingNames} from "../constants";
import {createChunks} from "../../resources/utils.resources";

import '../static/css/Main.css';

const styles = theme => ({});

class CityMap extends React.Component {
    state = {};

    render() {
        const {
            buildings,
        } = this.props;

        let cityHall, cityWall;

        let remainingBuildings = buildings
            .map(building => {
                if (building.name === internalBuildingNames.CITY_HALL) {
                    cityHall = building;
                    return null;
                }

                if (building.name === internalBuildingNames.CITY_WALL) {
                    cityWall = building;
                    return null;
                }

                return building;
            })
            .filter(o => o != null);

        // split into chunks for display
        remainingBuildings = createChunks(remainingBuildings, 6);

        return (
            <div>
                <CityHall cityHall={cityHall}/>
                {
                    remainingBuildings.map((chunk, index) => {
                        return (
                            <div
                                key={index}
                                className={'internalBuildingContainer'}
                            >
                                {
                                    chunk.map((building, index) => {
                                        return (
                                            <div
                                                key={index}
                                            >
                                                <ReactSVG
                                                    src={building.image}
                                                    className={'internalBuildingSVG'}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

CityMap.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    buildings: PropTypes.array.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityMap));
export {c as CityMap};