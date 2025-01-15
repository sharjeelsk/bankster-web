import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CandidateDashhead from '../CandidateDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchCandidateInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import "./Notifications.scss"
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Notifications(props) {
    const [display,setDisplay]=React.useState(false)
    const [singleData,setSingleData] = React.useState({data:null,schema:null})
    const [render,setRender] = React.useState(false)
    React.useEffect(()=>{
        props.fetchCandidateInfo(props.user.user)
    },[])

    const handleInfo = (id,schema)=>{
        console.log(id,schema)
        setRender(true)
        if(schema==="job"){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/singleJob`,{jobId:id})
            .then(res=>{
                console.log(res)
                if(res.data.msg==="success"){
                    setSingleData({data:res.data.result,schema:"job"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const renderData = ()=>{
        if(singleData.schema==="job"){
            return <div>
                <h3>{singleData.data.title}</h3>
                <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <WorkIcon color="primary" />
                                <span className='key-headline m-2'>{singleData.data.experience.min} - {singleData.data.experience.max} Yrs</span>
                            </div>
                            <div className="m-1">
                                <CurrencyRupeeIcon color="primary" />
                                <span className='key-headline m-2'>{singleData.data.ctc.min} - {singleData.data.ctc.max} P.A</span>
                            </div>
                            <div className="m-1">
                                <FmdGoodIcon color="primary" />
                                <span className='key-headline m-2'>{singleData.data.jobLocation.city} | {singleData.data.jobLocation.state} | {singleData.data.jobLocation.country}</span>
                            </div>
                        </div>
                <hr />
                <p>{singleData.data.jobDescription}</p>
                <hr />
                <Button onClick={()=>props.history.push(`/jobdetail/${singleData.data._id}`)} variant="outlined">View Job</Button>
                <Button color="error">Delete</Button>
            </div>
        }
    }

    return (
        <>
        <HeaderDash />
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <CandidateDashhead id={3} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            {props?.user?.userInfo?.notifications?.length>0?<>
                <h1>Notifications</h1>
            {render&&<IconButton onClick={()=>setRender(false)}>
                <ArrowBackIcon />
            </IconButton>}
            <section className="notification-head row m-auto justify-content-around">
            <section className={`notification-container col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0 ${render?'display-false':'display-true'}`}>
                {
                    props?.user?.userInfo?.notifications?.map((item,index)=><div onClick={()=>handleInfo(item._id,item.schema)} key={index} className="row m-auto notification-parent align-items-center">
                    <div className="col-2">
                        <img src="/logo4.png" alt="logo1" />
                    </div>
                    <div className='col-10'>
                        <h3>{item.title}</h3>
                        <p>2h <FiberManualRecordIcon sx={{fontSize:8}} /> {item.description}</p>
                    </div>
                    </div>)
                }

            </section>

            <section className={`notification-detail col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ${render?'display-true':'display-false'}`}>
                {
                    renderData()
                }
            </section>


            </section>
            </>:
            <div className="col-12 no-jobs">
            <h1>You don't have any notifications yet</h1>
            <Button onClick={()=>props.history.push("/findjobs")} startIcon={<SearchIcon />} variant="contained">Find Jobs</Button>
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
        fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notifications)
