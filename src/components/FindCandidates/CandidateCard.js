import React from 'react'
import "./FindCandidates.scss"
import {Chip} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import {getAge} from '../utils/Functions'
import axios from 'axios'
function CandidateCard(props) {
    console.log(props)
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
    <div className="candidate-card shadow-sm row m-auto">
        <div className="col-3 img-div">
            <img src="/avatar.png" alt="avatar" />
        </div>
        <div className="col-9 content-div">
            <div className="row m-auto">
                <div className="p-0 col-12">
                <h3>{stringHide(props.fullName,"fullName")}</h3>
                <p className="bold-text">{props.hide?renderEmployementStringHide():renderEmployementString()}</p>
                <p className="bold-text">{props.education.length>0?props.education.map(i=>{
                    if(i.featuredEducation){
                        return i.name + ', ' + i.universityName;
                    }
                }):"Featured Education Not Added"}</p>
                <p className="grey-text">Gender: {props.gender} | DOB: {props.dob?getAge(props.dob):"DOB Missing"}</p>
                <p className="grey-text">
                    Years of Experience: {props.yearsOfExperience?props.yearsOfExperience:'Not Added'}<br /><br />
                    Current CTC: {props.currentCtc}<br /><br />
                    Product: {props.product} <br /><br />
                    Notice Period: {props.noticePeriod}<br />
                </p>
                </div>
            </div>

            <div className="my-3">
            <p className='keys'><LocalPhoneIcon /> {stringHide(props.mobileNo,"mobileNo")}</p>
            <p className='keys'><EmailIcon /> {stringHide(props.email,"email")}</p>
            <p className='keys'><LocationOnIcon /> {props.userLocation.city} | {props.userLocation.state}</p>
            </div>
            {(props.resume.length>0 && !props.hide)&&<div onClick={()=>{
                    window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${props.resume}`, '_blank');
                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/increaseProfileCount`,{candidateId:props._id},{headers:{token:props.user.user}})
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }} className="p-0 resume-cont row m-auto align-items-center shadow-sm">
                    <div className="">
                        <DescriptionIcon />
                    </div>
                    <div className="ml-2">
                        <h5>{props.fullName}'s Resume</h5>
                        <p className="mt-1">Click to view resume</p>
                    </div>
                </div>}

        </div>
    </div>
  )
}

export default CandidateCard