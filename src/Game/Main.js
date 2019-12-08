import React from 'react';
import {Base} from "../_components";

import '../static/css/map.css';

class Main extends Base {
    render() {
        return (
            <div className={`container`}>
                <div className={`map`}>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                    <div className={`tile-flat`}/>
                </div>
                <div className={`items-hud`}/>
            </div>
        );
    }
}

export {Main}