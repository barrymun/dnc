import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import "../../static/css/game.css";
import Button from "@material-ui/core/Button";

function Shop(props) {
    const gold = props.gold;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
        <Tooltip title="Click to shop">
            <div className={`gold-hud`} onClick={handleClickOpen}>
                <div className={`gold-coins`}/>
                <div>
                    {gold.current}
                </div>
            </div>
        </Tooltip>

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{`Shop`}</DialogTitle>
            <DialogContent>
                <div className={`shop-item`}>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}

export {Shop};