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
import './singup.scss'
import { connect } from 'react-redux'
import { setUser } from "../redux/user/userActions";
import axios from 'axios'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { setLoading } from "../redux/loading/loadingActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Login = (props) => {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const [allPlans, setAllPlans] = React.useState([])
    const [plan, setPlan] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('Online')
    const [error, setError] = React.useState("")
    const [candidateTotal, setCandidateTotal] = React.useState("...")
    const [mobileData, setMobileData] = React.useState(null)
    const handleRadioChange = (event) => {
        setPlan(event.target.value);
        if (event.target.value === "Custom") {
            setPaymentMethod("Offline")
        } else if (event.target.value === "Free") {
            setPaymentMethod("Online")
        }
    };
    const openPayModal = (subscription, data) => {
        const options = {
            key: 'rzp_live_R0NDdbIKIMSjU7', //rzp_test_BbBTgCM0XfV6iH
            amount: subscription.amount * 100, //  = INR 1
            name: 'Bankster India',
            description: 'Payment',
            image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
            handler: function (response) {
                props.setLoading(true)
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/signup`, {
                    "email": data.email,
                    "password": values.password,
                    "fullName": data.fullName,
                    "mobileNo": mobileData,
                    "companyName": data.company,
                    "designation": data.designation,
                    "subscriptionId": subscription._id,
                    "paymentId": response
                })
                    .then(res => {
                        setError("")
                        props.setLoading(false)
                        if (res.data.msg === "success") {
                            //setting the user token locally to use it later on any request for recruiter
                            props.setUser(res.data.result)
                            //navigation to recruiter dashboard
                            props.history.push("/recruiterhome")
                        }

                    })
                    .catch(err => {
                        props.setLoading(false)
                        if (err.response) {
                            if (err.response.data.length > 0) {
                                setError(err.response.data)
                            }
                        }
                    })
            },
            prefill: {
                name: 'Gaurav',
                contact: '9999999999',
                email: 'demo@demo.com'
            },
            notes: {
                address: 'some address'
            },
            theme: {
                color: 'blue',
                hide_topbar: false
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/subscription/allSubscription`)
            .then(res => {
                if (res.data.msg === "success") {
                    setAllPlans(res.data.result)
                    if (res.data.result.length > 0) {
                        setPlan(res.data.result[0].name)
                    }
                }

            })
            .catch(err => {
                console.log(err)
            })
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getAllCandidatesLength`)
            .then(res => {
                setCandidateTotal(res.data.result)
            })
    }, [])

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
    //signup of recruiter
    const onSubmit = (data) => {
        let subscription = allPlans.filter(item => item.name === plan)[0]

        delete subscription._id
        props.setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/sendVerificationToken`, {
            "email": data.email,
            "password": values.password,
            "fullName": data.fullName,
            "mobileNo":mobileData,
            "companyName": data.company,
            "designation": data.designation,
            "subscriptionId": "635a98177ca2905a363e4dcb",
            plan: subscription
        })
            .then(res => {
                props.setLoading(false)
                setError("")
                if (res.data.msg === "success") {
                    //setting the user token locally to use it later on any request for recruiter
                    //props.setUser(res.data.result)
                    //navigation to recruiter dashboard
                    props.history.push("/verificationmail")
                }

            })
            .catch(err => {
                props.setLoading(false)
                if (err.response) {
                    if (err.response.data.length > 0) {
                        setError(err.response.data)
                    }
                }
            })
    }
    const getMobile = (value) => {
        if (value.length === 12) {
            setMobileData(value)
        }

    }
    return (
        <div>
            <section>
                <Header id="4" />
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
                                        <span className="primarycolorwh"></span> Candidate <br /> Applications
                                    </h1>
                                    <h5 style={{
                                        marginLeft: '5%'
                                    }}>By Registering On Our Platform </h5>

                                    {

                                        allPlans.length > 0 ? allPlans.map((item, index) => !item.custom && item.name === "Job Ads" &&

                                            <div className="shadow-sm plan-auth-cont">
                                                <h1>{item.name}</h1>
                                                <h2>₹{item.amount}/month</h2>

                                                {
                                                    item.features.map((i, ind) => <p key={ind}><TaskAltIcon /> {i}</p>)
                                                }
                                            </div>
                                        ) : null
                                    }
                                </Grid>

                                <Grid item xs={12} md={6} sm={12} xm={12}>
                                    <div className="main_dev">
                                        <h1 style={{ marginLeft: '1rem' }}>Recruiter Registeration</h1>
                                        <TextField
                                            xs={12} md={6} sm={12} xm={12}
                                            label="Email"
                                            {...register('email', { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                            error={errors.email ? true : false}
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
                                            id="outlined-start-adornment"
                                            sx={{ m: 1, width: "35ch" }}
                                            {...register('fullName', { required: true })}
                                            error={errors.fullName ? true : false}
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


                                        <div className="mobile-number-Recruiter" >
                                            <PhoneInput
                                                style={{ left: "9px" }}
                                                xs={12} md={6} sm={12} xm={12}
                                                fullWidth
                                                className="recruiter-mobile-number"
                                                country={"in"}
                                                error={errors.email ? true : false}
                                                onChange={getMobile}
                                                label="Mobile Number"
                                                disableArrowIcon
                                                disableDropdown
                                                id="recruiter-mobile-id"
                                            />
                                        </div>
                                        <TextField
                                            xs={12} md={6} sm={12} xm={12}
                                            label="Company Name"
                                            {...register('company', { required: true })}
                                            error={errors.company ? true : false}
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
                                            label="Designation"
                                            {...register('designation', { required: true })}
                                            error={errors.designation ? true : false}
                                            id="outlined-start-adornment"
                                            sx={{ m: 1, width: "35ch" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),


                                            }}


                                        />



                                        {error.length > 0 && <Alert className="alert" severity="error">{error}</Alert>}

                                        <Button type="submit" sx={{ m: 1, width: "42ch" }} variant="contained">
                                            signup
                                        </Button>
                                        <p style={{
                                            marginLeft: '5rem'
                                        }}>
                                            <Link to='/Loginrecruiter' style={{ color: '#ff3d8b' }}> Already a user login instead?</Link>
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
                                            <Link to='/signup' style={{ color: '#ff3d8b' }}> Register as a jobseeker</Link>
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
const mapStateToProps = ({ banksterUser }) => {
    return {
        user: banksterUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (token) => dispatch(setUser(token)),
        setLoading: (bool) => dispatch(setLoading(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
