import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FilterMenu from './FilterMenu'
import "./FindJobs.scss"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material'
import {connect} from 'react-redux'
import SearchBar from '../utils/SearchBar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Rating from '@mui/material/Rating';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import { Link } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {fetchCandidateInfo} from '../redux/user/userActions'
function FindJobs(props) {
const [display,setDisplay]=React.useState(false)
const [jobs,setJobs]=React.useState([])
const urlParams = new URLSearchParams(window.location.search);
const [bookmarked,setBookmarked]=React.useState(false)
const title = urlParams.get('title');
const location = urlParams.get('location');
const salary = urlParams.get('salary');
console.log(title,location,salary,jobs)
React.useEffect(()=>{
    ///api/job/searchJobs
    if(!title && !location && !salary){
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getAllJobs`,{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyaXZlc2hAYmFua3N0ZXIuY29tIiwiX2lkIjoiNjJmM2E3ZjA0ODA4OWE4MDFkM2E3ODA3IiwiaWF0IjoxNjYxMTUyOTUwfQ.yI7xfT8AUAs4NM1S3xsw5xnttnr-cYmHdty0r_itRes"}})
        .then(res=>{
            console.log(res)
            setJobs(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }else{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/searchJobs`,{title:title?title:"",city:location?location:"",salary:salary?salary:""},{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyaXZlc2hAYmFua3N0ZXIuY29tIiwiX2lkIjoiNjJmM2E3ZjA0ODA4OWE4MDFkM2E3ODA3IiwiaWF0IjoxNjYxMTUyOTUwfQ.yI7xfT8AUAs4NM1S3xsw5xnttnr-cYmHdty0r_itRes"}})
        .then(res=>{
            console.log(res)
            setJobs(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
},[title,location,salary])


const handleBookmarkAdd = (jobId)=>{
    if(props.user.userInfo.bookmarks.jobs.includes(jobId)){
        //removeBookmarkJob
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/removeBookmarkJob`,{jobId:jobId},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }else{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/bookmarkJob`,{jobId:jobId},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            props.fetchCandidateInfo(props.user.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }

}
//test comment
  return (
    <div>
        <Header id="2" />
        <section className="row m-auto find-jobs-head">
            <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="display-mobile">
                {!display?<IconButton onClick={()=>setDisplay(true)}>
                    <MenuIcon />
                </IconButton>:<FilterMenu setJobs={setJobs} setDisplay={setDisplay} />}
                </div>
                <div className="p-3 display-desktop">
                {/* style={{height:"100%"}} */}
                    <FilterMenu setJobs={setJobs} />
                </div>
            </div>
            
            <div className='p-0 col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 find-jobs-content'>
                <SearchBar fullWidth={true} />
                
                {
                    jobs.length>0?jobs.map((item,index)=>(
                        <section key={index} className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                        <img src={item.createdBy[0].companyImg?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.createdBy[0].companyImg}`:'/job-offer.png'} alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                    <Link className="link" to={`/jobdetail/${item._id}`}>
                        <h3>{item.title}</h3>
                        <p className="company-name m-0">{item.createdBy[0].companyName}</p>
                        <h4 className="m-0">{item.product}</h4>
                            <div className='row m-auto align-items-center'>
                                <div>
                                <Rating name="read-only" value={3} readOnly />
                                </div>
                                <div>
                                <p className="total-reviews">(47 Reviews)</p>
                                </div>
                            </div>
                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <WorkIcon />
                                <span className='key-headline m-2'>{item.experience.min} - {item.experience.max} Yrs</span>
                            </div>
                            <div className="m-1">
                                <CurrencyRupeeIcon />
                                <span className='key-headline m-2'>{item.ctc.min} - {item.ctc.max} P.A</span>
                            </div>
                            <div className="m-1">
                                <FmdGoodIcon />
                                <span className='key-headline m-2'>{item.jobLocation.city} | {item.jobLocation.state} | {item.jobLocation.country}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <ArticleIcon />
                                <span className='key-headline m-2'>{item.qualification.ug} in CSE</span>
                            </div>
                            <div className="m-1">
                                <DescriptionIcon />
                                <span className='key-headline m-2'>{item.qualification.pg} in Finance</span>
                            </div>
                            <div className="m-1">
                                <Inventory2Icon />
                                <span className='key-headline m-2'>{item.industry}</span>
                            </div>
                        </div>

                        <div className="description">
                            {item.jobDescription}
                        </div>

                        <div className="keys">
                        {item.tags.map((tag,index)=><Chip key={index} className="m-3" label={tag} />)}
                        </div>
                        </Link>

                    </div>
                    <div className="bookmark-div col-2">
                    <IconButton onClick={()=>{
                        if(!props.user.user){
                            props.history.push("/login")
                        }else{
                            handleBookmarkAdd(item._id)
                        }
                        
                        }}>
                    {/* <BookmarkIcon /> */}
                        {
                        props.user.user?props.user.userInfo.bookmarks.jobs.includes(item._id)?<BookmarkIcon />:<BookmarkBorderIcon />:
                        <BookmarkBorderIcon />
                        }
                        </IconButton>
                    </div>
                </section>
                    )):
                    <h1>Sorry, No Jobs Available for "{title}"</h1>
                }

              

            </div>


            <div className='p-0 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 right-section-job'>
                <section className="shadow-sm search-container">
                    <h4><SearchIcon /> Search Jobs Via Company</h4>
                    <img src="/logo2.png" alt="logo2" />
                    <img src="/logo3.png" alt="logo2" />
                    <img src="/logo4.png" alt="logo2" />
                    <img src="/logo2.png" alt="logo2" />
                    <img src="/logo3.png" alt="logo2" />
                    <img src="/logo4.png" alt="logo2" />
                    <img src="/logo2.png" alt="logo2" />
                    <img src="/logo3.png" alt="logo2" />
                    <img src="/logo4.png" alt="logo2" />
                    <img src="/logo2.png" alt="logo2" />
                    <img src="/logo3.png" alt="logo2" />
                    <img src="/logo4.png" alt="logo2" />
                    <img src="/logo2.png" alt="logo2" />
                    <img src="/logo3.png" alt="logo2" />
                    <img src="/logo4.png" alt="logo2" />
                </section>

                <section className="shadow-sm search-container">
                    <h4><SearchIcon /> Search Jobs Via Tags</h4>
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                    <Chip className="m-2" label="Clickable" onClick={()=>null} />
                </section>
            </div>
        </section>
        <Footer />
        </div>
  )
}
const mapDispatchToProps = (dispatch)=>{
    return {
      fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token))
    }
  }

const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FindJobs)