import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {
    CityHall,
    Space,
    CommandCentre,
    Barracks,
    College,
    Cottage,
    Marketplace,
    Stable,
    Watchtower,
    Workshop
} from "./";
import {internalBuildingNames} from "../constants";
import {createChunks} from "../../resources/utils.resources";

import '../static/css/Main.css';

const styles = theme => ({});

class CityMap extends React.Component {
    state = {
        xPos: null,
        yPos: null,
    };


    setPosition = async (xPos, yPos) => {
        return new Promise(resolve =>
            this.setState({xPos, yPos}, resolve));
    };


    build = async name => {
        const {xPos, yPos} = this.state;
        return this.props.build(xPos, yPos, name);
    };


    render() {
        const {
            city,
            train,
        } = this.props;

        let required = city.buildings.internal.required;
        let optional = city.buildings.internal.optional;

        let cityHall = required.filter(o => o.name === internalBuildingNames.CITY_HALL)[0];
        let cityWall = required.filter(o => o.name === internalBuildingNames.CITY_WALL)[0];

        // split into chunks for display
        optional = createChunks(optional, 6);

        return (
            <div className={'cityMap'}>
                <CityHall cityHall={cityHall}/>
                {optional.map((chunk, i) => {
                    return (
                        <div
                            key={i}
                            className={'internalBuildingContainer'}
                        >
                            {chunk.map((building, j) => {
                                if (building.name === internalBuildingNames.SPACE)
                                    return (
                                        <Space
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                            build={this.build}
                                        />
                                    );
                                if (building.name === internalBuildingNames.COMMAND_CENTRE)
                                    return (
                                        <CommandCentre
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.WATCHTOWER)
                                    return (
                                        <Watchtower
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.STABLE)
                                    return (
                                        <Stable
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.MARKETPLACE)
                                    return (
                                        <Marketplace
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.COLLEGE)
                                    return (
                                        <College
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.WORKSHOP)
                                    return (
                                        <Workshop
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                if (building.name === internalBuildingNames.BARRACKS)
                                    return (
                                        <Barracks
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                            train={train}
                                        />
                                    );
                                if (building.name === internalBuildingNames.COTTAGE)
                                    return (
                                        <Cottage
                                            key={j}
                                            building={building}
                                            onClick={async () => await this.setPosition(i, j)}
                                        />
                                    );
                                else
                                    return (
                                        <div key={j}>null</div>
                                    )
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

CityMap.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    build: PropTypes.func.isRequired,
    train: PropTypes.func.isRequired,
};

const c = connect()(withStyles(styles, {withTheme: true})(CityMap));
export {c as CityMap};