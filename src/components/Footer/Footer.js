import { Button,Icon,IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
function Footer() {
  return (
    <div className="footer">
        {/* <section className="shadow row m-auto newsletter align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <h3>Never Miss any update from <span className="primarycolorwh">Bankster</span></h3>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 row m-auto align-items-center input-div">
                    <div className="col-7 col-sm-7 col-md-9 col-lg-9 col-xl-9">
                    <input placeholder="Enter Email Address" />
                    </div>
                    <div className="col-5 col-sm-5 col-md-3 col-lg-3 col-xl-3">
                    <Button fullWidth variant="contained">Subscribe</Button>
                    </div>
            </div>
        </section> */}
        <section className="footer-main row m-auto">
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 logo">
                <img src="/banksterfullAsset.png" alt="banksterlogo" />
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 content row m-auto">
                <div className="col-4">
                <Link className="link" to="/aboutus">About Us</Link>
                <Link className="link" to="/privacypolicy">Privacy Policy</Link>
                <Link className="link" to="/faq">FAQ's</Link>
                <Link className="link" to="/terms">Terms and Conditions</Link>
                </div>
                <div className="col-4">
                {/* <Link className="link" to="/blogs">Blogs</Link> */}
                <Link className="link" to="/refundpolicy">Refund Policy</Link>
                <Link className="link" to="/contactus">Contact Us</Link>
                <Link className="link" to="/findjobs">Find Jobs</Link>
                </div>
                <div className="col-4">
                <Link className="link" to="/findcandidates">Find Candidates</Link>
                <Link className="link" to="/signup">Candidate SignUp</Link>
                <Link className="link" to="/SignupRecruiter">Recruiter SignUp</Link>
                {/* <Link className="link" to="#">Terms and Conditions</Link> */}
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 footer-headline">
                <h3>Mobile App Coming Soon</h3>
            </div>
            <div className="bottom-footer col-10 row m-auto align-items-center">
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                Get the right job here at BanksterIndia
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                support@banksterindia.com
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <IconButton onClick={()=> window.open("https://www.facebook.com/banksterindia/", "_blank")}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton onClick={()=> window.open("https://www.linkedin.com/company/banksterindia/mycompany/", "_blank")}>
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton onClick={()=> window.open("https://twitter.com/Bankster_India/", "_blank")}>
                        <TwitterIcon />
                    </IconButton>
                    <IconButton onClick={()=> window.open("https://www.instagram.com/banksterindia.in/", "_blank")}>
                        <InstagramIcon />
                    </IconButton>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer