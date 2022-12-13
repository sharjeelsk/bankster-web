import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchRecruiterInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./SubRecruiters.scss"
import { Button } from '@mui/material';
import date from 'date-and-time';
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
function SubRecruiters(props) {
    const [display,setDisplay]=React.useState(false)
    const [subRecruiters,setSubRecruiters] = React.useState([])

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getUserSubRecruiters`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
            setSubRecruiters(arr)
        })
    },[])

    return (
        <>
         <HeaderDash />
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead id={5} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

            {props.user.userInfo.subRecruiter?
             <div className="col-12 no-jobs">
             <h1>You don't have access to this section, contact head recruiter</h1>
            </div>:
            <>
            <h1>Sub Recruiters</h1>

            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={subRecruiters}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
                />
            </div>

            <div  style={{position:"fixed",bottom:"5%",right:"5%",zIndex:5}}>
                    <Tooltip title="Add Services">
                    <Fab variant="extended" onClick={()=>props.history.push("/createsubrecruiter")} color="primary" aria-label="add">
                        <AddIcon sx={{ mr: 1 }} />
                        Create Sub Recruiter
                    </Fab>
                    </Tooltip>
            </div>
            </>}


             </div>
    </div>
    </>
    )
}
const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'fullName', headerName: 'Name',valueGetter:(param)=>param.row.fullName,width:150},
    { field: 'email', headerName: 'Email',valueGetter:(param)=>param.row.email,width:200},
    { field: 'mobileNo', headerName: 'mobileNo',valueGetter:(param)=>param.row.mobileNo,width:150},
    { field: 'hiringRate', headerName: 'Hiring Rate',valueGetter:(param)=>param.row.hiringRate,width:150},
    { field: 'companyName', headerName: 'Company Name',valueGetter:(param)=>param.row.companyName,width:150},
    { field: 'designation', headerName: 'Designation',valueGetter:(param)=>param.row.designation.toString(),width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];
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

export default connect(mapStateToProps,mapDispatchToProps)(SubRecruiters)
