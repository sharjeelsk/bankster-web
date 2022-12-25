import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchRecruiterInfo} from '../../redux/user/userActions'
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
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./JobsCreated.scss"
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material';
import {getAge} from '../../utils/Functions'
import ChangeJobStatus from './ChangeJobStatus'
import SearchBar2 from '../../utils/SearchBar2';

function RecruiterJobDetail(props) {
    const [display,setDisplay]=React.useState(false)
    const [singleJob,setSingleJob] = React.useState(null)
    const [value, setValue] = React.useState('1');
    const [open,setOpen] = React.useState(false)
    const [selectedItem,setSelectedItem] = React.useState(null)
    const [filteredCandidates,setFilteredCandidates] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    let params = useParams();
    console.log(params)

  const getSingleJob = ()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/singleJob`,{jobId:params.id})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                setSingleJob(res.data.result)
                setFilteredCandidates(res.data.result.jobCandidates)
                // if(props.user.userInfo.bookmarks.jobs.includes(res.data.result._id)){
                //     setBookmarked(true)
                // }
            }
        })
        .catch(err=>{
            console.log(err)
        })
  }

    React.useEffect(()=>{
        getSingleJob()
    },[])

    const handleHire = (candidateObjectId,userId)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/hireCandidate`,{jobId:singleJob._id,candidateObjectId,userId,title:singleJob.title},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            getSingleJob()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleReject = (candidateObjectId,userId)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/rejectCandidate`,{jobId:singleJob._id,candidateObjectId,userId,title:singleJob.title},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            getSingleJob()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleShortlist = (candidateObjectId,userId)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/shortlistCandidate`,{jobId:singleJob._id,candidateObjectId,userId,title:singleJob.title},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            getSingleJob()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const renderEmployementString = (userInfo)=>{
        if(userInfo.fresher){
            return "Fresher"
        }else if(userInfo.workExperience.filter(i=>i.current===true).length>0){
            let strobj = userInfo.workExperience.filter(i=>i.current===true)[0]
            return `${strobj.designation} | ${strobj.name}`
        }else{
            return "Currently Unemployed"
        }
    }

    const renderStatus = (status)=>{
        if(status==="Hired"){
            return "hired-status px-3 py-2"
        }else if(status==="Rejected"){
            return "rejected-status px-3 py-2"
        }else{
            return "shortlisted-status px-3 py-2"
        }
    }

    const handleSearchSubmit = (e)=>{
            let array = singleJob.jobCandidates.filter(item=>{
              //console.log(item)
              let name = item.user.fullName.slice(0,e.length).trim().replace(' ','').toLowerCase();
              let serachname = e.toLowerCase().replace(' ','').trim();
              if(name===serachname){
                return item;
              }
            })
            setFilteredCandidates(array)
    }

    const getCreatedJobs = ()=>{

    }

    const handleBookmarkAdd = (candidateId,alreadyAdded)=>{
        if(alreadyAdded){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/removeBookmarkCandidate`,{candidateId},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchRecruiterInfo(props.user.user)
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/bookmarkCandidate`,{candidateId},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchRecruiterInfo(props.user.user)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
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
            <ChangeJobStatus 
            open={open}
            setOpen={setOpen}
            handleHire={handleHire}
            handleReject={handleReject}
            handleShortlist={handleShortlist}
            item={selectedItem}
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

             <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Job Info" value="1" />
            <Tab label="Applicants" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="m-0 p-0">
        {
                    singleJob&&<section className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                        <img src={singleJob.createdByAdmin?renderImageString(singleJob.createdByAdmin):renderImageString(singleJob.createdBy)} alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                        <h3>{singleJob.title}</h3>
                        <p className="company-name m-0">{singleJob.createdByAdmin?singleJob.createdByAdmin.companyName:singleJob.createdBy.companyName}</p>
                        <h4 className="m-0">{singleJob.product}</h4>
                            <div className='row m-auto align-items-center'>
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
                    <div className="bookmark-div col-2">
                        <h2>{singleJob.jobCandidates.length} Applied</h2>
                    </div>
                </section>

                }
        </TabPanel>
        <TabPanel value="2">
                {
                    singleJob&&singleJob.jobCandidates.length>0?
                    <>
                    <SearchBar2 searchText="Search By Job Name..." handleSearchSubmit={handleSearchSubmit} getAllData={getCreatedJobs}  />
                    <div className="mb-5" />
                    {filteredCandidates.length>0?filteredCandidates.map((item,index)=><section className="candidate-single-job shadow-sm" key={index}>
                        <div className="row m-auto">
                            <div className="col-1">
                            <img src={`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.user.profilePicture}`} alt="logo1" />
                            </div>
                            <div className="col-5">
                                <h2>{item.user.fullName}</h2>
                                <p className="bold-text">{renderEmployementString(item.user)}</p>
                                <p className="bold-text">{item.user.education.length>0?item.user.education.map(i=>{
                                    if(i.featuredEducation){
                                        return i.name + ', ' + i.universityName;
                                    }
                                }):"User hasn't added featured education"}</p>
                                <p className="grey-text">{item.user.gender} | {item.user.dob?getAge(item.user.dob):"DOB Missing"}</p>
                                <p className="grey-text">{item.user.yearsOfExperience?item.user.yearsOfExperience:"Not added"} Years of Experience | {item.user.currentCtc?item.user.currentCtc:"Not added"} CTC | {item.user.product?item.user.product:"Not added"} | {item.user.noticePeriod?item.user.noticePeriod:"Not added"} Weeks Notice Period</p>
                                {/* {item.user.workExperience.length>0&&item.user.workExperience.map((we,ind)=>we.current&&<p key={ind} className="bold-text">{we.name} | {we.designation}</p>)} */}
                                <p className="bold-text">{item.user.education.length>0?`${item.user.education[0].name}, ${item.user.education[0].universityName}`:""}</p>
                            </div>
                            <div className="col-5">
                            {item.user.resume.length>0&&<div onClick={()=>{
                                window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${item.user.resume}`, '_blank');
                                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/increaseProfileCount`,{candidateId:item.user._id},{headers:{token:props.user.user}})
                                .then(res=>{
                                    console.log(res)
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                                //window.location.href=`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${item.user.resume}`
                                //window.location.href()
                            }} className="resume-cont row m-auto align-items-center shadow-sm">
                                <div className="">
                                    <DescriptionIcon sx={{fontSize:25}} color="primary" />
                                </div>
                                <div className="ml-3">
                                    <h5>{item.user.fullName}'s Resume</h5>
                                    <p>Updated on : 25/04/2022</p>
                                </div>
                            </div>}
                            </div>

                            <div className="col-1 bookmark-div" style={{textAlign:"right"}}>
                            <IconButton onClick={()=>{
                                if(props.user.userInfo.bookmarks.candidates.includes(item.user._id)){
                                    handleBookmarkAdd(item.user._id,true)
                                }else{
                                    handleBookmarkAdd(item.user._id,false)
                                }
                                }}>
                                {
                                props.user.userInfo.bookmarks.candidates.includes(item.user._id)?<BookmarkIcon />:<BookmarkBorderIcon />
                                }
                            </IconButton>
                            </div>
                        </div>
                        <div className="row mt-4 mx-auto sub-info">
                            <p className="mx-2"><LocalPhoneIcon sx={{marginRight:.1}} /> <b>{item.user.mobileNo}</b></p>
                            <p className="mx-2"><AlternateEmailIcon sx={{marginRight:.1}} /> <b>{item.user.email}</b></p>
                            <p className="mx-2"><LocationOnIcon sx={{marginRight:.1}} /> <b>{item.user.userLocation.city}, {item.user.userLocation.state}</b></p>
                        </div>
                        <p>{item.user.resumeTagline}</p>
                        {
                            item.user.skills.map((i,index)=><Chip label={i} key={index} color="primary" className="m-2" />)
                        }
                        <div style={{textAlign:"right"}}>
                            {item.status==="Pending"?<>
                            <Button color="error" onClick={()=>handleReject(item._id,item.user._id)}>Reject</Button>|
                            <Button color="info" onClick={()=>handleShortlist(item._id,item.user._id)}>Shortlist</Button>|
                            <Button onClick={()=>handleHire(item._id,item.user._id)} variant="contained">Hire</Button>
                            </>:
                            <>
                            <span className={renderStatus(item.status)}>{item.status}</span>
                            <br />
                            <Button onClick={()=>{
                                setOpen(true)
                                setSelectedItem(item)
                            }} className="mt-3">Change Status</Button>
                            </>
                            }
                        </div>
                    </section>):
                    <h2>No such candidate found</h2>
                    }
                    </>
                    :<h2>No Candidates have applied so far</h2>
                }
                <div className="mb-5 pb-5" />
        </TabPanel>
      </TabContext>


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
        fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecruiterJobDetail)
