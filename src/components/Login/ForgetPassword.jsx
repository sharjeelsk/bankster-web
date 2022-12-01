import React,{useState,useEffect} from "react";
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
import './login.scss'
import { mt } from "date-fns/locale";
import {connect} from 'react-redux'
import { setUser,storeUserType } from "../redux/user/userActions";
import { setSnackbar } from "../redux/flags/flagActions";
import axios from 'axios'
import {useForm} from 'react-hook-form'

const ForgetPassword = (props) => {
  const {handleSubmit,formState:{errors},register} = useForm()
  const [error,setError]=React.useState("")
  const [email,setEmail] = React.useState('')
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    confirmPassword:"",
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

  const [resetPassword,setResetPassword] = React.useState(false)
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  console.log(counter)


  const handlePasswordReset = ()=>{
    if(values.password!==values.confirmPassword){
      setError("Passwords Mismatch")
    }else{
      //reset password
      axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/resetPassword`,{
        "email":email,
        password:values.password
      })
    .then(res=>{
        setError("")
        console.log(res)
        if(res.data.msg==="success"){
          props.setSnackbar({type:"success",text:"Password Reset Successfully!",open:true})
          if(props.location.search.split("?")[1]==="candidate"){
            props.history.push("/login")
          }else{
            props.history.push("/Loginrecruiter")
          }
        }
        
    })
    .catch(err=>{
        console.log(err.response)
        if(err.response){
          if(err.response.data.length>0){
            setError(err.response.data)
          }
        }
    })
    }
  }

  //login of candidate
  const handleOtpSend = ()=>{
    setCounter(60)
    if(email.length>0){
      if(props.location.search.split("?")[1]==="candidate"){
        console.log("candidate")
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/sendOTP`,{
              "email":email,
            })
          .then(res=>{
              setError("")
              console.log(res)
              if(res.data.msg==="success"){
                props.setSnackbar({type:"success",text:"Welcome Back Sharjeel!",open:true})
              }
              
          })
          .catch(err=>{
              console.log(err.response)
              if(err.response){
                if(err.response.data.length>0){
                  setError(err.response.data)
                }
              }
          })
      }else{
        console.log("candidate23")
      }
    }else{
      setError("Invalid Email")
    }
}

  const onSubmit = (data)=>{
    console.log(data)
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/verifyOTP`,{
      "email":email,
      "otp":data.otp,
  })
  .then(res=>{
      setError("")
      console.log(res)
      if(res.data.msg==="success"){
        setResetPassword(true)
      }

      
  })
  .catch(err=>{
      console.log(err.response)
      if(err.response){
        if(err.response.data.length>0){
          setError(err.response.data)
        }
      }
  })
  }

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
                marginLeft:'5%'
                ,fontSize: '3em'
              }}>
                Get Job to <br />
                <span  className="primarycolorwh">1740</span> Jobs
              </h1>
              <h5    style={{
                marginLeft:'5%'
              }}>By Registering On Our Platform </h5>
              <img src="/login.png" alt="" className="logimg"   style={{
                width:'65%',
                marginLeft:'5%'
                
             }} /> 
            </Grid>

            <Grid item   xs={12} md={6} sm={12} xm={12}>
              <div className="main_dev"
              //  style={{
              //   backgroundColor:'white',width:'80%',padding:'1rem',marginTop:'2rem',borderRadius:'1rem'
              // }}
              >
                <h1  style={{marginLeft:'1rem'}}>Reset Password</h1>

                {!resetPassword?<>
                <TextField
                xs={12} md={6} sm={12} xm={12}
                  label="Enter Registered Email"
                  id="outlined-start-adornment"
                  onChange={(e)=>setEmail(e.target.value)}
                  sx={{ m: 1, width: "35ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                
                    
                  }}
                />
                <div style={{textAlign:"right"}} className="mx-3 my-2">
                <Button disabled={counter>0?true:false} onClick={()=>handleOtpSend()}>Send OTP {counter>0&&`(${counter})`}</Button>
                </div>
                <TextField
                xs={12} md={6} sm={12} xm={12}
                  label="Enter Otp"
                  id="outlined-start-adornment"
                  {...register('otp',{required:true})}
                  sx={{ m: 1, width: "35ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                
                    
                  }}
                />
    {error.length>0&&<Alert className="alert my-3" severity="error">{error}</Alert>}
                <Button type="submit" sx={{ m: 1, width: "42ch" }} variant="contained">
                  next
                </Button>
                </>:
                <>
                {/* reset password */}
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
            <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
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
            {error.length>0&&<Alert className="alert my-3" severity="error">{error}</Alert>}
                <Button onClick={()=>handlePasswordReset()} type="submit" sx={{ m: 1, width: "42ch" }} variant="contained">
                  Submit
                </Button>
                </>
                }


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
      storeUserType:(userType)=>dispatch(storeUserType(userType)),
      setSnackbar:(obj)=>dispatch(setSnackbar(obj))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);

