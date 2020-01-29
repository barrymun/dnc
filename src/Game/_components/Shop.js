import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {store} from "../../_helpers";
import mapActions from "../../_actions/game.actions";

function Shop(props) {

  const {gold, shop} = props;

  const [values, setValues] = React.useState({
    open: false,
    item: null,
  });

  const handleOpen = () => setValues({...values, open: true});

  const handleClose = () => setValues({...values, open: false});

  const selectItem = item => setValues({...values, item});

  const deselectItem = () => setValues({...values, item: null});

  const handleBuy = () => {
    if (values.item == null) return;

    store.dispatch(mapActions.buy(values.item));
  };

  return (<div>
    <Tooltip title="Click to shop">
      <div className={`gold-hud`} onClick={handleOpen}>
        <div className={`gold-coins`}/>
        <div>
          {gold.current}
        </div>
      </div>
    </Tooltip>

    <Dialog
      open={values.open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{`Shop`}</DialogTitle>

      <DialogContent>
        <div className={`shop-items`}>
          {shop.map((o, index) => (
            <div
              key={index}
              className={`shop-item-container`}
            >
              <div>
                <Tooltip title={o.effect}>
                  <div
                    onClick={() => selectItem(o)}
                    className={`shop-item ${values.item != null && values.item.id === o.id ? `shop-item-selected` : ``}`}
                  />
                </Tooltip>
              </div>
              <div>
                {o.name}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <button onClick={handleClose}>
          Close
        </button>
        <button
          disabled={values.item == null}
          onClick={handleBuy}
        >
          Buy
        </button>
      </DialogActions>
    </Dialog>
  </div>);
}

export {Shop};