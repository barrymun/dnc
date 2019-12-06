import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const styles = theme => ({
    root: {
        overflowX: 'auto',
    },
    table: {
        minWidth: 200,
    },
});

class Troops extends React.Component {
    state = {};

    render() {
        const {
            classes,
            troops,
        } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        {Object.keys(troops).map((key, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{troops[key]}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Troops.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    troops: PropTypes.object.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Troops));
export {c as Troops};