import React from 'react'
import "./FindCandidates.scss"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {TextField,Button} from '@mui/material'
import CandidateCard from './CandidateCard'
import axios from 'axios'

function SearchCandidates(props) {

    const [candidates,setCandidates]=React.useState(null)

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getAllCandidates`,{headers:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RSZWNAZ21haWwuY29tIiwiX2lkIjoiNjMwZGE5MGZjNGY2YzEwODFmODEyZDY4IiwiaWF0IjoxNjYyMDA5OTY3fQ.0KvAkMqzmms2XBoNKWskZrt2lgd2Oi0tjgWgILbQ7tI'}})
        .then(res=>{
            console.log(res)
            setCandidates(res.data.result)
        })
    },[])

  return (
    <div>
        <Header id="3" />
    <div className="row m-auto search-candidates-head">
        <section className="col-4 search-candidates shadow-sm">
            <h1>Search Candidates</h1>
            <TextField className="my-2" fullWidth id="outlined-basic" label="Must Keywords" variant='outlined' />
            <TextField className="my-2" fullWidth id="outlined-basic" label="Any Keyword" variant='outlined' />
            <hr />
            <h3>Experience</h3>
            <TextField className="my-2" fullWidth id="outlined-basic" label="Minimum Experience" variant='outlined' />
            <TextField className="my-2" fullWidth id="outlined-basic" label="Maximum Experience" variant='outlined' />
            <hr />

            <h3>Salary</h3>
            <TextField className="my-2" fullWidth id="outlined-basic" label="Minimum Salary" variant='outlined' />
            <TextField className="my-2" fullWidth id="outlined-basic" label="Maximum Salary" variant='outlined' />
            <hr />

            <h3>Location of Candidate</h3>
            <TextField className="my-2" fullWidth id="outlined-basic" label="Location (eg. city)" variant='outlined' />
            <hr />

            <h3>Educational Details</h3>
            <TextField className="my-2" fullWidth id="outlined-basic" label="Undergaduate Degree" variant='outlined' />
            <TextField className="my-2" fullWidth id="outlined-basic" label="Graduate Degree" variant='outlined' />
            <hr />

            <div style={{textAlign:"right"}}>
                <Button>Cancel</Button>
                <Button onClick={()=>props.history.push("/findcandidates")} variant="contained">Search Candidate</Button>
            </div>
            
        </section>
        <section className='col-8 candidates-nearby'>
            <h1>Candidates based in <span className="primarycolorwh">Aurangabad</span></h1>
            {
                candidates?candidates.map((item,index)=><CandidateCard key={index} {...item} />):null
            }
        </section>
    </div>
    <Footer />
    </div>
  )
}

export default SearchCandidates