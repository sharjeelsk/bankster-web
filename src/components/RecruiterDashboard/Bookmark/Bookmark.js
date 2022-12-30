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
import { Link } from 'react-router-dom';
import {Button} from '@mui/material'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useParams} from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getAge} from '../../utils/Functions'
import SearchBar2 from '../../utils/SearchBar2';
function Bookmark(props) {
    const [display,setDisplay]=React.useState(false)
    const [candidates,setCandidates]=React.useState([])
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const fetchBookmarks =()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getAllBookmarkedJobs`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res.data.result)
            setCandidates(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  
    React.useEffect(()=>{
        fetchBookmarks()
    },[])

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
    const handleBookmarkAdd = (candidateId,alreadyAdded)=>{
        if(alreadyAdded){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/removeBookmarkCandidate`,{candidateId},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchRecruiterInfo(props.user.user)
                fetchBookmarks()
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/bookmarkCandidate`,{candidateId},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                props.fetchRecruiterInfo(props.user.user)
                fetchBookmarks()
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
    }

    return (
        <>

            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead margin={0} id={6} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>


             {/* <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Saved Jobs" value="1" />
                    <Tab label="Saved Candidate Profiles" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">{renderSavedJobs()}</TabPanel>
                <TabPanel value="2">{renderSavedCandidateProfiles()}</TabPanel>
            </TabContext>
            </Box> */}

            <h1>Saved Profiles</h1>

            {
                candidates.length>0?candidates.map((item,index)=>
                <section className="candidate-single-job shadow-sm" key={index}>
                        <div className="row m-auto">
                            <div className="col-1">
                            <img src={`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.profilePicture}`} alt="logo1" />
                            </div>
                            <div className="col-5">
                                <h2>{item.fullName}</h2>
                                <p className="bold-text">{renderEmployementString(item)}</p>
                                <p className="bold-text">{item.education.length>0?item.education.map(i=>{
                                    if(i.featuredEducation){
                                        return i.name + ', ' + i.universityName;
                                    }
                                }):"User hasn't added featured education"}</p>
                                <p className="grey-text">{item.gender} | {item.dob?getAge(item.dob):"DOB Missing"}</p>
                                <p className="grey-text">{item.yearsOfExperience?item.yearsOfExperience:"Not added"} Years of Experience | {item.currentCtc?item.currentCtc:"Not added"} CTC | {item.product?item.product:"Not added"} | {item.noticePeriod?item.noticePeriod:"Not added"}</p>
                                {/* {item.workExperience.length>0&&item.workExperience.map((we,ind)=>we.current&&<p key={ind} className="bold-text">{we.name} | {we.designation}</p>)} */}
                                <p className="bold-text">{item.education.length>0?`${item.education[0].name}, ${item.education[0].universityName}`:""}</p>
                            </div>
                            <div className="col-5">
                            {item.resume.length>0&&<div onClick={()=>{
                                window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${item.resume}`, '_blank');
                                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/increaseProfileCount`,{candidateId:item._id},{headers:{token:props.user.user}})
                                .then(res=>{
                                    console.log(res)
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                                //window.location.href=`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${item.resume}`
                                //window.location.href()
                            }} className="resume-cont row m-auto align-items-center shadow-sm">
                                <div className="">
                                    <DescriptionIcon sx={{fontSize:25}} color="primary" />
                                </div>
                                <div className="ml-3">
                                    <h5>{item.fullName}'s Resume</h5>
                                    <p>Updated on : 25/04/2022</p>
                                </div>
                            </div>}
                            </div>

                            <div className="col-1 bookmark-div" style={{textAlign:"right"}}>
                            <IconButton onClick={()=>{
                                if(props.user.userInfo.bookmarks.candidates.includes(item._id)){
                                    handleBookmarkAdd(item._id,true)
                                }else{
                                    handleBookmarkAdd(item._id,false)
                                }
                                }}>
                                {
                                props.user.userInfo.bookmarks.candidates.includes(item._id)?<BookmarkIcon />:<BookmarkBorderIcon />
                                }
                            </IconButton>
                            </div>
                        </div>
                        <div className="row mt-4 mx-auto sub-info">
                            <p className="mx-2"><LocalPhoneIcon sx={{marginRight:.1}} /> <b>{item.mobileNo}</b></p>
                            <p className="mx-2"><AlternateEmailIcon sx={{marginRight:.1}} /> <b>{item.email}</b></p>
                            <p className="mx-2"><LocationOnIcon sx={{marginRight:.1}} /> <b>{item.userLocation.city}, {item.userLocation.state}</b></p>
                        </div>
                        <p>{item.resumeTagline}</p>
                        {
                            item.skills.map((i,index)=><Chip label={i} key={index} color="primary" className="m-2" />)
                        }

                    </section>
                ):<div className="col-12 no-jobs">
                <h1>You haven't bookmarked any candidates yet</h1>
                {/* <Button onClick={()=>props.history.push("/findjobs")} startIcon={<SearchIcon />} variant="contained">bookmark candidates</Button> */}
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
        fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookmark)
