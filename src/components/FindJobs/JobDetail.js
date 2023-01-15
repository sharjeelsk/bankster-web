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
import {renderRating} from '../utils/Functions'
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
            console.log(res)
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


// const renderRating = ()=>{
//     let total = 0;
//     if(singleJob.age.min && singleJob.age.max){
//         total = total +1;
//     }
//     if(singleJob.ctc.min && singleJob.ctc.max){
//         total = total+1;
//     }
//     if(singleJob.experience.min && singleJob.experience.max){
//         total = total+1;
//     }
//     if(singleJob.jobLocation.state && singleJob.jobLocation.city){
//         total = total+1;
//     }
//     if(singleJob.qualification.ug && singleJob.qualification.pg){
//         total = total+1;
//     }
//     if(singleJob.functionalArea && singleJob.industry && singleJob.product){
//         total = total+1;
//     }
//     if(singleJob.roleResp.length>0){
//         total = total+1;
//     }
//     if(singleJob.tags.length>0){
//         total = total+1;
//     }
//     if(singleJob.companyName.length>0 && singleJob.companyInfo.length>0){
//         total = total+1;
//     }
//     if(singleJob.desiredProfile){
//         total = total+1;
//     }
//     console.log(total)
//     return total/2
    
// }

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
                        <p className="company-name m-0">{singleJob.createdByAdmin?singleJob.createdByAdmin.companyName:singleJob.createdBy.companyName}</p>
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
                            <Button onClick={()=>handleJobApply(true)} fullWidth className="my-3" variant='contained'>Click to Apply For this job</Button>:
                                
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
                                <span className='key-headline m-2'>{singleJob.qualification.ug} in CSE</span>
                            </div>
                            <div className="m-1">
                                <DescriptionIcon />
                                <span className='key-headline m-2'>{singleJob.qualification.pg} in Finance</span>
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

                    </div>
                    <div className="bookmark-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                        <IconButton onClick={()=>handleBookmarkAdd()}>
                            {bookmarked?<BookmarkIcon />:<BookmarkBorderIcon />}
                        </IconButton>
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
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
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
                    {/* <div className="bookmark-div col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                    <IconButton onClick={()=>{
                        if(!props.user.user){
                            props.history.push("/login")
                        }else{
                            handleBookmarkAdd(item._id)
                        }
                        
                        }}>
                        {
                        props.user.user?props.user.userInfo.bookmarks.jobs.includes(item._id)?<BookmarkIcon />:<BookmarkBorderIcon />:
                        <BookmarkBorderIcon />
                        }
                        </IconButton>
                    </div> */}
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