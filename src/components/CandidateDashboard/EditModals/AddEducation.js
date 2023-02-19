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
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from '@material-ui/lab';
const Input = styled('input')({
  display: 'none',
});
function AddEducation(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()

    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate,setEndDate] = React.useState(new Date('2014-08-18T21:11:54'))
    const [current,setCurrent]=React.useState(false)
    const [featuredEducation,setFeaturedEducation] = React.useState(false)
    const [allEducation,setAllEducation] = React.useState([])
    const [singleEducation,setSingleEducation] = React.useState(null)
    const [error,setError]=React.useState("")
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
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getEducationJobParam`)
      .then(res=>{
        console.log(res)
        setAllEducation(res.data.result)
      })
    },[props.editData])

    console.log("addemployemnt props",props,startDate,endDate,current,featuredEducation)
    //console.log()

    const onSubmit = (data)=>{
        console.log(data)
         props.setLoading(true)
         console.log("inside on submit ------------------------------------------",singleEducation)
        if(singleEducation){
        if(props.keyD==="Edit"){
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/editEducation`,{obj:{...data,name:singleEducation.name,startDate,endDate:current?"":endDate,current,featuredEducation},oldObj:props.editData},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            setError("")
            props.fetchCandidateInfo(props.user.user)
            props.setLoading(false)
            props.setOpen(false)
          })
          .catch(err=>{
            console.log(err)
            if(err.response){
              if(typeof(err.response.data) === "string"){
                setError(err.response.data)
              }
            }
            props.setLoading(false)
          })
        }else{
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/addEducation`,{obj:{...data,name:singleEducation.name,startDate,endDate:current?"":endDate,current,featuredEducation}},{headers:{token:props.user.user}})
          .then(res=>{
            console.log(res)
            setError("")
            props.fetchCandidateInfo(props.user.user)
            props.setOpen(false)
            props.setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            if(err.response){
              if(typeof(err.response.data) === "string"){
                setError(err.response.data)
              }
            }
            props.setLoading(false)
          })
        }
        }
        props.setLoading(false)


    }




  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>{props.keyD} Education</b></p>
          {<>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allEducation}
            fullWidth
            className='mb-3'
            onChange={(e,value)=>setSingleEducation(value)}
            getOptionLabel={(item)=>item.name}
            renderInput={(params) => <TextField  {...params} label="Degree Name" />}
          />
          {/* <TextField
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
          /> */}
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
      <FormControlLabel control={<Checkbox checked={featuredEducation} onChange={(e)=>setFeaturedEducation(e.target.checked)} />} label="Featured Education" />
      </FormGroup>
          </>}






          {error.length>0&&<Alert className="alert" severity="error">{error}</Alert>}
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