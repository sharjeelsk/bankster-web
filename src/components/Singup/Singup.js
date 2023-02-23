import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Grid, Button,Alert } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {connect} from 'react-redux'
import { setUser } from "../redux/user/userActions";
import { setLoading } from "../redux/loading/loadingActions";
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import {Autocomplete} from '@mui/material'
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PublishIcon from '@mui/icons-material/Publish';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './singup.scss'
const Login = (props) => {
    const Input = styled('input')({
        display: 'none',
      });
    const {handleSubmit,register,formState:{errors}}=useForm();
    const [radio,setRadio] = React.useState('true')
    const [gender,setGender] = React.useState("Male")
    const [error,setError]=React.useState("")
    const [jobTotal,setJobTotal] = React.useState("...")
    const [formValues,setFormValues] = React.useState({state:"",city:"",product:null,industry:null,functionalArea:null,noticePeriod:null})
    const [cities,setCities] = React.useState([])
    const [states,setStates]=React.useState([])
    const [allFunctionalArea,setAllFuncationalArea]=React.useState([])
    const [allProducts,setAllProducts] = React.useState([])
    const [allIndustry,setAllIndustry] = React.useState([])
    const [singleEducation,setSingleEducation] = React.useState(null)
    const [dob, setDob] = React.useState('');
    const [allEducation,setAllEducation] = React.useState([])
    const [resume,setResume] = React.useState(null)
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    console.log(typeof(radio))
    //function for signUp

    const onSubmit = (data)=>{
        console.log(data,values.password,formValues,dob)
        if(data.currentCTC==="" || data.email==="" || data.fullName==="" || 
        data.mobileNo===""  || data.universityName==="" || !singleEducation || formValues.city==="" || formValues.state===""
        // ||  !formValues.functionalArea || !formValues.industry || !formValues.product || data.totalExperience===""
        ){
            setError("Please fill mandatory Fields")
        }else{
            console.log(data,values.password,formValues,dob)
        }

        //props.setLoading(true)
        const formdata = new FormData();
        if(!Array.isArray(resume)){
          formdata.append('file',resume)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/upload-resume`,formdata,{headers:{Accept:'application/json','Content-Type':"multipart/form-data"}})
        .then(res=>{
            console.log(res)
            //props.setSnackbar({type:"success",text:"Resume Updated Successfully",open:true})
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/sendVerificationToken`,{
            "email":data.email,
            "password":values.password,
            "fullName":data.fullName,
            "mobileNo":data.mobileNo,
            'fresher':radio,
            functionalArea:formValues.functionalArea,
            product:formValues.product,
            industry:formValues.industry,
            currentCtc:parseInt(data.currentCtc),
            totalExperience:parseInt(data.totalExperience),
            state:formValues.state,
            city:formValues.city,
            noticePeriod:formValues.noticePeriod,
            currentCompany:data.currentCompany,
            designation:data.currentDesignation,
            singleEducation,
            universityName:data.universityName,
            dob,
            resume:res.data.result
        })
        .then(res=>{
            console.log(res)
            setError("")
            props.setLoading(false)
            if(res.data.msg==="success"){
            //setting the user token locally to use it later on any request for candidate
            //props.setUser(res.data.result)
            //navigation to candidate dashboard
            props.history.push("/verificationmail")
            }
            
        })
        .catch(err=>{
            console.log(err.response)
            props.setLoading(false)
            if(err.response){
                if(err.response.data.length>0){
                  setError(err.response.data)
                }
              }
        })
          
        })
        .catch(err=>{
          props.setLoading(false)
          setError("Something went wrong, Try again after sometime")
        })
    }

    }
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
    React.useEffect(()=>{
        var config = {
            method: 'get',
            url: 'https://api.countrystatecity.in/v1/countries/IN/states',
            headers: {
              'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response);
            setStates(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getJobTotal`)
        .then(res=>{
          console.log(res)
          setJobTotal(res.data.result)
        })
        

        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getSearchCandidateData`)
        .then(res=>{
            console.log(res)
            if(res.data.result.length>0){
                //setAllPg(res.data.result[0].pg)
                //setAllUg(res.data.result[0].ug)
                setAllEducation([...res.data.result[0].ug,...res.data.result[0].pg])
                setAllFuncationalArea(res.data.result[0].functionalArea)
                setAllProducts(res.data.result[0].product)
                setAllIndustry(res.data.result[0].industry)
            }
            //setAllLocations(res.data.result)
        })
    },[])
    console.log(resume)
    return (
        <div>
            <section>
                <Header />
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div >
                <Container maxWidth="md" className="main_cont">
                    <Box display="" mx="" my="" sx="">
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={6} sm={12} xm={12}>
                                <h1 style={{
                                    marginLeft: '5%'
                                    , fontSize: '3em'
                                }}>
                                    Get Access to <br />
                                    <span className="primarycolorwh">{jobTotal}</span> Jobs
                                </h1>
                                <h5 style={{
                                    marginLeft: '5%'
                                }}>By Registering On Our Platform </h5>
                                <img src="/login.png" alt="" className="logimg" style={{
                                    width: '65%',
                                    marginLeft: '5%'

                                }} />
                            </Grid>

                            <Grid item xs={12} md={6} sm={12} xm={12}>
                                <div className="main_dev">
                                    <h1 style={{ marginLeft: '7rem' }}>Register</h1>
                                    <TextField
                                    {...register('email',{required:true,pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                                    error={errors.email?true:false}
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Email"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />
                                    <TextField
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Full Name"
                                        {...register('fullName',{required:true,
                                            pattern: /^[a-zA-Z ]+$/ // only allow letters and spaces
                                        })}
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />


                                    <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? "text" : "password"}
                                            value={values.password}
                                            onChange={handleChange("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>


                                    <Box display="flex" mx="0.5rem" my="" sx="">


                                    <p style={{marginLeft:'12rem'}}> <Link to="/forgetpassword?candidate">Forget Password</Link>    </p>
                                    </Box>
                                    
                                    <TextField
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Mobile Number"
                                        {...register('mobileNo',{required:true,maxLength:10})}
                                        // name="numberformat"
                                        // type="number"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />
                                    <Box className="my-3" display="flex" mx="1rem" my="2" sx="">
                                    <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        onChange={(e)=>setGender(e.target.value)}
                                        value={gender}
                                        row

                                    >
                                        <FormControlLabel value={'Male'} control={<Radio />} label="Male" />
                                        <FormControlLabel value={'Female'} control={<Radio />} label="Female" />
                                        <FormControlLabel value={'Other'} control={<Radio />} label="Other" />
                                    </RadioGroup>
                                    </FormControl>


                                    </Box>

                                    <div className="my-4">
                                    <Autocomplete
                                    fullWidth
                                    onChange={(event, newValue) => {
                                    setFormValues({...formValues,state:newValue.name});
                                    getCities(newValue.iso2)
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
                                    onChange={(event, newValue) => {
                                    setFormValues({...formValues,city:newValue.name});
                                    }}
                                    id="controllable-states-demo"
                                    options={cities}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Select City"/>}
                                    />
                                    </div>

                                    <section className="my-3">
                                    <LocalizationProvider 
                                    
                                    dateAdapter={AdapterDateFns} >
                                    <DesktopDatePicker
                                    label="Date of Birth"
                                    inputFormat="dd/MM/yyyy"
                                    value={dob}
                                    onChange={(newVal)=>setDob(newVal)}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                                </LocalizationProvider>
                                </section>

                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={allEducation}
                                fullWidth
                                className='mb-3'
                                onChange={(e,value)=>setSingleEducation(value.name)}
                                getOptionLabel={(item)=>item.name}
                                renderInput={(params) => <TextField  {...params} label="Degree Name" />}
                            />

                            <TextField
                                    className="mb-3"
                                    inputProps={{ maxLength: 200 }}
                                    {...register("universityName",{required:true})}
                                    error={errors.universityName?true:false}
                                        autoFocus
                                        margin="dense"
                                        id={'outlined-basic'}
                                        label={"University Name"}
                                        fullWidth
                                        variant="outlined"
                                    />

                                <Box className="my-3" display="flex" mx="1rem" my="2" sx="">
                                    <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Work Experience</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        onChange={(e)=>setRadio(e.target.value)}
                                        value={radio}

                                    >
                                        <FormControlLabel value={'false'} control={<Radio />} label="I'm Experienced (have work experience)" />
                                        <FormControlLabel value={'true'} control={<Radio />} label="I'm Fresher (haven't worked after grad" />
                                    </RadioGroup>
                                    </FormControl>
                                    </Box>

                                    <TextField
                                    disabled={radio==="true"?true:false}
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Current Company"
                                        {...register('currentCompany')}
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />

                                    <TextField
                                    disabled={radio==="true"?true:false}
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Current Designation"
                                        {...register('currentDesignation')}
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />

                                    <TextField
                                    disabled={radio==="true"?true:false}
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Current CTC"
                                        {...register('currentCTC')}
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />

                                    <TextField
                                    disabled={radio==="true"?true:false}
                                        xs={12} md={6} sm={12} xm={12}
                                        label="Total Experience"
                                        {...register('totalExperience',{
                                            pattern: /^\d+$/ // only allow digits
                                        })}
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "35ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),


                                        }}


                                    />

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    disabled={radio==="true"?true:false}
                    value={formValues.industry?{name:formValues.industry}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,industry:newValue.name});
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

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    disabled={radio==="true"?true:false}
                    value={formValues.functionalArea?{name:formValues.functionalArea}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,functionalArea:newValue.name});
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

                    <div className="my-4">
                    <Autocomplete
                    fullWidth
                    disabled={radio==="true"?true:false}
                    value={formValues.product?{name:formValues.product}:{name:""}}
                    onChange={(event, newValue) => {
                    if(newValue){
                        setFormValues({...formValues,product:newValue.name});
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

            {resume?<div className="resume-child row m-auto">
                            <div className="col-2">
                                <InsertDriveFileIcon color="primary" />
                            </div>
                            <div className="col-7">
                                <h4>{resume.name}</h4>
                            </div>
                            <div className="col-3">
                            <label htmlFor="contained-button-file2">
                            <Input 
                            onChange={(e)=>setResume(e.target.files[0])}
                            accept="application/*" id="contained-button-file2" multiple type="file" />
                                {/* <IconButton component="span">
                                <PublishIcon sx={{fontSize:30}} color="tertiary" />
                                </IconButton> */}
                                <Button component="span">Change</Button>
                                </label>
                            </div>
                        </div>:
                        <div className="resume-child row m-auto">
                        <div className="" style={{margin:"auto"}}>
                        <label htmlFor="contained-button-file3">
                    <Input 
                    onChange={(e)=>setResume(e.target.files[0])}
                    accept="application/*" id="contained-button-file3" multiple type="file" />
                    <Button variant="contained" component="span" endIcon={<UploadFileIcon />}>
                    Upload Resume
                    </Button>
                    </label>
                        </div>
                        
                    </div>
                        }





                                    {error.length>0&&<Alert className="alert" severity="error">{error}</Alert>}

                                    <Button type="submit" sx={{ m: 1, width: "42ch" }} variant="contained">
                                        signup
                                    </Button>
                                    <p style={{
                                        marginLeft:'5rem'
                                    }}>
                                        <Link to='/login'  style={{color:'#ff3d8b'}}>Already a user login instead?</Link>
                                    </p>
                                    <Divider
                                        variant="middle"
                                        sx={{
                                            width: "20rem",
                                        }}
                                    />

                                    <Button
                                        variant="outlined"
                                        sx={{ m: 1, width: "42ch" }}
                                        startIcon={<PersonAddAltIcon />}
                                    >
                                        <Link to='/SignupRecruiter'  style={{color:'#ff3d8b'}}> Register as a recruiter</Link>
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>

            </form>
            <Footer />
        </div>
    );
};

const mapStateToProps = ({banksterUser})=>{
    return {
        banksterUser
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(token)=>dispatch(setUser(token)),
        setLoading:(bool)=>dispatch(setLoading(bool))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
