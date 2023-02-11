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
function SearchCandidates(props) {
    const [gender, setGender] = React.useState('Female');
    const [selectedCandidate,setSelectedCandidate] = React.useState([])

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
    const [formValues,setFormValues]=React.useState({city:"",workMode:"null",minimumExperience:0,maximumExperience:15,minimumSalary:0,maximumSalary:75,industry:[],functionalArea:[],product:[],minimumAge:0,maximumAge:0})
    React.useEffect(()=>{
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
    },[])

    const handleCandidateSearch = ()=>{
        console.log(formValues,must,any)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/searchCandidate`,{must,mustNot:[],should:any},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setCandidates(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    console.log(selectedCandidate)

  return (
    <div>
        <Header id="3" />
    <div className="row m-auto search-candidates-head">
        <section className="col-4 search-candidates shadow-sm">
            <h1>Search Candidates</h1>
            <section className="mb-4">
            <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                onChange = {(e,val)=>setMust(val)}
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
            <hr />
            <h3>Experience</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumExperience:value})} value={formValues.minimumExperience} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Experience Selected is {formValues.minimumExperience} Years</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumExperience:value})} value={formValues.maximumExperience} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Experience Selected is {formValues.maximumExperience} Years</p>
            <hr />

            <h3>Salary</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumSalary:value})} value={formValues.minimumSalary} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Salary Selected is {formValues.minimumSalary} Years</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumSalary:value})} value={formValues.maximumSalary} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Salary Selected is {formValues.maximumSalary} Years</p>
            <hr />

            <h3>Location of Candidate</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,city:newValue});
                    }}
                    id="controllable-states-demo"
                    options={allLocations}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select City"/>}
                    />
                    </div>
            <hr />

            <h3>Educational Details</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,ug:newValue.name});
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
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,pg:newValue.name});
                    }}
                    id="controllable-states-demo"
                    options={allPg}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Post Gradiuate Degree"/>}
                    />
                    </div>
            <hr />

            <h3>Product</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,product:newValue});
                    }}
                    id="controllable-states-demo"
                    options={allProducts}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Product"/>}
                    />
                    </div>
            <hr />


            <h3>Industry</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,industry:newValue});
                    }}
                    id="controllable-states-demo"
                    options={allIndustry}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Industry"/>}
                    />
                    </div>
            <hr />

            <h3>Functional Area</h3>
            <div className="my-4">
                    <Autocomplete
                    fullWidth
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,functionalArea:newValue});
                    }}
                    id="controllable-states-demo"
                    options={allFunctionalArea}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Functional Area"/>}
                    />
                    </div>
            <hr />

            <h3>Company</h3>
            <TextField fullWidth variant="outlined" id="outlined-basic" label="Current Company" />
            <hr />

            <h3>Age</h3>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumAge:value})} value={formValues.minimumAge} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Minimum Age Selected is {formValues.minimumAge} Years</p>
            <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumAge:value})} value={formValues.maximumAge} min={0} max={30} defaultValue={15} aria-label="Default" valueLabelDisplay="auto" />
            <p className="slider-info">Maximum Age Selected is {formValues.maximumAge} Years</p>
            <hr />

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
            </RadioGroup>
            </FormControl>

            <div style={{textAlign:"right"}}>
                <Button>Cancel</Button>
                <Button onClick={()=>handleCandidateSearch()} variant="contained">Search Candidate</Button>
            </div>
            
        </section>
        <section className='col-8 candidates-nearby'>
            <h1>Candidates based in <span className="primarycolorwh">Aurangabad</span></h1>

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
            </div>

                {
                    candidates?candidates.map((item,index)=>
                    <div className="row m-auto">
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
                        <CandidateCardHalf key={index} {...item} />
                        </div>
                    </div>):null
                }

        </section>
    </div>
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
