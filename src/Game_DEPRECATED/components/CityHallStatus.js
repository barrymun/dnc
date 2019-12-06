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

import '../static/css/Main.css';

const styles = theme => ({});

class CityHallStatus extends React.Component {
    state = {};

    render() {
        const {
            open,
            toggleOpen,
        } = this.props;

        return (
            <Dialog
                open={open}
                onClose={toggleOpen}
            >
                <DialogTitle>
                    City info
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={toggleOpen}
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
        );
    }
}

CityHallStatus.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityHallStatus));
export {c as CityHallStatus};