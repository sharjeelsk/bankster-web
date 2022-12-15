import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function AlertDialog(props) {

  const [status,setStatus] = React.useState("")

  return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Change Applicant Status
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change {props.item&&props.item.user.fullName}'s status "{props.item&&props.item.status}"?
          </DialogContentText>
          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e)=>setStatus(e.target.value)}

          >
            <FormControlLabel value="Hired" control={<Radio />} label="Hired" />
            <FormControlLabel value="Shortlisted" control={<Radio />} label="Shortlisted" />
            <FormControlLabel value="Rejected" control={<Radio />} label="Rejected" />
          </RadioGroup>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button onClick={()=>{
            if(status==="Hired"){
              props.handleHire(props.item._id,props.item.user._id)
            }else if(status==="Shortlisted"){
              props.handleShortlist(props.item._id,props.item.user._id)
            }else{
              props.handleReject(props.item._id,props.item.user._id)

            }
            props.setOpen(false)
            //props.handleSubmit(status)
            }} autoFocus>
          Submit
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
