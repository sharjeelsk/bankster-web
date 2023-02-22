import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecruiterDashhead from '../RecruiterDashhead';
import axios from 'axios'
import {connect} from 'react-redux'
import {storeUserInfo,fetchRecruiterInfo} from '../../redux/user/userActions'
import HeaderDash from '../../Header/HeaderDash';
import "./SavedSearch.scss"
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
function Bookmark(props) {
    const [display,setDisplay]=React.useState(false)
    const [searches,setSearches]=React.useState([])


    const fetchSearches =()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getSavedSearch`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res.data.result)
            if(res.data.result.savedSearches){
                setSearches(res.data.result.savedSearches)
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
  
    React.useEffect(()=>{
        fetchSearches()
    },[])



    return (
        <>

            <HeaderDash />
        
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 p-0">
            <RecruiterDashhead margin={0} id={7} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container scroll" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>


            <h1>Saved Search</h1>
            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={searches.map((item,index)=>({...item,id:index+1}))}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>props.history.push('/searchcandidates',item.row)}
                />
            </div>





             </div>
    </div>
    </>
    )
}
const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'title', headerName: 'Title',valueGetter:(param)=>param.row.title,width:150},
    { field: 'must', headerName: 'Must',valueGetter:(param)=>param.row.must.map(item=>item),width:150},
    { field: 'mustNot', headerName: 'Exclude',valueGetter:(param)=>param.row.mustNot.map(item=>item),width:200},
    { field: 'should', headerName: 'Any',valueGetter:(param)=>param.row.should.map(item=>item),width:200},
    { field: 'age', headerName: 'Age',valueGetter:(param)=>`${param.row.minimumAge} | ${param.row.maximumAge}`,width:100},
    { field: 'experience', headerName: 'Experience',valueGetter:(param)=>`${param.row.minimumExperience} | ${param.row.maximumExperience}`,width:100},
    { field: 'ctc', headerName: 'CTC',valueGetter:(param)=>`${param.row.minimumSalary} | ${param.row.maximumSalary}`,width:150},
    { field: 'ug', headerName: 'UG',valueGetter:(param)=>param.row.ug,width:150},
    { field: 'pg', headerName: 'PG',valueGetter:(param)=>param.row.pg,width:150},
    { field: 'noticePeriod', headerName: 'Notice Period',valueGetter:(param)=>param.row.noticePeriod,width:150},
    { field: 'gender', headerName: 'Gender',valueGetter:(param)=>param.row.gender?param.row.gender:"All",width:150},
    // {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}  
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

export default connect(mapStateToProps,mapDispatchToProps)(Bookmark)
