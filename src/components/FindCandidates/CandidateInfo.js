import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { IconButton,Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import "./CandidateInfo.scss"
import {Chip} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import {getAge} from '../utils/Functions'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import moment from 'moment'
import ForwardIcon from '@mui/icons-material/Forward';
import CandidateCardHalf from './CandidateCardHalf'
import ForwardCV from './ForwardCV'
import { setSnackbar } from "../redux/flags/flagActions";
import { fetchRecruiterInfo } from '../redux/user/userActions'
import AddComment from './AddComment'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
//import { Viewer, Worker } from '@react-pdf-viewer/core';
//import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
//import PDFViewer from 'pdf-viewer-reactjs'
//import '@react-pdf-viewer/core/lib/styles/index.css';
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';

//const defaultLayoutPluginInstance = defaultLayoutPlugin();

function FindCandidates(props) {
const [display,setDisplay]=React.useState(false)
const [candidate,setCandidate]=React.useState(null)
const [error,setError] = React.useState(null)
const [value, setValue] = React.useState('1');
const [similarCandidates,setSimilarCandidates] = React.useState(null)
const [open,setOpen] = React.useState(false)
const [open2,setOpen2] = React.useState(false)

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const param = useParams();
console.log(param)

const getSingleCandidate = ()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/viewSingleCandidate`,{candidateId:param.id},{headers:{token:props.user.user}})
    .then(res=>{
        console.log(res)
        setCandidate(res.data.result)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/similarCandidates`,{product:res.data.result.product,city:"",userId:res.data.result._id},{headers:{token:props.user.user}})
        .then(resc=>{
            console.log(resc)
            setSimilarCandidates(resc.data.result)
        })
        
    })
    .catch(err=>{
        console.log(err.response)
        if(err.response){
            if(err.response.data){
                setError(err.response.data)
            }
        }
    })
}

