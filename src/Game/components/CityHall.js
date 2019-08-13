import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg';

import withStyles from "@material-ui/core/styles/withStyles";

import {internalBuildingNames} from "../constants";

import '../static/css/Main.css';

const styles = theme => ({
});

class CityHall extends React.Component {
    state = {};

    render() {
        const {
            classes,
            cityHall,
        } = this.props;

        return (
            <div>
                <ReactSVG
                    src="city/internal/cityHall.svg"
                    className={'cityHallSVG'}
                />
            </div>
        );
    }
}

CityHall.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    [internalBuildingNames.CITY_HALL]: PropTypes.object.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityHall));
export {c as CityHall};