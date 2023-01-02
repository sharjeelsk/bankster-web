import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import CandidateCard from './CandidateCard'
import { Button } from '@mui/material'
import {connect} from 'react-redux'

function SearchCandidateHome(props) {
    const [data,setData] = React.useState(null)
    const [limit1,setLimit1] = React.useState(1)
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

  return (
    <div>
        <Header id="3" />
        {!error?<>
        {data&&<section className="search-candidate-home">
        <h1 className="px-3">Featured Candidates</h1>
         {
            data.featuredCandidates.map((item,index)=><div key={index}>
                <CandidateCard 
                {...item}
                />
            </div>)
         }   
        <Button
        onClick={()=>setLimit1(limit1+1)}
        >Load More</Button>
        
        <h1 className="px-3">Immediate Joiner</h1>
        {
            data.immediateJoiner.map((item,index)=><div key={index}>
                <CandidateCard 
                {...item}
                />
            </div>)
         }  
        </section>}
        </>:renderError()}
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