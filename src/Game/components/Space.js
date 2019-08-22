import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {internalBuildingNames} from "../constants";

import '../static/css/Main.css';

const styles = theme => ({
});

class Space extends React.Component {
    state = {
    };

    render() {
        const {
            building,
            onClick,
        } = this.props;

        return (
            <div onClick={onClick}>
                <img
                    alt={internalBuildingNames.SPACE}
                    src={building.src}
                    className={'internalBuildingSVG'}
                />
            </div>
        );
    }
}

Space.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Space));
export {c as Space};