import React from 'react'
import "./FindCandidates.scss"
import {Chip} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import {getAge} from '../utils/Functions'
import {Link} from 'react-router-dom'
import axios from 'axios'
function CandidateCard(props) {
    const renderEmployementString = ()=>{
        if(props.fresher){
            return "Fresher"
        }else if(props.workExperience.filter(i=>i.current===true).length>0){
            let strobj = props.workExperience.filter(i=>i.current===true)[0]
            return `${strobj.designation} | ${strobj.name}`
        }else{
            return "Currently Unemployed"
        }
    }

    const renderEmployementStringHide = ()=>{
        if(props.fresher){
            return "Fr***"
        }else if(props.workExperience.filter(i=>i.current===true).length>0){
            let strobj = props.workExperience.filter(i=>i.current===true)[0]
            return `${strobj.designation.substr(0,strobj.designation.length-3)}*** | ${strobj.name.substr(0,strobj.name.length-3)} ***`
        }else{
            return "Currently ****"
        }
    }
    const stringHide = (string,type)=>{
        if(props.hide && type==="fullName"){
            return `**** ${string.split(" ")[1]}`
        }else if(props.hide && type==="mobileNo"){
            return `${string.substr(0,2)} ****** ${string.substr(8,10)}`
        }else if(props.hide && type==="email"){
            return `******* @${string.split("@")[1]}`
        }
        else{
            return string
        }
    }

  return (
    <Link className="link" to={`/candidate-info/${props._id}`}>
    <div className="candidate-card-half shadow-sm row m-auto">
        <div className="col-2 img-div">
        <img src={props.profilePicture?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${props.profilePicture}`:"/user.png"} alt="avatar" />
        </div>
        <div className="col-10 content-div">
            <div className="row m-auto">
                <div className="p-0 col-12">
                <h3>{stringHide(props.fullName,"fullName")}</h3>
                <p className="bold-text">{props.hide?renderEmployementStringHide():renderEmployementString()}</p>
                <p className="bold-text">{props.education.length>0?props.education.map(i=>{
                    if(i.featuredEducation){
                        return i.name + ', ' + i.universityName;
                    }
                }):"Featured Education Not Added"}</p>
                <p className="grey-text">{props.gender} | {props.dob?getAge(props.dob):"DOB Missing"}</p>
                <p className="grey-text">{props.yearsOfExperience?props.yearsOfExperience:'Not Added'} Years of Experience | {props.currentCtc} CTC | {props.product} | {props.noticePeriod}</p>
                </div>
                {/* {props.resume.length>0&&<div onClick={()=>{
                    window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${props.resume}`, '_blank');
                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/increaseProfileCount`,{candidateId:props._id},{headers:{token:props.user.user}})
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
                        <h5>{props.fullName}'s Resume</h5>
                        <p className="mt-1">Click to view resume</p>
                    </div>
                </div>} */}
            </div>

            <div className="my-3">
            <span className='keys'><LocalPhoneIcon /> {stringHide(props.mobileNo,"mobileNo")}</span>
            <span className='ml-3 keys'><EmailIcon /> {stringHide(props.email,"email")}</span>
            <span className='ml-3 keys'><LocationOnIcon /> {props.userLocation.city} | {props.userLocation.state}</span>
            </div>

            <p>{props.resumeTagline}</p>
            {props.skills.map((item,index)=><Chip key={index} className="mx-2 my-1" label={item} />)}

        </div>
    </div>
    </Link>
  )
}

export default CandidateCard