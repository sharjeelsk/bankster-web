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
import './login.scss'
import {connect} from 'react-redux'
import { setUser } from "../redux/user/userActions";
import {useForm} from 'react-hook-form'
import axios from 'axios'
const Login = (props) => {
  const {handleSubmit,register,formState:{errors}}=useForm();
  const [candidateTotal,setCandidateTotal] = React.useState("...")
  const [error,setError]=React.useState("")
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

    //login of recruiter
    const onSubmit = (data)=>{
      console.log(data,values)
      axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/login`,{
          "email":data.email,
          "password":values.password,
      })
      .then(res=>{
        setError("")
          console.log(res)
          if(res.data.msg==="success"){
          //setting the user token locally to use it later on any request for recruiter
          props.setUser(res.data.result)
          //navigation to recruiter dashboard
          props.history.push("/recruiterhome")
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


  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getAllCandidatesLength`)
    .then(res=>{
      console.log(res)
      setCandidateTotal(res.data.result)
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
                marginLeft:'5%'
                ,fontSize: '3em'
              }}>
                Get Access to <br />
                <span  className="primarycolorwh"></span> Candidate <br /> Applications
              </h1>
              <h5    style={{
                marginLeft:'5%'
              }}>By Registering On Our Platform </h5>
              <img src="/login.png" alt="" className="logimg"   style={{
                width:'65%',
                marginLeft:'5%'
                
             }} /> 
            </Grid>

            <Grid item xs={12} md={6} sm={12} xm={12}>
              <div className="main_dev">
                <h1  style={{marginLeft:'1rem'}}>Login as a recruiter</h1>
                <TextField
                xs={12} md={6} sm={12} xm={12}
                  label="Email"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  {...register('email',{required:true,pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                  error={errors.email?true:false}
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
                  
                
                <p style={{marginLeft:'12rem'}}> <Link to="/forgetpassword?recruiter">Forget Password</Link>    </p>
                </Box>
                {error.length>0&&<Alert className="alert" severity="error">{error}</Alert>}

                <Button type="submit" sx={{ m: 1, width: "42ch" }} variant="contained">
                  Login
                </Button>
                <p>
                  <Link to='/SignupRecruiter'  style={{color:'#ff3d8b'}}>New to Bankster? Create a Account on Bankster</Link>
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
                  <Link to='/login'  style={{color:'#ff3d8b'}}> Login as a job seeker</Link>
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
      setUser:(token)=>dispatch(setUser(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
