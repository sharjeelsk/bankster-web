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
import { Grid, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { connect } from 'react-redux'
import { setUser } from "../redux/user/userActions";
import { setLoading } from "../redux/loading/loadingActions";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Autocomplete } from '@mui/material'
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PublishIcon from '@mui/icons-material/Publish';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./SignUp.scss"
function SignUp(props) {
    const Input = styled('input')({
        display: 'none',
    });
    // const { handleSubmit, register, formState: { errors } } = useForm();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [radio, setRadio] = React.useState('true')
    const [gender, setGender] = React.useState("Male")
    const [error, setError] = React.useState("")
    const [jobTotal, setJobTotal] = React.useState("...")
    const [formValues, setFormValues] = React.useState({ state: "", city: "", product: null, industry: null, functionalArea: null, noticePeriod: null })
    const [cities, setCities] = React.useState([])
    const [states, setStates] = React.useState([])
    const [allFunctionalArea, setAllFuncationalArea] = React.useState([])
    const [allProducts, setAllProducts] = React.useState([])
    const [allIndustry, setAllIndustry] = React.useState([])
    const [singleEducation, setSingleEducation] = React.useState(null)
    const [dob, setDob] = React.useState(null);
    const [allEducation, setAllEducation] = React.useState([])
    const [resume, setResume] = React.useState(null)
    console.log("=====resume",resume)
    const [mobiledata, setMobileData] = React.useState(null)
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
    const onSubmit = (data) => {
        console.log(data, values.password, formValues, dob, resume)
        if (data.email === "" || data.fullName === "" ||
            !resume || mobiledata === "") {
            setError("Please fill mandatory Fields")
        } else {
            console.log(data, values.password)
        }

        //props.setLoading(true)
        const formdata = new FormData();
        console.log({
            "email": data.email,
            "password": values.password,
            "fullName": data.fullName,
            "mobileNo": mobiledata
        })
        if (!Array.isArray(resume)) {
            formdata.append('file', resume)
            console.log("=======================>", resume)
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/upload-resume`, formdata, { headers: { Accept: 'application/json', 'Content-Type': "multipart/form-data" } })
                .then(res => {
                    console.log(res)
                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/sendVerificationToken`, {
                        "email": data.email,
                        "password": values.password,
                        "fullName": data.fullName,
                        "mobileNo": mobiledata,//data.mobileNo,
                        //   'fresher': radio,
                        // functionalArea: formValues.functionalArea,
                        product: formValues.product,
                        // industry: formValues.industry,
                        // currentCtc: parseInt(data.currentCTC),
                        totalExperience: parseInt(data.totalExperience),
                        // state: formValues.state,
                        // city: formValues.city,
                        noticePeriod: formValues.noticePeriod,
                        currentCompany: data.currentCompany,
                        designation: data.currentDesignation,
                        // singleEducation,
                        // universityName: data.universityName,
                        // dob,
                        resume: res.data.result,
                        // resumeTagline: data.resumeTagline,
                        gender
                    })
                        .then(res => {
                            console.log(res)
                            setError("")
                            props.setLoading(false)
                            if (res.data.msg === "success") {
                                //setting the user token locally to use it later on any request for candidate
                                //props.setUser(res.data.result)
                                //navigation to candidate dashboard
                                props.history.push("/verificationmail")
                            }

                        })
                        .catch(err => {
                            console.log(err.response)
                            props.setLoading(false)
                            if (err.response) {
                                if (err.response.data.length > 0) {
                                    setError(err.response.data)
                                }
                            }
                        })

                })
                .catch(err => {
                    props.setLoading(false)
                    setError("Something went wrong, Try again after sometime")
                })
        }

    }
    // const getCities = (state) => {
    //     console.log(state)
    //     var config = {
    //         method: 'get',
    //         url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
    //         headers: {
    //             'X-CSCAPI-KEY': 'cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA=='
    //         }
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(response);
    //             setCities(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    React.useEffect(() => {
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
            .then(res => {
                console.log(res)
                setJobTotal(res.data.result)
            }).catch((error) => {
                console.log("======", error)
            })


        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getSearchCandidateData`)
            .then(res => {
                if (res.data.result.length > 0) {
                    //setAllPg(res.data.result[0].pg)
                    //setAllUg(res.data.result[0].ug)
                    setAllEducation([...res.data.result[0].ug, ...res.data.result[0].pg])
                    setAllFuncationalArea(res.data.result[0].functionalArea)
                    setAllProducts(res.data.result[0].product)
                    setAllIndustry(res.data.result[0].industry)
                }
                //setAllLocations(res.data.result)
            }).catch((error) => {
                console.log("=========>", error)
            })
    }, [])
    const getMobileData = (value) => {
        if (value.length === 12) {
            setMobileData(value)
        }
    }
    return (
        <div>
            <Header />
            <section className="row m-auto sign-up-section">

                <div className="col-4 left-content display-desktop">
                    <h1 className="main-head">Get Access to <span className="primarycolorwh">{jobTotal}</span> Jobs</h1>
                    <h5>By Registering On Our Platform </h5>
                    <img src="/login.png" alt="" className="logimg" />
                    <p style={{ lineHeight: 1.8 }} className="grey-text">Looking for your dream job? Register on our job site today and receive personalized job recommendations based on your skills and experience. Our advanced matching algorithm ensures you get the best job opportunities that fit your profile. With our user-friendly interface, creating a profile and applying to jobs has never been easier. Join our community of job seekers today and let us help you find your next career move!</p>
                    <section class="job-benefits">
                        <img src="/resume.png" alt="" className="logimg" />
                        <h2>Why Use BanksterIndia?</h2>
                        <ul>
                            <li>Connect with millions of job opportunities in the financial sector</li>
                            <li>Find remote job opportunities in finance that allow you to work from anywhere</li>
                            <li>Get help with your job search from career counseling and other services</li>
                            <li>Discover tools for employers to make the hiring process more efficient and effective</li>
                            <li>Experience more personalized job search results with AI and machine learning algorithms</li>
                            <li>Promote diversity and inclusion in the financial industry</li>
                        </ul>
                    </section>

                </div>

                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 right-content">
                    <form className="shadow" onSubmit={handleSubmit(onSubmit)}>
                        <h2>Personal Info</h2>
                        <p className="grey-text tagline">Unlocking potential and driving growth through passion, creativity, and innovation</p>

                        <section className="row m-auto">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">

                                <TextField
                                    fullWidth
                                    className="my-3"
                                    label="Full Name"
                                    {...register('fullName', {
                                        required: true,
                                        pattern: /^[a-zA-Z ]+$/ // only allow letters and spaces
                                    })}
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControl className="my-3" fullWidth variant="outlined">
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


                                <div className="my-4">
                                    <Box className="my-3" display="flex" mx="1rem" my="2" sx="">
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                onChange={(e) => setGender(e.target.value)}
                                                value={gender}
                                                row
                                            >
                                                <FormControlLabel value={'Male'} control={<Radio />} label="Male" />
                                                <FormControlLabel value={'Female'} control={<Radio />} label="Female" />
                                                <FormControlLabel value={'Other'} control={<Radio />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>

                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    fullWidth
                                    className="my-3"
                                    {...register('email', { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                    error={errors.email ? true : false}
                                    label="Email"
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                                <div className="mobile-number">
                                    <PhoneInput
                                        xs={12} md={6} sm={12} xm={12}
                                        fullWidth
                                        className="my-3"
                                        country={"in"}
                                        error={mobiledata?.length < 12 ? true : false}
                                        label="Mobile Number"
                                        value={mobiledata}
                                        onChange={getMobileData}

                                        disableArrowIcon
                                        disableDropdown
                                        id="outlined-start-adornment"
                                    />
                                </div>




                            </div>

                        </section>
                        <h2>Work Experience</h2>
                        <section className="row m-auto">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField

                                    fullWidth
                                    className="my-3"
                                    label="Current Company"
                                    {...register('currentCompany')}
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />


                                <div className="my-4">
                                    <Autocomplete
                                        fullWidth

                                        value={formValues.product ? { name: formValues.product } : { name: "" }}
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                setFormValues({ ...formValues, product: newValue.name });
                                            } else {
                                                setFormValues({ ...formValues, product: null });
                                            }

                                        }}
                                        id="controllable-states-demo"
                                        options={allProducts}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Select Product" />}
                                    />
                                </div>
                                <div className="my-4">
                                    <Autocomplete
                                        fullWidth
                                        value={formValues.noticePeriod ? formValues.noticePeriod : ""}
                                        onChange={(event, newValue) => {
                                            setFormValues({ ...formValues, noticePeriod: newValue });
                                        }}
                                        id="controllable-states-demo"
                                        options={['Any Notice Period', '7 Days', '30 Days', '60 Days', '90 Days', 'Immediate Joiner', 'Currently Serving Notice Period']}
                                        // getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Choose Notice Period" />}
                                    />
                                </div>
                            </div>


                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField

                                    fullWidth
                                    className="my-3"
                                    label="Current Designation"
                                    {...register('currentDesignation')}
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField

                                    fullWidth
                                    className="my-3"
                                    label="Total Experience"
                                    {...register('totalExperience', {
                                        pattern: /^\d+$/ // only allow digits
                                    })}
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                                {/* {resume ? <div className="resume-child row m-auto">
                                    <div className="col-2">
                                        <InsertDriveFileIcon color="primary" />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor="contained-button-file2">
                                            <Input
                                                onChange={(e) => setResume(e.target.files[0])}
                                                accept="application/*" id="contained-button-file2" multiple type="file" />
                                            <IconButton component="span">
                                                <PublishIcon sx={{ fontSize: 30 }} color="tertiary" />
                                            </IconButton>
                                            <Button variant="contained" component="span">Change</Button>
                                        </label>
                                        {/* <div className="col-7"> */}
                                {/* <h4>{resume.name}</h4> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* </div> : */}
                                {/* <div className="resume-child row m-auto">
                                        <div className="" style={{ margin: "auto" }}>
                                            <label htmlFor="contained-button-file3">
                                                <Input
                                                    onChange={(e) => setResume(e.target.files[0])}
                                                    accept="application/*" id="contained-button-file3" multiple type="file" />
                                                <Button size="large" fullWidth id="upload-resume-button" variant="contained" component="span" endIcon={<UploadFileIcon />}>
                                                    Upload Resume
                                                </Button>
                                            </label>
                                        </div>

                                    </div> */}
                                {resume ? (
                                    <div className="resume-child row m-auto align-items-center">
                                        <div className="col-2">
                                            <InsertDriveFileIcon color="primary" />
                                        </div>

                                        <div className="col-7">
                                            <h4>{resume.name}</h4>
                                        </div>

                                        <div className="col-3 text-right">
                                            <label htmlFor="contained-button-file2">
                                                <Input
                                                    onChange={(e) => setResume(e.target.files[0])}
                                                    accept="application/*"
                                                    id="contained-button-file2"
                                                    type="file"
                                                    multiple
                                                    style={{ display: 'none' }}
                                                />
                                                <IconButton component="span">
                                                    <PublishIcon sx={{ fontSize: 30 }} color="tertiary" />
                                                </IconButton>
                                                <Button variant="contained" component="span">
                                                    Change
                                                </Button>
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row m-auto">
                                    <div className="col-12">
                                        <label htmlFor="contained-button-file2">
                                            <Input
                                                onChange={(e) => setResume(e.target.files[0])}
                                                accept="application/*"
                                                id="contained-button-file2"
                                                type="file"
                                                multiple
                                                style={{ display: 'none' }}
                                                
                                            />
                                            <IconButton component="span">
                                                <PublishIcon sx={{ fontSize: 30 }} color="tertiary" />
                                            </IconButton>
                                            <Button variant="contained"  size="large"  id="upload-resume-button"  component="span" endIcon={<UploadFileIcon />}>
                                                Upload Resume
                                            </Button>
                                        </label>
                                    </div>
                                </div>

                              
                                )}


                            </div>


                        </section>


                        {error.length > 0 && <Alert className="alert" severity="error">{error}</Alert>}
                        <Button type="submit" fullWidth variant="contained">Submit</Button>
                        <div className="my-3" style={{ textAlign: "center" }}>
                            <Link to='/login' style={{ color: '#ff3d8b' }}>Already a user login instead?</Link>
                        </div>
                        <hr />
                        <Button
                            startIcon={<PersonAddAltIcon />}
                            fullWidth variant="outlined"> <Link to='/SignupRecruiter' style={{ color: '#ff3d8b' }}> Register as a recruiter</Link></Button>

                    </form>
                </div>

            </section>
            <Footer />
        </div>
    )
}
const mapStateToProps = ({ banksterUser }) => {
    return {
        banksterUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (token) => dispatch(setUser(token)),
        setLoading: (bool) => dispatch(setLoading(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);