import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import { TextField,Autocomplete,Slider, paginationItemClasses,Chip, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Rating from '@mui/material/Rating';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {renderRating} from '../../utils/Functions'
import {useForm} from 'react-hook-form'
function CreateJob(props) {
    const [display,setDisplay]=React.useState(false)
    const [ug,setUg]=React.useState([])
    const [pg,setPg] = React.useState([])
    const [product,setProduct]=React.useState([])
    const [functionalArea,setFunctionalArea] = React.useState([])
    const [industry,setIndustry] = React.useState([])
    const [block,setBlock] = React.useState(false)

    const [formValues,setFormValues]=React.useState({
        title:"",industry:"",functionalArea:"",companyInfo:"",minimumAge:18,maximumAge:18,minimumSalary:10,companyName:"",
        maximumSalary:15,ug:"",pg:"",product:"",minimumExperience:4,maximumExperience:55,country:"India",city:"",state:"",jobDescription:"",
        rolesAndResponsibilities:[],jobTags:[],desiredProfile:"",workMode:"hybrid"
    })

    const [states,setStates]=React.useState([])
    const [cities,setCities] = React.useState([])

    const [singleRole,setSingleRole] = React.useState("")
    const [jobTag,setJobTag] = React.useState("")

    const {handleSubmit,formState:{errors},register}=useForm()

    console.log("creaet job props", props)

    const getCities = (state)=>{
        console.log(state)
        var config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
            headers: {
              'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response);
            setCities(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    const getRecruiterJob = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/recruiterJobs`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success"){
                if(res.data.result.length===props.user.userInfo.subscription.jobPostings){
                    setBlock(true)
                }
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    React.useEffect(()=>{
        //getRecruiterJob()
        if(props.location.state){
            let oldData = props.location.state
            setFormValues({
                title:oldData.title,
                industry:oldData.industry,
                functionalArea:oldData.functionalArea,
                companyInfo:oldData.companyInfo,
                minimumAge:oldData.age.min,
                maximumAge:oldData.age.max,
                minimumSalary:oldData.ctc.min/100000,
                companyName:oldData.companyName,
                maximumSalary:oldData.ctc.max/100000,
                ug:oldData.qualification.ug,
                pg:oldData.qualification.pg,
                product:oldData.product,
                minimumExperience:oldData.experience.min,
                maximumExperience:oldData.experience.max,
                country:"India",city:oldData.jobLocation.city,state:oldData.jobLocation.state,jobDescription:oldData.jobDescription,
                rolesAndResponsibilities:oldData.roleResp,jobTags:oldData.tags,desiredProfile:oldData.desiredProfile

            })
        }
        else if(props.user.userInfo.availablePlanCredits.jobPostings<=0){
            setBlock(true)
        }
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/getAllJobParam`)
        .then(res=>{
            console.log(res)
            if(res.data.msg==="success" && res.data.result.length>0){
                setUg(res.data.result.filter(item=>item.type==="ug"))
                setPg(res.data.result.filter(item=>item.type==="pg"))
                setProduct(res.data.result.filter(item=>item.type==="product"))
                setFunctionalArea(res.data.result.filter(item=>item.type==="functionalarea"))
                setIndustry(res.data.result.filter(item=>item.type==="industry"))
            }
            var config = {
                method: 'get',
                url: 'https://api.countrystatecity.in/v1/countries/IN/states',
                headers: {
                  'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
                }
              };
              
              axios(config)
              .then(function (response) {
                console.log("stateresposne",response);
                setStates(response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
            
        })
    },[])

    const handleJobCreate = ()=>{
        const obj = {
            "title":formValues.title,
            "minimumExperience":formValues.minimumExperience,
            "maximumExperience":formValues.maximumExperience,
            "minimumSalary":parseInt(formValues.minimumSalary)*100000,
            "maximumSalary":parseInt(formValues.maximumSalary)*100000,
            "minimumAge":formValues.minimumAge,
            "maximumAge":formValues.maximumAge,
            "product":formValues.product,
            "jobLocation":{"country":"India","state":formValues.state,"city":formValues.city},
            "ugQualification":formValues.ug,
            "pgQualification":formValues.pg,
            "jobDescription":formValues.jobDescription,
            "rolesResp":formValues.rolesAndResponsibilities,
            "tags":formValues.jobTags,
            "displayContactDetails":true,
            "industry":formValues.industry,
            "functionalArea":formValues.functionalArea,
            "desiredProfile":formValues.desiredProfile,
            "companyName":formValues.companyName,
            "companyInfo":formValues.companyInfo,
            creditId:props.user.userInfo.availablePlanCredits._id
        }
        console.log(obj)
        if(formValues.jobDescription.length>100){
            if(props.location.state){
                //edit job
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/editJob`,{jobObject:obj,jobId:props.location.state._id},{headers:{token:props.user.user}})
                .then(res=>{
                    console.log(res)
                    props.history.push('/jobscreated')
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                //create job
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/job/createJob`,{...obj},{headers:{token:props.user.user}})
                .then(res=>{
                    console.log(res)
                    props.history.push('/jobscreated')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
        
        
    }


    console.log(formValues,states)

    const onSubmit =(data)=>{
        console.log(data)
    }

    return (
        <>

            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead margin={0} id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>


            {block?
            <section className="upgrade-plan">
                <div>
                <h1>Sorry, Your plan has exhausted</h1>
                <p>Upgrade your plan to create more jobs</p>
                </div>

            </section>
            :<section className="create-job row m-auto">
                {/* <form onSubmit={()=>handleSubmit(onSubmit)}> */}
                <div className="col-5 job-form">
                    <h2>Create Job</h2>
                    <TextField inputProps={{maxLength:30}} disabled={props.location.state?true:false} value={formValues.title} onChange={(e)=>setFormValues({...formValues,title:e.target.value})} fullWidth variant='outlined' id="outlined-basic" label="Job Title" className="mt-2 mb-3" />
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.industry}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,industry:newValue});
                    }}
                    id="controllable-states-demo"
                    options={industry.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Choose Industry"/>}
                    />
                    </div>
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.functionalArea}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,functionalArea:newValue});
                    }}
                    id="controllable-states-demo"
                    options={functionalArea.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Functional Area"/>}
                    />
                    </div>
                    <TextField value={formValues.companyName} onChange={(e)=>setFormValues({...formValues,companyName:e.target.value})} fullWidth variant='outlined' id="outlined-basic" label="Company Name" className="mt-2 mb-3" />
                    <TextField
                    fullWidth
                    value={formValues.companyInfo}
                    onChange={(e)=>setFormValues({...formValues,companyInfo:e.target.value})}
                    className="my-3"
                    id="filled-multiline-static"
                    label="Company Info"
                    multiline
                    rows={4}
                    variant="filled"
                    />

                    <h3 className="sub-heading">Job Requirements</h3>

                    <h4>Minimum Age</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumAge:value})} value={formValues.minimumAge} min={18} max={60}  aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Minimum Age is {formValues.minimumAge}</p>

                    <h4>Maximum Age</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumAge:value})} value={formValues.maximumAge} min={18} max={60}  aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Maximum Age is {formValues.maximumAge}</p>

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.ug}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,ug:newValue});
                    }}
                    id="controllable-states-demo"
                    options={ug.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select UG Qualification"/>}
                    />
                    </div>

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.pg}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,pg:newValue});
                    }}
                    id="controllable-states-demo"
                    options={pg.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select PG Qualification"/>}
                    />
                    </div>

                    <h4>Minimum Salary (In Lakh)</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumSalary:value})} value={formValues.minimumSalary} min={0} max={75}  aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Minimum Salary is {formValues.minimumSalary}</p>

                    <p className="note-text">Maximum Salary is 75+ Lakh</p>

                    <h4>Maximum Salary (In Lakh)</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumSalary:value})} value={formValues.maximumSalary} min={0} max={75}  aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Maximum Salary is {formValues.maximumSalary}</p>

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.product}
                    onChange={(event, newValue) => {
                    setFormValues({...formValues,product:newValue});
                    }}
                    id="controllable-states-demo"
                    options={product.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Choose Product"/>}
                    />
                    </div>

                    <h4>Minimum Experience (In Years)</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,minimumExperience:value})} value={formValues.minimumExperience} min={0} max={30} aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Minimum Experience is {formValues.minimumExperience}</p>

                    <h4>Maximum Experience (In Years)</h4>
                    <Slider onChange={(ev,value)=>setFormValues({...formValues,maximumExperience:value})} value={formValues.maximumExperience} min={0} max={30} aria-label="Default" valueLabelDisplay="auto" />
                    <p className="slider-info">Maximum Experience is {formValues.maximumExperience}</p>

                    <h3 className="sub-heading">Job Location</h3>
                    
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    
                    onChange={(event, newValue) => {
                    getCities(newValue.iso2)
                    setFormValues({...formValues,state:newValue.name});
                    }}
                    id="controllable-states-demo"
                    options={states}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select State"/>}
                    />
                    </div>
                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    value={formValues.city}
                    onInputChange={(event, newValue) => {
                    setFormValues({...formValues,city:newValue});
                    }}
                    id="controllable-states-demo"
                    options={cities.map(i=>i.name)}
                    //getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select City"/>}
                    />
                    </div>

                    <h3 className="sub-heading">Job Info</h3>
                    <TextField
                    fullWidth
                    value={formValues.jobDescription}
                    onChange={(e)=>setFormValues({...formValues,jobDescription:e.target.value})}
                    error={formValues.jobDescription.length<=100?true:false}
                    className="my-3"
                    id="filled-multiline-static"
                    label="Job Description"
                    multiline
                    rows={4}
                    variant="filled"
                    />
                    <p className="my-2">Job Description should be greater than 100 characters</p>

                    <div className="row my-3 mx-auto align-items-center">
                        <div className="col-10 p-0">
                            <TextField onChange={(e)=>setSingleRole(e.target.value)} fullWidth variant="outlined" id="outlined-basic" label="Roles and Responsibilities" />
                        </div>
                        <div className="col-2 p-0" style={{textAlign:"center"}}>
                            <IconButton onClick={()=>{
                                if(!formValues.rolesAndResponsibilities.includes(singleRole)){
                                    setFormValues({...formValues,rolesAndResponsibilities:[...formValues.rolesAndResponsibilities,singleRole]})
                                }
                            }} color="primary">
                                <AddCircleIcon sx={{fontSize:30}} />
                            </IconButton>
                        </div>
                    </div>

                    {
                        formValues.rolesAndResponsibilities.map((item,index)=><>
                        <section key={index} className="row my-4 mx-auto align-items-center">
                            <div className="col-10">
                                <p>{item}</p>
                            </div>
                            <div className="col-2">
                                <IconButton color="error" onClick={()=>setFormValues({...formValues,rolesAndResponsibilities:formValues.rolesAndResponsibilities.filter(i=>i!==item)})}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </div>
                        </section>
                        <hr />
                        </>
                        )
                    }

                    {/* {
                        formValues.rolesAndResponsibilities.map((item,index)=><Chip label={item} key={index} onDelete={()=>{
                            setFormValues({...formValues,rolesAndResponsibilities:formValues.rolesAndResponsibilities.filter(i=>i!==item)})
                        }} />)
                    } */}
                    

                    <div className="row my-4 mx-auto align-items-center">
                        <div className="col-10 p-0">
                            <TextField onChange={(e)=>setJobTag(e.target.value)} fullWidth variant="outlined" id="outlined-basic" label="Job Tags" />
                        </div>
                        <div className="col-2 p-0" style={{textAlign:"center"}}>
                            <IconButton onClick={()=>{
                                if(!formValues.jobTags.includes(jobTag)){
                                    setFormValues({...formValues,jobTags:[...formValues.jobTags,jobTag]})
                                }
                            }} color="primary">
                                <AddCircleIcon sx={{fontSize:30}} />
                            </IconButton>
                        </div>
                    </div>

                    {
                        formValues.jobTags.map((item,index)=><Chip label={item} key={index} onDelete={()=>{
                            setFormValues({...formValues,jobTags:formValues.jobTags.filter(i=>i!==item)})
                        }} />)
                    }

                    <h3 className="sub-heading">Candidate</h3>
                    <TextField
                    fullWidth
                    value={formValues.desiredProfile}
                    onChange={(e)=>setFormValues({...formValues,desiredProfile:e.target.value})}
                    className="my-3"
                    id="filled-multiline-static"
                    label="Desired Candidate Profile"
                    multiline
                    rows={2}
                    variant="filled"
                    />

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Select Work Mode</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={formValues.workMode}
                            onChange={(e)=>setFormValues({...formValues,workMode:e.target.value})}
                        >
                            <FormControlLabel value="home" control={<Radio />} label="Work From Home" />
                            <FormControlLabel value="office" control={<Radio />} label="Work From Office" />
                            <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
                        </RadioGroup>
                        </FormControl>

                    <div style={{textAlign:"right"}} className="my-4">
                        <Button onClick={()=>props.history.push("jobscreated")}>Cancel</Button>
                        <Button onClick={()=>handleJobCreate()} variant="contained">{props.location.state?'Edit':"Create"} Job</Button>
                    </div>


                </div>
                <div className="col-7 sample-form">
                    <h2 className="sample-form-main-heading">Sample Form</h2>
                    <p style={{textAlign:"center"}}>After entering the details your job will look like this</p>
                    {
                    formValues&&<section className="shadow-sm single-job row m-auto">
                    <div className='img-div col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                        <img src='/logo1.png' alt="logo1" />
                    </div>
                    <div className='content-div col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                        <h3>{formValues.title}</h3>
                        {/* <p className="company-name m-0">{formValues.createdBy.companyName}</p> */}
                        <h4 className="m-0">{formValues.product}</h4>
                            <div className='row m-auto align-items-center'>
                                <div>
                                <Rating name="read-only" value={renderRating({
                                    age:{min:formValues.minimumAge,max:formValues.maximumAge},
                                    ctc:{min:formValues.minimumSalary,max:formValues.maximumSalary},
                                    experience:{min:formValues.minimumExperience,max:formValues.maximumExperience},
                                    jobLocation:{state:formValues.state,city:formValues.city},
                                    qualification:{ug:formValues.ug,pg:formValues.pg},
                                    functionalArea:formValues.functionalArea,
                                    industry:formValues.industry,
                                    product:formValues.product,
                                    roleResp:formValues.rolesAndResponsibilities,
                                    tags:formValues.jobTags,
                                    companyName:formValues.companyName,
                                    companyInfo:formValues.companyInfo,
                                    desiredProfile:formValues.desiredProfile
                                })} readOnly />
                                </div>
                                <div>
                                <p className="total-reviews">(Job Ratings will be based on complete filling of data)</p>
                                </div>
                            </div>


                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <WorkIcon />
                                <span className='key-headline m-2'>{formValues.minimumExperience} - {formValues.maximumExperience} Yrs</span>
                            </div>
                            <div className="m-1">
                                <CurrencyRupeeIcon />
                                <span className='key-headline m-2'>{formValues.minimumSalary}00000 - {formValues.maximumSalary}00000 P.A</span>
                            </div>
                            <div className="m-1">
                                <FmdGoodIcon />
                                <span className='key-headline m-2'>{formValues.city} | {formValues.state} | {formValues.country}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-auto key-features">
                            <div className="m-1">
                                <ArticleIcon />
                                <span className='key-headline m-2'>{formValues.ug}</span>
                            </div>
                            <div className="m-1">
                                <DescriptionIcon />
                                <span className='key-headline m-2'>{formValues.pg}</span>
                            </div>
                            <div className="m-1">
                                <Inventory2Icon />
                                <span className='key-headline m-2'>{formValues.industry}</span>
                            </div>
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Job Description</h2>
                            <p>
                            {
                                formValues.jobDescription
                            }
                            </p>
                        </div>

                        <div className="keys">
                        {formValues.jobTags.map((tag,index)=><Chip color="primary" key={index} className="m-3" label={tag} />)}
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Roles and Responsibilities</h2>
                            <ul>
                            {
                                formValues.rolesAndResponsibilities.map((item,index)=><li key={index}>{item}</li>)
                            }
                            </ul>
                        </div>

                        <div className="description">
                            <h2 className="pt-2">Desired Candidate Profile</h2>
                            <p>
                                {
                                    formValues.desiredProfile
                                }
                            </p>
                            
                        </div>

                    </div>
                    <div className="bookmark-div col-2">
                        <IconButton>
                            <BookmarkIcon />
                        </IconButton>
                    </div>
                </section>

                }
                </div>
                {/* </form> */}
            </section>}


             </div>
    </div>
    </>
    )
}

const mapStateToProps = ({banksterUser})=>{    
    return {
        user:banksterUser
    }
}

const mapDispatchToProps = (dispatch)=>{    
    return {
        storeUserInfo:(userInfo)=>dispatch(storeUserInfo(userInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateJob)
