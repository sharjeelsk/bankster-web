import React from 'react'
import "./Dashhead.scss"
import {withRouter} from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {connect} from 'react-redux'
import {Button} from '@mui/material'
import { deleteUser } from '../redux/user/userActions';
const RecruiterDashhead = (props) => {
    console.log(props);
    let {id,display} = props
    return (
        
            
        <div className={display?"shadow-lg dashhead":'dashhead displayhidden'}>
            <h1>Hi, Sharjeel</h1>
            {id===1?<div onClick={()=>props.history.push('/recruiterhome')} className="menu-container-active">
                <p><HomeIcon /> Your Profile</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/recruiterhome')} >
            <p><HomeOutlinedIcon /> Your Profile</p>
            </div>
            }

            {id===2?<div className="menu-container-active" onClick={()=>props.history.push('/jobscreated')}>
                <p><NoteAddIcon /> Jobs Created</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/jobscreated')}>
            <p><NoteAddOutlinedIcon /> Jobs Created</p>
            </div>
            }

            {id===3?<div className="menu-container-active" onClick={()=>props.history.push('/notificationsr')}>
                <p><EventAvailableIcon /> Notifications</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/notificationsr')} >
            <p><EventAvailableOutlinedIcon /> Notifications</p>
            </div>
            }

            {id===4?<div className="menu-container-active" onClick={()=>props.history.push('/subscriptionr')}>
                <p><LocalAtmIcon /> Subscription</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/subscriptionr')}>
            <p><LocalAtmIcon /> Subscription</p>
            </div>
            }

            {props.user.userInfo&&
            <section className="dash-user-cont">
            <div className="row m-auto">
                <div className="col-4">
                <img src={props.user.userInfo.profilePicture?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${props.user.userInfo.profilePicture}`:"/user.png"} alt="profile" />
                </div>
                <div className="col-8">
                    <h3>{props.user.userInfo.fullName}</h3>
                    <p className="sub-heading">Recruiter</p>
                    <p className="light-grey-text">Recruited: 7</p>
                    <p className="light-grey-text">Rejected: 2</p>
                </div>
            </div>
            <div className="my-3" style={{textAlign:"right"}}>
                <Button onClick={()=>{
                    props.deleteUser()
                    props.history.push("/")
                }} variant="contained">Logout</Button>
            </div>
            </section>
            }

            
        </div>
    );
}

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
      deleteUser:()=>dispatch(deleteUser()),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(RecruiterDashhead));