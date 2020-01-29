import React from 'react';
import {Tooltip} from "@material-ui/core";
import ic from "../../_constants/item.constants";

function PlayerItems(props) {
  let {playerItems} = props;

  while (playerItems.length < ic.maxPlayerItems) {
    playerItems = [...playerItems, null]
  }

  return (<div>
    <div className={`player-items`}>
      {playerItems.map((o, index) => {
        return (<div key={index}>
          {o == null
            ? <div className={`player-item player-item-blank`}/>
            : <Tooltip title={`${o.name}: ${o.effect}`}>
              <div className={`player-item player-item-purchased`}/>
            </Tooltip>
          }
        </div>);
      })}
    </div>
  </div>);
}

export {PlayerItems};