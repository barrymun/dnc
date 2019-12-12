import React from 'react';
import {Base} from "../_components";

import '../static/css/map.css';

class Main extends Base {

    map = null;
    isDown = false;
    startX = null;
    scrollLeft = null;
    startY = null;
    scrollTop = null;

    constructor(props) {
        super(props);
        this.map = React.createRef();
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    mouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.map.offsetLeft;
        this.scrollLeft = this.map.scrollLeft;
        this.startY = e.pageY - this.map.offsetTop;
        this.scrollTop = this.map.scrollTop;
    }

    mouseUp(e) {
        this.isDown = false;
    }

    mouseLeave(e) {
        // same behaviour as mousedown
        this.mouseUp(e);
    }

    mouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const walkX = (e.pageX - this.map.offsetLeft - this.startX);
        this.map.scrollLeft = this.scrollLeft - walkX;
        const walkY = (e.pageY - this.map.offsetTop - this.startY);
        this.map.scrollTop = this.scrollTop - walkY;
    }

    componentDidMount() {
        this.map.addEventListener('mousedown', this.mouseDown);
        this.map.addEventListener('mouseup', this.mouseUp);
        this.map.addEventListener('mouseleave', this.mouseLeave);
        this.map.addEventListener('mousemove', this.mouseMove);
    }

    componentWillUnmount() {
        this.map.removeEventListener('mousedown', this.mouseDown);
        this.map.removeEventListener('mouseup', this.mouseUp);
        this.map.removeEventListener('mouseleave', this.mouseLeave);
        this.map.removeEventListener('mousemove', this.mouseMove);
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
                <div className={`hud-container`}>
                    <div className={`hud`}/>
                </div>
            </div>
        );
    }
}

export {Main}