import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {CityHallStatus} from "../components";
import {internalBuildingNames} from "../constants";

import '../static/css/Main.css';

const styles = theme => ({
});

class CityHall extends React.Component {
    state = {
        cityHallStatusOpen: false,
    };

    toggleCityHallStatusOpen = () => {
        this.setState(prevState => ({cityHallStatusOpen: !prevState.cityHallStatusOpen}));
    };

    render() {
        const {
            cityHall,
        } = this.props;

        const {
            cityHallStatusOpen,
        } = this.state;

        return (
            <div>
                <img
                    onClick={this.toggleCityHallStatusOpen}
                    alt={internalBuildingNames.CITY_HALL}
                    src={cityHall.src}
                    className={'cityHallSVG'}
                />
                <CityHallStatus
                    open={cityHallStatusOpen}
                    toggleOpen={this.toggleCityHallStatusOpen}
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