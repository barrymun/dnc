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
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        maxWidth: 200,
    },
    table: {
        minWidth: 200,
    },
});

class Resources extends React.Component {
    state = {};

    render() {
        const {
            classes,
            resources,
        } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        {Object.keys(resources).map((key, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{resources[key]}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Resources.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(Resources));
export {c as Resources};