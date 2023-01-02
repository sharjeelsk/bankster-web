import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchRecruiterInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./SubscriptionR.scss"
import { Button } from '@mui/material';
import date from 'date-and-time';
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid';
function Subscription(props) {
    const [display,setDisplay]=React.useState(false)
    const [plans,setPlans] = React.useState([])
    console.log(plans)


    const getPlans = ()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/subscription/allSubscription`)
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

    const openPayModal = (amount,plan) => {
      console.log(plan._id)
      const options = {
        key: 'rzp_test_BbBTgCM0XfV6iH',
        amount: amount*100, //  = INR 1
        name: 'Acme shop',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            console.log(response);
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/changeRecruiterPlan`,{plan,paymentId:response,availablePlanCreditsId:props.user.userInfo.availablePlanCredits._id},{headers:{token:props.user.user}})
            .then(res=>{
              console.log(res);
              getPlans()
              props.fetchRecruiterInfo(props.user.user)
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
      return plan.name?plan.name:"";
    }

    const renderCreatedAt = (expiry)=>{
      let createdat = date.addMonths(expiry,-1)
      return createdat;
    }
    const columns2 = [
      { field: 'id', headerName: 'ID',width:20},
      //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
      { field: 'planName', headerName: 'Plan Name',valueGetter:(param)=>renderPlanName(param.row.subscriptionId),width:150},
      { field: 'PaymentId', headerName: 'Payment ID',valueGetter:(param)=>param.row.paymentId.razorpay_payment_id,width:200},
      {field:"expiry",headerName:"Expiry",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
      {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}
    
    
    ];
    return (
        <>
         <HeaderDash />
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead id={4} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

             {props.user.userInfo.subRecruiter?
             <div className="col-12 no-jobs">
             <h1>You don't have access to this section, contact head recruiter</h1>
            </div>
             :<>
             <h1>CurrentSubscription</h1>
             <p><TaskAltIcon /> {props.user.userInfo.availablePlanCredits.cvAccess} resume access left</p>
              <p><TaskAltIcon /> {props.user.userInfo.availablePlanCredits.jobPostings} job postings left</p>
              <p><TaskAltIcon /> {props.user.userInfo.availablePlanCredits.subRecruiters} Sub Recruiters left</p>

            <h1>Subscriptions</h1>

            <section className='row m-auto'>
            {
              plans.length>0?plans.map((item,index)=>!item.custom&&
              <div key={index} className={`shadow-sm plan-auth-cont col-3 ${item._id===props.user.userInfo.subscription._id?"active-plan":""}`}>
              <h1>{item.name}</h1>
              <h2>${item.amount}/month</h2>
              <p><TaskAltIcon /> {item.cvAccess} resume access</p>
              <p><TaskAltIcon /> {item.jobPostings} job postings</p>
              <p><TaskAltIcon /> {item.subRecruiters} Sub Recruiters</p>
              {
                item._id===props.user.userInfo.subscription._id?<p className="active-text">Currently Active</p>:
                <Button onClick={()=>openPayModal(item.amount,item)} variant="contained">upgrade</Button>
              }
             </div> 
              ):null
             }
            </section>

            
          {plans.length>0&&<div style={{ height: '40vh', width: '100%' }}>
                <DataGrid
                    rows={props.user.userInfo.paymentHistory.map((item,index)=>({...item,id:index+1}))}
                    columns={columns2}
                    autoPageSize
                />
          </div>}

            </>
            }
            {/* {plans.length>0&&<>
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
          </>} */}

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
        fetchRecruiterInfo:(token)=>dispatch(fetchRecruiterInfo(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Subscription)
