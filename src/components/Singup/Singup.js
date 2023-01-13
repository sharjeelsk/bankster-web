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

import './singup.scss'
const Login = (props) => {
    const {handleSubmit,register,formState:{errors}}=useForm();
    const [radio,setRadio] = React.useState('true')
    const [error,setError]=React.useState("")
    const [jobTotal,setJobTotal] = React.useState("...")
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
        props.setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/sendVerificationToken`,{
            "email":data.email,
            "password":values.password,
            "fullName":data.fullName,
            "mobileNo":data.mobileNo,
            'fresher':radio
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
    }

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getJobTotal`)
        .then(res=>{
          console.log(res)
          setJobTotal(res.data.result)
        })
    },[])

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
                                        {...register('fullName',{required:true})}
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
                                    <Box display="flex" mx="1rem" my="" sx="">
                                    <FormControl>

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
