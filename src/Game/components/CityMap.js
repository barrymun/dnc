import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {
    CityHall,
    Space,
} from "./";
import {internalBuildingNames} from "../constants";
import {createChunks} from "../../resources/utils.resources";

import '../static/css/Main.css';

const styles = theme => ({});

class CityMap extends React.Component {
    state = {
        xPos: null,
        yPos: null,
    };

    setPosition = async (xPos, yPos) => {
        return new Promise(resolve =>
            this.setState({xPos, yPos}, resolve));
    };

    render() {
        const {
            buildings,
            build,
        } = this.props;

        let required = buildings.required;
        let optional = buildings.optional;

        let cityHall = required.filter(o => o.name === internalBuildingNames.CITY_HALL)[0];
        let cityWall = required.filter(o => o.name === internalBuildingNames.CITY_WALL)[0];

        // split into chunks for display
        optional = createChunks(optional, 6);

        return (
            <div className={'cityMap'}>
                <CityHall cityHall={cityHall}/>
                {optional.map((chunk, i) => {
                    return (
                        <div
                            key={i}
                            className={'internalBuildingContainer'}
                        >
                            {chunk.map((building, j) => {
                                if (building.name === internalBuildingNames.SPACE)
                                    return (
                                        <Space
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                            build={build}
                                        />
                                    );
                                else
                                    return (
                                        <div key={j}>null</div>
                                    )
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

CityMap.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    buildings: PropTypes.object.isRequired,
    build: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityMap));
export {c as CityMap};