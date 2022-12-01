import axios from 'axios'



export const setUser = (user)=>{
    return {
        type:"SET_USER",
        payload:user
    }
}
export const storeUserInfo = (info)=>{
    return {
        type:"STORE_USERINFO",
        payload:info
    }
}
export const deleteUser =()=>{
    return {
        type:"DELETE_USER"
    }
}

export const storeUserType=(userType)=>{
    return {
        type:"STORE_USER_TYPE",
        payload:userType
    }
}

export const fetchCandidateInfo = (token)=>{
    return async (dispatch)=>{
        return axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/candidate/getCandidateProfile`,{headers:{token}})
        .then(({ data }) => {
        dispatch(storeUserInfo(data.result));
      });
    }
}

export const fetchRecruiterInfo = (token)=>{
    return async (dispatch)=>{
        return axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/recruiter/getRecruiterProfile`,{headers:{token}})
        .then(({ data }) => {
        dispatch(storeUserInfo(data.result));
      });
    }
}