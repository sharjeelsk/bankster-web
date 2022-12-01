import React from 'react'
import "./FindCandidates.scss"
import {Chip} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
function CandidateCard(props) {
    console.log(props)
  return (
    <div className="candidate-card shadow-sm row m-auto">
        <div className="col-1 img-div">
            <img src="/avatar.png" alt="avatar" />
        </div>
        <div className="col-11 content-div">
            <div className="row m-auto">
                <div className="p-0 col-6">
                <h3>{props.fullName}</h3>
                <p>B.Tech CSE, IIT Bombay</p>
                <p>(One More Key)</p>
                </div>
                {props.resume.length>0&&<div onClick={()=>{
                    window.open(`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${props.resume}`, '_blank');
                    //window.location.href=`${process.env.REACT_APP_DEVELOPMENT}/api/pdf/${props.resume}`
                    //window.location.href()
                }} className="p-0 col-5 resume-cont row m-auto align-items-center shadow-sm">
                    <div className="">
                        <DescriptionIcon />
                    </div>
                    <div className="ml-2">
                        <h5>{props.fullName}'s Resume</h5>
                        <p>Updated on : 25/04/2022</p>
                    </div>
                </div>}
            </div>

            <div className="my-3">
            <span className='keys'><LocalPhoneIcon /> {props.mobileNo}</span>
            <span className='ml-3 keys'><EmailIcon /> {props.email}</span>
            <span className='ml-3 keys'><LocationOnIcon /> {props.userLocation.city} | {props.userLocation.state}</span>
            </div>

            <p>{props.resumeTagline}</p>
            {props.skills.map((item,index)=><Chip key={index} className="mx-2 my-1" label={item} />)}

        </div>
    </div>
  )
}

export default CandidateCard