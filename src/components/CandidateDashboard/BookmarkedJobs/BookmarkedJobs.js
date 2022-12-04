import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CandidateDashhead from '../CandidateDashhead';
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
import "../JobsApplied/JobsApplied.scss"
import {Button} from '@mui/material'

function BookmarkedJobs(props) {
    const [display,setDisplay]=React.useState(false)
    const [jobsApplied,setJobsApplied]=React.useState([])
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getAllBookmarkedJobs`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setJobsApplied(res.data.result)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const renderJobStatus=(item)=>{
        let status = ""
        item.job.jobCandidates.map((item,index)=>{
            if(item.job.user===props.user.userInfo._id){
                status=item.job.status;
            }
        })

        return status;
    }


    return (
        <>

            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <CandidateDashhead margin={0} id={5} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            <div className="row my-auto job-head-a">
             {
             jobsApplied.length>0?
             jobsApplied.map((item,index)=><Link key={index} className="link" to={`/jobdetail/${item.job._id}`}>
             <section className={`col-12 shadow-sm job-apply-head row m-auto`} style={{backgroundColor:"white"}}>
             <div className='img-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                 <img src={`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.job.createdBy[0].companyImg}`} alt="logo1" />
             </div>
             <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                 <h3 className="m-0">{item.job.title}</h3>
                 <p className="m-0 companyName">{item.job.companyName}</p>
                 <h4 className="m-0">{item.job.product}</h4>
                     <div className='row mt-2 mx-auto align-items-center'>
                         <div>
                         <Rating name="read-only" value={3} readOnly />
                         </div>
                         <div>
                         <p className="total-reviews">(47 Reviews)</p>
                         </div>
                     </div>
                 <div className="row my-2 mx-auto key-features">
                     <div className="m-1">
                         <WorkIcon />
                         <span className='key-headline m-2'>{item.job.experience.min} - {item.job.experience.max} Yrs</span>
                     </div>
                     <div className="m-1">
                         <CurrencyRupeeIcon />
                         <span className='key-headline m-2'>{item.job.ctc.min} - {item.job.ctc.max} P.A</span>
                     </div>
                     <div className="m-1">
                         <FmdGoodIcon />
                         <span className='key-headline m-2'>{item.job.jobLocation.city} | {item.job.jobLocation.state} | {item.job.jobLocation.country}</span>
                     </div>
                 </div>
                 <div className="row my-2 mx-auto key-features">
                     <div className="m-1">
                         <ArticleIcon />
                         <span className='key-headline m-2'>{item.job.qualification.ug} in CSE</span>
                     </div>
                     <div className="m-1">
                         <DescriptionIcon />
                         <span className='key-headline m-2'>{item.job.qualification.pg} in Finance</span>
                     </div>
                     <div className="m-1">
                         <Inventory2Icon />
                         <span className='key-headline m-2'>{item.job.industry}</span>
                     </div>
                 </div>



             </div>
         </section>
         </Link>
         ):<div className="col-12 no-jobs">
         <h1>You haven't bookmarked any jobs yet</h1>
         <Button onClick={()=>props.history.push("/findjobs")} startIcon={<SearchIcon />} variant="contained">Find Jobs</Button>
      </div>
             }

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
        storeUserInfo:(userInfo)=>dispatch(storeUserInfo(userInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookmarkedJobs)
