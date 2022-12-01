import React from 'react'
import "./Home.scss"
import Header from './Header/Header'
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import SearchBar from './utils/SearchBar';
import {Button} from '@mui/material'
import JobCard from './utils/JobCard';
import TrendingCard from './utils/TrendingCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from './Footer/Footer';
function Home() {
    return (
        <div className="home-section"> 
            <div className='gradient-home'>
            <Header />
            <section >
           <h1>Get The <span className="primarycolorwh">Right Job</span> Your Deserve at</h1>
           <h2>BanksterIndia</h2>
           <div className="row m-auto align-items-center justify-content-center meta-row">
                <div className="col-4">
                    <h3>1789</h3>
                    <p><WorkTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Jobs</span></p>
                </div>
                <div className="col-4">
                    <h3>1489</h3>
                    <p><PeopleAltTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Users</span></p>
                </div>
                <div className="col-4">
                    <h3>789</h3>
                    <p><LocationOnTwoToneIcon className="icon-home" color="primary" /><span className="ml-2 primarycolor">Locations</span></p>
                </div>
           </div>

            <SearchBar />

           </section>
           </div>

           <div className="partner-section">
           <h3>Our <span className="primarycolorwh">Partners</span></h3>
           <img src="/logo2.png" alt="logo1" />
           <img src="/logo3.png" alt="logo1" />
           <img src="/logo4.png" alt="logo1" />
           <img src="/logo2.png" alt="logo1" />
           </div>

           <div className="bankster-jobs">
            <h3><span className="primarycolorwh">Bankster</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                [1,2,3,4,5]
                .map((item,index)=><JobCard key={index} />)
                }
                </section>
           </div>
 
           <div className="row m-auto popular-role-head">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 left">
                    <h4>Popular Roles on Bankster</h4>
                    <p>Ullamco elit ut ullamco magna eu Lorem amet cupidatat aliqua excepteur anim elit in.</p>
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 right row m-auto justify-content-between">
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="shadow single-card col-5 row m-auto align-items-center justify-content-between">
                        <div>
                        <h4>Manager</h4>
                        <p>26k jobs</p>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                </div>
           </div>

           <div className="bankster-jobs mt-5">
            <h3><span className="primarycolorwh">Featured</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                [1,2,3,4,5]
                .map((item,index)=><JobCard key={index} />)
                }
                </section>
           </div>

           <div className="info-div row m-auto align-items-center">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <img src="/resumeimg.png" alt="banksterlog" className="shadow" />
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <h4>Get Matched the most valuable jobs, Just Drop Your CV at <span className="primarycolorwh">Bankster India</span></h4>
                    <p>
                        Sit aliqua dolor officia ea laborum occaecat enim. Fugiat ea dolore dolore cillum. Tempor culpa consectetur nisi cillum.
                        Ea occaecat pariatur esse non quis amet ipsum magna aliquip exercitation. Tempor velit non pariatur ad anim excepteur. Nulla ex pariatur aliqua esse aliquip id commodo dolor. Sunt consectetur enim ex amet officia ut laborum. Et cillum adipisicing nulla velit sit anim deserunt. Est voluptate aliqua quis mollit commodo anim reprehenderit.

Incididunt fugiat ex deserunt non deserunt veniam est est id ea. Fugiat aliqua dolore Lorem nisi ea consequat ullamco anim ut sint. Et velit reprehenderit irure fugiat magna occaecat minim elit culpa ut fugiat consectetur sit consectetur.

Est ad et mollit Lorem aute excepteur deserunt esse esse reprehenderit do qui laboris voluptate. Ea culpa tempor irure sit nostrud. Esse ea reprehenderit velit amet nisi dolore aute ipsum. Cupidatat dolor laboris labore aliqua nostrud mollit mollit aute elit anim eiusmod. Nulla aliqua voluptate laboris irure laborum veniam excepteur.

Pariatur ullamco culpa nisi commodo cillum amet laborum eu fugiat id incididunt aliquip. Sint laborum tempor laborum occaecat culpa ex deserunt fugiat consequat. Eu ipsum ullamco do ea excepteur non proident amet culpa anim. Excepteur aliquip culpa nostrud eiusmod consectetur excepteur. Adipisicing laborum ex dolor nisi duis.
                    </p>
                </div>
           </div>

           <div className="bankster-jobs">
            <h3><span className="primarycolorwh">Latest</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                [1,2,3,4,5]
                .map((item,index)=><JobCard key={index} />)
                }
                </section>
           </div>

           <div className="bankster-jobs mt-5">
            <h3><span className="primarycolorwh">Trending</span> Jobs</h3>
                <section className="job-card-head row m-auto justify-content-between">
                {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                .map((item,index)=><TrendingCard key={index} />)
                }
                </section>
           </div>

                <Footer />
        </div>
    )
}

export default Home
