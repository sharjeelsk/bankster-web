import React from 'react'
import "./Home.scss"
import Header from './Header/Header'
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import SearchBar from './utils/SearchBar';
import {Button} from '@mui/material'
import JobCard from './utils/JobCard'
import TrendingCard from './utils/TrendingCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from './Footer/Footer';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function Home(props) {

    const [jobData,setJobData]  = React.useState(null)

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/allJobData`)
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                setJobData({...res.data.result})
            }
        })
    },[])
    console.log(jobData)
    return (
        <div className="home-section"> 
            <div className='gradient-home'>
            <Header />
            <section >
           <h1>Get The <span className="primarycolorwh">Right Job</span> Your Deserve at</h1>
           <h2>BanksterIndia</h2>
           <div className="row m-auto align-items-center justify-content-center meta-row">
                <div className="col-3">
                    <h3>{jobData?jobData.totalJobCount:".."}</h3>
                    <p><WorkTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Jobs</span></p>
                </div>
                <div className="col-3">
                    <h3>{jobData?jobData.totalCandidateCount:".."}</h3>
                    <p><PeopleAltTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Candidates</span></p>
                </div>
                <div className="col-3">
                    <h3>{jobData?jobData.totalRecruiterCount:".."}</h3>
                    <p><PeopleAltTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Recruiters</span></p>
                </div>
                <div className="col-3">
                    <h3>{jobData?jobData.totalLocations.length:".."}</h3>
                    <p><LocationOnTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Locations</span></p>
                </div>
           </div>

            <SearchBar />

           </section>
           </div>

            {jobData&&<>
            <h3 className="mt-5 pt-5">Job Locations on Bankster</h3>
           <Carousel autoPlay
            dynamicHeight={50}
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            >
                <div className="row mx-5 justify-content-center">
                    {
                        jobData.totalLocations
                        .slice(0,jobData.totalLocations.length/2)
                        .map((item,index)=><p className="mx-2" key={index}>{item._id} |</p>)
                    }
                </div>
                <div className="row mx-5 justify-content-center">
                    {
                        jobData.totalLocations
                        .slice(jobData.totalLocations.length/2,jobData.totalLocations.length)
                        .map((item,index)=><p className="mx-2" key={index}>{item._id} |</p>)
                    }
                </div>
                {/* <div className="row mx-3">
                    {
                        jobData.totalLocations
                        .slice(0,jobData.totalLocations.length/2)
                        .map((item,index)=><p className="m-2" key={index}>{item._id}</p>)
                    }
                </div> */}
            </Carousel>
            </>}

            <h3>Our <span className="primarycolorwh">Partners</span></h3>

            <Carousel autoPlay
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            >
                <div className="row mx-5 justify-content-center">
                    {
                        <div className='partner-section'>
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        </div>
                    }
                </div>
                <div className="row mx-5 justify-content-center">
                    {
                        <div className='partner-section'>
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        <img src="/logo2.png" alt="logo1" />
                        </div>
                    }
                </div>
                {/* <div className="row mx-3">
                    {
                        jobData.totalLocations
                        .slice(0,jobData.totalLocations.length/2)
                        .map((item,index)=><p className="m-2" key={index}>{item._id}</p>)
                    }
                </div> */}
            </Carousel>




           <div className="bankster-jobs">
            <h3><span className="primarycolorwh">Bankster</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                jobData&&jobData.banksterJob
                .map((item,index)=><JobCard history={props.history} {...item} key={index} />)
                }
                </section>
           </div>
 
           <div className="row m-auto popular-role-head">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 left">
                    <h4>Popular Products Job on Bankster</h4>
                    <p>These are the popular products having high number of jobs.</p>
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 right row m-auto justify-content-between">
                    {
                        jobData&&jobData.product.map((item,index)=>
                        <div key={index} onClick={()=>props.history.push("/findjobs",{key:"product",value:item._id})} className="shadow single-card col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>{item._id}</h4>
                        <p>{item.count} jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>)
                    }
                    
                </div>
           </div>


           <div className="bankster-jobs mt-5">
            <h3><span className="primarycolorwh">Featured</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                jobData&&jobData.latestJobs
                .map((item,index)=><JobCard history={props.history} {...item} key={index} />)
                }
                </section>
           </div>

           <div className="info-div row m-auto align-items-center">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <img src="/resumeimg.png" alt="banksterlog" className="shadow" />
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <h4>Get Matched the most valuable jobs, Just Drop Your CV at <span className="primarycolorwh">Bankster India</span></h4>
                    <p style={{color:"black"}}> 
                    Get Matched for the most valuable jobs, Just Drop Your CV at Bankster India. 
                    Just upload your cv in a few steps and get the right job at the right place at the right time 
                    <br />
                    <span style={{color:"black"}}><b>Step 1: Click on the Signup button in the upper right corner. </b></span>
                    <br />
                    <span style={{color:"black"}}><b>Step 2: Register Yourself as a candidate experienced or fresher.  </b></span>
                    <br />
                    <span style={{color:"black"}}><b>Step 3: Verify your account with your email id and get access to your dashboard.  </b></span>
                    <br />
                    <span style={{color:"black"}}><b>Step 4: Fill up all your details from personal info to employment details  </b></span>
                    <br />
                    <span style={{color:"black"}}><b>Step 5: In the upper right corner you will see the upload cv button, click on that button and attach your updated cv.   </b></span>
                    <br />

                    <p style={{color:"black"}}>We will get back to you on the availability of a position suitable for your profile. </p>

                    </p>
                </div>
           </div>

           <div className="bankster-jobs">
            <h3><span className="primarycolorwh">Latest</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                jobData&&jobData.latestJobs
                .map((item,index)=><JobCard history={props.history} {...item} key={index} />)
                }
                </section>
           </div>

           <div className="bankster-jobs mt-5">
            <h3><span className="primarycolorwh">Trending</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                jobData&&jobData.trendingJobs
                .map((item,index)=><TrendingCard history={props.history} {...item} key={index} />)
                }
                </section>
           </div>

           <img className="w-100 my-3" src="/banners/banner1.png" alt="oneplus" />

                <Footer />
        </div>
    )
}

export default Home
