import React from 'react'
import Lottie from "lottie-react";
import Done from "./Done.json";
import { useParams } from "react-router-dom";
import { setUser } from "../redux/user/userActions";
import {connect} from 'react-redux'
const LottieComponent = (props) => {
    let params = useParams()
    console.log(params)
    React.useEffect(()=>{
        setTimeout(() => {
            if(params.token){
                props.setUser(params.token)
                console.log("============================================================================================1111",params.type)
                if(params.type === "candidate"){
                    props.history.push("/candidatehome")

                }else{
                    props.history.push("/recruiterhome")
                }
            }
        }, 2000);
    },[])
  return <div>
  <Lottie style={{height:'80vh',width:'100vw'}} animationData={Done} />;
  </div>
};
const mapStateToProps = ({banksterUser})=>{
    return {
        banksterUser
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(token)=>dispatch(setUser(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LottieComponent);