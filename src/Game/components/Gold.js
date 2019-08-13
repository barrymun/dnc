import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        overflowX: 'auto',
        maxWidth: 200,
    },
});

class Gold extends React.Component {
    state = {};

    render() {
        const {
            classes,
            gold,
        } = this.props;

        return (
            <Paper className={classes.root}>
                Gold {gold}
            </Paper>
        );
    }
}

Gold.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    gold: PropTypes.number.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Gold));
export {c as Gold};