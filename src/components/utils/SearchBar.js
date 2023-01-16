import React from 'react'
import "./SearchBar.scss"
import {Button} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { createFilterOptions } from "@material-ui/lab";
const options = ['Option 1', 'Option 2'];
function SearchBar(props) {
  const [searchObj,setSearchObj]=React.useState({title:"",location:"",salary:""})
  // const [data,setData] = React.useState([])

  // React.useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getAllJobLocations`)
  //   .then(res=>{
  //       console.log(res)
  //       if(res.data.msg==="success"){
          
  //         setData(res.data.result.map(item=>item._id))
  //       }
  //   })
  // },[])
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();
  
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
  return (
    <div>
      <section className={props.fullWidth?"shadow searchbar-container row m-auto align-items-center width-full":"shadow searchbar-container row m-auto align-items-center"}>
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox":"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox"}>
          <input className="mt-3" onChange={(e)=>setSearchObj({...searchObj,title:e.target.value})} placeholder="Search Job By Keyword eg. (Manager)" />
          {/* <TextField variant="standard" label="Search Job By Keyword eg. (Manager)" fullWidth /> */}
        </div>
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox ":"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox "}>
          <Autocomplete
          size='small'
          filterOptions={filterOptions}
        onChange={(event, newValue) => {
          //setValue(newValue);
          setSearchObj({...searchObj,location:newValue})
        }}
        options={props.totalLocations}
        fullWidth
        renderInput={(params) => <TextField variant="standard"
        sx={{ 
          // input: { color: "yellow" }, 
        "label": {fontWeight:"bold",color:"grey"} }} 
        {...params} label="Select City Name (Mumbai)" />}
      />
        </div>
        {/* <div className={props.fullWidth?"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox ":"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 searchbarinputbox "}>
          <input onChange={(e)=>setSearchObj({...searchObj,salary:e.target.value})} placeholder="Expected Salary" className="borderleft" />
        </div> */}
        <div className={props.fullWidth?"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox":"col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 searchbarinputbox"}>
          <Link to={`/findjobs?title=${searchObj.title}&location=${searchObj.location}`} ><Button startIcon={<SearchIcon />} fullWidth variant="contained">Search</Button></Link>
        </div>
      </section>
    </div>
  )
}

export default SearchBar