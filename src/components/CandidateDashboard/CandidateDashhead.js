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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkIcon from '@mui/icons-material/Work';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {connect} from 'react-redux'
import { Button } from '@mui/material';
import { deleteUser } from '../redux/user/userActions';
import axios from 'axios'
const CandidateDashhead = (props) => {
    let {id,display} = props
    const [dashboardData,setDashboardData] = React.useState(null)
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getCandidateDashNumbers`,{headers:{token:props.user.user}})
        .then(res=>{
            if(res.data.result.length>0){
                setDashboardData(res.data.result[0])
                if(props.setDashboardData){
                    props.setDashboardData(res.data.result[0])
                }
            }
            
        })
    },[])

    return (
        
            
        <div className={display?"shadow-lg dashhead":'dashhead displayhidden'}>
            <h1 className="head-heading">Hi, {props.user.userInfo&&props.user.userInfo.fullName.split(" ")[0]}</h1>
            {id===1?<div className="menu-container-active">
                <p><HomeIcon className="mr-1" /> Your Profile</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('candidatehome')} >
            <p><HomeOutlinedIcon className="mr-1" /> Your Profile</p>
            </div>
            }

            {id===2?<div className="menu-container-active">
                <p><WorkIcon className="mr-1" /> Jobs Applied</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('jobsapplied')}>
            <p><WorkOutlineIcon className="mr-1" /> Jobs Applied</p>
            </div>
            }

            {id===5?<div className="menu-container-active">
                <p><BookmarksIcon className="mr-1" /> Saved Jobs</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('jobsbookmarked')}>
            <p><BookmarksOutlinedIcon className="mr-1" /> Saved Jobs</p>
            </div>
            }

            {id===3?<div className="menu-container-active">
                <p><NotificationsIcon className="mr-1" /> Notifications</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('notifications')} >
            <p><NotificationsNoneOutlinedIcon className="mr-1" /> Notifications</p>
            </div>
            }

            {id===4?<div className="menu-container-active">
                <p><LocalAtmIcon className="mr-1" /> Subscription</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('subscription')}>
            <p><LocalAtmIcon className="mr-1" /> Subscription</p>
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
                    <p className="sub-heading">Job Seeker</p>
                    <p className="light-grey-text">Applied: {dashboardData&&dashboardData.appliedJobs[0].total}</p>
                    <p className="light-grey-text">Offered: {dashboardData&&dashboardData.hiredJobs[0].total}</p>
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CandidateDashhead));