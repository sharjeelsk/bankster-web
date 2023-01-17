import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import FilterMenu from './FilterMenu'
import "./FindJobs.scss"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Button } from '@mui/material'
import SearchBar from '../utils/SearchBar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Rating from '@mui/material/Rating';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import {fetchCandidateInfo} from '../redux/user/userActions'
import {renderRating,renderAgo} from '../utils/Functions'
function JobDetail(props) {
    let params = useParams();
    console.log(props)
    console.log(params)
    const [display,setDisplay]=React.useState(false)
    const [singleJob,setSingleJob] = React.useState(null)
    const [bookmarked,setBookmarked]=React.useState(false)
    const [flag,setFlag] = React.useState(false)
    const [similarJobs,setSimilarJobs]=React.useState([])
    const [jobTags,setJobTags] = React.useState(null)
const [companyImg,setCompanyImg] = React.useState(null)
    React.useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/singleJob`,{jobId:params.id})
        .then(res=>{
            console.log("sinleJob",res)
            if(res.data.msg==="success"){
                setSingleJob(res.data.result)
                if(props.user.userInfo){
                    if(props.user.userInfo.bookmarks.jobs.includes(res.data.result._id)){
                        setBookmarked(true)
                    }
                }
                
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchSimilarJobs`,{functionalArea:res.data.result.functionalArea,state:res.data.result.jobLocation.state})
                .then(res=>{
                    console.log(res)
                    if(res.data.msg==="success"){
                        setSimilarJobs(res.data.result)
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getFeaturedData`)
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setCompanyImg(res.data.result.filter(item=>item.type==="companyImg"))
                setJobTags(res.data.result.filter(item=>item.type==="jobTag"))
            }
        })
    },[flag])

    const findJob = (type,value)=>{
        props.history.push("/findjobs")
        // if(type==="companyImg"){
        //     axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobViaCompany`,{companyName:value})
        //     .then(res=>{
        //         console.log(res)
        //         if(res.data.result.length>0){
        //             setJobs(res.data.result)
        //         }
        //     })
        // }else if(type==="jobTag"){
        //     axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobViaTag`,{tags:[value]})
        //     .then(res=>{
        //         console.log(res)
        //         if(res.data.result.length>0){
        //             setJobs(res.data.result)
        //         }
        //     })
        // }
    }
    
    const renderApplied = ()=>{
        let apply;
        singleJob.jobCandidates.map(item=>{
            if(item.user._id===props.user.userInfo._id){
                apply=true
            }else{
                apply=false
            }
        })
        return apply
    }

    const handleBookmarkAdd = ()=>{
        if(bookmarked){
            //removeBookmarkJob
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeBookmarkJob`,{jobId:singleJob._id},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchCandidateInfo(props.user.user)
                setBookmarked(false)
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/bookmarkJob`,{jobId:singleJob._id},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchCandidateInfo(props.user.user)
                setBookmarked(true)
            })
            .catch(err=>{
                console.log(err)
            })
        }

    }
    const handleBookmarkAdd2 = (jobId)=>{
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
    const handleJobApply = (apply)=>{
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

    const renderCancelButton = ()=>{
        let status = false
        singleJob.jobCandidates.map(i=>{
            if(i.user._id===props.user.userInfo._id && i.status==="Pending"){
                status = false        
            }else{
                status = true
            }
        })
        if(status){
            return null
        }else{
            return <Button onClick={()=>handleJobApply(false)} color="error" fullWidth className="my-3" variant='outlined'>Click to cancel application</Button>
        }
        
    }
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

      const renderImageString2 = (createdBy)=>{
        if(createdBy){
            if(Array.isArray(createdBy) && createdBy.length>0){
                if(createdBy[0].profilePicture.length>0){
                    return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy[0].profilePicture}`
                }else{
                    return '/job-offer.png'
                }
                
            }else if(createdBy.profilePicture){
                if(createdBy.profilePicture.length>0){
                    return `${process.env.REACT_APP_DEVELOPMENT}/api/image/${createdBy.profilePicture}`
                }else{
                    return '/job-offer.png'
                }
                
            }else{
                return '/job-offer.png'
            }
        }
      
      }

      const renderRecruiterName = (createdBy)=>{
        if(createdBy){
            if(Array.isArray(createdBy) && createdBy.length>0){
                if(createdBy[0].fullName.length>0){
                    return `${createdBy[0].fullName}`
                }else{
                    return ''
                }
                
            }else if(createdBy.fullName){
                if(createdBy.fullName.length>0){
                    return `${createdBy.fullName}`
                }else{
                    return ''
                }
                
            }else{
                return ''
            }
        }
      }

      const renderRecruiterCompany = (createdBy)=>{
        if(createdBy){
            if(Array.isArray(createdBy) && createdBy.length>0){
                if(createdBy[0].companyName.length>0){
                    return `${createdBy[0].companyName}`
                }else{
                    return ''
                }
                
            }else if(createdBy.companyName){
                if(createdBy.companyName.length>0){
                    return `${createdBy.companyName}`
                }else{
                    return ''
                }
                
            }else{
                return ''
            }
        }
      }


const checkDisabled = (item)=>{
    let disabled = false;
    if(props.user.user){
        item.jobCandidates.map(i=>{
            if(i.user._id===props.user.userInfo._id){
                disabled = true
            }
        })
    }

    return disabled
    
}

  return (
<div>
        <Header id="2" />
        <section className="row m-auto find-jobs-head">
            <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="display-mobile">
                {!display?<IconButton onClick={()=>setDisplay(true)}>
                    <MenuIcon />
                </IconButton>:<FilterMenu setDisplay={setDisplay} />}
                </div>
                <div className="p-3 display-desktop">
                {/* style={{height:"100%"}} */}
                    <FilterMenu />
                </div>
            </div>
            
            <div className='p-0 col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 find-jobs-content'>
                <SearchBar fullWidth={true} />
                
                {
                    singleJob&&<section className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <img src={singleJob.createdByAdmin?renderImageString(singleJob.createdByAdmin):renderImageString(singleJob.createdBy)} alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                        <h3>{singleJob.title}</h3>
                        {/* <p className="company-name m-0">{singleJob.createdByAdmin?singleJob.createdByAdmin.companyName:singleJob.createdBy.companyName}</p> */}
                        <p className="company-name m-0">{singleJob.companyName}</p>
                        <h4 className="m-0">{singleJob.product}</h4>
                            <div className='row m-auto align-items-center'>
                                <div>
                                <Rating name="read-only" value={renderRating(singleJob)} readOnly />
                                </div>
                                <div>
                                <p className="total-reviews">(Based on Job Details)</p>
                                </div>
                            </div>
                        
                        <div className="button-div">
                            {props.user.userType===0?
                            <>
                            {!renderApplied()?
                            <Button disabled={checkDisabled(singleJob)} onClick={()=>handleJobApply(true)} fullWidth className="my-3" variant='contained'>Click to Apply For this job</Button>:
                                
                            renderCancelButton()
                            }
                            </>:
                            <>
                            <Button fullWidth onClick={()=>props.history.push("/login")} className="my-2" variant='outlined'>Log in to apply</Button>
                            <Button fullWidth onClick={()=>props.history.push("/signup")} className="my-2" variant='contained'>Register to apply</Button>
                            </>
                            }
                        </div>

                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <WorkIcon />
                                <span className='key-headline m-2'>{singleJob.experience.min} - {singleJob.experience.max} Yrs</span>
                            </div>
                            <div className="m-1">
                                <CurrencyRupeeIcon />
                                <span className='key-headline m-2'>{singleJob.ctc.min} - {singleJob.ctc.max} P.A</span>
                            </div>
                            <div className="m-1">
                                <FmdGoodIcon />
                                <span className='key-headline m-2'>{singleJob.jobLocation.city} | {singleJob.jobLocation.state} | {singleJob.jobLocation.country}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <ArticleIcon />
                                <span className='key-headline m-2'>{singleJob.qualification.ug}</span>
                            </div>
                            <div className="m-1">
                                <DescriptionIcon />
                                <span className='key-headline m-2'>{singleJob.qualification.pg}</span>
                            </div>
                            <div className="m-1">
                                <Inventory2Icon />
                                <span className='key-headline m-2'>{singleJob.industry}</span>
                            </div>
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Job Description</h2>
                            <p>
                            {singleJob.jobDescription}
                            </p>
                        </div>

                        <div className="keys">
                        {singleJob.tags.map((tag,index)=><Chip color="primary" key={index} className="m-3" label={tag} />)}
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Roles and Responsibilities</h2>
                            <ul>
                            {
                                singleJob.roleResp.map((item,index)=><li key={index}>{item}</li>)
                            }
                            </ul>
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Desired Candidate Profile</h2>
                            <p>
                                {singleJob.desiredProfile}
                            </p>
                            
                        </div>
                        
                        <div className="description">
                        <h4 className="grey-text mb-5 pb-2">Created By</h4>
                        <div className="recruiter-info shadow-sm row m-auto align-items-center">
                            <div className="col-2 img-div">
                            <img src={singleJob.createdByAdmin?renderImageString(singleJob.createdByAdmin):renderImageString2(singleJob.createdBy)} alt="logo1" />
                            </div>
                            <div className="col-8 content-div">
                                <h3>{singleJob.createdByAdmin?renderRecruiterName(singleJob.createdByAdmin):renderRecruiterName(singleJob.createdBy)}</h3>
                                <p>{singleJob.createdByAdmin?renderRecruiterCompany(singleJob.createdByAdmin):renderRecruiterCompany(singleJob.createdBy)}</p>
                            </div>
                        </div>
                        </div>

                    </div>
                    <div className="bookmark-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                        <IconButton onClick={()=>handleBookmarkAdd()}>
                            {bookmarked?<BookmarkIcon />:<BookmarkBorderIcon />}
                        </IconButton>
                    </div>
                    <div className="col-12 time-frame">
                    <p className="timeframe">{renderAgo(singleJob.createdAt)}</p>
                    </div>
                </section>

                }

                <h2>Similar Jobs</h2>

                {
                    similarJobs.length>0?similarJobs.map((item,index)=>(
                        <section key={index} className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <img src={item.createdByAdmin?renderImageString(item.createdByAdmin):renderImageString(item.createdBy)} alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
                    <Link className="link" to={`/jobdetail/${item._id}`} target="_blank">
                        <h3>{item.title}</h3>
                        {/* <p className="company-name m-0">{item.createdBy.companyName}</p> */}
                        <h4 className="m-0">{item.product}</h4>
                            <div className='row m-auto align-items-center'>
                                <div>
                                <Rating name="read-only" value={renderRating(item)} readOnly />
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
                                <span className='key-headline m-2'>{item.qualification.ug}</span>
                            </div>
                            <div className="m-1">
                                <DescriptionIcon />
                                <span className='key-headline m-2'>{item.qualification.pg}</span>
                            </div>
                            <div className="m-1">
                                <Inventory2Icon />
                                <span className='key-headline m-2'>{item.industry}</span>
                            </div>
                        </div>

                        <div className="description">
                        {item.jobDescription.length>180?`${item.jobDescription.substring(0,180)} ...`:item.jobDescription}
                        </div>

                        <div className="keys">
                        {item.tags.map((tag,index)=><Chip key={index} className="m-3" label={tag} />)}
                        </div>

                        </Link>


                        {/* <div className="button-div">
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
                        </div> */}

                    </div>
                    <div className="bookmark-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                    <IconButton onClick={()=>{
                        if(!props.user.user){
                            props.history.push("/login")
                        }else{
                            handleBookmarkAdd2(item._id)
                        }
                        
                        }}>
                        {
                        props.user.user?props.user.userInfo.bookmarks.jobs.includes(item._id)?<BookmarkIcon />:<BookmarkBorderIcon />:
                        <BookmarkBorderIcon />
                        }
                        </IconButton>
                    </div>
                    <div className="col-12 time-frame">
                    <p className="timeframe">{renderAgo(item.createdAt)}</p>
                    </div>
                </section>
                    )):
                    <h1>Sorry, No Jobs Available</h1>
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

export default connect(mapStateToProps,mapDispatchToProps)(JobDetail)