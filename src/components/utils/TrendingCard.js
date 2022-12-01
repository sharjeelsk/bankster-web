import React from 'react'
import {Button} from '@mui/material'
import "./JobCard.scss"
import LinearProgress from '@mui/material/LinearProgress';
function TrendingCard() {
  return (
    <div className="shadow job-card-item col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 trending">
    <div className="row m-auto align-items-center">
        <div className="p-0 col-3">
            <img src="/logo1.png" alt="logo1" />
        </div>
        <div className="col-8">
            <h5 className='companyname'>Spotify</h5>
            <p className="companylocation">New York, USA</p>
        </div>
    </div>
    <h4 className="jobname">Mutual Fund Analyst</h4>
    <h5 className="product">Mutual Fund</h5>
    <p className="description">Aliquip aliquip ad nulla Lorem excepteur magna pariatur qui culpa velit pariatur voluptate ex.</p>
    <p className="ctc"><span className="amount">$2500 - $3500</span>/month</p>
    <LinearProgress variant="determinate" value={55} />
    <p className="apply-text"><span className="primarycolor">25</span> Applied out of 100</p>
</div>
  )
}

export default TrendingCard