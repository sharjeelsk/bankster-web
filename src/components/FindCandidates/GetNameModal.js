import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AlertDialog(props) {
const [title,setTitle] = React.useState("")
  return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <TextField fullWidth className="my-3" variant="outlined" id="outlined-basic" label="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>{props.leftButton}</Button>
          <Button onClick={()=>props.handleSubmit(title)} autoFocus>
            {props.rightButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{/* <TwoBDialog title="Delete Event" description="Are you sure you want to delete this event"
rightButton="Delete"
leftButton="Cancel"
open={open}
setOpen={setOpen}
handleSubmit={handleSubmit}
/> */}
