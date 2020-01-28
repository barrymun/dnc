import React from 'react';

import "../static/css/hud.css";

function Mana(props) {
    let mana = props.mana;
    let n = mana.current;
    let d = mana.max;

    return (<div>
        <div className={`_mh-container`}>
            <div
                className={`_mh-inner mana-container`}
                style={{width: `${n / d * 100}%`}}
            />
            <div className={`_mh-amount-text`}>
                {n}/{d}
            </div>
            <div className={`_mh-regen-text`}>
                +{mana.regenAmount}
            </div>
        </div>
    </div>);
}

export {Mana};