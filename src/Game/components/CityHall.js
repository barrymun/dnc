import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {internalBuildingNames} from "../constants";

import '../static/css/Main.css';

const styles = theme => ({
});

class CityHall extends React.Component {
    state = {};

    render() {
        const {
            cityHall,
        } = this.props;

        return (
            <div>
                <img
                    onClick={() => console.log('CLICKED')}
                    alt={internalBuildingNames.CITY_HALL}
                    src={cityHall.src}
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