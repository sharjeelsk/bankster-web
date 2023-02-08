import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { IconButton } from '@mui/material'
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
import CandidateCardHalf from './CandidateCardHalf'
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

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const param = useParams();
console.log(param)

React.useEffect(()=>{
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
    
},[])
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

const renderProfile = ()=>{
    return <div>
        <h2>Info</h2>
        <p>Category: {candidate.category}</p>
        <p>Date of Birth: {candidate.dob}</p>
        <p>Marital Status: {candidate.maritalStatus}</p>
        <p>Fresher: {candidate.fresher}</p>
        <h2>Work Experience</h2>
        {
            candidate.workExperience.map((i,ind)=><div key={ind}>
                <p>Company Name: {i.name}</p>
                <p>Designation: {i.designation}</p>
                <p>Description: {i.description}</p>
                <p>Start Date: {i.startDate}</p>
                <p>End Date: {i.endDate}</p>
                <p>Current Company: {i.current.toString()}</p>
            </div>)
        }
        <h2>Education</h2>
        {
            candidate.education.map((i,ind)=><div key={ind}>
                <p>Name: {i.name}</p>
                <p>University Name: {i.universityName}</p>
                <p>Start Date: {i.startDate}</p>
                <p>End Date: {i.endDate}</p>
                <p>Featured Education: {i.featuredEducation.toString()}</p>
                <p>Current Education: {i.current.toString()}</p>
            </div>)
        }
        <h2>Languages</h2>
        {
            candidate.languages.map((i,ind)=><Chip label={i} key={ind} className="m-2" />)
        }
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
<iframe
    title="pdfview"
    src={`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${candidate.resume}`}
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></iframe>
        </div>
}

  return (
    <div>
        <Header id="2" />
        <section className="row m-auto candidate-info-container">
         {
            error?
            <div className="error-parent-div"><h1>{error}</h1></div>:
            <>
            {candidate&&<section className="candidate-info-parent col-12 row m-auto">

                <section className="single-candidate-info-section col-8">
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
export default connect(mapStateToProps)(FindCandidates)