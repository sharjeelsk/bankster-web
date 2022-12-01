import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FilterMenu from './FilterMenu'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material'
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
import CandidateCard from './CandidateCard';
import axios from 'axios'
function FindCandidates() {
const [display,setDisplay]=React.useState(false)
const [candidates,setCandidates]=React.useState(null)
const urlParams = new URLSearchParams(window.location.search);

const title = urlParams.get('title');
const location = urlParams.get('location');
const salary = urlParams.get('salary');
console.log(title,location,salary)
React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getAllCandidates`,{headers:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RSZWNAZ21haWwuY29tIiwiX2lkIjoiNjMwZGE5MGZjNGY2YzEwODFmODEyZDY4IiwiaWF0IjoxNjYyMDA5OTY3fQ.0KvAkMqzmms2XBoNKWskZrt2lgd2Oi0tjgWgILbQ7tI'}})
    .then(res=>{
        console.log(res)
        setCandidates(res.data.result)
    })
},[])

  return (
    <div>
        <Header id="2" />
        <section className="row m-auto find-jobs-head">
            <div className="p-0 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="display-mobile">
                {!display?<IconButton onClick={()=>setDisplay(true)}>
                    <MenuIcon />
                </IconButton>:<FilterMenu setDisplay={setDisplay} />}
                </div>
                <div className="p-3 display-desktop">
                {/* style={{height:"100%"}} */}
                    <FilterMenu />
                </div>
            </div>
            
            <div className='p-0 col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 find-jobs-content'>
            <h1>Candidates based in <span className="primarycolorwh">Aurangabad</span></h1>
            {
                candidates?candidates.map((item,index)=><CandidateCard key={index} {...item} />):null
            }
            </div>

            <div className='p-0 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 right-section-job'>
                <section className="shadow-sm search-container">
                    <h4><SearchIcon /> Search Candidates Via Company</h4>
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
                    <h4><SearchIcon /> Search Candidates Via Tags</h4>
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

export default FindCandidates