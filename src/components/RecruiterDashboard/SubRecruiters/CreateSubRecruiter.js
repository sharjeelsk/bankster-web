import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchRecruiterInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./SubRecruiters.scss"
import { Button, TextField } from '@mui/material';
import date from 'date-and-time';
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useForm} from 'react-hook-form'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SearchIcon from '@mui/icons-material/Search';
import { setSnackbar } from "../../redux/flags/flagActions";
function CreateSubRecruiter(props) {
    const [display,setDisplay]=React.useState(false)
    const {handleSubmit,register,formState:{errors}} = useForm()

    const onSubmit = (data)=>{
        let {companyName,companyUrl,companyTags,companyLocation,companyDescription,companyImg,_id,availablePlanCredits} = props.user.userInfo
        const headRecruiter={
            companyName,
            companyUrl,
            companyTags,
            companyLocation,
            companyDescription,
            companyImg,
            _id,
            availablePlanCredits
        }
        console.log(data,headRecruiter)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/createSubRecruiter`,{...data,headRecruiter},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.fetchRecruiterInfo(props.user.user)
            props.setSnackbar({type:"success",text:`${data.fullName} Created Successfully!`,open:true})
            props.history.push("/SubRecruiters")
        })
        .catch(err=>{
            console.log(err)
            if(err.response.data){
                props.setSnackbar({type:"error",text:err.response.data,open:true})
            }
            
        })
    }

    return (
        <>
         <HeaderDash />
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead id={5} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>


            {
            props.user.userInfo.availablePlanCredits.subRecruiters>0?<section className="create-sub-rec">
            <h1>Create Sub Recruiters</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth {...register('fullName',{required:true})} label="FullName" variant="outlined" id="outlined-basic" />
            <TextField fullWidth {...register('email',{required:true})} label="Email" variant="outlined" id="outlined-basic" />
            <TextField fullWidth {...register('mobileNo',{required:true})} label="Mobile No" variant="outlined" id="outlined-basic" />
            <TextField fullWidth {...register('password',{required:true})} label="Password" variant="outlined" id="outlined-basic" />
            <Button type="submit">Create Sub Recruiter</Button>
            </form>
            </section>    
            :
            <div className="col-12 no-jobs">
            <h1>You have exhausted your plan limit</h1>
            <Button onClick={()=>props.history.push("/findjobs")} startIcon={<LocalAtmIcon />} variant="contained">Upgrade Plan</Button>
            </div>
            }

            

             </div>
    </div>
    </>
    )
}

const mapStateToProps = ({banksterUser})=>{    
    return {
        user:banksterUser
    }
}

const mapDispatchToProps = (dispatch)=>{    
    return {
        storeUserInfo:(userInfo)=>dispatch(storeUserInfo(userInfo)),
        fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token)),
        setSnackbar:(obj)=>dispatch(setSnackbar(obj))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateSubRecruiter)
