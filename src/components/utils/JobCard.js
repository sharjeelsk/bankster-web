import React from 'react'
import {Button} from '@mui/material'
import "./JobCard.scss"
function JobCard(props) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
const renderNameString = (createdBy)=>{
  if(createdBy){
      if(Array.isArray(createdBy) && createdBy.length>0){
          if(createdBy[0].companyName.length>0){
              return createdBy[0].companyName
          }else{
              return ""
          }
          
      }else if(createdBy.companyName){
          if(createdBy.companyName.length>0){
              return createdBy.companyName
          }else{
              return ""
          }
          
      }else{
          return ""
      }
  }

}
  return (
    <div className="shadow job-card-item col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 cp">
    <div className="row m-auto align-items-center">
        <div className="p-0 col-3">
        <img src={props.createdByAdmin?renderImageString(props.createdByAdmin):renderImageString(props.createdBy)} alt="logo1" />
        </div>
        <div className="col-8">
            <h5 className='companyname'>{props.createdByAdmin?renderNameString(props.createdByAdmin):renderNameString(props.createdBy)}</h5>
            <p className="companylocation">{props.jobLocation.city}, {props.jobLocation.state}</p>
        </div>
    </div>
    <h4 className="jobname">{props.title}</h4>
    <h5 className="product">{props.product}</h5>
    <p className="description">{props.jobDescription.length>100?`${props.jobDescription.substring(0,100)} ...`:props.jobDescription}</p>
    <p className="ctc"><span className="amount">₹{numberWithCommas(props.ctc.min)} - ₹{numberWithCommas(props.ctc.max)}</span></p>
    <Button onClick={()=>props.history.push(`/JobDetail/${props._id}`)} fullWidth className="mt-auto apply" variant="contained">Apply Now</Button>
</div>
  )
}

export default JobCard