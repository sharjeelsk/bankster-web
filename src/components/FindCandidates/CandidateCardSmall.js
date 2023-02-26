import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {stringHide,renderEmployementString,renderEmployementStringHide,getAge,limitString} from '../utils/Functions'
import { Link } from 'react-router-dom';
function CandidateCardSmall(props) {
    function convertToLakhsString(num) {
        const lakhs = num / 100000;
        return lakhs.toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Lacs';
      }
  function numberWithCommas(x) {
    //let num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let num = x.toString()
    //return num.length>=5?`${num.substring(0,num.length-5)} lakhs`:num
    return convertToLakhsString(x)
}
  return (
    <Link target="_blank" className="link" to={`/candidate-info/${props._id}`}>
    <div className="small-cand-card shadow-sm">
        <h3 className="ctc">{props.currentCtc?`₹${numberWithCommas(props.currentCtc)}`:"CTC N.A"}</h3>
        <img src={props.profilePicture?`${process.env.REACT_APP_DEVELOPMENT}/api/image/${props.profilePicture}`:"/user.png"} onError={(e)=>{e.target.onerror = null; e.target.src="/user.png"}} alt="avatar" />
        <h1>{stringHide(props.fullName,"fullName",props)}</h1>
        <p className="education"><b>{props.hide?renderEmployementStringHide(props):renderEmployementString(props)}</b></p>
        <p className="education"><b>{props.education.length>0?props.education.map((i,ind)=>{
                    if(i.featuredEducation){
                        if(i.name<=0){
                            return "Not Added"
                        }
                        return i.name + ', ' + i.universityName;
                    }
                    else if(ind===props.education.length-1){
                        return "Featured Education Not Added"
                    }
                }):"Featured Education Not Added"}</b></p>
        <p className="ginfo">{props.gender} | {props.dob?getAge(props.dob):"DOB Not Added"}</p>
        {/* <div className="row m-auto info-kv">
            <div className="col-6">
                <p className="key">Product</p>
                <p className="value">Two Wheeler Loans</p>
            </div>
            <div className="col-6">
                <p className="key">Functional Area</p>
                <p className="value">Sales</p>
            </div>
            <div className="col-6">
                <p className="key">Industry</p>
                <p className="value">NBFC</p>
            </div>
        </div> */}
        {/* <p className="info-kv-2"><span>Product: </span>Two Wheeler Loans</p>
        <p className="info-kv-2"><span>Functional Area: </span>Sales</p>
        <p className="info-kv-2"><span>Industry: </span>NBFC</p> */}
        <p><b>{props.industry?limitString(props.industry):"N.A"} | {props.functionalArea?limitString(props.functionalArea):"N.A"} | {props.product?limitString(props.product):"N.A"}</b></p>
        <p className="yoe">{props.yearsOfExperience} Years of Experience</p>
        <p className="yoe">{props.noticePeriod?`${props.noticePeriod} Notice Period`:"Notice Period N.A"}</p>
        <p className="location"><LocationOnIcon /> {props.userLocation.city} | {props.userLocation.state}</p>
    </div>
    </Link>
  )
}

export default CandidateCardSmall