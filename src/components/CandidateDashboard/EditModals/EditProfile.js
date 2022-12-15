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
import {Autocomplete} from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { setLoading } from '../../redux/loading/loadingActions';
const Input = styled('input')({
  display: 'none',
});
function EditProfile(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    let userInfo = props.user.userInfo;
    const [dob, setDob] = React.useState('');
    const [states,setStates]=React.useState([])
    const [cities,setCities] = React.useState([])
    const [formValues,setFormValues] = React.useState({state:"",city:"",product:""})
    const [gender, setGender] = React.useState('Male');
    const [products,setProducts]=React.useState([])

    const handleChange = (event) => {
      setGender(event.target.value);
    };
    console.log(dob,userInfo)

    React.useEffect(()=>{
            setValue("fullName",userInfo.fullName)
            setValue("mobileNo",userInfo.mobileNo)
            setValue("resumeTagline",userInfo.resumeTagline)
            setValue("mobileNo",userInfo.mobileNo)
            setValue("noticePeriod",userInfo.noticePeriod)
            setFormValues({state:userInfo.userLocation.state,city:userInfo.userLocation.city,product:userInfo.product})
            setDob(userInfo.dob)
            var config = {
              method: 'get',
              url: 'https://api.countrystatecity.in/v1/countries/IN/states',
              headers: {
                'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
              }
            };
            
            axios(config)
            .then(function (response) {
              console.log(response);
              setStates(response.data)
            })
            .catch(function (error) {
              console.log(error);
            });
            axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getAllProducts`,{headers:{token:props.user.user}})
            .then(res=>{
              console.log("products response",res)
              setProducts(res.data.result)
            })
    },[])


    const onSubmit = (data)=>{
        console.log(data)
        props.setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/editCandidateProfile`,{...data,dob,userLocation:{...formValues,country:"India"},gender,product:formValues.product},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.setLoading(false)
            props.fetchCandidateInfo(props.user.user)
            props.setOpen(false)
        })
    }
    const getCities = (state)=>{
      console.log(state)
      var config = {
          method: 'get',
          url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
          headers: {
            'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(response);
          setCities(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }



  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>Edit Profile</b></p>
          {<>

          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("fullName",{required:true})}
          error={errors.fullName?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Full Name"}
            fullWidth
            variant="outlined"
          />
          <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("mobileNo",{required:true})}
          error={errors.mobileNo?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Mobile Number"}
            fullWidth
            variant="outlined"
          />
        <TextField
          className="mb-3"
          inputProps={{ maxLength: 200 }}
          {...register("resumeTagline",{required:true})}
          error={errors.resumeTagline?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={"Resume Tagline"}
            fullWidth
            variant="outlined"
          />

<FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={gender}
        row
        onChange={handleChange}
      >
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,state:newValue.name});
                    getCities(newValue.iso2)
                    }}
                    id="controllable-states-demo"
                    options={states}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select State"/>}
                    />
                    </div>
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,city:newValue.name});
                    }}
                    id="controllable-states-demo"
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select City"/>}
                    />
                    </div>

                    <TextField
                    className="mb-3"
                    inputProps={{ maxLength: 200 }}
                    {...register("noticePeriod",{required:true})}
                    error={errors.noticePeriod?true:false}
                      autoFocus
                      margin="dense"
                      id={'outlined-basic'}
                      label={"Notice Period (in Weeks)"}
                      fullWidth
                      variant="outlined"
                    />

                    <TextField
                    className="mb-3"
                    inputProps={{ maxLength: 200 }}
                    {...register("yearsOfExperience",{required:true})}
                    error={errors.yearsOfExperience?true:false}
                      autoFocus
                      margin="dense"
                      id={'outlined-basic'}
                      label={"Years of Experience"}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                    className="mb-3"
                    inputProps={{ maxLength: 200 }}
                    {...register("currentCtc",{required:true})}
                    error={errors.currentCtc?true:false}
                      autoFocus
                      margin="dense"
                      id={'outlined-basic'}
                      label={"Current CTC (In Numbers)"}
                      fullWidth
                      variant="outlined"
                    />

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                      console.log(newValue)
                    setFormValues({...formValues,product:newValue.name});
                    }}
                    id="controllable-states-demo"
                    options={products}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Product"/>}
                    />
                    </div>
                    

        <section className="my-3">
        <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Date of Birth"
        inputFormat="dd/MM/yyyy"
        value={dob}
        onChange={(newVal)=>setDob(newVal)}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
      </LocalizationProvider>
      </section>





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

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)