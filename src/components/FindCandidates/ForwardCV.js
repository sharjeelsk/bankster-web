import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form'
import { isEmail } from '../utils/Functions';
export default function ForwardCV(props) {
    const {handleSubmit,register,formState:{errors}}=useForm();
    const [email,setEmail] = React.useState("")
    const [subject,setSubject] = React.useState("")
    const [description,setDescription] = React.useState("")
    const [error,setError] = React.useState(null)


    const onSubmit = (data)=>{
        setError(null)
        props.handleSubmit(data)
    }

  return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Forward CV
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can forward this synopsis to any email
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className="my-3" fullWidth variant="outlined" id="outlined-basic" label="To" 
        onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField className="my-3" fullWidth variant="outlined" id="outlined-basic" label="Subject" 
        onChange={(e)=>setSubject(e.target.value)}
        />
        <TextField className="my-3"
          id="filled-textarea"
          label="Description"
          placeholder="Placeholder"
          multiline
          variant="filled"
          minRows={4}
          fullWidth
          onChange={(e)=>setDescription(e.target.value)}
        />
        </form>
        {error&&<Alert className="my-3" severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>cancel</Button>
          <Button variant="contained" onClick={()=>{
            if(isEmail(email) && subject.length>0){
                setError(null)
                props.handleSubmit(email,subject,description)
            }else{
                setError("Enter Valid Details")
            }
            }} autoFocus>
            Forward
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
