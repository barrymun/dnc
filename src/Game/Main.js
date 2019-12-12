import React from 'react';
import {Base} from "../_components";

import '../static/css/map.css';

class Main extends Base {

    map = null;
    clicked = false;
    clickY = null;
    clickX = null;

    constructor(props) {
        super(props);
        this.map = React.createRef();
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    mouseMove(e) {
        this.clicked && this.updateMapPos(e);
    }

    updateMapPos = e => {
        this.map.scrollTop += parseInt((this.clickY - e.pageY) / 50);
        this.map.scrollLeft += parseInt((this.clickX - e.pageX) / 50);
    };

    mouseDown(e) {
        this.clicked = true;
        this.clickY = e.pageY;
        this.clickX = e.pageX;
    }

    mouseUp(e) {
        this.clicked = false;
    }

    componentDidMount() {
        this.map.addEventListener('mousemove', this.mouseMove);
        this.map.addEventListener('mousedown', this.mouseDown);
        this.map.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount() {
        this.map.removeEventListener('mousemove', this.mouseMove);
        this.map.removeEventListener('mousedown', this.mouseDown);
        this.map.removeEventListener('mouseup', this.mouseUp);
    }

    render() {
        const {map} = this.props;

        return (
            <div className={`container`}>
                <div
                    ref={node => this.map = node}
                    className={`map`}
                >
                    {map.map((row, index) => (
                        <div
                            key={index}
                            className={`tile-container`}
                        >
                            {row.map((tile, index) => (
                                <div
                                    key={index}
                                    className={`tile`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className={`items-hud`}/>
            </div>
        );
    }
}

export {Main}