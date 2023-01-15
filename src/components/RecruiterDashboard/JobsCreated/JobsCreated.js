import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Rating from '@mui/material/Rating';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import "./JobsCreated.scss"
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TwoBDialog from '../../utils/TwoBDialog'
import { setSnackbar } from "../../redux/flags/flagActions";
import SearchBar2 from '../../utils/SearchBar2';
function JobsCreated(props) {
    const [display,setDisplay]=React.useState(false)
    const [jobs,setJobs]=React.useState([])
    const [open,setOpen] = React.useState(false)
    const [jobId,setJobId] = React.useState("")


    const getCreatedJobs = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/recruiterJobs`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                setJobs(res.data.result)
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    React.useEffect(()=>{
        getCreatedJobs()
    },[])

    const deleteJob =()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/deleteJob`,{jobId},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                props.setSnackbar({type:"success",text:"Job Deleted Successfully",open:true})
            }
        })
    }
    const handleSearchSubmit = (text)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchCreatedJobs`,{recruiterId:props.user.userInfo._id,title:text},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                setJobs(res.data.result)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const renderImageString = (createdBy)=>{
        if(Array.isArray(createdBy)){
            if(createdBy[0].companyImg.length>0){
                return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy[0].companyImg}`
            }else{
                return '/job-offer.png'
            }
            
        }else if(createdBy.companyImg){
            if(createdBy.companyImg.length>0){
                return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy.companyImg}`
            }else{
                return '/job-offer.png'
            }
            
        }else{
            return '/job-offer.png'
        }
    }
    return (
        <>
            <TwoBDialog 
            open={open}
            setOpen={setOpen}
            title="Delete Job"
            description="Are you sure you want to delete this job?"
            leftButton="Cancel"
            rightButton="Delete"
            handleSubmit = {deleteJob}
            />
            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead margin={0} id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            <h1>Created Jobs</h1>
            <SearchBar2 searchText="Search By Job Name..." handleSearchSubmit={handleSearchSubmit} getAllData={getCreatedJobs}  />
            {
                jobs.length>0?jobs.map((item,index)=>
                <section key={index}  className={`col-12 shadow-sm job-apply-head row m-auto`} style={{backgroundColor:"white"}}>
                <div className='img-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                    <img src={item.createdByAdmin?renderImageString(item.createdByAdmin):renderImageString(item.createdBy)} alt="logo1" />
                </div>
                <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                <Link className="link" to={`/recruiterjobdetail/${item._id}`}>
                    <h3 className="m-0">{item.title}</h3>
                    <p className="m-0 companyName">{item.companyName}</p>
                    <h4 className="m-0">{item.product}</h4>
                        <div className='row mt-2 mx-auto align-items-center'>
                            <div>
                            <Rating name="read-only" value={3} readOnly />
                            </div>
                            <div>
                            <p className="total-reviews">(Based on Job Details)</p>
                            </div>
                        </div>
                    <div className="row my-2 mx-auto key-features">
                        <div className="m-1">
                            <WorkIcon />
                            <span className='key-headline m-2'>{item.experience.min} - {item.experience.max} Yrs</span>
                        </div>
                        <div className="m-1">
                            <CurrencyRupeeIcon />
                            <span className='key-headline m-2'>{item.ctc.min} - {item.ctc.max} P.A</span>
                        </div>
                        <div className="m-1">
                            <FmdGoodIcon />
                            <span className='key-headline m-2'>{item.jobLocation.city} | {item.jobLocation.state} | {item.jobLocation.country}</span>
                        </div>
                    </div>
                    <div className="row my-2 mx-auto key-features">
                        <div className="m-1">
                            <ArticleIcon />
                            <span className='key-headline m-2'>{item.qualification.ug} in CSE</span>
                        </div>
                        <div className="m-1">
                            <DescriptionIcon />
                            <span className='key-headline m-2'>{item.qualification.pg} in Finance</span>
                        </div>
                        <div className="m-1">
                            <Inventory2Icon />
                            <span className='key-headline m-2'>{item.industry}</span>
                        </div>
                    </div>
                    </Link>
   
   
                </div>
                <div className="bookmark-div col-2">
                   <IconButton onClick={()=>props.history.push("/createjob",item)}>
                    <EditIcon sx={{fontSize:23}} />
                   </IconButton>
                   <IconButton onClick={()=>{
                    setOpen(true)
                    setJobId(item._id)
                   }}>
                    <DeleteOutlineIcon sx={{fontSize:23}} />
                   </IconButton>
                </div>
            </section>
            ):null
            }

            <div  style={{position:"fixed",bottom:"5%",right:"5%",zIndex:5}}>
                    <Tooltip title="Add Services">
                    <Fab variant="extended" onClick={()=>props.history.push("/createjob")} color="primary" aria-label="add">
                        <AddIcon sx={{ mr: 1 }} />
                        Create Job
                    </Fab>
                    </Tooltip>
            </div>
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
        setSnackbar:(obj)=>dispatch(setSnackbar(obj))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(JobsCreated)
