import React from 'react'
import "./SearchBar.scss"
import {Button} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
function SearchBar(props) {
  const [searchObj,setSearchObj]=React.useState({title:"",location:"",salary:""})

  return (
    <div>
      <section className={props.fullWidth?"shadow searchbar-container row m-auto align-items-center width-full":"shadow searchbar-container row m-auto align-items-center"}>
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 searchbarinputbox":"col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 searchbarinputbox"}>
          <input onChange={(e)=>setSearchObj({...searchObj,title:e.target.value})} placeholder="Search Job By Keyword eg. (Manager, Sales, Mumbai)" />
        </div>
        {/* <div className={props.fullWidth?"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox ":"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox "}>
          <input onChange={(e)=>setSearchObj({...searchObj,location:e.target.value})} placeholder="Job Location (Mumbai)" className="borderleft" />
        </div>
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox ":"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox "}>
          <input onChange={(e)=>setSearchObj({...searchObj,salary:e.target.value})} placeholder="Expected Salary" className="borderleft" />
        </div> */}
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox":"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox"}>
          <Link to={`/findjobs?title=${searchObj.title}&location=${searchObj.location}&salary=${searchObj.salary}`} ><Button startIcon={<SearchIcon />} fullWidth variant="contained">Search</Button></Link>
        </div>
      </section>
    </div>
  )
}

export default SearchBar