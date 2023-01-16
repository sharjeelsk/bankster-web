import React from 'react'
import "./FindJobs.scss"
import { Button, IconButton,Slider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
function FilterMenu(props) {
  const [functionalArea,setFunctionalArea]=React.useState([])
  const [limit,setLimit] = React.useState({limit1:5,limit2:5,limit3:5,limit4:5})
  const [industry,setIndustry]=React.useState([])
  const [product,setProduct]=React.useState([])
  const [cities,setCities]=React.useState(["Mumbai","Delhi","Gurgaon","Bangalore","Hyderabad","Ahmedabad","Chennai","Kolkata","Surat","Pune","Jaipur","Lucknow","Kanpur","Nagpur","Visakhapatnam","Indore","Thane","Chandigarh","Vadodara","Bhopal"])
  const [formValues,setFormValues]=React.useState({cities:[],workMode:"null",minimumExperience:0,maximumExperience:15,minimumSalary:0,maximumSalary:75,industry:[],functionalArea:[],product:[]})
  React.useEffect(()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getNamedJobParam`,{...limit})
    .then(resp=>{
      console.log(resp)
      if(resp.data.result.length>0){
        setFunctionalArea(resp.data.result[0].functionalArea)
        setIndustry(resp.data.result[0].industry)
        setProduct(resp.data.result[0].product)
      }
    })
  },[limit])
  console.log(formValues)

  const handleSearch = ()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/filterJobs`,{
      "workMode":formValues.workMode==="null"?null:formValues.workMode,
      "minimumSalary":formValues.minimumSalary*100000,
      "maximumSalary":formValues.maximumSalary*100000,
      "minimumExperience":formValues.minimumExperience,
      "maximumExperience":formValues.maximumExperience,
      "functionalArea":formValues.functionalArea.length>0?formValues.functionalArea:null,
      "industry":formValues.industry.length>0?formValues.industry:null,
      "product":formValues.product.length>0?formValues.product:null,
      "cities":formValues.cities.length>0?formValues.cities:null
    })
    .then(res=>{
      console.log(res)
      if(res.data.msg==="success"){
        if(props.setJobs){
          props.setJobs(res.data.result)
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }
        
      }
    })
  }


  const renderContent = ()=>{
    return  <div className='content'>
    <h4><FilterListIcon /> All Filters</h4>
    <hr />
    <h3>Work Mode</h3>
    <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group">Select Work Mode</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={formValues.workMode}
      onChange={(e)=>setFormValues({...formValues,workMode:e.target.value})}
    >
      <FormControlLabel value="home" control={<Radio />} label="Work From Home" />
      <FormControlLabel value="office" control={<Radio />} label="Work From Office" />
      <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
      <FormControlLabel value="null" control={<Radio />} label="All Work Modes" />
    </RadioGroup>
  </FormControl>
                  <hr />
    <h3>Experience</h3>
            <h4>Minimum Experience (In Years)</h4>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumExperience:value})} value={formValues.minimumExperience} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Experience is {formValues.minimumExperience}</p>

            <h4>Maximum Experience (In Years)</h4>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumExperience:value})} value={formValues.maximumExperience} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Experience is {formValues.maximumExperience}</p>
                  <hr />
    <h3>Salary</h3>
    <h4>Minimum Salary (In Lakhs)</h4>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumSalary:value})} value={formValues.minimumSalary} min={0} max={75} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Salary is {formValues.minimumSalary}</p>

            <h4>Maximum Salary (In Lakhs)</h4>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumSalary:value})} value={formValues.maximumSalary} min={0} max={75} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Salary is {formValues.maximumSalary}</p>
      <hr />
    <h3>Industry</h3>
        <FormGroup>
          {
            industry&&industry.map((item,index)=><FormControlLabel control={<Checkbox onChange={()=>{
              if(formValues.industry.includes(item.name)){
                setFormValues({...formValues,industry:formValues.industry.filter(i=>i!==item.name)})
              }else{
                setFormValues({...formValues,industry:[...formValues.industry,item.name]})
              }
            }}  />} label={item.name} key={index} />)
          }
        
      </FormGroup>
      <Button onClick={()=>setLimit({...limit,limit1:limit.limit1+5})}>Load More</Button>
      <hr />
    <h3>Product</h3>
        <FormGroup>
        {
            product&&product.map((item,index)=><FormControlLabel control={<Checkbox onChange={()=>{
              if(formValues.product.includes(item.name)){
                setFormValues({...formValues,product:formValues.product.filter(i=>i!==item.name)})
              }else{
                setFormValues({...formValues,product:[...formValues.product,item.name]})
              }
            }} />} label={item.name} key={index} />)
        }
      </FormGroup>
      <Button onClick={()=>setLimit({...limit,limit2:limit.limit2+5})}>Load More</Button>
      <hr />
    <h3>Functional Area</h3>
        <FormGroup>
        {
            functionalArea&&functionalArea.map((item,index)=><FormControlLabel control={<Checkbox onChange={()=>{
              if(formValues.functionalArea.includes(item.name)){
                setFormValues({...formValues,functionalArea:formValues.functionalArea.filter(i=>i!==item.name)})
              }else{
                setFormValues({...formValues,functionalArea:[...formValues.functionalArea,item.name]})
              }
            }} />} label={item.name} key={index} />)
        }
      </FormGroup>
      <Button onClick={()=>setLimit({...limit,limit3:limit.limit3+5})}>Load More</Button>
      <hr />
      <h3>Location</h3>
      <FormGroup>
        {
            cities&&
            cities
            .slice(0,limit.limit4)
            .map((item,index)=><FormControlLabel control={<Checkbox onChange={()=>{
              if(formValues.cities.includes(item)){
                setFormValues({...formValues,cities:formValues.cities.filter(i=>i!==item)})
              }else{
                setFormValues({...formValues,cities:[...formValues.cities,item]})
              }
            }} />} label={item} key={index} />)
        }
      </FormGroup>
      <Button onClick={()=>setLimit({...limit,limit4:limit.limit4+5})}>Load More</Button>
      <hr />
      <Button onClick={()=>handleSearch()} startIcon={<SearchIcon />} fullWidth variant="contained">Search Jobs</Button>
    </div>
  }

  return (
    <div className="filter-menu shadow-sm">
        <div className="display-mobile">
        <IconButton className="display-mobile" onClick={()=>props.setDisplay(false)}>
            <CloseIcon />
        </IconButton>
            {
              renderContent()
            }
        </div>
        <div className='display-desktop'>
           {
            renderContent()
           }
        </div>
    </div>
  )
}

export default FilterMenu