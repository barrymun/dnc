import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Resources} from "./Resources";
import {Troops} from "./Troops";

import '../static/css/Main.css';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

export default function HUD(props) {
    // const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {cities, currentCity} = props;

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={'HUD'}>
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Resources" {...a11yProps(0)} />
                    <Tab label="Troops" {...a11yProps(1)} />
                </Tabs>
            </div>
            <TabPanel
                className={'TabPanel'}
                value={value}
                index={0}
            >
                <Resources resources={cities[currentCity].resources}/>
            </TabPanel>
            <TabPanel
                className={'TabPanel'}
                value={value}
                index={1}
            >
                <Troops troops={cities[currentCity].troops}/>
            </TabPanel>
        </div>
    );
}

HUD.propTypes = {
    cities: PropTypes.array.isRequired,
    currentCity: PropTypes.number.isRequired,
};