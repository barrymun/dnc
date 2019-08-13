import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        maxWidth: 200,
    },
});

class CityHall extends React.Component {
    state = {};

    render() {
        const {
            classes,
            level,
        } = this.props;

        return (
            <div>
                City Hall
            </div>
        );
    }
}

CityHall.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityHall));
export {c as CityHall};