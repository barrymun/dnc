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

import {internalBuildingNames, troops, troopTrainingTimes} from "../../../constants";

import '../../../static/css/Main.css';

const styles = theme => ({});

class Barracks extends React.Component {
    state = {
        open: false,
    };

    toggleOpen = () => {
        this.setState(prevState => ({open: !prevState.open}));
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
                        alt={internalBuildingNames.BARRACKS}
                        src={building.src}
                        className={'internalBuildingSVG'}
                    />
                </div>

                <Dialog
                    open={open}
                    onClose={this.toggleOpen}
                >
                    <DialogTitle>
                        What do you want to train?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>

                        <div className={`dialogSelection`}>
                            {troops.map((t, index) => {
                                return (
                                    <div key={index}>
                                        <div>img</div>
                                        <div>{t}</div>
                                        <div>Time: {troopTrainingTimes[t]}</div>
                                    </div>
                                )
                            })}
                        </div>

                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={this.toggleOpen}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Barracks.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Barracks));
export {c as Barracks};