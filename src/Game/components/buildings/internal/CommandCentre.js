import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import {internalBuildingNames} from "../../../constants";

import '../../../static/css/Main.css';

const styles = theme => ({});

class CommandCentre extends React.Component {
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
                        alt={internalBuildingNames.COMMAND_CENTRE}
                        src={building.src}
                        className={'internalBuildingSVG'}
                    />
                </div>
            </div>
        );
    }
}

CommandCentre.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CommandCentre));
export {c as CommandCentre};