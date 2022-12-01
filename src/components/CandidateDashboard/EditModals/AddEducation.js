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
import { setLoading } from '../../redux/loading/loadingActions';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
const Input = styled('input')({
  display: 'none',
});
function AddEducation(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()

    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate,setEndDate] = React.useState(new Date('2014-08-18T21:11:54'))
    const [current,setCurrent]=React.useState(false)
    React.useEffect(()=>{
      if(props.keyD==="Edit"){
        setValue("name",props.editData.name)
        setValue("universityName",props.editData.universityName)
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
    //console.log()

    const onSubmit = (data)=>{
        console.log(data)
        props.setLoading(true)
        //edit route is missing
        if(props.keyD==="Edit"){
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/editEducation`,{obj:{...data,startDate,endDate:current?"":endDate,current},oldObj:props.editData},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
            props.setLoading(false)
            props.setOpen(false)
          })
          .catch(err=>{
            console.log(err)
            props.setOpen(false)
            props.setLoading(false)
          })
        }else{
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/addEducation`,{obj:{...data,startDate,endDate:current?"":endDate,current}},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
            props.setOpen(false)
            props.setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            props.setLoading(false)
            props.setOpen(false)
          })
        }

    }




  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>{props.keyD} Education</b></p>
          {<>

          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("name",{required:true})}
          error={errors.name?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Degree Name"}
            fullWidth
            variant="outlined"
          />
          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("universityName",{required:true})}
          error={errors.universityName?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"University Name"}
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

    <p className="grey-text">Note: if you are pursuing your education then click on the checkbox given below</p>

      <FormGroup>
      <FormControlLabel control={<Checkbox checked={current} onChange={(e)=>setCurrent(e.target.checked)} />} label="Currently Studying" />
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

export default connect(mapStateToProps,mapDispatchToProps)(AddEducation)