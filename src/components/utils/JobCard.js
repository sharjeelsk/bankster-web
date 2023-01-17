import React from 'react'
import {Button} from '@mui/material'
import "./JobCard.scss"
import {renderAgo} from './Functions'

function JobCard(props) {

  function numberWithCommas(x) {
    let num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num.length>7?`${num.substring(0,10)}..`:num
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
              return createdBy[0].companyName.length>15?`${createdBy[0].companyName.substring(0,100)} ...`:createdBy[0].companyName
          }else{
              return ""
          }
          
      }else if(createdBy.companyName){
          if(createdBy.companyName.length>0){
              return createdBy.companyName.length>15?`${createdBy.companyName.substring(0,100)} ...`:createdBy.companyName
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
    <p className="timeframe">{renderAgo(props.createdAt)}</p>
    <div className="row m-auto align-items-center">
        <div className="p-0 col-3">
        <img src={props.createdByAdmin?renderImageString(props.createdByAdmin):renderImageString(props.createdBy)} alt="logo1" />
        </div>
        <div className="col-8">
            <h5 className='companyname'>{props.companyName.length>15?`${props.companyName.substring(0,15)} ...`:props.companyName}</h5>
            <p className="companylocation">{props.jobLocation.city}, {`${props.jobLocation.state.substring(0,2)}..`}</p>
        </div>
    </div>
    <h4 className="jobname">{props.title.length>15?`${props.title.substring(0,15)} ...`:props.title}</h4>
    <h5 className="product">{`${props.product.substring(0,18)}..`}</h5>
    <p className="description">{props.jobDescription}</p>
    

    <div className="bottom-div">
    <p className="ctc"><span className="amount">₹{numberWithCommas(props.ctc.min)} - ₹{numberWithCommas(props.ctc.max)}</span></p>
    <Button onClick={()=>props.history.push(`/JobDetail/${props._id}`)} fullWidth className="mt-auto apply" variant="contained">Apply Now</Button>
    </div>
</div>
  )
}

export default JobCard