import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { fetchCandidateInfo } from '../../redux/user/userActions';
import "./Modals.scss"
import { Chip } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { setLoading } from '../../redux/loading/loadingActions';
const Input = styled('input')({
  display: 'none',
});
function AddEmployment(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()

    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate,setEndDate] = React.useState(new Date(''))
    const [current,setCurrent]=React.useState(false)
    React.useEffect(()=>{
      if(props.keyD==="Edit"){
        setValue("name",props.editData.name)
        setValue("designation",props.editData.designation)
        setValue("description",props.editData.description)
        setStartDate(props.editData.startDate)
        if(props.editData.current===true){
          setCurrent(true)
        }else{
          setCurrent(false)
          setEndDate(props.editData.endDate)
        }
        
      }
    },[props.editData])

    console.log("addemployemnt props",props,startDate,endDate,current)

    const onSubmit = (data)=>{
      //edit route is missing
      props.setLoading(true)
        console.log(data)
        if(props.keyD==="Edit"){
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/editEmployement`,{obj:{...data,startDate,endDate:current?"":endDate,current},oldObj:props.editData},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
            props.setOpen(false)
            props.setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            props.setOpen(false)
            props.setLoading(false)
          })
        }else{
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/addEmployment`,{obj:{...data,startDate,endDate:current?"":endDate,current}},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
            props.setOpen(false)
            props.setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            props.setOpen(false)
            props.setLoading(false)
          })
        }


    }




  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>{props.keyD} Employment</b></p>
          {<>

          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("name",{required:true})}
          error={errors.name?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Company Name"}
            fullWidth
            variant="outlined"
          />
          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("designation",{required:true})}
          error={errors.designation?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Designation"}
            fullWidth
            variant="outlined"
          />
          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("description",{required:true})}
          error={errors.description?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Company Description"}
            fullWidth
            variant="outlined"
          />

        <section className="my-3">
        <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Start Date"
        inputFormat="dd/MM/yyyy"
        value={startDate}
        onChange={(newVal)=>setStartDate(newVal)}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
      </LocalizationProvider>
      </section>

      <section className="my-3">
      
      <LocalizationProvider 
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="End Date"
        inputFormat="dd/MM/yyyy"
        disabled={current?true:false}
        value={endDate}
        onChange={(newVal)=>setEndDate(newVal)}
        renderInput={(params) => <TextField  fullWidth {...params} />}
      />
      </LocalizationProvider>
      </section>

      <p className="grey-text">Note: if you are currently working in this company then click on the checkbox given below</p>
      <FormGroup>
      <FormControlLabel control={<Checkbox checked={current} onChange={(e)=>setCurrent(e.target.checked)} />} label="Currently Employed" />
    </FormGroup>
          </>}







        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token)),
    setLoading:(value)=>dispatch(setLoading(value))
  }
}

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddEmployment)