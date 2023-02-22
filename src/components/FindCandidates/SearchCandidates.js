import React from 'react'
import "./FindCandidates.scss"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {TextField,Button,Slider} from '@mui/material'
import CandidateCardHalf from './CandidateCardHalf'
import axios from 'axios'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import {connect} from 'react-redux'
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import EmailIcon from '@mui/icons-material/Email';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GetNameModal from './GetNameModal'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function SearchCandidates(props) {
    const [gender, setGender] = React.useState('All');
    const [dateFilter,setDateFilter] = React.useState("All Resume")
    const [selectedDateFilter,setSelectedDateFilter] = React.useState(null)
    const [selectedCandidate,setSelectedCandidate] = React.useState([])
    const [error,setError] = React.useState(null)

    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const [candidates,setCandidates]=React.useState(null)
    const [tags,setTags] = React.useState([])
    const [allLocations,setAllLocations] = React.useState([])
    const [allUg,setAllUg]=React.useState([])
    const [allPg,setAllPg] = React.useState([])
    const [allFunctionalArea,setAllFuncationalArea]=React.useState([])
    const [allProducts,setAllProducts] = React.useState([])
    const [allIndustry,setAllIndustry] = React.useState([])
    const [must,setMust] = React.useState([])
    const [any,setAny] = React.useState([])
    const [pipeline,setPipeline] = React.useState(null)
    const [mustNot,setMustNot] = React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open2,setOpen2] = React.useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (filter) => {
        const today = new Date();
        let isoString=null;
        let monthAgo = null
        console.log(typeof(filter))
        if(typeof(filter) ==="string"){
            setDateFilter(filter)
            if(filter==="All Resume"){
                isoString = null;
                setSelectedDateFilter(null)
            }else if(filter==="Last 7 Days"){
                monthAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

            }else if(filter==="Last 1 Month"){
                monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

            }else if(filter==="Last 6 Months"){
                monthAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());

            }else if(filter==="Last 1 Year"){
                monthAgo = new Date(today.getFullYear(), today.getMonth() - 12, today.getDate());
            }
            if(monthAgo){
                 isoString = monthAgo.toISOString();
                console.log(isoString)
            }
            handleCandidateSearch(isoString)

        }
        
      setAnchorEl(null);
    };
    const [formValues,setFormValues]=React.useState({
        city:"",
        workMode:"null",
        minimumExperience:0,
        maximumExperience:30,
        minimumSalary:0,maximumSalary:75,industry:null,functionalArea:null,product:null,minimumAge:18,maximumAge:60,
        noticePeriod:null,
        pg:null,
        ug:null,
        currentCompany:""
    })
    React.useEffect(()=>{
        if(props.user.userInfo){
            if(props.user.userInfo.availablePlanCredits){
        //getDegrees
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getAllCandidateLocations`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setAllLocations(res.data.result.map(item=>item._id))
            }
            //setAllLocations(res.data.result)
        })
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getAllTags`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setTags(res.data.result.map(item=>item.name))
            }

        })
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getSearchCandidateData`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                setAllPg(res.data.result[0].pg)
                setAllUg(res.data.result[0].ug)
                setAllFuncationalArea(res.data.result[0].functionalArea)
                setAllProducts(res.data.result[0].product)
                setAllIndustry(res.data.result[0].industry)
            }
            //setAllLocations(res.data.result)
        })
            }else{
                setError("Upgrade Plan To Access This Section")
            }
        }else{
            setError("Unauthorized Access")
        }

        if(props.location.state){
            setFormValues({...props.location.state})
            setMust(props.location.state.must)
            setAny(props.location.state.should)
            setMustNot(props.location.state.mustNot)
            setGender(props.location.state.gender?props.location.state.gender:"All")
        }


    },[])
    console.log(props)
    const handleCandidateSearch = (date,refine)=>{
        console.log(formValues,must,any,gender)
        let obj = {
            must:refine?[]:must,
            mustNot:refine?[]:mustNot,
            should:refine?[]:any,
            product:formValues.product?formValues.product.name:null,
            maximumAge:formValues.maximumAge,
            minimumAge:formValues.minimumAge,
            minimumSalary:parseInt(formValues.minimumSalary)*100000,
            maximumSalary:parseInt(formValues.maximumSalary)*100000,
            minimumExperience:formValues.minimumExperience,
            maximumExperience:formValues.maximumExperience,
            // pg:formValues.pg?(formValues.pg.includes("Any")?null:formValues.pg):null,
            // ug:formValues.ug?(formValues.ug.includes("Any")?null:formValues.ug):null,
            pg:formValues.pg,
            ug:formValues.ug,
            noticePeriod:formValues.noticePeriod,
            currentCompany:formValues.currentCompany,
            dateFilter:date?date:null,
            gender:gender==="All"?null:gender,
            pipeline:(refine&&pipeline)?pipeline:null
            }
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/searchCandidate`,obj,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setCandidates(res.data.result)
            setPipeline(res.data.pipeline)
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        })
        .catch(err=>{
            console.log(err)
                    window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        })
    }

    const handleSave = (title)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/saveSearch`,{
            title,must,mustNot,should:any,
            product:formValues.product?formValues.product.name:null,
            maximumAge:formValues.maximumAge,
            minimumAge:formValues.minimumAge,
            minimumSalary:parseInt(formValues.minimumSalary)*100000,
            maximumSalary:parseInt(formValues.maximumSalary)*100000,
            minimumExperience:formValues.minimumExperience,
            maximumExperience:formValues.maximumExperience,
            // pg:formValues.pg?(formValues.pg.includes("Any")?null:formValues.pg):null,
            // ug:formValues.ug?(formValues.ug.includes("Any")?null:formValues.ug):null,
            pg:formValues.pg,
            ug:formValues.ug,
            noticePeriod:formValues.noticePeriod,
            currentCompany:formValues.currentCompany,
            gender:gender==="All"?null:gender
            },{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res)
                setOpen2(false)
                //setCandidates(res.data.result)
                        window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
            })
            .catch(err=>{
                console.log(err)
                        window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
            })
    }

    const handleSubmit2 = (title)=>{
        handleSave(title)
      }
      console.log(formValues)
  return (
    <div>
        <Header id="3" />
        <GetNameModal 
        open={open2}
        setOpen={setOpen2}
        title="Job Search Save Title"
        description="Enter title with which you want to save your search"
        leftButton="Cancel"
        rightButton="Submit"
        handleSubmit = {handleSubmit2}
        />
    {error?<div className="error-parent-div"><h1>{error}</h1></div>:
    <div className="row m-auto search-candidates-head">
        <section className="col-4 search-candidates shadow-sm">
            <h1>Search <span className="primarycolorwh">Candidates</span></h1>
            <section className="mb-4">
            <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                onChange = {(e,val)=>setMust(val)}
                value={must}
                // defaultValue={[tags[13]]}
                freeSolo
                renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="filled" label={option} {...getTagProps({ index })} />
                ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Must Keywords"
                    placeholder="Enter Keywords"
                />
                )}
            />
            </section>
            <section className="mb-4">
                <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                value={any}
                onChange = {(e,val)=>setAny(val)}
                // defaultValue={[tags[13]]}
                freeSolo
                renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="filled" label={option} {...getTagProps({ index })} />
                ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Any Keywords"
                    placeholder="Enter Keywords"
                />
                )}
            />
            </section>
            <section className="mb-4">
                <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                value={mustNot}
                onChange = {(e,val)=>setMustNot(val)}
                // defaultValue={[tags[13]]}
                freeSolo
                renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="filled" label={option} {...getTagProps({ index })} />
                ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Exclude Keywords"
                    placeholder="Enter Keywords"
                />
                )}
            />
            </section>
            <hr />

            <h3>Age</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumAge:value})} value={formValues.minimumAge} min={18} max={60} defaultValue={18} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Age Selected is {formValues.minimumAge} Years</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumAge:value})} value={formValues.maximumAge} min={18} max={60} defaultValue={60} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Age Selected is {formValues.maximumAge} Years</p>
            <hr />

            <h3>Experience</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumExperience:value})} value={formValues.minimumExperience} min={0} max={30} defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Experience Selected is {formValues.minimumExperience} Years</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumExperience:value})} value={formValues.maximumExperience} min={0} max={30} defaultValue={30} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Experience Selected is {formValues.maximumExperience} Years</p>
            <hr />

            <h3>Salary</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumSalary:value})} value={formValues.minimumSalary} min={0} max={75} defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Salary Selected is {formValues.minimumSalary} Lacs</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumSalary:value})} value={formValues.maximumSalary} min={0} max={75} defaultValue={75} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Salary Selected is {formValues.maximumSalary} Lacs</p>
            <hr />

            <h3>Search By Location of Candidate</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.city}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,city:newValue});
                    }else{
                        setFormValues({...formValues,city:newValue});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allLocations}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select City"/>}
                    />
                    </div>
            <hr />

            <h3>Search By Educational Details</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.ug?{name:formValues.ug}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,ug:newValue.name});
                    }else{
                        setFormValues({...formValues,ug:null});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allUg}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Undergraduate Degree"/>}
                    />
                    </div>
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.pg?{name:formValues.pg}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,pg:newValue.name});
                    }else{
                        setFormValues({...formValues,pg:null});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allPg}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Post Gradiuate Degree"/>}
                    />
                    </div>
            <hr />

            <h3>Search By Industry</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.industry?{name:formValues.industry.name}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,industry:newValue});
                    }else{
                        setFormValues({...formValues,industry:null});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allIndustry}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Industry"/>}
                    />
                    </div>
            <hr />

            <h3>Search By Functional Area</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.functionalArea?{name:formValues.functionalArea.name}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,functionalArea:newValue});
                    }else{
                        setFormValues({...formValues,functionalArea:null});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allFunctionalArea}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Functional Area"/>}
                    />
                    </div>
            <hr />

            <h3>Search By Product</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.product?{name:formValues.product.name}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,product:newValue});
                    }else{
                        setFormValues({...formValues,product:null});
                    }
                    
                    }}
                    id="controllable-states-demo"
                    options={allProducts}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Product"/>}
                    />
                    </div>
            <hr />

            <h3>Search By Company</h3>
            <TextField onChange={(e)=>setFormValues({...formValues,currentCompany:e.target.value})} value={formValues.currentCompany} fullWidth variant="outlined" id="outlined-basic" label="Current Company" />
            <hr />



            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.noticePeriod?formValues.noticePeriod:""}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,noticePeriod:newValue});
                    }}
                    id="controllable-states-demo"
                    options={['Any Notice Period','7 Days','30 Days','60 Days','90 Days','Immediate Joiner','Currently Serving Notice Period']}
                    // getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Choose Notice Period"/>}
                    />
            </div>

            <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={handleChange}
            >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                <FormControlLabel value="All" control={<Radio />} label="All" />
            </RadioGroup>
            </FormControl>

            <div style={{textAlign:"right"}}>
                <Button>Cancel</Button>
                <Button onClick={()=>setOpen2(true)}>Save Search</Button>
                <Button onClick={()=>handleCandidateSearch(null,true)} variant="contained">Refine Search</Button>
            </div>
            
        </section>
        <section className='col-8 candidates-nearby'>
           {candidates?<>
            <h1>Showing <span className="primarycolorwh">{candidates.length}</span> Results</h1>

            <div className="menu row m-auto align-items-center">
                <div className="mx-2">
                <FormGroup>
                <FormControlLabel 
                    onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedCandidate(candidates.map(i=>({_id:i._id,name:i.fullName,email:i.email})))
                        }else{
                            setSelectedCandidate([])
                        }

                    }}
                control={<Checkbox />} label="Selected All" />
                </FormGroup>
                </div>

                <div className="mx-2">
                    <Button 
                    onClick={()=>props.history.push("/sendjobemail",selectedCandidate)}
                    startIcon={<EmailIcon />}>
                        Email
                    </Button>
                </div>

                <div className="ml-auto">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Filter by: {dateFilter}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={()=>handleClose('All Resume')}>All Resume</MenuItem>
                    <MenuItem onClick={()=>handleClose('Last 7 Days')}>Last 7 Days</MenuItem>
                    <MenuItem onClick={()=>handleClose('Last 1 Month')}>Last 1 Month</MenuItem>
                    <MenuItem onClick={()=>handleClose('Last 6 Months')}>Last 6 Months</MenuItem>
                    <MenuItem onClick={()=>handleClose('Last 1 Year')}>Last 1 Year</MenuItem>
                </Menu>
                </div>
            </div>

                {
                    candidates?candidates.map((item,index)=>
                    <div className="row m-auto"  key={index}>
                        <div className="col-1 mt-4">
                        <Checkbox
                        checked={selectedCandidate.filter(i=>i._id===item._id).length>0?true:false}
                        onChange={(e)=>{
                            if(e.target.checked){
                                setSelectedCandidate([...selectedCandidate,{_id:item._id,name:item.fullName,email:item.email}])
                            }else{
                                setSelectedCandidate(selectedCandidate.filter(i=>i._id!==item._id))
                            }
                            
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </div>
                        <div className="col-11">
                        <CandidateCardHalf hide={true} {...item} />
                        </div>
                    </div>):null
                }
        </>:
        <div>
            <h2>Searched <span className="primarycolorwh">Candidates</span> will appear here</h2>
            <img className="width-100 shadow-sm" src="findcand.png" alt="findcand" />
        </div>
        }
        </section>
        <div  style={{position:"fixed",bottom:"5%",right:"5%",zIndex:5}}>
                    <Tooltip title="Search Candidates">
                    <Fab variant="extended" onClick={()=>handleCandidateSearch()} color="primary" aria-label="add">
                        <SearchOutlinedIcon sx={{ mr: 1 }} />
                        Search Candidates
                    </Fab>
                    </Tooltip>
            </div>
    </div>}
    <Footer />
    </div>
  )
}
const mapStateToProps = ({banksterUser})=>{
    return {
        user:banksterUser
    }
}

export default connect(mapStateToProps)(SearchCandidates)
