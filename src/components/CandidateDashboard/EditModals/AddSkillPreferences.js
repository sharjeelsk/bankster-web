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
const Input = styled('input')({
  display: 'none',
});
function AddSkillPreferences(props) {
    console.log("kename",props)
    const {register,handleSubmit,formState:{errors},setValue}=useForm()


    React.useEffect(()=>{

    },[props.keyD])



    const onSubmit = (data)=>{
        let obj = {}
        props.setLoading(true)
        if(props.keyD==="Add Skill"){
            //obj.skill=data.skillName
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/addKeySkill`,{skillName:data.skillName},{headers:{token:props.user.user}})
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
            obj.preference = data.preference;
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/addPreference`,{preference:data.preference},{headers:{token:props.user.user}})
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
        console.log(obj)

    }


    const renderContent = ()=>{
      if(props.keyD==="Add Skill"){
        return <section>
            <TextField
          inputProps={{ maxLength: 200 }}
          {...register('skillName',{required:true})}
          error={errors.skillName?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={'Enter Skill Name'}
            fullWidth
            variant="outlined"
          />
        </section>
      }else if(props.keyD==="Add Preference"){
        return <section>
            <TextField
          inputProps={{ maxLength: 200 }}
          {...register('preference',{required:true})}
          error={errors.skillName?true:false}
            autoFocus
            margin="dense"
            id={'outlined-basic'}
            label={'Enter Preference Name'}
            fullWidth
            variant="outlined"
          />
        </section>
      }
    }

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
            <p className="modal-heading"><b>{props.keyD}</b></p>
          {(props.keyD)&&<>
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
    fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token)),
    setLoading:(value)=>dispatch(setLoading(value))
  }
}

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddSkillPreferences)