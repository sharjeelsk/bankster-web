import React from 'react'
import {Button} from '@mui/material'
import "./JobCard.scss"
import {renderAgo} from './Functions'
import LinearProgress from '@mui/material/LinearProgress';
function TrendingCard(props) {
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
//Business Development Analyst 28 characers
  return (
    <div onClick={()=>props.history.push(`/jobDetail/${props._id}`)} className="shadow job-card-item col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 trending cp">
        <p className="timeframe">{renderAgo(props.createdAt)}</p>
    <div className="row m-auto align-items-center">
        <div className="p-0 col-3">
        <img src={props.createdByAdmin?renderImageString(props.createdByAdmin):renderImageString(props.createdBy)} alt="logo1" />
        </div>
        <div className="col-8">
        <h5 className='companyname'>{props.companyName?(props.companyName.length>15?`${props.companyName.substring(0,15)} ...`:props.companyName):""}</h5>
        <p className="companylocation">{props.jobLocation.city}, {`${props.jobLocation.state.substring(0,2)}..`}</p>
        </div>
    </div>
    <h4 className="jobname">{props.title.length>15?`${props.title.substring(0,15)} ...`:props.title}</h4>
    <h5 className="product">{`${props.product.substring(0,18)}..`}</h5>
    <p className="description">{props.jobDescription.length>100?`${props.jobDescription.substring(0,100)} ...`:props.jobDescription}</p>
    <p className="ctc"><span className="amount">₹{numberWithCommas(props.ctc.min)} - ₹{numberWithCommas(props.ctc.max)}</span></p>
    <LinearProgress variant="determinate" value={props.applied_count} />
    <p className="apply-text"><span className="primarycolor">{props.applied_count}</span> Applied out of 100</p>
</div>
  )
}

export default TrendingCard