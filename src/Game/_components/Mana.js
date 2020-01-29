import React from 'react';
import {getRealMana} from "../../_utils/utils.utils";

function Mana(props) {
    let mana = getRealMana(props);
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