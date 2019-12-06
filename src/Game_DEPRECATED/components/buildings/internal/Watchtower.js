import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {internalBuildingNames} from "../../../constants";

import '../../../static/css/Main.css';

const styles = theme => ({});

class Watchtower extends React.Component {
    state = {
    };

    render() {
        const {
            building,
            onClick,
        } = this.props;

        return (
            <div>
                <div onClick={onClick}>
                    <img
                        alt={internalBuildingNames.WATCHTOWER}
                        src={building.src}
                        className={'internalBuildingSVG'}
                    />
                </div>
            </div>
        );
    }
}

Watchtower.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Watchtower));
export {c as Watchtower};