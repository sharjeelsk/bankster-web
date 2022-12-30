import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import CandidateCard from './CandidateCard'
import { Button } from '@mui/material'

function SearchCandidateHome() {
    const [data,setData] = React.useState(null)
    const [limit1,setLimit1] = React.useState(1)
    React.useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getCandidateHomeData`,{limit:limit1})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setData(res.data.result[0])
            }
            
        })

    },[limit1])
  return (
    <div>
        <Header id="3" />
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
        <Footer />
    </div>
  )
}

export default SearchCandidateHome