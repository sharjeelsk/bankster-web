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
import { fetchRecruiterInfo } from '../../redux/user/userActions';
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const Input = styled('input')({
  display: 'none',
});
function PersonalInfoEdit(props) {
    console.log("kename",props)
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [singleLanguage,setSingleLanguage]=React.useState("")
    const [languages,setLanguages]=React.useState([])
    const [maritalStatus, setMaritalStatus] = React.useState('Unmarried');

    const [dob, setDob] = React.useState(props.user.userInfo.dob);

    console.log("selected date is",dob)

    const handleDateChange = (newValue) => {
      
      setDob(newValue);
    };
  

    const handleChange = (event) => {
      setMaritalStatus(event.target.value);
    };
    const [category, setCategory] = React.useState('');

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
    React.useEffect(()=>{
      if(props.keyD==="languages"){
        if(props.languages.length>0){
          setLanguages(props.languages)
        }
      }else if(props.keyD==="maritalStatus"){
        setValue("maritalStatus",props.user.userInfo.maritalStatus)
      }else if(props.keyD==="category"){
        setCategory(props.user.userInfo.category)
      }else if(props.keyD==="dob"){
        //dob
      }
    },[props.keyD])

    console.log("Modal languages",languages)

    const onSubmit = (data)=>{
        console.log(data)
        let obj = {}
        if(props.keyD==="languages" && languages.length>0){
        obj = {languages}
        }else if(props.keyD==="maritalStatus"){
          obj={maritalStatus}
        }
        else if(props.keyD==="category"){
          obj = {category}
        }
        else if(props.keyD==="dob"){
          obj[props.keyD]=dob
        }
        else{
          obj[props.keyD]=data[props.keyD]
        }
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/editRecruiterProfile`,{...obj},{headers:{token:props.user.user}})
        .then(res=>{
          console.log(res)
          if(res.data.msg==="success"){
            props.fetchRecruiterInfo(props.user.user)
            props.setOpen(false)
          }
          

        })
        .catch(err=>{
          console.log(err.response)
          props.setOpen(false)
        })
        console.log(obj)

    }


    const renderContent = ()=>{
      if(props.keyD==="maritalStatus"){
        return <section>
   <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Marital Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={maritalStatus}
        onChange={handleChange}
      >
        <FormControlLabel value="Married" control={<Radio />} label="Married" />
        <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
      </RadioGroup>
    </FormControl>
        </section>
      }else if(props.keyD==="category"){
        return <section>
          <Box sx={{ minWidth: 300 }} className="my-4">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Select Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={'SC'}>SC</MenuItem>
          <MenuItem value={'ST'}>ST</MenuItem>
          <MenuItem value={'OBC'}>OBC</MenuItem>
          <MenuItem value={'GENERAL'}>GENERAL</MenuItem>
        </Select>
      </FormControl>
      </Box>
        {/* <TextField
        className="modal-textfield"
        inputProps={{ maxLength: 200 }}
        {...register(props.keyD,{required:true})}
        error={errors.keyD?true:false}
          autoFocus
          margin="dense"
          id="outlined-basic"
          label={props.keyName}
          fullWidth
          variant="outlined"
        />  */}
        </section>
      }else if(props.keyD==="dob"){
        return <section className="mt-4">
        <LocalizationProvider 
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Date of Birth"
        inputFormat="dd/MM/yyyy"
        value={dob}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
      </section>
      }
      else if(props.keyD==="languages"){
        return <section>
        <TextField
        className="modal-textfield"
        inputProps={{ maxLength: 200 }}
        onChange={(e)=>setSingleLanguage(e.target.value)}
        //error={errors.keyD?true:false}
          autoFocus
          margin="dense"
          id="outlined-basic"
          label={"Enter Language"}
          fullWidth
          variant="outlined"
        /> 
        <div className="my-4" style={{textAlign:"center"}}>
        <Button variant="contained" onClick={()=>{
          if(!languages.includes(singleLanguage)){
            setLanguages([...languages,singleLanguage])
          }
        }}>Add Language</Button>
        </div>
        {
          languages.map((item,index)=><Chip className="m-2" onDelete={()=>setLanguages(languages.filter(i=>i!==item))} key={index} label={item} />)
        }
        </section>
      }
    }

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>Edit Info</b></p>
          {(props.keyD && props.keyName)&&<>
          {
            renderContent()
          }
          {/* <TextField
          inputProps={{ maxLength: 200 }}
          {...register(props.keyD,{required:true})}
          error={errors.keyD?true:false}
            autoFocus
            margin="dense"
            id={props.keyD}
            label={props.keyName}
            fullWidth
            variant="standard"
          /> */}
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
    fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token))
  }
}

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonalInfoEdit)