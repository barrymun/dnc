import React from 'react';
import {Base} from "../_components";

import '../static/css/map.css';

class Main extends Base {
    render() {
        const {map} = this.props;

        return (
            <div className={`container`}>
                <div className={`map`}>
                    {map.map((section, index) => (
                        <div
                            key={index}
                            className={`tile-container`}
                        >
                            {section.map((tile, index) => (
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