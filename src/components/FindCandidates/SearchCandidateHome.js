import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import CandidateCard from './CandidateCard'
import { Button } from '@mui/material'
import {connect} from 'react-redux'
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function SearchCandidateHome(props) {
    const [data,setData] = React.useState(null)
    const [limit1,setLimit1] = React.useState(10)
    const [error,setError] = React.useState(null)
    React.useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getCandidateHomeData`,{limit:limit1},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setError(null)
            if(res.data.result.length>0){
                setData(res.data.result[0])
            }
            
        })
        .catch(err=>{
            console.log(err.response)
            setError(err.response)
        })

    },[limit1])

    const renderError = ()=>{
        if(error.data === "Unauthorized Access"){
            return <div className="col-12 no-jobs">
            <h1>LogIn as a Premium Recruiter in order to access this section</h1>
            <Button onClick={()=>props.history.push("/Loginrecruiter")} variant="contained">Log In as a recruiter</Button>
         </div>
        }else if(error.data === "Upgrade Plan"){
            return <div className="col-12 no-jobs">
            <h1>Upgrade your plan in order to access this section</h1>
            <Button onClick={()=>props.history.push("/subscriptionR")} variant="contained">Upgrade Plan</Button>
         </div>
        }
    }

    const renderHide = ()=>{
        return true;
        // if(!props.user.user){
        //     return true
        // }else if(props.user.userInfo.subscription!=="635a98177ca2905a363e4dcb" || props.user.userInfo.subscription!=="6379d060497ca6b7d0b6ab56" || props.user.userInfo.subscription!=="6379d0c2497ca6b7d0b6ab58"){
        //     return false
        // }else{
        //     return true
        // }
    }

  return (
    <div>
        <Header id="3" />
        {data&&<section className="search-candidate-home">
        <h1 className="px-3">Featured Candidates</h1>
        <div className="row m-auto">
         {
            data.featuredCandidates.map((item,index)=>
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 candidate-card-head" key={index}>
                <CandidateCard 
                hide={renderHide()}
                {...item}
                />
            </div>)
         }   
         </div>
         <div style={{textAlign:"center"}}>
        <Button
        variant="outlined"
        className="my-4"
        onClick={()=>setLimit1(limit1+1)}
        endIcon={<ReplayIcon />}
        >Load More</Button>
        </div>
        
        <h1 className="px-3">Immediate Joiner</h1>
        <div className="row m-auto">
        {
            data.immediateJoiner.map((item,index)=>
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 candidate-card-head" key={index}>
                <CandidateCard 
                hide={renderHide()}
                {...item}
                />
            </div>)
         }  
         </div>

         <h1 className="px-3">Latest Candidates</h1>
        <div className="row m-auto">
        {
            data.latestCandidate.map((item,index)=>
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 candidate-card-head" key={index}>
                <CandidateCard 
                hide={renderHide()}
                {...item}
                />
            </div>)
         }  
         </div>
        </section>}
        <div  style={{position:"fixed",bottom:"5%",right:"5%",zIndex:5}}>
                    <Tooltip title="Search Candidates">
                    <Fab variant="extended" onClick={()=>props.history.push("/searchcandidates")} color="primary" aria-label="add">
                        <SearchOutlinedIcon sx={{ mr: 1 }} />
                        Search Candidates
                    </Fab>
                    </Tooltip>
            </div>
        {/* <img className="my-3 width-100" src="/banners/bannerCandidate2.png" alt="oneplus" /> */}
        <Footer />
    </div>
  )
}
const mapStateToProps = ({banksterUser})=>{    
    return {
        user:banksterUser
    }
}
export default connect(mapStateToProps)(SearchCandidateHome)