import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CandidateDashhead from '../CandidateDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchCandidateInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./Subscription.scss"
import { Button } from '@mui/material';
import date from 'date-and-time';
import moment from 'moment'
function Subscription(props) {
    const [display,setDisplay]=React.useState(false)
    const [plans,setPlans] = React.useState([])
    console.log(plans)


    const getPlans = ()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidateSubscription/allSubscription`)
      .then(res=>{
        console.log(res)
        if(res.data.msg==="success"){
          setPlans(res.data.result)
          
        }
        
      })
      .catch(err=>{
        console.log(err)
      })
    }

    React.useEffect(()=>{
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      getPlans()
    },[])

    const openPayModal = (amount,planId) => {
      console.log(planId)
      const options = {
        key: 'rzp_live_R0NDdbIKIMSjU7', //rzp_test_BbBTgCM0XfV6iH
        amount: amount*100, //  = INR 1
        name: 'Bankster India',
        description: 'Payment',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            console.log(response);
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/changeCandidatePlan`,{planId,paymentId:response},{headers:{token:props.user.user}})
            .then(res=>{
              console.log(res);
              getPlans()
              props.fetchCandidateInfo(props.user.user)
            })
            .catch(err=>{
              console.log(err);
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

    const renderPlanName = (id)=>{
      let plan = plans.filter(item=>item._id===id)[0]
      return plan.name;
    }

    const renderCreatedAt = (expiry)=>{
      let createdat = date.addMonths(expiry,-1)
      return createdat;
    }

    return (
        <>
         <HeaderDash />
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <CandidateDashhead id={4} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            <h1 className="mobile-center">Subscriptions</h1>

            <section className='row m-auto'>
            {
              plans.length>0?plans.map((item,index)=>
              <div key={index} className={`shadow-sm plan-auth-cont col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 ${item._id===props.user.userInfo.subscription._id?"active-plan":""}`}>
              <h1>{item.name}</h1>
              <h2>${item.amount}/month</h2>
              <p><TaskAltIcon /> {item.cvAccess} resume access</p>
              <p><TaskAltIcon /> {item.jobPostings} job postings</p>
              {
                item._id===props.user.userInfo.subscription._id?<p className="active-text">Currently Active</p>:
                <Button onClick={()=>openPayModal(item.amount,item._id)} variant="contained">upgrade</Button>
              }
             </div> 
              ):null
             }
            </section>

            {props.user.userInfo.paymentHistory.length>0 && plans.length>0?<>
            <h2>Payment History</h2>
            <table className="ui celled table">
            <thead>
              <tr><th>Plan</th>
              <th>Transaction Id</th>
              <th>Created At</th>
              <th>Expiry</th>
            </tr></thead>
            <tbody>


            {
              props.user.userInfo.paymentHistory.map((item,index)=><tr key={index}>
              <td>{renderPlanName(item.subscriptionId)}</td>
              <td>{item.paymentId.razorpay_payment_id}</td>
              <td>{moment(item.createdAt).format('dddd, MMMM Do YYYY, h:mm a')}</td>
              <td>{moment(item.expiry).format('dddd, MMMM Do YYYY, h:mm a')}</td>
            </tr>)
            }

          </tbody>
          </table>
          </>:
          <h2>No Payments so far</h2>
          }

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
        storeUserInfo:(userInfo)=>dispatch(storeUserInfo(userInfo)),
        fetchCandidateInfo:(token)=>dispatch(fetchCandidateInfo(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Subscription)
