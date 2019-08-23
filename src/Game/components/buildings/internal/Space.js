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

class Space extends React.Component {
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
                        What do you want to build?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>

                        <div className={`buildingSelection`}>
                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.COMMAND_CENTRE}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.COMMAND_CENTRE}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.WATCHTOWER}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.WATCHTOWER}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.STABLE}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.STABLE}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.MARKETPLACE}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.MARKETPLACE}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.COLLEGE}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.COLLEGE}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.WORKSHOP}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.WORKSHOP}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.BARRACKS}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.BARRACKS}
                                </div>
                            </div>

                            <div className={`buildItem`}>
                                <img
                                    alt={internalBuildingNames.COTTAGE}
                                    src={`city/internal/space.png`}
                                    className={'internalBuildingSVG'}
                                />
                                <div>
                                    {internalBuildingNames.COTTAGE}
                                </div>
                            </div>
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

Space.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    build: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Space));
export {c as Space};