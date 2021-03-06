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
import TextField from "@material-ui/core/TextField";

import {internalBuildingNames, troops, troopTrainingTimes} from "../../../constants";

import '../../../static/css/Main.css';

const styles = theme => ({});

class Barracks extends React.Component {
    state = {
        open: false,
        amountOpen: false,
        name: '',
        amount: 0,
    };


    toggleOpen = () => {
        this.setState(prevState => ({open: !prevState.open}));
    };


    toggleAmountOpen = name => {
        this.setState(prevState => ({
            name: name != null ? name : ``,
            amountOpen: !prevState.amountOpen,
            amount: 0,
        }));
    };


    handleChange = name => event => {
        const value = event.target.value;

        if (isNaN(value)) return;

        this.setState({[name]: value});
    };


    train = () => {
        const {name, amount} = this.state;
        this.props.train(name, amount);
    };


    render() {
        const {
            building,
            onClick,
        } = this.props;

        const {
            open,
            amountOpen,
            name,
            amount,
        } = this.state;

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
                                    <div
                                        key={index}
                                        className={`troopItem`}
                                        onClick={() => this.toggleAmountOpen(t)}
                                    >
                                        <img
                                            alt={t}
                                            src={`troops/${t}.png`}
                                            className={`troopSvg`}
                                        />
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

                <Dialog
                    open={amountOpen}
                    onClose={() => this.toggleAmountOpen(null)}
                >
                    <DialogTitle>
                        How many {name}'s should be trained?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>

                        <TextField
                            autoFocus
                            fullWidth
                            label="Amount"
                            value={amount}
                            onChange={this.handleChange('amount')}
                            type="text"
                            margin="normal"
                            className={``}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={() => this.toggleAmountOpen(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={this.train}
                        >
                            Train
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
    train: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Barracks));
export {c as Barracks};