import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FilterMenu from './FilterMenu'
import "./FindJobs.scss"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Button } from '@mui/material'
import {connect} from 'react-redux'
import SearchBar from '../utils/SearchBar'
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
import axios from 'axios'
import { Link } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {fetchCandidateInfo} from '../redux/user/userActions'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {renderRating} from '../utils/Functions'
function FindJobs(props) {
const [display,setDisplay]=React.useState(false)
const [jobs,setJobs]=React.useState([])
const urlParams = new URLSearchParams(window.location.search);
const [bookmarked,setBookmarked]=React.useState(false)
const [flag,setFlag] = React.useState(false)
const title = urlParams.get('title');
const location = urlParams.get('location');
const salary = urlParams.get('salary');
const [jobTags,setJobTags] = React.useState(null)
const [companyImg,setCompanyImg] = React.useState(null)
const [sort,setSort]=React.useState(-1)
const [limit,setLimit] = React.useState({req1:20,req2:20,req3:20})
console.log(title,location,salary,jobs,props)


const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = (s) => {
    if(s){
        setSort(s)
    }
    console.log(s)

  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

React.useEffect(()=>{
    ///api/job/searchJobs
    setTimeout(() => {
        if(title || location || salary){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobs`,{title:title?title:"",city:location?location:"",salary:salary?salary:"",limit:limit.req1},{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyaXZlc2hAYmFua3N0ZXIuY29tIiwiX2lkIjoiNjJmM2E3ZjA0ODA4OWE4MDFkM2E3ODA3IiwiaWF0IjoxNjYxMTUyOTUwfQ.yI7xfT8AUAs4NM1S3xsw5xnttnr-cYmHdty0r_itRes"}})
            .then(res=>{
                console.log(res)
                setJobs(res.data.result)
            })
            .catch(err=>{
                console.log(err)
            })
        }else if(props.location.state){
            console.log("inside location")
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchKeyJob`,{...props.location.state,limit:limit.req2})
            .then(res=>{
                console.log(res)
                if(res.data.result.length>0){
                    setJobs(res.data.result)
                }
            })
        }
        else{
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getAllJobs?sort=${sort}`,{limit:limit.req3})
            .then(res=>{
                console.log(res)
                setJobs(res.data.result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }, 1000);
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getFeaturedData`)
    .then(res=>{
        console.log(res)
        if(res.data.result.length>0){
            setCompanyImg(res.data.result.filter(item=>item.type==="companyImg"))
            setJobTags(res.data.result.filter(item=>item.type==="jobTag"))
        }
    })
    
},[title,location,salary,flag,sort,limit])


const handleBookmarkAdd = (jobId)=>{
    if(props.user.userInfo.bookmarks.jobs.includes(jobId)){
        //removeBookmarkJob
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeBookmarkJob`,{jobId:jobId},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }else{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/bookmarkJob`,{jobId:jobId},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }

}


const handleJobApply = (apply,singleJob)=>{
    if(apply){
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/applyJob`,{jobId:singleJob._id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setFlag(!flag)
        })
        .catch(err=>{
            console.log(err)
        })
    }else{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/cancelApplyJob`,{jobId:singleJob._id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setFlag(!flag)
        })
        .catch(err=>{
            console.log(err)
        })
    }

}
const renderApplied = (singleJob)=>{
    let apply;
    singleJob.jobCandidates.map(item=>{
        if(item.user===props.user.userInfo._id){
            apply=true
        }else{
            apply=false
        }
    })
    return apply
}
//test comment

const renderImageString = (createdBy)=>{
    if(createdBy){
        if(Array.isArray(createdBy) && createdBy.length>0){
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

}

const findJob = (type,value)=>{
    if(type==="companyImg"){
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobViaCompany`,{companyName:value})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setJobs(res.data.result)
            }
        })
    }else if(type==="jobTag"){
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobViaTag`,{tags:[value]})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setJobs(res.data.result)
            }
        })
    }
}

  return (
    <div>
        <Header id="2" />
        <section className="row m-auto find-jobs-head">
            <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="display-mobile">
                {!display?<IconButton onClick={()=>setDisplay(true)}>
                    <MenuIcon />
                </IconButton>:<FilterMenu setJobs={setJobs} setDisplay={setDisplay} />}
                </div>
                <div className="p-3 display-desktop">
                {/* style={{height:"100%"}} */}
                    <FilterMenu setJobs={setJobs} />
                </div>
            </div>
            
            <div className='p-0 col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 find-jobs-content'>
                <SearchBar fullWidth={true} />
                <div className="mt-4">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {sort===1?'oldest jobs':"Latest Jobs"}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={()=>handleClose(-1)}>Latest</MenuItem>
                    <MenuItem onClick={()=>handleClose(1)}>Oldest</MenuItem>
                </Menu>
                </div>
                {
                    jobs.length>0?jobs.map((item,index)=>(
                        <section key={index} className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <img src={item.createdByAdmin?renderImageString(item.createdByAdmin):renderImageString(item.createdBy)} alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                    <Link className="link" to={`/jobdetail/${item._id}`}>
                        <h3>{item.title}</h3>
                        {/* <p className="company-name m-0">{item.createdBy.companyName}</p> */}
                        <h4 className="m-0">{item.product}</h4>
                            <div className='row m-auto align-items-center'>
                                <div>
                                <Rating name="read-only" value={renderRating(item)} readOnly />
                                </div>
                                <div>
                                <p className="total-reviews">(47 Reviews)</p>
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

                        <div className="description">
                            {item.jobDescription}
                        </div>

                        <div className="keys">
                        {item.tags.map((tag,index)=><Chip key={index} className="m-3" label={tag} />)}
                        </div>
                        </Link>

                        <div className="button-div">
                            {props.user.userType===0?
                            <>
                            {!renderApplied(item)?
                            <Button onClick={()=>handleJobApply(true,item)} fullWidth className="my-3" variant='contained'>Click to Apply For this job</Button>:
                                
                            null
                            }
                            </>:
                            <>
                            <Button fullWidth onClick={()=>props.history.push("/login")} className="my-2" variant='outlined'>Log in to apply</Button>
                            <Button fullWidth onClick={()=>props.history.push("/signup")} className="my-2" variant='contained'>Register to apply</Button>
                            </>
                            }
                        </div>

                    </div>
                    <div className="bookmark-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                    <IconButton onClick={()=>{
                        if(!props.user.user){
                            props.history.push("/login")
                        }else{
                            handleBookmarkAdd(item._id)
                        }
                        
                        }}>
                    {/* <BookmarkIcon /> */}
                        {
                        props.user.user?props.user.userInfo.bookmarks.jobs.includes(item._id)?<BookmarkIcon />:<BookmarkBorderIcon />:
                        <BookmarkBorderIcon />
                        }
                        </IconButton>
                    </div>
                </section>
                    )):
                    <h1>Sorry, No Jobs Available for "{title}"</h1>
                }
                {
                    jobs.length>0?
                    <div style={{textAlign:"center"}}>
                    <Button onClick={()=>{
                        setLimit({req1:limit.req1+20,req2:limit.req2+20,req3:limit.req3+20})
                    }} endIcon={<RestartAltIcon />} variant="outlined">Load More</Button>
                    </div>
                    :null
                }

              

            </div>


            <div className='p-0 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 right-section-job'>
                <section className="shadow-sm search-container">
                    <h4><SearchIcon /> Search Jobs Via Company</h4>
                    
                    {
                        companyImg&&companyImg.map((item,index)=><img onClick={()=>findJob(item.type,item.name)} key={index} src={`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.img}`} alt="logo2" />)
                    }
                </section>

                <section className="shadow-sm search-container">
                    <h4><SearchIcon /> Search Jobs Via Tags</h4>
                    
                    {
                        jobTags&&jobTags.map((item,index)=><Chip key={index} onClick={()=>findJob(item.type,item.name)} className="m-2" label={item.name} />)
                    }
                </section>
                <img className="my-3 width-100" src="/banners/bannerFindJobs1.png" alt="oneplus" />
            </div>
        </section>
        <Footer />
        </div>
  )
}
const mapDispatchToProps = (dispatch)=>{
    return {
      fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token))
    }
  }

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FindJobs)