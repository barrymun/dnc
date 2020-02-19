import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {store} from "../../_helpers";
import gameActions from "../../_actions/game.actions";
import ic from "../../_constants/item.constants";
import {goldBoost} from "../../_utils/utils.utils";

function Shop(props) {

  const {shop, playerItems} = props;
  const gold = goldBoost(props);

  const [values, setValues] = React.useState({
    open: false,
    item: null,
    activeTab: 0,  // 0 is buy, 1 is sell
  });

  // console.log({playerItems})

  const handleOpen = () => setValues({...values, open: true});

  const handleClose = () => setValues({...values, open: false, item: null});

  const selectItem = item => setValues({...values, item});

  const deselectItem = () => setValues({...values, item: null});

  const setActiveTab = activeTab => setValues({...values, activeTab, item: null});

  const buyDisabled = values.item == null || gold.current < values.item.cost || playerItems.length >= ic.maxPlayerItems;

  const sellDisabled = values.item == null;

  const handleBuy = () => {
    if (values.item == null) return;
    store.dispatch(gameActions.buy(values.item));
  };

  const handleSell = () => {
    if (values.item == null) return;
    store.dispatch(gameActions.sell(values.item));
  };

  /**
   *
   * @returns {*}
   */
  const getTabContent = () => {
    if (values.activeTab === 0) {
      return (<div className={`shop-items`}>
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
              {o.cost}
            </div>
            <div>
              {o.name}
            </div>
          </div>
        ))}
      </div>)
    } else if (values.activeTab === 1) {
      return (<div className={`shop-items`}>
        {playerItems.map((o, index) => (
          <div
            key={index}
            className={`shop-item-container`}
          >
            <div>
              <Tooltip title={o.effect}>
                <div
                  onClick={() => selectItem(o)}
                  className={`sell-player-item ${values.item != null && values.item.id === o.id ? `sell-player-item-selected` : ``}`}
                />
              </Tooltip>
            </div>
            <div>
              {/*divide by 2 for visual purposes*/}
              {o.cost / 2}
            </div>
            <div>
              {o.name}
            </div>
          </div>
        ))}
      </div>)
    }
  };


  /**
   *
   * @returns {*}
   */
  const getShopButton = () => {
    if (values.activeTab === 0) {
      return (<button
        disabled={buyDisabled}
        onClick={handleBuy}
      >
        Buy
      </button>);
    } else if (values.activeTab === 1) {
      return (<button
        disabled={sellDisabled}
        onClick={handleSell}
      >
        Sell
      </button>);
    }
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
        <div className={`shop-tabs`}>
          <div
            className={`shop-tab ${values.activeTab === 0 ? `shop-tab-active` : ``}`}
            onClick={() => setActiveTab(0)}
          >
            Buy
          </div>
          <div
            className={`shop-tab ${values.activeTab === 1 ? `shop-tab-active` : ``}`}
            onClick={() => setActiveTab(1)}
          >
            Sell
          </div>
        </div>

        {/*tab content, dependent on the activeTab state*/}
        {getTabContent()}

      </DialogContent>

      <DialogActions>
        <button onClick={handleClose}>
          Close
        </button>

        {getShopButton()}

      </DialogActions>
    </Dialog>
  </div>);
}

export {Shop};