React.useEffect(()=>{
    getSingleCandidate()
    
},[param.id])
const renderEmployementString = ()=>{
    if(candidate.fresher){
        return "Fresher"
    }else if(candidate.workExperience.filter(i=>i.current===true).length>0){
        let strobj = candidate.workExperience.filter(i=>i.current===true)[0]
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
const handleSubmit = (toEmail,subject,description)=>{
    console.log(toEmail,subject,description)
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/forwardCv`,{
        fullName:candidate.fullName,
        employementString:renderEmployementString(),
        education:"test",
        gender:candidate.gender,
        age:candidate.dob?getAge(candidate.dob):"DOB Missing",
        experience:candidate.yearsOfExperience?candidate.yearsOfExperience:'Not Added',
        ctc:candidate.currentCtc,
        product:candidate.product,
        noticePeriod:candidate.noticePeriod,
        mobileNo:candidate.mobileNo,
        email:candidate.email,
        location:`${candidate.userLocation.city} | ${candidate.userLocation.state}`,
        description,
        subject,
        toEmail,
        resumeTagline:candidate.resumeTagline,
        resume:candidate.resume
    },{headers:{token:props.user.user}})
    .then(res=>{
        console.log(res)
        props.setSnackbar({type:"success",text:"Email Sent Successfully",open:true})
        setOpen(false)

    })
    .catch(err=>{
        console.log(err)
        props.setSnackbar({type:"error",text:"Error in sending mail",open:true})
        setOpen(false)

    })

}


const handleSubmit2 = (comment)=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/addComment`,{
        "title":comment,
        "candidateId":candidate._id
    },{headers:{token:props.user.user}})
    .then(res=>{
        console.log(res)
        getSingleCandidate()
        props.setSnackbar({type:"success",text:"Comment Added Successfully",open:true})
    setOpen2(false)


    })
    .catch(err=>{
        console.log(err)
        props.setSnackbar({type:"error",text:"Error in adding comment",open:true})
    setOpen2(false)


    })
}


const renderProfile = ()=>{
    return <div>

        <div className="mb-3 white-card">
        <h2>Basic Info</h2>
        <p><span className="spankey">Category:</span> {candidate.category}</p>
        <p><span className="spankey">Date of Birth:</span> {moment.parseZone(candidate.dob).local().format("DD/MM/YY")}</p>
        <p><span className="spankey">Marital Status:</span> {candidate.maritalStatus}</p>
        <p><span className="spankey">Fresher:</span> {candidate.fresher.toString()}</p>
        </div>

        <div className="white-card mb-3">
        <h2>Languages</h2>
        {
            candidate.languages.map((i,ind)=><Chip label={i} key={ind} className="m-2" />)
        }
        </div>

        <div className="mb-3 white-card">
        <h2>Education</h2>
        {
            candidate.education.map((i,ind)=>
            <>
            <div key={ind} className="row m-auto">
            <div className="col-3">
                <p><b>{i.startDate&&moment.parseZone(i.startDate).local().format("DD/MM/YY")} - {i.endDate&&moment.parseZone(i.endDate).local().format("DD/MM/YY")}</b></p>
            </div>
            <div className="col-9">
            <p><span className="spankey">Name:</span> {i.name}</p>
                <p><span className="spankey">University Name:</span> {i.universityName}</p>
                <p><span className="spankey">Start Date:</span> {i.startDate}</p>
                <p><span className="spankey">End Date:</span> {i.endDate}</p>
                <p><span className="spankey">Featured Education:</span> {i.featuredEducation.toString()}</p>
                <p><span className="spankey">Current Education:</span> {i.current.toString()}</p>
            </div>
            </div>
            <hr />
            </>
            )
        }
        </div>


        <div className="mb-3 white-card">
        <h2>Work Experience</h2>
        {
            candidate.workExperience.map((i,ind)=>
            <>
            <div key={ind} className="row m-auto">
            <div className="col-3">
                <p><b>{i.startDate&&moment.parseZone(i.startDate).local().format("DD/MM/YY")} - {i.endDate&&moment.parseZone(i.endDate).local().format("DD/MM/YY")}</b></p>
            </div>
            <div className="col-9">
                <p><span className="spankey">Company Name:</span> {i.name}</p>
                <p><span className="spankey">Designation:</span> {i.designation}</p>
                <p><span className="spankey">Start Date:</span> {i.startDate}</p>
                <p><span className="spankey">End Date:</span> {i.endDate}</p>
                <p><span className="spankey">Current Company:</span> {i.current.toString()}</p>
                <p><span className="spankey">Description:</span> {i.description}</p>

            </div>
            </div>
            <hr />
            </>
            )
        }
        </div>




        </div>
}
const attachedCV = ()=>{
    return <div className="cv-cont">
        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
        <div style={{ height: '750px' }}>
            <Viewer
                fileUrl={`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${candidate.resume}`}
                plugins={[
                    defaultLayoutPluginInstance,
                ]}
            />
            </div>
        </Worker> */}
{candidate.resume?<iframe
    title="pdfview"
    src={`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${candidate.resume}`}
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></iframe>:
<h2>Candidate hasn't uploaded CV yet</h2>
}
        </div>
}

  return (
    <div>
        <Header id="2" />
        <ForwardCV 
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        />
        <AddComment
        open={open2}
        setOpen={setOpen2}
        handleSubmit={handleSubmit2}
        />
        <section className="row m-auto candidate-info-container">
         {
            error?
            <div className="error-parent-div"><h1>{error}</h1></div>:
            <>
            {candidate&&<section className="candidate-info-parent col-12 row m-auto">

                <section className="single-candidate-info-section col-8">
                <div className="menu row m-auto align-items-center">
                <div className="mx-2">
                {/* <FormGroup>
                <FormControlLabel 
                    onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedCandidate(candidates.map(i=>({_id:i._id,name:i.fullName,email:i.email})))
                        }else{
                            setSelectedCandidate([])
                        }

                    }}
                control={<Checkbox />} label="Selected All" />
                </FormGroup> */}
                </div>

                <div className="mx-2">
                    <Button 
                    onClick={()=>props.history.push("/sendjobemail",[{_id:candidate._id,name:candidate.fullName,email:candidate.email}])}
                    startIcon={<EmailIcon />}>
                        Email
                    </Button>
                </div>
                <div className="mx-2">
                    <Button 
                    onClick={()=>setOpen(true)}
                    startIcon={<ForwardIcon />}>
                        Forward CV
                    </Button>
                </div>
                <div className="ml-auto">
                
                <IconButton color='primary' onClick={()=>{
                    if(props.user.userInfo.bookmarks.candidates.includes(candidate._id)){
                        handleBookmarkAdd(candidate._id,true)
                    }else{
                        handleBookmarkAdd(candidate._id,false)
                    }
                    }}>
                    {
                    props.user.userInfo.bookmarks.candidates.includes(candidate._id)?<BookmarkIcon />:<BookmarkBorderIcon />
                    }
                </IconButton>
                </div>
            </div>
                <h1>Candidate <span className="primarycolorwh">Profile</span></h1>
                <div className="candidate-card-half shadow-sm row m-auto">
                    <div className="col-2 img-div">
                    <img src={candidate.profilePicture?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${candidate.profilePicture}`:"/user.png"} alt="avatar" />
                    </div>
                    <div className="col-10 content-div">
                        <div className="row m-auto">
                            <div className="p-0 col-12">
                            <h3>{candidate.fullName}</h3>
                            <p className="bold-text">{renderEmployementString()}</p>
                            <p className="bold-text">{candidate.education.length>0?candidate.education.map(i=>{
                                if(i.featuredEducation){
                                    return i.name + ', ' + i.universityName;
                                }
                            }):"Featured Education Not Added"}</p>
                            <p className="grey-text">{candidate.gender} | {candidate.dob?getAge(candidate.dob):"DOB Missing"}</p>
                            <p className="grey-text">{candidate.yearsOfExperience?candidate.yearsOfExperience:'Not Added'} Years of Experience | {candidate.currentCtc} CTC | {candidate.product} | {candidate.noticePeriod}</p>
                            </div>
                            {/* {candidate.resume.length>0&&<div onClick={()=>{
                                window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${candidate.resume}`, '_blank');
                                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/increaseProfileCount`,{candidateId:candidate._id},{headers:{token:candidate.user.user}})
                                .then(res=>{
                                    console.log(res)
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                            }} className="p-0 col-5 resume-cont row m-auto align-items-center shadow-sm">
                                <div className="">
                                    <DescriptionIcon />
                                </div>
                                <div className="ml-2">
                                    <h5>{candidate.fullName}'s Resume</h5>
                                    <p className="mt-1">Click to view resume</p>
                                </div>
                            </div>} */}
                        </div>

                        <div className="my-3">
                        <span className='keys'><LocalPhoneIcon /> {candidate.mobileNo}</span>
                        <span className='ml-3 keys'><EmailIcon /> {candidate.email}</span>
                        <span className='ml-3 keys'><LocationOnIcon /> {candidate.userLocation.city} | {candidate.userLocation.state}</span>
                        </div>

                        <p>{candidate.resumeTagline}</p>
                        {candidate.skills.map((item,index)=><Chip key={index} className="mx-2 my-1" label={item} />)}

                        <div style={{textAlign:"right"}}>
                            <p className="grey-text">Last Modified: {moment.parseZone(candidate.updatedAt).local().format("dddd, MMMM Do YYYY")}</p>
                            <p className="grey-text">Last Active: {moment.parseZone(candidate.lastActive).local().format("dddd, MMMM Do YYYY")}</p>
                        </div>

                    </div>
                </div>

                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} value={value} aria-label="lab API tabs example">
                    <Tab label="Profile Detail" value="1" />
                    <Tab label="Attached CV" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">{renderProfile()}</TabPanel>
                <TabPanel value="2">{attachedCV()}</TabPanel>
            </TabContext>
            </section>


            <section className="similar-candidate col-4">
            <div className="comment-parent shadow-sm">
                <div className="row mx-auto mb-2">
                    <div className="col-8">
                    <h2>Comments</h2>
                    </div>
                    <div className="p-0 col-4">
                    <Button onClick={()=>setOpen2(true)}>Add Comments</Button>
                    </div>
                </div>

                {
                    candidate.comments.map((item,index)=>item.recruiter===props.user.userInfo._id&&<div key={index}>
                        <h4>{item.title}</h4>
                        <p>{moment.parseZone(item.createdAt).local().format("dddd, MMMM Do YYYY")}</p>
                        <hr />
                    </div>)
                }
                
            </div>

            <h1>Similar <span className="primarycolorwh">Candidates</span></h1>
            {
                similarCandidates?similarCandidates.map((item,index)=><CandidateCardHalf key={index} {...item} />):null
            }
            </section>
            </section>}
            </>
         }

        </section>
        <Footer />
        </div>
  )
}
const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setSnackbar:(obj)=>dispatch(setSnackbar(obj)),
        fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(FindCandidates)