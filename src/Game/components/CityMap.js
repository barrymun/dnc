import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {CityHall} from "./CityHall";
import {internalBuildingNames} from "../constants";

const styles = theme => ({});

class CityMap extends React.Component {
    state = {};

    render() {
        const {
            buildings,
        } = this.props;

        const cityHall = buildings.internal.filter(o => o.name === internalBuildingNames.CITY_HALL)[0];

        return (
            <div>
                <CityHall cityHall={cityHall}/>
            </div>
        );
    }
}

CityMap.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    buildings: PropTypes.object.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityMap));
export {c as CityMap};