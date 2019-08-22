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

import {internalBuildingNames} from "../constants";

import '../static/css/Main.css';

const styles = theme => ({});

class Space extends React.Component {
    state = {
        open: false,
    };

    toggleOpen = () => {
        this.setState(prevState => ({open: !prevState.open}), () => console.log(this.state.open));
    };

    render() {
        const {
            building,
            onClick,
        } = this.props;

        const {open} = this.state;

        return (
            <div>
                <div onClick={() => {
                    onClick();
                    this.toggleOpen()
                }}>
                    <img
                        alt={internalBuildingNames.SPACE}
                        src={building.src}
                        className={'internalBuildingSVG'}
                    />
                </div>

                <Dialog
                    open={open}
                    onClose={this.toggleOpen}
                >
                    <DialogTitle>
                        Build something
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={this.toggleOpen}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Space.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    build: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Space));
export {c as Space};